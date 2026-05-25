/*
Data was last grabbed May 11th, 2026
*/

export interface Dorm {
	name: string;
	color?: string; // Banner color
	pros: string[];
	cons: string[];
	info: string[];
	amenities: string[];
}

export const dorms: Dorm[] = [
	{
		name: "Boss and McGill",
		color: "#BE5103",
		pros: [
			"Bathroom shared with a suite",
			"Quiet and clean",
			"AC"
		],
		cons: [
			"No elevators",
			"Average rooms (12 x 14)",
			"Only 3 washers and 3 dryers",
			"Not very soundproof",
			"Mice spotted"
		],
		info: [
			"Semi-suite:",
			"$14,994 Single (19 beds)",
			"$12,916 Double (120 beds)",
			"3 floors",
			"Capacity: 139",
			"Co-ed Floors"
		],
		amenities: [
			"1 lounge per floor",
			"Kitchen",
			"TV areas",
			"Communal Lounge on ground floor",
			"Vending Machines",
			"Study Lounge",
			"Electric Piano"
		]
	},
	{
		name: "Donner",
		color: "#A4C2F4",
		pros: [
			"Near Resnik",
			"Near Margaret",
			"Morrison/CFA",
			"Pretty social",
			"Large rooms (13.5 x 15.5)"
		],
		cons: [
			"No elevators",
			"One lounge on 1st floor w/ TV",
			"Communal bathroom",
			"Looks like a swimming pool",
			"AC by necessity/triple or if you're lucky you'll get a room w/ AC",
			"Mice spotted on many floors",
			"Garbage trucks are loud in the morning",
			"Occasional fire alarms"
		],
		info: [
			"$13,668 Single (2 beds)",
			"$11,700 Double (224 beds)",
			"$10,482 Triple (6 beds)",
			"$9,442 Double-as-Triple (40 beds)",
			"4 floors, ground level is owned by athletics",
			"1st + 2nd Floors gendered by wing, 3rd floors mixed",
			"Capacity: 232",
			"A lot of athletes"
		],
		amenities: [
			"2 good acoustic electric piano rooms",
			"Public Kitchen and dining area",
			"Pool & ping pong",
			"Public study space with printers and walk-in tutoring",
			"Vending Machines (but the drink machine cannot use CMU ID)"
		]
	},
	{
		name: "Morewood E-Tower",
		color: "#10b981", // you can pick any banner color you like
		pros: [
			"3 minutes to campus",
			"Social (especially the breezeway)",
			"Right on top of UG",
			"Home to UHS CAPS and CAPS",
			"Large rooms (12.5 x 15.5)",
			"Laundry on all floors"
		],
		cons: [
			"Communal bathroom per floor (single sex)",
			"Only a small kitchen",
			"AC only by necessity"
		],
		info: [
			"Traditional:",
			"$13,668 Single (2 beds)",
			"$11,700 Double (98 beds)",
			"Each floor is single gender",
			"Capacity: 203",
			"Elevator for 3rd to 7th floors"
		],
		amenities: [
			"Gym",
			"2 soundproof rooms w/ electric pianos",
			"Computer cluster",
			"Printers",
			"Makerspace",
			"Vending machines",
			"1 large lounge per floor with TV"
		]
	},
	{
		name: "Hamerschlag",
		color: "#CC0100",
		pros: [
			"Average rooms (11 x 15.5 + closets)",
			"Newly renovated bathrooms",
			"Close to Resnik food",
			"Large lounge with massive TV",
			"Social",
			"Will likely have AC"
		],
		cons: [
			"No elevators",
			"Only 1 lounge",
			"Windows are smol",
			"Can be really humid sometimes",
			"Lounge volume can be loud",
			"Communal bathrooms"
		],
		info: [
			"Traditional:",
			"$13,668 Single (196 beds)",
			"$11,700 Double (4 beds)",
			"3 floors",
			"Capacity: 160"
		],
		amenities: [
			"1st floor schlounge",
			"Study room on each floor in each tower",
			"Kitchen",
			"Laundry room (5 washers, 6 dryers)"
		]
	},
	{
		name: "Henderson",
		color: "#EA9999",
		pros: [
			"Green building",
			"Large rooms (15 x 13)",
			"CHONKR bathrooms (so I've heard at least)",
			"ELEVATORS"
		],
		cons: [
			"Leaky study room",
			"Lots and lots of stairs"
		],
		info: [
			"Semi-suite:",
			"$14,994 Single (4 beds)",
			"$12,916 Double (54 beds)",
			"Capacity: 58"
		],
		amenities: [
			"Vending Machines",
			"Pool table",
			"Wellness Room",
			"Kitchen"
		]
	},
	{
		name: "Morewood Gardens",
		color: "#D4A619",
		pros: [
			"3 minutes to campus",
			"Social",
			"Right on top of UG",
			"AC",
			"Private bathrooms",
			"Next to UHS, CAPS",
			"Large triples (25 x 12.5)"
		],
		cons: [
			"Small shared kitchens, every other floor",
			"Small-ish doubles (18.5 x 13, but it includes bathroom)",
			"5 people may share a bathroom",
			"Fire alarms ;;-;;"
		],
		info: [
			"Semi-suite:",
			"$14,994 Single (30 beds)",
			"$12,916 Double (300 beds)",
			"$11,700 Triple (93 beds)",
			"Co-ed floors",
			"Gender inclusive option",
			"Around 80% Upperclassmen",
			"FY capacity: 130 - 140"
		],
		amenities: [
			"Gym",
			"Practice Rooms (with pianos)",
			"Computer cluster",
			"Printers",
			"Makerspace",
			"Vending machines",
			"2 huge lounges per floor, with TV"
		]
	},
	{
		name: "Mudge",
		color: "#9900FF",
		pros: [
			"Large rooms (15 x 15.5)",
			"Private bathrooms",
			"Koi pond (overrated)",
			"Common spaces are large and nice",
			"Approachable House Fellow",
			"Sometimes heating"
		],
		cons: [
			"No elevators",
			"No AC",
			"Almost no natural light if you live on the basement floor",
			"If you roll an unlucky room, you could get cockroaches + rats",
			"Some areas smell"
		],
		info: [
			"Traditional:",
			"$13,668 Single (5 beds)",
			"$11,700 Double (10 beds)",
			"$10,482 Triple (15 beds)",
			"Semi-suite:",
			"$14,994 Single (28 beds)",
			"$12,420 Double (202 beds)",
			"$11,700 Quad (32 beds)",
			"Capacity: 295"
		],
		amenities: [
			"TV room",
			"Large lounge with public grand piano",
			"Large study lounge",
			"Pool table room",
			"Kitchens (3)",
			"Big courtyard with Hammocks and benches"
		]
	},
	{
		name: "Scobell",
		color: "#EA9999",
		pros: [
			"Newly renovated",
			"Close to Resnik and Exchange (food)",
			"Social",
			"AC"
		],
		cons: [
			"Small rooms (13.5 x 12.5)",
			"No elevators",
			"Communal bathrooms"
		],
		info: [
			"Traditional:",
			"$13,668 Single (4 beds)",
			"$11,700 Double (78 beds)",
			"Female only except 2",
			"Capacity: 86"
		],
		amenities: [
			"Big 0th Floor Lounge",
			"Lounges every floor"
		]
	},
	{
		name: "Residence on Fifth",
		color: "#FF00FF",
		pros: [
			"Has kitchenette, big fridge, living room, AC and bathroom",
			"Big fridge, no microwave",
			"Big (22 x 24 overall)",
			"3x size avg dorm",
			"Yellow plan available",
			"Close to many utility/dining (Craigs St: Starbucks, Chipotle, bus stops, UPitt)"
		],
		cons: [
			"About 15 minutes to campus",
			"Staff-cleaned less often",
			"Not as social",
			"No ethernet",
			"THIN WALLS",
			"Decoration style is old"
		],
		info: [
			"$13,986 Apt Triple (93 beds)",
			"Studio Apartment:",
			"$13,622 Double (14 beds)",
			"$13,622 Triple (6 beds)",
			"Co-ed floors",
			"Apartment-style Housing & dining services on 2nd floor",
			"Capacity: 125"
		],
		amenities: [
			"Movie room",
			"Gym",
			"Computer cluster",
			"Printers",
			"Den",
			"TV room",
			"Vending machines",
			"CMU Pantry",
			"Kitchen"
		]
	},
	{
		name: "Stever",
		color: "#B7D7A8",
		pros: [
			"Awesome lounges, great social life",
			"5 min. to campus",
			"Newest freshman dorm",
			"Green building",
			"AC",
			"Buggies are built in the basement",
			"One (?) Electric Piano"
		],
		cons: [
			"Small, narrow rooms (beds close together) (10.5 x 16)",
			"Communal bathroom per wing",
			"Only one kitchen",
			"Thin walls—you can hear others' convos"
		],
		info: [
			"Traditional:",
			"$11,698 Double (244 beds)",
			"Each wing of a floor is one gender",
			"Capacity: 244",
			"Elevator",
			"Always win Carnegie Cup presumably because everyone is active and social"
		],
		amenities: [
			"Reading room",
			"Study rooms",
			"Recreation areas with ping-pong, pool table, and TV",
			"Kitchen",
			"Dining room",
			"Vending machines"
		]
	},
	{
		name: "Welch",
		color: "#EA9999",
		pros: [
			"AC",
			"Gender-inclusive",
			"Quiet (if you prefer that)"
		],
		cons: [
			"Generally small rooms (although very variable, consult floor plans) (12.5 x 12.5)",
			"No elevators"
		],
		info: [
			"Semi-suite:",
			"$14,994 Single (34 beds)",
			"$12,916 Double (19 beds)",
			"Capacity: 53",
			"Generally two floors of queer community and one that's not"
		],
		amenities: [
			"Kitchen",
			"Study space / lounge",
			"Vending machines"
		]
	},
	{
		name: "Maggie Mo",
		color: "#BE5103",
		pros: [
			"Pretty Spacious",
			"Kitchen Access",
			"Semi-Suite",
			"Laundry in every building",
			"Close to Resnik",
			"Common room ground floor"
		],
		cons: [
			"AC causes dust buildup",
			"Not as social",
			"Lounge/printer access? (also in separate building)"
		],
		info: [
			"Semi-suite:",
			"$12,916 Double (82 beds)",
			"$9,442 Double-as-Triple (48 beds)",
			"Nearest printer is Donner (same for whole Hill)",
			"6 houses with one as the Humanities Scholars House",
			"Capacity: 130"
		],
		amenities: [
			"Vending machines",
			"Laundry room (separate building)",
			"Intersection lounge street side"
		]
	},
	{
		name: "Clyde House",
		color: "#FF00FF",
		pros: [
			"Each studio has its own kitchenette, fridge, and bathroom",
			"Large rooms",
			"AC",
			"Yellow plan available",
			"Quiet / Thick-ish walls"
		],
		cons: [
			"About 12 minutes to campus",
			"Crossing Fifth is irritating",
			"Clean your own bathrooms",
			"Hypothetically not as social (apartment style)"
		],
		info: [
			"Studio Apartment:",
			"$13,622 Double (14 beds)",
			"$13,622 Triple (9 beds)",
			"Co-ed floors",
			"Apartment-style",
			"Capacity: 23"
		],
		amenities: [
			"TV room / Parlor",
			"Fitness area",
			"Study Lounge (2nd Floor)",
			"A pretty nice communal kitchen",
			"Other common areas"
		]
	},
];
