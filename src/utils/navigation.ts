import { navigationConfig } from "@/config/navigation";

type PageFrontmatter = {
	title?: string;
	description?: string;
	hidePrevNext?: boolean;
	nav?: boolean;
	subarticleOrder?: number;
};

type PageModule = {
	frontmatter?: PageFrontmatter;
};

export type NavItem = {
	slug: string;
	title: string;
	description?: string;
	hidePrevNext?: boolean;
	sectionLabel: string;
};

export type NavParentItem = NavItem & {
	subarticles: NavItem[];
};

export type NavSection = {
	label: string;
	items: NavParentItem[];
};

export type NavigationModel = {
	sections: NavSection[];
	bySlug: Map<string, NavItem>;
};

const pages = import.meta.glob<PageModule>("../pages/**/*.{md,mdx}", {
	eager: true,
});

let cachedNavigation: NavigationModel | undefined;

export function normalizeSlug(slug: string): string {
	const trimmed = slug.replace(/^\/+/, "").replace(/\/+$/, "");
	if (trimmed === "" || trimmed === "index") {
		return "index";
	}
	return trimmed.replace(/\/index$/, "");
}

export function hrefForSlug(slug: string): string {
	const normalized = normalizeSlug(slug);
	return normalized === "index" ? "/" : `/${normalized}`;
}

export function slugFromPathname(pathname: string): string {
	return normalizeSlug(pathname.split(/[?#]/, 1)[0]);
}

export function getNavigation(): NavigationModel {
	try {
		cachedNavigation ??= buildNavigation();
		return cachedNavigation;
	} catch (error) {
		cachedNavigation = undefined;
		throw error;
	}
}

function buildNavigation(): NavigationModel {
	const pageBySlug = new Map<string, PageModule>();
	const pagePathBySlug = new Map<string, string>();

	for (const [filePath, page] of Object.entries(pages)) {
		const slug = slugFromFilePath(filePath);
		const existingPath = pagePathBySlug.get(slug);
		if (existingPath) {
			throw new Error(
				`Duplicate content page slug "${slug}" found in ${existingPath} and ${filePath}.`,
			);
		}

		pageBySlug.set(slug, page);
		pagePathBySlug.set(slug, filePath);
	}

	const seenSectionLabels = new Set<string>();
	const seenNavigationSlugs = new Map<string, string>();
	const sections: NavSection[] = [];
	const bySlug = new Map<string, NavItem>();

	for (const section of navigationConfig) {
		if (seenSectionLabels.has(section.label)) {
			throw new Error(
				`Duplicate navigation section label "${section.label}".`,
			);
		}
		seenSectionLabels.add(section.label);

		if (section.items.length === 0) {
			throw new Error(
				`Navigation section "${section.label}" must list at least one page.`,
			);
		}

		const items = section.items.map((configSlug) => {
			const slug = normalizeSlug(configSlug);
			const previousSection = seenNavigationSlugs.get(slug);
			if (previousSection) {
				throw new Error(
					`Duplicate navigation slug "${slug}" listed in "${previousSection}" and "${section.label}".`,
				);
			}
			seenNavigationSlugs.set(slug, section.label);

			const page = pageBySlug.get(slug);
			if (!page) {
				throw new Error(
					`Navigation config references missing page "${configSlug}" in section "${section.label}".`,
				);
			}

			const frontmatter = page.frontmatter || {};
			if (!isVisiblePage(frontmatter)) {
				throw new Error(
					`Navigation config references hidden page "${configSlug}" in section "${section.label}". Remove it from src/config/navigation.ts or remove nav: false from the page frontmatter.`,
				);
			}

			const subarticleOrders = new Map<number, string>();
			const subarticles = [...pageBySlug.entries()]
				.filter(([childSlug, childPage]) => {
					const relativeSlug = childSlug.slice(slug.length + 1);
					return (
						childSlug.startsWith(`${slug}/`) &&
						!relativeSlug.includes("/") &&
						isVisiblePage(childPage.frontmatter)
					);
				})
				.map(([childSlug, childPage]) => {
					const childFrontmatter = childPage.frontmatter || {};
					const order = childFrontmatter.subarticleOrder;
					if (
						typeof order !== "number" ||
						!Number.isInteger(order) ||
						order <= 0
					) {
						throw new Error(
							`Subarticle "${childSlug}" under "${slug}" must set subarticleOrder to a positive integer.`,
						);
					}

					const existingSlug = subarticleOrders.get(order);
					if (existingSlug) {
						throw new Error(
							`Duplicate subarticleOrder ${order} under "${slug}" for "${existingSlug}" and "${childSlug}".`,
						);
					}
					subarticleOrders.set(order, childSlug);

					const previousSection = seenNavigationSlugs.get(childSlug);
					if (previousSection) {
						throw new Error(
							`Duplicate navigation slug "${childSlug}" listed in "${previousSection}" and as a subarticle of "${slug}".`,
						);
					}
					seenNavigationSlugs.set(childSlug, section.label);

					const child: NavItem = {
						slug: childSlug,
						title: childFrontmatter.title || childSlug,
						description: childFrontmatter.description,
						hidePrevNext: childFrontmatter.hidePrevNext,
						sectionLabel: section.label,
					};
					bySlug.set(childSlug, child);
					return { item: child, order };
				})
				.sort((a, b) => a.order - b.order)
				.map(({ item }) => item);

			const item: NavParentItem = {
				slug,
				title: frontmatter.title || slug,
				description: frontmatter.description,
				hidePrevNext: frontmatter.hidePrevNext,
				sectionLabel: section.label,
				subarticles,
			};
			bySlug.set(slug, item);
			return item;
		});

		sections.push({ label: section.label, items });
	}

	const unlistedPages = [...pageBySlug.entries()]
		.filter(
			([slug, page]) =>
				!seenNavigationSlugs.has(slug) &&
				isVisiblePage(page.frontmatter),
		)
		.map(([slug]) => slug)
		.sort();

	if (unlistedPages.length > 0) {
		throw new Error(
			[
				`Visible pages missing from navigationConfig: ${
					unlistedPages.join(", ")
				}.`,
				"Add them to src/config/navigation.ts or mark them as hidden from navigation in frontmatter.",
				"Use nav: false to hide a page from navigation.",
			].join(" "),
		);
	}

	return { sections, bySlug };
}

function slugFromFilePath(filePath: string): string {
	return normalizeSlug(
		filePath.replace("../pages/", "").replace(/\.(md|mdx)$/, ""),
	);
}

function isVisiblePage(frontmatter: PageFrontmatter = {}): boolean {
	return frontmatter.nav !== false;
}
