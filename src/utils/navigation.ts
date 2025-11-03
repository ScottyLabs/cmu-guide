export interface NavItem {
	category: string;
	categoryOrder: number;
	order: number;
	title: string;
	href: string;
}

export async function getNavigation(): Promise<NavItem[]> {
	// Get all markdown files from pages directory
	const pages = await import.meta.glob('../pages/*.md', { eager: true });
	const navItems: NavItem[] = [];

	for (const [path, page] of Object.entries(pages)) {
		// Convert file path to URL path
		let href = path
			.replace('../pages', '')
			.replace(/\.md$/, '')
			.replace(/\/index$/, '');

		// Handle index.md -> /
		if (href === '') href = '/';

		// Get frontmatter
		const frontmatter = (page as any).frontmatter || {};
		const title = frontmatter.title || path.split('/').pop()?.replace('.md', '') || 'Untitled';

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
