export interface NavItem {
	title: string;
	href: string;
	order?: number;
	icon?: string;
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
		const order = frontmatter.order ?? 999;
		const icon = frontmatter.icon;

		navItems.push({ title, href, order, icon });
	}

	// Sort by order, then by title
	navItems.sort((a, b) => {
		if (a.order !== b.order) return (a.order || 999) - (b.order || 999);
		return a.title.localeCompare(b.title);
	});

	return navItems;
}
