(function () {
  function normalizeString(value) {
    return (value || "").toString().trim();
  }

  function parseGlossaryData() {
    const node = document.getElementById("glossary-data");
    if (!node) {
      return [];
    }

    let parsed;
    try {
      parsed = JSON.parse(node.textContent || "[]");
    } catch (error) {
      return [];
    }

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed
      .map(function (entry) {
        return {
          item: normalizeString(entry.item),
          definition: normalizeString(entry.definition)
        };
      })
      .filter(function (entry) {
        return entry.item.length > 0 && entry.definition.length > 0;
      })
      .sort(function (a, b) {
        return b.item.length - a.item.length;
      });
  }

  function isBoundaryChar(char) {
    if (!char) {
      return true;
    }

    return !/[a-z0-9]/i.test(char);
  }

  function hasWordBoundaries(text, index, length) {
    const before = index > 0 ? text.charAt(index - 1) : "";
    const after = text.charAt(index + length);
    return isBoundaryChar(before) && isBoundaryChar(after);
  }

  function findEarliestMatch(text, terms, seenTerms) {
    const lowerText = text.toLowerCase();
    let bestMatch = null;

    terms.forEach(function (term) {
      const key = term.item.toLowerCase();
      if (seenTerms.has(key)) {
        return;
      }

      let start = 0;
      while (start < lowerText.length) {
        const index = lowerText.indexOf(key, start);
        if (index === -1) {
          break;
        }

        if (hasWordBoundaries(lowerText, index, key.length)) {
          if (!bestMatch || index < bestMatch.index || (index === bestMatch.index && key.length > bestMatch.term.item.length)) {
            bestMatch = {
              index: index,
              length: key.length,
              term: term
            };
          }

          break;
        }

        start = index + 1;
      }
    });

    return bestMatch;
  }

  function createGlossaryLink(term) {
    const link = document.createElement("a");
    link.href = "#";
    link.className = "glossary-term";
    link.dataset.glossaryItem = term.item;
    link.dataset.glossaryDefinition = term.definition;
    link.setAttribute("role", "button");
    link.setAttribute("aria-label", "Show glossary definition for " + term.item);
    return link;
  }

  function transformTextNode(node, terms, seenTerms) {
    const text = node.nodeValue || "";
    const parent = node.parentElement;

    if (!text.trim() || !parent) {
      return;
    }

    const fragment = document.createDocumentFragment();
    let cursor = 0;
    let hasReplacement = false;

    while (cursor < text.length) {
      const slice = text.slice(cursor);
      const match = findEarliestMatch(slice, terms, seenTerms);

      if (!match) {
        fragment.appendChild(document.createTextNode(slice));
        break;
      }

      if (match.index > 0) {
        fragment.appendChild(document.createTextNode(slice.slice(0, match.index)));
      }

      const matchedText = slice.substr(match.index, match.length);
      const link = createGlossaryLink(match.term);
      link.textContent = matchedText;
      fragment.appendChild(link);
      seenTerms.add(match.term.item.toLowerCase());
      hasReplacement = true;

      cursor += match.index + match.length;
    }

    if (hasReplacement) {
      node.replaceWith(fragment);
    }
  }

  function shouldSkipNode(node) {
    const parent = node.parentElement;
    if (!parent) {
      return true;
    }

    if (parent.closest("a, button, code, pre, script, style, textarea, h1, h2, h3, h4, h5, h6, [data-no-glossary]")) {
      return true;
    }

    return false;
  }

  function decorateGlossaryTerms(terms) {
    const contentRoot = document.getElementById("main-content");
    if (!contentRoot) {
      return;
    }

    const seenTerms = new Set();
    const walker = document.createTreeWalker(contentRoot, NodeFilter.SHOW_TEXT, {
      acceptNode: function (node) {
        if (shouldSkipNode(node)) {
          return NodeFilter.FILTER_REJECT;
        }

        return NodeFilter.FILTER_ACCEPT;
      }
    });

    const nodes = [];
    let current = walker.nextNode();
    while (current) {
      nodes.push(current);
      current = walker.nextNode();
    }

    nodes.forEach(function (node) {
      transformTextNode(node, terms, seenTerms);
    });
  }

  function wireModalEvents() {
    const modalElement = document.getElementById("glossaryModal");
    const titleElement = document.getElementById("glossaryModalTitle");
    const bodyElement = document.getElementById("glossaryModalBody");

    if (!modalElement || !titleElement || !bodyElement || typeof bootstrap === "undefined" || !bootstrap.Modal) {
      return;
    }

    const modal = bootstrap.Modal.getOrCreateInstance(modalElement);

    document.addEventListener("click", function (event) {
      const trigger = event.target.closest(".glossary-term");
      if (!trigger) {
        return;
      }

      event.preventDefault();
      titleElement.textContent = trigger.dataset.glossaryItem || "Glossary term";
      bodyElement.textContent = trigger.dataset.glossaryDefinition || "Definition unavailable.";
      modal.show();
    });
  }

  document.addEventListener("DOMContentLoaded", function () {
    const terms = parseGlossaryData();
    if (!terms.length) {
      return;
    }

    decorateGlossaryTerms(terms);
    wireModalEvents();
  });
})();
