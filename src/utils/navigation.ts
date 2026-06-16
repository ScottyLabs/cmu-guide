import { navigationConfig } from "@/config/navigation";

type PageFrontmatter = {
	title?: string;
	description?: string;
	hidePrevNext?: boolean;
	hideInNav?: boolean;
	nav?: boolean;
	sidebar?: {
		hidden?: boolean;
		label?: string;
	};
	sidebarLabel?: string;
	navTitle?: string;
};

type PageModule = {
	frontmatter?: PageFrontmatter;
};

export type NavItem = {
	slug: string;
	title: string;
	description?: string;
	href: string;
	sectionLabel: string;
	entry: PageModule;
};

export type NavSection = {
	label: string;
	items: NavItem[];
};

export type NavigationModel = {
	sections: NavSection[];
	flatItems: NavItem[];
	flatIndexBySlug: Map<string, number>;
	bySlug: Map<string, NavItem>;
};

const pages = import.meta.glob<PageModule>("../pages/*.{md,mdx}", {
	eager: true,
});

let cachedNavigation: Promise<NavigationModel> | undefined;

export function normalizeSlug(slug: string): string {
	const trimmed = slug.replace(/^\/+/, "").replace(/\/+$/, "");
	if (trimmed === "" || trimmed === "index") {
		return "index";
	}
	return trimmed.replace(/\/index$/, "") || "index";
}

export function hrefForSlug(slug: string): string {
	const normalized = normalizeSlug(slug);
	return normalized === "index" ? "/" : `/${normalized}`;
}

export function slugFromPathname(pathname: string): string {
	return normalizeSlug(pathname.split(/[?#]/, 1)[0] ?? pathname);
}

export function getNavigation(): Promise<NavigationModel> {
	cachedNavigation ??= buildNavigation().catch((error) => {
		cachedNavigation = undefined;
		throw error;
	});
	return cachedNavigation;
}

export async function getPrevNext(slugOrPath: string): Promise<{
	previous: NavItem | null;
	next: NavItem | null;
}> {
	const navigation = await getNavigation();
	const slug = slugFromPathname(slugOrPath);
	const currentIndex = navigation.flatIndexBySlug.get(slug);

	if (currentIndex === undefined) {
		return {
			previous: null,
			next: null,
		};
	}

	return {
		previous: navigation.flatItems[currentIndex - 1] ?? null,
		next: navigation.flatItems[currentIndex + 1] ?? null,
	};
}

async function buildNavigation(): Promise<NavigationModel> {
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
	const seenConfigSlugs = new Map<string, string>();
	const listedSlugs = new Set<string>();
	const sections: NavSection[] = [];
	const flatItems: NavItem[] = [];
	const bySlug = new Map<string, NavItem>();

	for (const section of navigationConfig) {
		if (seenSectionLabels.has(section.label)) {
			throw new Error(`Duplicate navigation section label "${section.label}".`);
		}
		seenSectionLabels.add(section.label);

		if (section.items.length === 0) {
			throw new Error(`Navigation section "${section.label}" must list at least one page.`);
		}

		const items = section.items.map((configSlug) => {
			const slug = normalizeSlug(configSlug);
			const previousSection = seenConfigSlugs.get(slug);
			if (previousSection) {
				throw new Error(
					`Duplicate navigation slug "${slug}" listed in "${previousSection}" and "${section.label}".`,
				);
			}
			seenConfigSlugs.set(slug, section.label);
			listedSlugs.add(slug);

			const page = pageBySlug.get(slug);
			if (!page) {
				throw new Error(
					`Navigation config references missing page "${configSlug}" in section "${section.label}".`,
				);
			}

			const frontmatter = page.frontmatter || {};
			if (!isVisiblePage(frontmatter)) {
				throw new Error(
					`Navigation config references hidden page "${configSlug}" in section "${section.label}". Remove it from src/config/navigation.ts or remove nav: false/hideInNav/sidebar.hidden from the page frontmatter.`,
				);
			}

			const item: NavItem = {
				slug,
				href: hrefForSlug(slug),
				title: titleForPage(slug, frontmatter),
				description: frontmatter.description,
				sectionLabel: section.label,
				entry: page,
			};
			bySlug.set(slug, item);
			if (!frontmatter.hidePrevNext) {
				flatItems.push(item);
			}
			return item;
		});

		sections.push({ label: section.label, items });
	}

	const unlistedPages = [...pageBySlug.entries()]
		.filter(([slug, page]) => !listedSlugs.has(slug) && isVisiblePage(page.frontmatter))
		.map(([slug]) => slug)
		.sort();

	if (unlistedPages.length > 0) {
		throw new Error(
			`Visible pages missing from navigationConfig: ${unlistedPages.join(
				", ",
			)}. Add them to src/config/navigation.ts or set nav: false in frontmatter.`,
		);
	}

	const flatIndexBySlug = new Map(
		flatItems.map((item, index) => [item.slug, index]),
	);

	return { sections, flatItems, flatIndexBySlug, bySlug };
}

function slugFromFilePath(filePath: string): string {
	return normalizeSlug(
		filePath.replace("../pages/", "").replace(/\.(md|mdx)$/, ""),
	);
}

function titleForPage(slug: string, frontmatter: PageFrontmatter): string {
	return (
		frontmatter.sidebar?.label ||
		frontmatter.sidebarLabel ||
		frontmatter.navTitle ||
		frontmatter.title ||
		slug
	);
}

function isVisiblePage(frontmatter: PageFrontmatter = {}): boolean {
	if (frontmatter.nav === false) return false;
	if (frontmatter.hideInNav) return false;
	if (frontmatter.sidebar?.hidden) return false;
	return true;
}
