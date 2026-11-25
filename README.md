# CMU First-Year Guide

## First-Time Setup
First-time working on this project? Follow these steps, assuming no prior programming experience:

1. [Set up Git](https://docs.github.com/en/get-started/git-basics/set-up-git#setting-up-git) if you haven't already.
2. Download your favorite code editor (we recommend [Visual Studio Code](https://code.visualstudio.com/)).
3. Install [Node.js 24](https://nodejs.org/en/download), which includes npm.
4. Clone this repository. For VSCode, this means you will do the following:
  - Click the topmost file explorer icon in the sidebar.
  - Click on "Clone Repository".
  - Paste in the URL `https://github.com/ScottyLabs/cmu-guide.git` when prompted.
  - Open the repository.
5. Open the terminal in your project. For VSCode, you can use the shortcut <kbd>ctrl+\`</kbd> (backtick, same button as tilde ~).

6. Run `npm ci` to install dependencies. Run it again whenever `package-lock.json` changes.
7. Run `npm run dev` whenever you want to start the local dev server.
8. Follow the localhost link in the terminal output. For VSCode, hold down <kbd>command</kbd> or <kbd>ctrl</kbd> when clicking on the link.

Now, whenever you edit a file and save it (<kbd>command+s</kbd> or <kbd>ctrl+s</kbd>), your local server will automatically reload to reflect your changes! This means you don't have to quit and rerun the dev command whenever you make changes, as long as your server is running.

To contribute your changes to the repo:
1. [Create a new branch](https://code.visualstudio.com/docs/sourcecontrol/branches-worktrees#_create-new-branches).
2. [Commit your changes](https://code.visualstudio.com/docs/sourcecontrol/overview#_stage-and-commit-changes).
3. [Push your changes](https://code.visualstudio.com/docs/sourcecontrol/overview#_sync-with-remotes).
4. [Make a pull request (PR)](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

Your pull request will be reviewed, and if merged, it will be published to cmu.guide!

## Creating a New Article

1. In `src/pages`, create a file ending in `.md` (or use `.mdx` if your article uses Svelte components or LaTeX).
2. In `src/config/navigation.ts`, add your file name as an item in its respective category.
3. In `src/config/contributors.ts`, add your name and optional public metadata:

   ```ts
   "Your Name": {
     pronouns: "optional pronouns",
     email: "optional public email",
   },
   ```

   Pronouns and email are optional; only include information that the contributor has agreed to publish. If an email is provided, readers can click the contributor's name to copy it.

4. Now go to the article file. Copy this frontmatter to the top and fill in the values, referencing the exact, case-sensitive name from the registry:

   ```yaml
   ---
   title: [ADD YOUR TITLE HERE]
   description: [ADD YOUR DESCRIPTION]
   contributors:
     - "Your Name"
   layout: ../layouts/Layout.astro
   ---
   ```

   You will change everything except for `layout`. If your article uses LaTeX, also add `latex: true`.

5. Write your article under the frontmatter! When you are done, commit your changes and submit a pull request.

## Usage

Run these commands from the project root with Node.js 24:

| Command                     | Action                                             |
| :-------------------------- | :------------------------------------------------- |
| `npm ci`                    | Install dependencies from `package-lock.json`      |
| `npm run dev`               | Start the local dev server at `localhost:4321`     |
| `npm run check`             | Check Astro and TypeScript diagnostics             |
| `npm run build`             | Build the production site and search index in `dist/` |
| `npm run preview`           | Preview the production build locally               |
| `npm run astro -- --help`   | Get help using the Astro CLI                       |

To try search locally, run `npm run build` followed by `npm run preview`. Pagefind generates the search index during the build.

## Project Structure

Astro looks for `.md` files in the [`src/pages/`](src/pages/) directory. Each page is exposed as a route based on its file name. Any static assets, like images, should be placed in the [`public/`](public/) directory.

For more comprehensive instructions, visit the visit the [Markdown content](https://docs.astro.build/en/guides/markdown-content/) docs, or more generally, the [Astro documentation](https://docs.astro.build).

Favicons were generated using [favicon-generator.org](https://www.favicon-generator.org/).
