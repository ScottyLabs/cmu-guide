import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";

const pages = defineCollection({
	loader: glob({ pattern: "*.{md,mdx}", base: "./src/pages" }),
	schema: z
		.object({
			title: z.string(),
			description: z.string(),
			contributors: z
				.array(
					z
						.object({
							name: z.string(),
							email: z.string().optional(),
						})
						.strict(),
				)
				.optional(),
			layout: z.string(),
			image: z.string().optional(),
			latex: z.boolean().optional(),
			nav: z.boolean().optional(),
			hideTableOfContents: z.boolean().optional(),
			hidePrevNext: z.boolean().optional(),
			hidePageMeta: z.boolean().optional(),
			hideTitle: z.boolean().optional(),
			hideDescription: z.boolean().optional(),
			contentMaxWidth: z.string().optional(),
			contentBodyClass: z.string().optional(),
			pageSpacing: z.string().optional(),
		})
		.strict(),
});

export const collections = { pages };
