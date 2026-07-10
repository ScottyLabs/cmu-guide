export type NavigationConfigSection = {
	label: string;
	items: readonly string[];
};

export const navigationConfig: readonly NavigationConfigSection[] = [
	{
		label: "Home",
		items: ["index"],
	},
	{
		label: "Student Life",
		items: [
			"accommodations",
			"dorms-overview",
			"dorms",
			"meal-plans",
			"MinimalPackingList",
		],
	},
	{
		label: "Academic",
		items: ["advanced-fyw", "mms", "information-systems-courses", "TransferMajors", "TransferToCS"],
	},
	{
		label: "Leaves of Absence",
		items: [
			"loaintro",
			"loabefore",
			"loahearing",
			"loahome",
			"loaplanning",
			"loareturn",
			"loaresources",
		],
	},
	{
		label: "Miscellaneous",
		items: ["MoochingOffCMU"],
	},
];
