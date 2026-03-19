# CMU First-Year Guide

## First-Time Setup
First-time working on this project? Follow these steps, assuming no prior programming experience:

1. [Set up Git](https://docs.github.com/en/get-started/git-basics/set-up-git#setting-up-git) if you haven't already.
1. Download your favorite code editor (we recommend [Visual Studio Code](https://code.visualstudio.com/)).
2. Download [nvm](https://www.nvmnode.com/guide/download.html).
3. Install [Bun](https://bun.sh/).
4. In your terminal, run `nvm install --lts` (or `nvm install lts` for Windows)
5. Clone this repository. For VSCode, this means you will do the following:
  - Click the topmost file explorer icon in the sidebar.
  - Click on "Clone Repository".
  - Paste in the URL `https://github.com/ScottyLabs/cmu-guide.git` when prompted.
  - Open the repository.
6. Open the terminal in your project. For VSCode, you can use the shortcut <kbd>ctrl+\`</kbd> (backtick, same button as tilde ~).
7. Run `bun install`.

Do the following whenever you want to work on the project:

8. Run `bun dev`. This starts a local dev server for this website!
9. Follow the localhost link in the terminal output. For VSCode, hold down <kbd>command</kbd> or <kbd>ctrl</kbd> when clicking on the link.

Now, whenever you edit a file and save it (<kbd>command+s</kbd> or <kbd>ctrl+s</kbd>), your local server will automatically reload to reflect your changes! This means you don't have to quit and rerun the dev command whenever you make changes, as long as your server is running.

To contribute your changes to the repo:
1. [Create a new branch](https://code.visualstudio.com/docs/sourcecontrol/branches-worktrees#_create-new-branches).
2. [Commit your changes](https://code.visualstudio.com/docs/sourcecontrol/overview#_stage-and-commit-changes).
3. [Push your changes](https://code.visualstudio.com/docs/sourcecontrol/overview#_sync-with-remotes).
4. [Make a pull request (PR)](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/proposing-changes-to-your-work-with-pull-requests/creating-a-pull-request).

Your pull request will be reviewed, and if merged, it will be published to cmu.guide!

## Usage

This project uses [Bun](https://bun.sh/). All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `bun install`             | Installs dependencies                            |
| `bun dev`             | Starts local dev server at `localhost:4321`      |
| `bun build`           | Build your production site to `./dist/`          |
| `bun preview`         | Preview your build locally, before deploying     |
| `bun astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `bun astro -- --help` | Get help using the Astro CLI                     |

Since pagefind requires a build artifact, search will only work on `bun preview` after running `bun build`.

## Project Structure

Astro looks for `.md` files in the [`src/pages/`](src/pages/) directory. Each page is exposed as a route based on its file name. Any static assets, like images, should be placed in the [`public/`](public/) directory.

For more comprehensive instructions, visit the visit the [Markdown content](https://docs.astro.build/en/guides/markdown-content/) docs, or more generally, the [Astro documentation](https://docs.astro.build).

Favicons were generated using [favicon-generator.org](https://www.favicon-generator.org/).
