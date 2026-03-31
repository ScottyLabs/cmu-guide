export interface NavItem {
	category: string;
	categoryOrder: number;
	order: number;
	title: string;
	href: string;
}

export async function getNavigation(): Promise<NavItem[]> {
	const mdPages = import.meta.glob('../pages/*.md', { eager: true });
	const mdxPages = import.meta.glob('../pages/*.mdx', { eager: true });
	const pages = { ...mdPages, ...mdxPages };
	const navItems: NavItem[] = [];

	for (const [filePath, page] of Object.entries(pages)) {
		let href = filePath
			.replace('../pages', '')
			.replace(/\.(md|mdx)$/, '')
			.replace(/\/index$/, '');

		if (href === '') href = '/';

		const frontmatter = (page as any).frontmatter || {};
		const title =
			frontmatter.sidebar?.label ||
			frontmatter.sidebarLabel ||
			frontmatter.navTitle ||
			frontmatter.title ||
			filePath
				.split('/')
				.pop()
				?.replace(/\.(md|mdx)$/, '') ||
			'Untitled';

		const category = frontmatter.category;
		const categoryOrder = frontmatter.categoryOrder;
		const order = frontmatter.order;

		navItems.push({ title, href, order, category, categoryOrder });
	}

	// Sort by categoryOrder, then by order, then by title
	navItems.sort((a, b) => {
		if (a.categoryOrder !== b.categoryOrder) return a.categoryOrder - b.categoryOrder;
		if (a.order !== b.order) return a.order - b.order;
		return a.title.localeCompare(b.title);
	});

	return navItems;
}
