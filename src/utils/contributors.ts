export type Contributor = {
	name?: string;
	email?: string;
};

export function formatContributor(value: unknown): string | null {
	if (typeof value === "string") {
		return value.trim() || null;
	}

	if (!value || typeof value !== "object") {
		return null;
	}

	const contributor = value as Contributor;
	const name =
		typeof contributor.name === "string" ? contributor.name.trim() : "";
	const email =
		typeof contributor.email === "string" ? contributor.email.trim() : "";

	if (!name) {
		return null;
	}

	return email ? `${name} <${email}>` : name;
}

export function formatContributors(values: unknown): string[] {
	if (!Array.isArray(values)) {
		return [];
	}

	return [
		...new Set(
			values
				.map(formatContributor)
				.filter((contributor): contributor is string => contributor !== null),
		),
	];
}
