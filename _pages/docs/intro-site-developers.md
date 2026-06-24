---
layout: docs
sort_order: 2
title: Introduction for site developers
audience: developers
description: How to get started using the Jekyll site-generation platform
---
These instructions are designed for non-developers to get this website running on your machine, ready for you to edit the content.

You will be using a coding environment called **Visual Studio Code** or VS Code for short. Alongside that, you will be using a program called **Docker**. This allows the Jekyll system to run inside a **container** exactly as it does on my machine, without affecting anything on the rest of your computer.

The first part of these instructions is about getting this environment working. The second part is about how to download and setup the skills framework website within the environment.

## Step 1: Install the free tools you need

1. **Download VS Code:** * Go to [code.visualstudio.com](https://code.visualstudio.com/){:target="_blank} and download the version for your computer (Windows or Mac).
2. Run the VS Code installer and use the default settings. This is the visual editor where you will view your website files.
3. **Download Docker Desktop:** * Go to [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/){:target="_blank} and download it.
4. Run the installer. If it asks you to restart your computer during or after installation, go ahead and do so.
5. **Crucial Step:** Once installed, open the Docker Desktop application. It needs to be actively running in the background for this to work.

## Step 2: Set up VS code for containers

Now, we need to give VS Code the ability to read the devcontainer configuration files that come with this website.

1. Open **VS Code**.
2. On the far left sidebar, click on the icon that looks like four squares (the **Extensions** marketplace).
3. In the search bar at the top, type `Dev Containers`.
4. Find the extension made by **Microsoft** and click the blue **Install** button.

## Step 3: Create your own fork of this website

There are two ways of making a copy of a git repository. One is 'cloning'. You use this when you always want to have the most up-to-date version of whatever the development team has produced, and maybe even contribute back to the main repository at some point.

The other is 'forking'. You use a fork when you want your own copy of the repository, to make it into something that will be completely independent of the main repository. 

Think of it like taking a master template and making a complete, independent copy of it under your own GitHub account. This way, you can change anything you want without accidentally breaking the original template.

1. Open your web browser and go to the original project link: [github.com/berthelemy/skills-framework](https://github.com/berthelemy/skills-framework){:target="_blank"}.
2. Look at the very top-right corner of the webpage. You will see a button labeled **Fork** (it usually has an icon that looks like a split path). Click it.
3. On the next screen, GitHub will ask where you want to fork it. Select your own personal GitHub account (or an organisational account if you have one). **Note:** If you don't yet have a Github account, please create one.
4. Leave the settings as they are (you can keep the name `skills-framework`) and click the green **Create fork** button at the bottom.

After a few seconds, GitHub will redirect you to your *new personal copy*. You will know it worked because the top-left of the page will now say **[Your-Username]/skills-framework**, and right below it, it will say *"forked from berthelemy/skills-framework"*.

## Step 4: Copy *your* new repository link

Now that you have your own copy, you need to copy its link — not the original one.

1. On your new personal GitHub page, click the green **Code** button.
2. Make sure the **HTTPS** tab is selected.
3. Click the **Copy** icon (the two overlapping squares) to copy your personal link to your clipboard.

## Step 5: Clone your fork into VS Code

1. Open **VS Code** on your computer.
2. Click on **View** in the top menu, select **Command Palette...**, type `Git: Clone`, and press **Enter**.
3. **Paste** the link you just copied into the top bar and press **Enter**.
4. Choose a folder on your computer where you want to save this website (like your `Documents` folder) and click **Select Repository Location**.
5. When the pop-up appears in the bottom-right corner asking if you want to open the cloned repository, click **Open**.

## Step 4: Fire up the devcontainer

1. As soon as the project opens, VS Code will detect its devcontainer files. Look for the pop-up in the bottom-right corner that says *"Folder contains a Dev Container configuration file."*
2. Click **Reopen in Container**.
3. Wait a few minutes for Docker to build your environment.
4. Once it is loaded, open a new terminal (**Terminal** > **New Terminal**) and type: `bundle exec jekyll serve`
5. Click the `http://127.0.0.1:4000/` link that appears in your terminal to view your personal version of the Skills Framework!

Whenever you make changes and "Push" them using the [version control](/docs/version-control) steps you will make them available in your repository.

**Note:** This whole process might look really long-winded, but that's only because it's written down. Once everything is installed, the next time you just have to open the project inside VS Code and you'll be back to where you were.

## Step 5: Running the site locally

You'll want to be able to see how changes you make affect the site. To do this you need to get Jekyll to build the site and to run a small web server so you can view the site in your browser.

1. In VS Code, go to the Terminal menu and click: `New terminal`
2. A terminal space will open at the bottom of VS Code. Look for the prompt, which will say something like `vscode ➜ /workspaces/skills-framework (main) $`
4. At the prompt, type `bundle exec jekyll serve` and press `Enter`
4. In your browser, go to [http://127.0.0.1:4000/](http://127.0.0.1:4000/){:target="_blank"} and you should see an exact copy of this website, ready for you to work on.

Any changes you make to the site in VS Code will automatically refresh and update in your browser. When you are done working, you can simply close VS Code and close Docker Desktop.

---

> **Note:** If you make any changes to `_config.yml` you will need to stop the web server (`CTRL-C`) and rebuild the site with `bundle exec jekyll serve`