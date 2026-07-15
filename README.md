# CMU First-Year Guide

## First-Time Setup
First-time working on this project? Follow these steps, assuming no prior programming experience:

1. [Set up Git](https://docs.github.com/en/get-started/git-basics/set-up-git#setting-up-git) if you haven't already.
2. Download your favorite code editor (we recommend [Visual Studio Code](https://code.visualstudio.com/)).
3. Install [Deno](https://deno.com/).
4. Clone this repository. For VSCode, this means you will do the following:
  - Click the topmost file explorer icon in the sidebar.
  - Click on "Clone Repository".
  - Paste in the URL `https://github.com/ScottyLabs/cmu-guide.git` when prompted.
  - Open the repository.
5. Open the terminal in your project. For VSCode, you can use the shortcut <kbd>ctrl+\`</kbd> (backtick, same button as tilde ~).

Do the following whenever you want to work on the project:

6. Run `deno task dev`. This fetches dependencies and starts a local dev server for this website!
7. Follow the localhost link in the terminal output. For VSCode, hold down <kbd>command</kbd> or <kbd>ctrl</kbd> when clicking on the link.

Now, whenever you edit a file and save it (<kbd>command+s</kbd> or <kbd>ctrl+s</kbd>), your local server will automatically reload to reflect your changes! This means you don't have to quit and rerun the dev command whenever you make changes, as long as your server is running.

To contribute your changes to the repo:
1. [Create a new branch](https://code.visualstudio.com/docs/sourcecontrol/branches-worktrees#_create-new-branches).
2. [Commit your changes](https://code.visualstudio.com/docs/sourcecontrol/overview#_stage-and-commit-changes).
3. [Push your changes](https://code.visualstudio.com/docs/sourcecontrol/overview#_sync-with-remotes).
4. [Make a pull request (PR)](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

Your pull request will be reviewed, and if merged, it will be published to cmu.guide!

## Creating a New Article

1. In `src/pages`, create a file ending in `.md` (or use `.mdx` if your article uses Svelte components or LaTeX).
2. In `src/navigation/config.ts`, add your file name as an item in its respective category.
3. Now go to the file you just created. Copy this frontmatter to the top of your file and fill in the values:
```yaml
---
title: [ADD YOUR TITLE HERE]
description: [ADD YOUR DESCRIPTION]
contributors:
  - name: [ADD YOUR FIRST AND LAST NAME HERE]
layout: ../layouts/Layout.astro
---
```
You will change everything except for `layout`. If your article uses LaTeX, also add `latex: true`.

4. Write your article under the frontmatter! When you are done, commit your changes and submit a pull request.

## Usage

This project uses [Deno](https://deno.com/). All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `deno task dev`           | Fetches dependencies and starts local dev server at `localhost:4321` |
| `deno task check`         | Checks Astro and TypeScript diagnostics                             |
| `deno task build`         | Build your production site to `./dist/`          |
| `deno task preview`       | Preview your build locally, before deploying     |
| `deno task astro -- ...`  | Run CLI commands like `astro add`, `astro check` |
| `deno task astro -- --help` | Get help using the Astro CLI                   |

Since pagefind requires a build artifact, search will only work on `deno task preview` after running `deno task build`.

> [!WARNING]
> If you used this project before it migrated from Bun to Deno and a Deno command reports an unexpected dependency or type-resolution error, stop any running dev server, delete the ignored `node_modules` folder, then run `deno task build` or `deno task dev` again. Deno will recreate its dependency layout from the tracked `deno.lock`.

## Project Structure

Astro looks for `.md` files in the [`src/pages/`](src/pages/) directory. Each page is exposed as a route based on its file name. Any static assets, like images, should be placed in the [`public/`](public/) directory.

For more comprehensive instructions, visit the visit the [Markdown content](https://docs.astro.build/en/guides/markdown-content/) docs, or more generally, the [Astro documentation](https://docs.astro.build).

Favicons were generated using [favicon-generator.org](https://www.favicon-generator.org/).
