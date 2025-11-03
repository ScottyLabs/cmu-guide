// @ts-check
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import svelte from "@astrojs/svelte";
import pagefind from "astro-pagefind";

// https://astro.build/config
export default defineConfig({
	site: "https://cmu.guide",
	vite: {
		plugins: [tailwindcss()]
	},
	integrations: [svelte(), pagefind()],
});
