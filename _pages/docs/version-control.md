---
layout: docs
title: Version control
audience: developers
description: How to keep a record of changes
sort_order: 3
---
When multiple people work on a website, or when you want to save your progress so you can undo mistakes later, you use **Git**.

For a non-developer, think of Git like **"Track Changes" in Microsoft Word**, but for an entire folder of files. Instead of hitting "Save," you create a permanent checkpoint called a **Commit**, and then you send those checkpoints to GitHub.

Since you are using VS Code, you can do this using a visual menu—no coding required.

## The 3-Step routine for making changes

Whenever you want to edit your website, follow this simple routine.

### 1. Get the latest updates (Pull)

Before you start typing, you want to make sure you have any changes your teammates might have made while you were away.

* On the far-left sidebar of VS Code, click the **Source Control** icon (it looks like a little branch with three dots).
* Click the **three dots (...)** at the top of that side panel to open the menu.
* Click **Pull**. This downloads the latest version of the site to your computer.

### 2. Save your work permanently (Commit)

Go ahead and edit your files (like updating a skill). When you are happy with your changes and want to save a checkpoint:

* Go back to the **Source Control** panel on the left.
* You will see a list of files you changed under the word "Changes".
* Hover over the word "Changes" and click the **plus sign (+)** that appears. This "stages" your files, telling Git you want to save them.
* In the box that says *Message*, type a short note explaining what you did (e.g., `Updated the April announcement blog post`).
* Click the blue **Commit** button. Your checkpoint is now saved on your computer!

### 3. Share it with the world (Push)

Right now, your changes are only saved on your personal computer. To send them to GitHub so everyone else can see them (and so the live website updates):

* Click the blue button that says **Sync Changes** (or **Publish Branch**).
* Alternatively, click those **three dots (...)** at the top of the panel again and click **Push**.

## 💡 Two golden rules for beginners

* **Commit often:** It is much better to make five small checkpoints (e.g., "Fixed typo", "Added new image", "Updated paragraph") than one giant checkpoint at the end of the week. If you make a mistake, it's much easier to undo a small step.
* **Don't panic if things break:** Because you are using Git, nothing is permanent. If you accidentally delete a file or break the layout, you can always revert back to your last successful "Commit" checkpoint.