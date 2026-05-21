// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import remarkMath from "remark-math";
import rehypeKatex from "rehype-katex";
import remarkOnlyIfLatex from "./src/utils/remarkOnlyIfLatex";

// https://astro.build/config
export default defineConfig({
	site: "https://cmu.guide",
	markdown: {
		remarkPlugins: [remarkMath, remarkOnlyIfLatex],
		rehypePlugins: [rehypeKatex],
	},
	vite: {
		plugins: [tailwindcss()],
	},
	integrations: [
		mdx({
			remarkPlugins: [remarkMath, remarkOnlyIfLatex],
			rehypePlugins: [rehypeKatex],
		}),
		svelte(),
	],
});
