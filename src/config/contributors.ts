export type ContributorProfile = {
	name: string;
	pronouns?: string;
	email?: string;
};

type ContributorMetadata = Omit<ContributorProfile, "name">;

export const contributorProfiles = {
	"Amy Wang": {},
	"Andrew Zhou": {},
	"Anissa Li": {},
	"Brandon Wu": {},
	"Jesse Li": {},
	"John Cao": {},
	"Justin Peng": {},
	"Kavya Ramesh": {},
	"Max Wen": {},
	"Meabyn Bie": {},
	Myrin: {},
	"Nicholas Marshall": {},
	"Ryan Hoffman": {},
	"Taylor Roberts": {},
	"Vidhaat Prashanth": {},
	"Yinuo Huang": {},
	"Yiyoung Liu": {},
} satisfies Record<string, ContributorMetadata>;

export type ContributorName = keyof typeof contributorProfiles;

export function resolveContributors(
	names: readonly ContributorName[],
): ContributorProfile[] {
	return names.map((name) => ({ name, ...contributorProfiles[name] }));
}
