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
	const normalizedDescription = description?.trim();
	if (normalizedDescription) {
		return normalizedDescription;
	}

	const names = contributors
		.map((contributor) => contributor.name?.trim())
		.filter((name): name is string => Boolean(name));

	return names.length > 0 ? `By ${names.join(", ")}` : undefined;
}
