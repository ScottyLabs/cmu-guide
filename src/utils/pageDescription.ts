export type Contributor = {
	name?: string;
	email?: string;
};

type PageDescriptionInput = {
	description?: string;
	contributors?: Contributor[];
};

export function getPageDescription({
	description,
	contributors = [],
}: PageDescriptionInput): string | undefined {
	if (description?.trim()) {
		return description;
	}

	const names = contributors
		.map((contributor) => contributor.name?.trim())
		.filter(Boolean);

	return names.length > 0 ? `By ${names.join(", ")}` : undefined;
}
