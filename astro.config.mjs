// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
	site: "https://cmu.guide",
	vite: {
		plugins: [tailwindcss()]
	},
	integrations: [mdx(), svelte()],
});
