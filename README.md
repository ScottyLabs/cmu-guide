# CMU First-Year Guide

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

Since pagefind requires a build artifact, search will `bun preview` after running `bun build`.

## Project Structure

Astro looks for `.md` files in the [`src/pages/`](src/pages/) directory. Each page is exposed as a route based on its file name. Any static assets, like images, should be placed in the [`public/`](public/) directory.

For more comprehensive instructions, visit the visit the [Markdown content](https://docs.astro.build/en/guides/markdown-content/) docs, or more generally, the [Astro documentation](https://docs.astro.build).
