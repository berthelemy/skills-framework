(function () {
  const form = document.getElementById("site-search-form");
  const queryInput = document.getElementById("site-search-query");
  const typeSelect = document.getElementById("site-search-type");
  const statusNode = document.getElementById("site-search-status");
  const resultsNode = document.getElementById("site-search-results");

  if (!form || !queryInput || !typeSelect || !statusNode || !resultsNode) {
    return;
  }

  let docs = [];
  let fetchFailed = false;

  function normalizeText(value) {
    return (value || "")
      .toString()
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9\s]/g, " ")
      .replace(/\s+/g, " ")
      .trim();
  }

  function escapeHtml(value) {
    return (value || "")
      .toString()
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/\"/g, "&quot;")
      .replace(/'/g, "&#39;");
  }

  function escapeRegex(value) {
    return value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  }

  function tokenize(query) {
    return normalizeText(query)
      .split(" ")
      .filter(function (token) {
        return token.length > 1;
      });
  }

  function typeLabel(type) {
    if (type === "skill") {
      return "Skill";
    }

    if (type === "course") {
      return "Course";
    }

    if (type === "doc") {
      return "Documentation";
    }

    return "Content";
  }

  function snippetFor(doc) {
    const text = (doc.description || doc.body || "").trim();
    if (text.length <= 180) {
      return text;
    }

    return text.slice(0, 177).trimEnd() + "...";
  }

  function highlightText(text, tokens) {
    if (!text) {
      return "";
    }

    let highlighted = escapeHtml(text);
    tokens.forEach(function (token) {
      if (!token) {
        return;
      }

      const matcher = new RegExp("(" + escapeRegex(token) + ")", "ig");
      highlighted = highlighted.replace(matcher, '<mark class="search-hit">$1</mark>');
    });

    return highlighted;
  }

  function scoreDoc(doc, tokens) {
    let score = 0;

    tokens.forEach(function (token) {
      if (doc.normalizedTitle.indexOf(token) !== -1) {
        score += 8;
      }

      if (doc.normalizedDescription.indexOf(token) !== -1) {
        score += 4;
      }

      if (doc.normalizedExtra.indexOf(token) !== -1) {
        score += 2;
      }

      if (doc.normalizedBody.indexOf(token) !== -1) {
        score += 1;
      }
    });

    return score;
  }

  function renderResults(results, tokens) {
    if (results.length === 0) {
      resultsNode.innerHTML = "";
      statusNode.textContent = "No matching results found.";
      return;
    }

    const itemsHtml = results
      .map(function (result) {
        const doc = result.doc;
        const title = highlightText(doc.title, tokens);
        const snippet = highlightText(snippetFor(doc), tokens);
        const label = typeLabel(doc.type);
        return [
          '<article class="list-group-item">',
          '  <div class="d-flex justify-content-between flex-wrap gap-2 mb-1">',
          '    <a class="fw-semibold" href="' + escapeHtml(doc.url) + '">' + title + "</a>",
          '    <span class="badge text-bg-light border">' + label + "</span>",
          "  </div>",
          snippet ? '  <p class="mb-0 text-body-secondary">' + snippet + "</p>" : "",
          "</article>"
        ].join("\n");
      })
      .join("\n");

    resultsNode.innerHTML = itemsHtml;
    statusNode.textContent = results.length + " result" + (results.length === 1 ? "" : "s") + " found.";
  }

  function syncQueryString(query, type) {
    const url = new URL(window.location.href);

    if (query) {
      url.searchParams.set("q", query);
    } else {
      url.searchParams.delete("q");
    }

    if (type && type !== "all") {
      url.searchParams.set("type", type);
    } else {
      url.searchParams.delete("type");
    }

    window.history.replaceState({}, "", url.toString());
  }

  function runSearch() {
    if (fetchFailed) {
      statusNode.textContent = "Search index could not be loaded.";
      resultsNode.innerHTML = "";
      return;
    }

    if (!docs.length) {
      statusNode.textContent = "Loading search index...";
      resultsNode.innerHTML = "";
      return;
    }

    const rawQuery = queryInput.value.trim();
    const selectedType = typeSelect.value;
    syncQueryString(rawQuery, selectedType);

    const tokens = tokenize(rawQuery);
    if (!tokens.length) {
      statusNode.textContent = "Enter a search term to see results.";
      resultsNode.innerHTML = "";
      return;
    }

    const filtered = docs.filter(function (doc) {
      if (selectedType === "all") {
        return true;
      }

      return doc.type === selectedType;
    });

    const ranked = filtered
      .map(function (doc) {
        return {
          doc: doc,
          score: scoreDoc(doc, tokens)
        };
      })
      .filter(function (entry) {
        return entry.score > 0;
      })
      .sort(function (a, b) {
        if (b.score !== a.score) {
          return b.score - a.score;
        }

        return a.doc.title.localeCompare(b.doc.title);
      })
      .slice(0, 20);

    renderResults(ranked, tokens);
  }

  const debouncedRunSearch = (function () {
    let timeoutId = null;

    return function () {
      if (timeoutId) {
        window.clearTimeout(timeoutId);
      }

      timeoutId = window.setTimeout(function () {
        runSearch();
      }, 120);
    };
  })();

  function loadInitialState() {
    const params = new URLSearchParams(window.location.search);
    const queryFromUrl = params.get("q") || "";
    const typeFromUrl = params.get("type") || "all";

    queryInput.value = queryFromUrl;
    if (["all", "skill", "course", "doc"].indexOf(typeFromUrl) !== -1) {
      typeSelect.value = typeFromUrl;
    }
  }

  queryInput.addEventListener("input", debouncedRunSearch);
  typeSelect.addEventListener("change", runSearch);

  loadInitialState();

  const indexUrl = form.getAttribute("data-index-url");
  fetch(indexUrl, { headers: { Accept: "application/json" } })
    .then(function (response) {
      if (!response.ok) {
        throw new Error("Search index request failed");
      }

      return response.json();
    })
    .then(function (payload) {
      docs = (payload || []).map(function (doc) {
        const body = doc.body || "";
        const description = doc.description || "";
        const extra = doc.extra || "";

        return {
          id: doc.id || doc.url,
          type: doc.type || "content",
          title: doc.title || "Untitled",
          url: doc.url || "/",
          body: body,
          description: description,
          extra: extra,
          normalizedBody: normalizeText(body),
          normalizedDescription: normalizeText(description),
          normalizedExtra: normalizeText(extra),
          normalizedTitle: normalizeText(doc.title || "")
        };
      });

      runSearch();
    })
    .catch(function () {
      fetchFailed = true;
      runSearch();
    });
})();