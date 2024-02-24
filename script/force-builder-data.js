function getWeaponName(weaponId) {
    const weapon = knownWeapons.find((x) => x.id == weaponId);
    return weapon ? weapon.name : weaponId;
}

function getAmmoName(weaponId, ammoId) {
    const weapon = knownWeapons.find((x) => x.id == weaponId);
    const ammo = weapon ? weapon.ammoTypes.find((x) => x.id == ammoId) : undefined;
    return ammo ? ammo.name : ammoId;
}

function getAmmoAdditionalBV(weaponId, ammoId) {
    const weapon = knownWeapons.find((x) => x.id == weaponId);
    const ammo = weapon ? weapon.ammoTypes.find((x) => x.id == ammoId) : undefined;
    return (ammo && ammo.extraBV) ? ammo.extraBV : 0;
}

function getTAGAdditionalBV(weaponId, ammoId) {
    const weapon = knownWeapons.find((x) => x.id == weaponId);
    const ammo = weapon ? weapon.ammoTypes.find((x) => x.id == ammoId) : undefined;
    return (ammo && ammo.tagBV) ? ammo.tagBV : 0;
}

function getAmmoTypes(weaponId) {
    const weapon = knownWeapons.find((x) => x.id == weaponId);
    return weapon ? weapon.ammoTypes : [{id: "standard", name: "Standard"}];
}

function getKnownUnits() {
    return knownUnits;
}

function getKnownUnit(unitId)
{
    return knownUnits.find((x) => x.id == unitId);
}

const knownWeapons = [
    {
        id: "is:machinegun", 
        name: "Machine Gun", 
        ammoTypes: [
            {id: "standard", name: "Standard (200)"}
        ]
    },
    {
        id: "is:machinegun:halfton", 
        name: "Machine Gun", 
        ammoTypes: [
            {id: "standard", name: "Standard (100)"}
        ]
    },
    {
        id: "is:ac2", 
        name: "AC/2", 
        ammoTypes: [
            {id: "standard", name: "Standard (45)"},
            {id: "ap", name: "Armor-Piercing (22)"},
            {id: "caseless", name: "Caseless (90)", extraBV: 5},
            {id: "flechette", name: "Flechette (45)"},
            {id: "precision", name: "Precision (22)"}
        ]
    },
    {
        id: "is:ac5", 
        name: "AC/5", 
        ammoTypes: [
            {id: "standard", name: "Standard (20)"},
            {id: "ap", name: "Armor-Piercing (10)"},
            {id: "caseless", name: "Caseless (40)", extraBV: 9},
            {id: "flechette", name: "Flechette (20)"},
            {id: "precision", name: "Precision (10)"}
        ]
    },
    {
        id: "is:ac10", 
        name: "AC/10", 
        ammoTypes: [
            {id: "standard", name: "Standard (10)"},
            {id: "ap", name: "Armor-Piercing (5)"},
            {id: "caseless", name: "Caseless (20)", extraBV: 15},
            {id: "flechette", name: "Flechette (10)"},
            {id: "precision", name: "Precision (5)"}
        ]
    },
    {
        id: "is:ac20", 
        name: "AC/20", 
        ammoTypes: [
            {id: "standard", name: "Standard (5)"},
            {id: "ap", name: "Armor-Piercing (2)"},
            {id: "caseless", name: "Caseless (10)", extraBV: 22},
            {id: "flechette", name: "Flechette (5)"},
            {id: "precision", name: "Precision (2)"}
        ]
    },
    {
        id: "is:lb2xac",
        name: "LB 2-X AC",
        ammoTypes: [
            {id: "standard", name: "Standard (45)"},
            {id: "cluster", name: "Cluster (45)"}
        ]
    },
    {
        id: "is:lb5xac",
        name: "LB 5-X AC",
        ammoTypes: [
            {id: "standard", name: "Standard (20)"},
            {id: "cluster", name: "Cluster (20)"}
        ]
    },
    {
        id: "is:lb10xac",
        name: "LB 10-X AC",
        ammoTypes: [
            {id: "standard", name: "Standard (10)"},
            {id: "cluster", name: "Cluster (10)"}
        ]
    },
    {
        id: "is:lb20xac",
        name: "LB 20-X AC",
        ammoTypes: [
            {id: "standard", name: "Standard (5)"},
            {id: "cluster", name: "Cluster (5)"}
        ]
    },
    {
        id: "is:gaussrifle",
        name: "Gauss Rifle",
        ammoTypes: [
            {id: "standard", name: "Standard (8)"},
        ]
    },
    {
        id: "is:narc", 
        name: "Narc", 
        ammoTypes: [
            {id: "standard", name: "Homing (6)"},
            {id: "explosive", name: "Explosive (6)"}
        ]
    },
    {
        id: "is:inarc", 
        name: "iNarc", 
        ammoTypes: [
            {id: "standard", name: "Homing (4)"},
            {id: "ecm", name: "ECM (4)"},
            {id: "explosive", name: "Explosive (4)"},
            {id: "haywire", name: "Haywire (4)"},
            {id: "nemesis", name: "Nemesis (4)"}
        ]
    },
    {
        id: "is:srm2", 
        name: "SRM 2", 
        ammoTypes: [
            {id: "standard", name: "Standard (50)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (50)", requirement:"artemisiv"},
            {id: "fragmentation", name: "Fragmentation (50)"},
            {id: "inferno", name: "Inferno (50)"},
            {id: "narc", name: "Narc-Equipped (50)"}
        ]
    },
    {
        id: "is:srm4", 
        name: "SRM 4", 
        ammoTypes: [
            {id: "standard", name: "Standard (25)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (25)", requirement:"artemisiv"},
            {id: "fragmentation", name: "Fragmentation (25)"},
            {id: "inferno", name: "Inferno (25)"},
            {id: "narc", name: "Narc-Equipped (25)"}
        ]
    },
    {
        id: "is:srm6", 
        name: "SRM 6", 
        ammoTypes: [
            {id: "standard", name: "Standard (15)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (15)", requirement:"artemisiv"},
            {id: "fragmentation", name: "Fragmentation (15)"},
            {id: "inferno", name: "Inferno (15)"},
            {id: "narc", name: "Narc-Equipped (15)"}
        ]
    },
    {
        id: "is:streaksrm2", 
        name: "Streak SRM 2", 
        ammoTypes: [
            {id: "standard", name: "Standard (50)"}
        ]
    },
    {
        id: "is:streaksrm4", 
        name: "Streak SRM 4", 
        ammoTypes: [
            {id: "standard", name: "Standard (25)"}
        ]
    },
    {
        id: "is:streaksrm6", 
        name: "Streak SRM 6", 
        ammoTypes: [
            {id: "standard", name: "Standard (15)"}
        ]
    },
    {
        id: "is:lrm5", 
        name: "LRM 5", 
        ammoTypes: [
            {id: "standard", name: "Standard (24)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (24)", requirement:"artemisiv"},
            {id: "fragmentation", name: "Fragmentation (24)"},
            {id: "narc", name: "Narc-Equipped (24)"},
            {id: "semiguided", name: "Semi-Guided (24)", tagBV: 6}
        ]
    },
    {
        id: "is:lrm10", 
        name: "LRM 10", 
        ammoTypes: [
            {id: "standard", name: "Standard (12)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (12)", requirement:"artemisiv"},
            {id: "fragmentation", name: "Fragmentation (12)"},
            {id: "narc", name: "Narc-Equipped (12)"},
            {id: "semiguided", name: "Semi-Guided (12)", tagBV: 11}
        ]
    },
    {
        id: "is:lrm15", 
        name: "LRM 15", 
        ammoTypes: [
            {id: "standard", name: "Standard (8)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (8)", requirement:"artemisiv"},
            {id: "fragmentation", name: "Fragmentation (8)"},
            {id: "narc", name: "Narc-Equipped (8)"},
            {id: "semiguided", name: "Semi-Guided (8)", tagBV: 17}
        ]
    },
    {
        id: "is:lrm20", 
        name: "LRM 20", 
        ammoTypes: [
            {id: "standard", name: "Standard (6)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (6)", requirement:"artemisiv"},
            {id: "fragmentation", name: "Fragmentation (6)"},
            {id: "narc", name: "Narc-Equipped (6)"},
            {id: "semiguided", name: "Semi-Guided (6)", tagBV: 23}
        ]
    },
    {
        id: "is:mrm10",
        name: "MRM 10",
        ammoTypes: [
            {id: "standard", name: "Standard (24)"},
        ]
    },
    {
        id: "is:mrm20",
        name: "MRM 20",
        ammoTypes: [
            {id: "standard", name: "Standard (12)"},
        ]
    },
    {
        id: "is:mrm30",
        name: "MRM 30",
        ammoTypes: [
            {id: "standard", name: "Standard (8)"},
        ]
    },
    {
        id: "is:mrm40",
        name: "MRM 40",
        ammoTypes: [
            {id: "standard", name: "Standard (6)"},
        ]
    },
    {
        id: "is:ams",
        name: "AMS",
        ammoTypes: [
            {id: "standard", name: "Standard (12)"},
        ]
    },
    {
        id: "clan:machinegun", 
        name: "Machine Gun", 
        ammoTypes: [
            {id: "standard", name: "Standard (200)"}
        ]
    },
    {
        id: "clan:machinegun:halfton", 
        name: "Machine Gun", 
        ammoTypes: [
            {id: "standard", name: "Standard (100)"}
        ]
    },
    {
        id: "clan:lb2xac",
        name: "LB 2-X AC",
        ammoTypes: [
            {id: "standard", name: "Standard (45)"},
            {id: "cluster", name: "Cluster (45)"}
        ]
    },
    {
        id: "clan:lb5xac",
        name: "LB 5-X AC",
        ammoTypes: [
            {id: "standard", name: "Standard (20)"},
            {id: "cluster", name: "Cluster (20)"}
        ]
    },
    {
        id: "clan:lb10xac",
        name: "LB 10-X AC",
        ammoTypes: [
            {id: "standard", name: "Standard (10)"},
            {id: "cluster", name: "Cluster (10)"}
        ]
    },
    {
        id: "clan:lb20xac",
        name: "LB 20-X AC",
        ammoTypes: [
            {id: "standard", name: "Standard (5)"},
            {id: "cluster", name: "Cluster (5)"}
        ]
    },
    {
        id: "clan:ultraac2",
        name: "Ultra AC/2",
        ammoTypes: [
            {id: "standard", name: "Standard (45)"}
        ]
    },
    {
        id: "clan:ultraac5",
        name: "Ultra AC/5",
        ammoTypes: [
            {id: "standard", name: "Standard (20)"}
        ]
    },
    {
        id: "clan:ultraac10",
        name: "Ultra AC/10",
        ammoTypes: [
            {id: "standard", name: "Standard (10)"}
        ]
    },
    {
        id: "clan:ultraac20",
        name: "Ultra AC/20",
        ammoTypes: [
            {id: "standard", name: "Standard (5)"}
        ]
    },
    {
        id: "clan:gaussrifle",
        name: "Gauss Rifle",
        ammoTypes: [
            {id: "standard", name: "Standard (8)"},
        ]
    },
    {
        id: "clan:narc", 
        name: "Narc", 
        ammoTypes: [
            {id: "standard", name: "Homing (6)"},
        ]
    },
    {
        id: "clan:srm2", 
        name: "SRM 2", 
        ammoTypes: [
            {id: "standard", name: "Standard (50)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (50)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (50)", requirement:"artemisv"},
            {id: "inferno", name: "Inferno (50)"},
            {id: "narc", name: "Narc-Equipped (50)"}
        ]
    },
    {
        id: "clan:srm4", 
        name: "SRM 4", 
        ammoTypes: [
            {id: "standard", name: "Standard (25)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (25)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (25)", requirement:"artemisv"},
            {id: "inferno", name: "Inferno (25)"},
            {id: "narc", name: "Narc-Equipped (25)"}
        ]
    },
    {
        id: "clan:srm6", 
        name: "SRM 6", 
        ammoTypes: [
            {id: "standard", name: "Standard (15)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (15)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (15)", requirement:"artemisv"},
            {id: "inferno", name: "Inferno (15)"},
            {id: "narc", name: "Narc-Equipped (15)"}
        ]
    },
    {
        id: "clan:streaksrm2", 
        name: "Streak SRM 2", 
        ammoTypes: [
            {id: "standard", name: "Standard (50)"}
        ]
    },
    {
        id: "clan:streaksrm4", 
        name: "Streak SRM 4", 
        ammoTypes: [
            {id: "standard", name: "Standard (25)"}
        ]
    },
    {
        id: "clan:streaksrm6", 
        name: "Streak SRM 6", 
        ammoTypes: [
            {id: "standard", name: "Standard (15)"}
        ]
    },
    {
        id: "clan:lrm5", 
        name: "LRM 5", 
        ammoTypes: [
            {id: "standard", name: "Standard (24)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (24)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (24)", requirement:"artemisv"},
            {id: "narc", name: "Narc-Equipped (24)"},
        ]
    },
    {
        id: "clan:lrm10", 
        name: "LRM 10", 
        ammoTypes: [
            {id: "standard", name: "Standard (12)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (12)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (12)", requirement:"artemisv"},
            {id: "narc", name: "Narc-Equipped (12)"},
        ]
    },
    {
        id: "clan:lrm15", 
        name: "LRM 15", 
        ammoTypes: [
            {id: "standard", name: "Standard (8)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (8)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (8)", requirement:"artemisv"},
            {id: "narc", name: "Narc-Equipped (8)"},
        ]
    },
    {
        id: "clan:lrm20", 
        name: "LRM 20", 
        ammoTypes: [
            {id: "standard", name: "Standard (6)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (6)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (6)", requirement:"artemisv"},
            {id: "narc", name: "Narc-Equipped (6)"},
        ]
    },
    {
        id: "clan:ams",
        name: "AMS",
        ammoTypes: [
            {id: "standard", name: "Standard (24)"},
        ]
    },
    {
        id: "clan:ba-srm2",
        name: "SRM 2",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "inferno", name: "Inferno (1)"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    }
];

const knownUnits = [
    {
        id: "lct-1e",
        name: "Locust LCT-1E",
        tonnage: 20,
        bv: 553,
        ammo: [],
        specials: []
    },
    {
        id: "lct-1v",
        name: "Locust LCT-1V",
        tonnage: 20,
        bv: 432,
        ammo: [
            {id: 0, type: "is:machinegun", location: "CT"}
        ],
        specials: []
    },
    {
        id: "com-2d",
        name: "Commando COM-2D",
        tonnage: 25,
        bv: 541,
        ammo: [
            {id: 0, type: "is:srm6", location: "LT"},
            {id: 1, type: "is:srm4", location: "RT"}
        ],
        specials: []
    },
    {
        id: "com-3a",
        name: "Commando COM-3A",
        tonnage: 25,
        bv: 540,
        ammo: [
            {id: 0, type: "is:srm6", location: "RT"}
        ],
        specials: []
    },
    {
        id: "com-5s",
        name: "Commando COM-5S",
        tonnage: 25,
        bv: 557,
        ammo: [
            {id: 0, type: "is:srm6", location: "RT", default: "artemisiv"},
            {id: 1, type: "is:srm6", location: "RT", default: "artemisiv"},
            {id: 2, type: "is:streaksrm2", location: "RT"}
        ],
        specials: ["artemisiv"]
    },
    {
        id: "mist-lynx-prime",
        name: "Mist Lynx Prime",
        alternateNames: ["Koshi Prime"],
        tonnage: 25,
        bv: 871,
        ammo: [
            {id: 0, type: "clan:lrm10", location: "LA"},
            {id: 1, type: "clan:streaksrm4", location: "RA"},
            {id: 2, type: "clan:machinegun:halfton", location: "RA"},
        ],
        specials: ["omni"]
    },
    {
        id: "mist-lynx-a",
        name: "Mist Lynx A",
        alternateNames: ["Koshi A"],
        tonnage: 25,
        bv: 608,
        ammo: [
            {id: 0, type: "clan:ams", location: "LA"},
            {id: 1, type: "clan:ams", location: "LA"},
            {id: 2, type: "clan:ams", location: "LA"},
            {id: 3, type: "clan:machinegun:halfton", location: "RA"},      
        ],
        specials: ["omni"]
    },
    {
        id: "mist-lynx-b",
        name: "Mist Lynx B",
        alternateNames: ["Koshi B"],
        tonnage: 25,
        bv: 1209,
        ammo: [
            {id: 0, type: "clan:srm6", location: "RA"},
            {id: 1, type: "clan:srm6", location: "RA"},
        ],
        specials: ["omni"]
    },
    {
        id: "sdr-c",
        name: "Spider SDR-C",
        tonnage: 30,
        bv: 616,
        ammo: [],
        specials: ["c3s"]
    },
    {
        id: "adder-prime",
        name: "Adder Prime",
        alternateNames: ["Puma Prime"],
        tonnage: 35,
        bv: 2083,
        ammo: [],
        specials: ["omni"]
    },
    {
        id: "adder-a",
        name: "Adder A",
        alternateNames: ["Puma A"],
        tonnage: 35,
        bv: 1437,
        ammo: [
            {id: 0, type: "clan:lrm20", location: "LA"},
            {id: 1, type: "clan:lrm20", location: "LA"},
            {id: 2, type: "clan:lrm20", location: "RA"},
            {id: 3, type: "clan:lrm20", location: "RA"},
        ],
        specials: ["omni"]
    },
    {
        id: "adder-b",
        name: "Adder B",
        alternateNames: ["Puma B"],
        tonnage: 35,
        bv: 1422,
        ammo: [
            {id: 0, type: "clan:lb5xac", location: "LA"},
        ],
        specials: ["omni"]
    },
    {
        id: "jr7-c",
        name: "Jenner JR7-C",
        tonnage: 35,
        bv: 832,
        ammo: [
            {id: 0, type: "is:srm4", location: "RT"},
        ],
        specials: ["c3s"]
    },
    {
        id: "ott-7k",
        name: "Ostscout OTT-7K",
        tonnage: 35,
        bv: 484,
        ammo: [],
        specials: ["tag"]
    },
    {
        id: "pnt-c",
        name: "Panther PNT-C",
        tonnage: 35,
        bv: 833,
        ammo: [
            {id: 0, type: "is:srm4", location: "LT"},
        ],
        specials: ["c3s"]
    },
    {
        id: "rvn-3l",
        name: "Raven RVN-3L",
        tonnage: 35,
        bv: 708,
        ammo: [
            {id: 0, type: "is:srm6", location: "LT", default: "narc"},
            {id: 1, type: "is:narc", location: "LT"},
            {id: 2, type: "is:narc", location: "LT"}
        ],
        specials: ["tag"]
    },
    {
        id: "viper-prime",
        name: "Viper Prime",
        alternateNames: ["Dragonfly Prime"],
        tonnage: 40,
        bv: 1450,
        ammo: [
            {id: 0, type: "clan:srm4", location: "LA"},
            {id: 1, type: "clan:ams", location: "LT"},
            {id: 2, type: "clan:machinegun:halfton", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "viper-a",
        name: "Viper A",
        alternateNames: ["Dragonfly A"],
        tonnage: 40,
        bv: 1989,
        ammo: [
            {id: 0, type: "clan:srm6", location: "LA", default: "artemisiv"},
        ],
        specials: ["artemisiv", "omni"]
    },
    {
        id: "viper-b",
        name: "Viper B",
        alternateNames: ["Dragonfly B"],
        tonnage: 40,
        bv: 1830,
        ammo: [],
        specials: ["omni"]
    },
    {
        id: "grendel-prime",
        name: "Grendel Prime",
        alternateNames: ["Mongrel Prime"],
        tonnage: 45,
        bv: 2290,
        ammo: [
            {id: 0, type: "clan:streaksrm6", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "grendel-a",
        name: "Grendel A",
        alternateNames: ["Mongrel A"],
        tonnage: 45,
        bv: 2031,
        ammo: [
            {id: 0, type: "clan:lrm15", location: "LT"},
            {id: 1, type: "clan:lrm15", location: "LT"},
            {id: 2, type: "clan:lrm15", location: "RT"},
            {id: 3, type: "clan:lrm15", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "grendel-b",
        name: "Grendel B",
        alternateNames: ["Mongrel B"],
        tonnage: 45,
        bv: 1903,
        ammo: [
            {id: 0, type: "clan:ultraac5", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "ice-ferret-prime",
        name: "Ice Ferret Prime",
        alternateNames: ["Fenris Prime"],
        tonnage: 45,
        bv: 1678,
        ammo: [
            {id: 0, type: "clan:streaksrm2", location: "RA"},
        ],
        specials: ["omni"]
    },
    {
        id: "ice-ferret-a",
        name: "Ice Ferret A",
        alternateNames: ["Fenris A"],
        tonnage: 45,
        bv: 1323,
        ammo: [
            {id: 0, type: "clan:lb2xac", location: "LA"},
            {id: 1, type: "clan:ams", location: "RA"}
        ],
        specials: ["omni"]
    },
    {
        id: "ice-ferret-b",
        name: "Ice Ferret B",
        alternateNames: ["Fenris B"],
        tonnage: 45,
        bv: 1461,
        ammo: [
            {id: 0, type: "clan:srm4", location: "LA"},
            {id: 1, type: "clan:srm6", location: "RA"},
        ],
        specials: ["omni"]
    },
    {
        id: "shadow-cat-prime",
        name: "Shadow Cat Prime",
        tonnage: 45,
        bv: 2156,
        ammo: [
            {id: 0, type: "clan:gaussrifle", location: "RT"},
            {id: 1, type: "clan:gaussrifle", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "shadow-cat-a",
        name: "Shadow Cat A",
        tonnage: 45,
        bv: 2220,
        ammo: [
            {id: 0, type: "clan:streaksrm6", location: "RT"},
            {id: 1, type: "clan:streaksrm6", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "shadow-cat-b",
        name: "Shadow Cat B",
        tonnage: 45,
        bv: 2420,
        ammo: [
            {id: 0, type: "clan:lrm15", location: "LT", default: "artemisiv"},
            {id: 1, type: "clan:lrm15", location: "LT", default: "artemisiv"},
            {id: 2, type: "clan:lrm15", location: "RT", default: "artemisiv"},
            {id: 3, type: "clan:lrm15", location: "RT", default: "artemisiv"},
        ],
        specials: ["artemisiv", "omni"]
    },
    {
        id: "crb-30",
        name: "Crab CRB-30",
        tonnage: 50,
        bv: 1509,
        ammo: [],
        specials: ["c3i"]
    },
    {
        id: "crb-c",
        name: "Crab CRB-C",
        tonnage: 50,
        bv: 1135,
        ammo: [],
        specials: ["c3s"]
    },
    {
        id: "nova-prime",
        name: "Nova Prime",
        alternateNames: ["Black Hawk Prime"],
        tonnage: 50,
        bv: 2663,
        ammo: [],
        specials: ["omni"]
    },
    {
        id: "nova-a",
        name: "Nova A",
        alternateNames: ["Black Hawk A"],
        tonnage: 50,
        bv: 2422,
        ammo: [
            {id: 0, type: "clan:ams", location: "RT"}
        ],
        specials: ["omni"]
    },
    {
        id: "nova-b",
        name: "Nova B",
        alternateNames: ["Black Hawk B"],
        tonnage: 50,
        bv: 1543,
        ammo: [
            {id: 0, type: "clan:ultraac5", location: "RA"},
            {id: 1, type: "clan:machinegun", location: "LT"},
        ],
        specials: ["omni"]
    },
    {
        id: "grf-1n",
        name: "Griffin GRF-1N",
        tonnage: 55,
        bv: 1272,
        ammo: [
            {id: 0, type: "is:lrm10", location: "RT"},
            {id: 1, type: "is:lrm10", location: "RT"}
        ],
        specials: []
    },
    {
        id: "grf-1s",
        name: "Griffin GRF-1S",
        tonnage: 55,
        bv: 1253,
        ammo: [
            {id: 0, type: "is:lrm5", location: "RT"}
        ],
        specials: []
    },
    {
        id: "shd-2h",
        name: "Shadow Hawk SHD-2H",
        tonnage: 55,
        bv: 1064,
        ammo: [
            {id: 0, type: "is:ac5", location: "LT"},
            {id: 1, type: "is:srm2", location: "CT"},
            {id: 2, type: "is:lrm5", location: "RT"}
        ],
        specials: []
    },
    {
        id: "stormcrow-prime",
        name: "Stormcrow Prime",
        alternateNames: ["Ryoken Prime"],
        tonnage: 55,
        bv: 2073,
        ammo: [],
        specials: ["omni"]
    },
    {
        id: "stormcrow-a",
        name: "Stormcrow A",
        alternateNames: ["Ryoken A"],
        tonnage: 55,
        bv: 2319,
        ammo: [
            {id: 0, type: "clan:lrm20", location: "RA"},
            {id: 1, type: "clan:lrm20", location: "RA"},
            {id: 2, type: "clan:streaksrm6", location: "LT"},
            {id: 3, type: "clan:streaksrm6", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "stormcrow-b",
        name: "Stormcrow B",
        alternateNames: ["Ryoken B"],
        tonnage: 55,
        bv: 2281,
        ammo: [
            {id: 0, type: "clan:ultraac20", location: "LT"},
            {id: 1, type: "clan:ultraac20", location: "LT"},
        ],
        specials: ["omni"]
    },
    {
        id: "wvr-6m",
        name: "Wolverine WVR-6M",
        tonnage: 55,
        bv: 1291,
        ammo: [
            {id: 0, type: "is:srm6", location: "RT"}
        ],
        specials: []
    },
    {
        id: "wvr-6r",
        name: "Wolverine WVR-6R",
        tonnage: 55,
        bv: 1101,
        ammo: [
            {id: 0, type: "is:ac5", location: "RA"},
            {id: 1, type: "is:srm6", location: "LT"}
        ],
        specials: []
    },
    {
        id: "drg-c",
        name: "Grand Dragon DRG-C",
        tonnage: 60,
        bv: 1322,
        ammo: [
            {id: 0, type: "is:lrm10", location: "LT"},
            {id: 1, type: "is:lrm10", location: "LT"},
        ],
        specials: ["c3s"]
    },
    {
        id: "lnc25-04",
        name: "Lancelot LNC25-04",
        tonnage: 60,
        bv: 1640,
        ammo: [],
        specials: ["c3i"]
    },
    {
        id: "mad-dog-prime",
        name: "Mad Dog Prime",
        alternateNames: ["Vulture Prime"],
        tonnage: 60,
        bv: 2351,
        ammo: [
            {id: 0, type: "clan:lrm20", location: "LT"},
            {id: 1, type: "clan:lrm20", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "mad-dog-a",
        name: "Mad Dog A",
        alternateNames: ["Vulture A"],
        tonnage: 60,
        bv: 1923,
        ammo: [
            {id: 0, type: "clan:lb5xac", location: "LA"},
            {id: 1, type: "clan:lb5xac", location: "LA", default: "cluster"},
            {id: 2, type: "clan:srm6", location: "LT"},
            {id: 3, type: "clan:srm6", location: "LT"},
            {id: 4, type: "clan:srm6", location: "RT"},
            {id: 5, type: "clan:srm6", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "mad-dog-b",
        name: "Mad Dog B",
        alternateNames: ["Vulture B"],
        tonnage: 60,
        bv: 2284,
        ammo: [
            {id: 0, type: "clan:lrm20", location: "LT", default: "artemisiv"},
            {id: 1, type: "clan:streaksrm6", location: "RT"},
        ],
        specials: ["artemisiv", "omni"]
    },
    {
        id: "cplt-c1",
        name: "Catapult CPLT-C1",
        tonnage: 65,
        bv: 1399,
        ammo: [
            {id: 0, type: "is:lrm15", location: "LT"},
            {id: 1, type: "is:lrm15", location: "RT"}
        ],
        specials: []
    },
    {
        id: "cplt-k2",
        name: "Catapult CPLT-K2",
        tonnage: 65,
        bv: 1319,
        ammo: [
            {id: 0, type: "is:machinegun", location: "CT"}
        ],
        specials: []
    },
    {
        id: "cplt-k5",
        name: "Catapult CPLT-K5",
        tonnage: 65,
        bv: 1457,
        ammo: [
            {id: 0, type: "is:mrm30", location: "LT"},
            {id: 1, type: "is:mrm30", location: "LT"},
            {id: 2, type: "is:mrm30", location: "RT"},
            {id: 3, type: "is:mrm30", location: "RT"},
        ],
        specials: ["c3s"]
    },
    {
        id: "ext-5e",
        name: "Exterminator EXT-5E",
        tonnage: 65,
        bv: 1532,
        ammo: [
            {id: 0, type: "is:inarc", location: "RT"},
            {id: 1, type: "is:inarc", location: "RT"},
            {id: 2, type: "is:inarc", location: "RT"},
            {id: 3, type: "is:inarc", location: "RT"},
        ],
        specials: ["c3i"]
    },
    {
        id: "hellbringer-prime",
        name: "Hellbringer Prime",
        alternateNames: ["Loki Prime"],
        tonnage: 65,
        bv: 2654,
        ammo: [
            {id: 0, type: "clan:ams", location: "CT"},
            {id: 1, type: "clan:streaksrm6", location: "RT"},
            {id: 2, type: "clan:machinegun:halfton", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "hellbringer-a",
        name: "Hellbringer A",
        alternateNames: ["Loki A"],
        tonnage: 65,
        bv: 1948,
        ammo: [
            {id: 0, type: "clan:ultraac5", location: "RA"},
            {id: 1, type: "clan:narc", location: "LT"},
            {id: 2, type: "clan:machinegun", location: "CT"},
            {id: 3, type: "clan:lrm20", location: "RT", default: "narc"},
        ],
        specials: ["omni"]
    },
    {
        id: "hellbringer-b",
        name: "Hellbringer B",
        alternateNames: ["Loki B"],
        tonnage: 65,
        bv: 1592,
        ammo: [
            {id: 0, type: "clan:lb5xac", location: "LA"},
            {id: 1, type: "clan:gaussrifle", location: "RA"},
            {id: 2, type: "clan:srm6", location: "RT", default: "artemisiv"},
            {id: 3, type: "clan:srm6", location: "RT", default: "artemisiv"},
        ],
        specials: ["artemisiv", "omni"]
    },
    {
        id: "tdr-5s",
        name: "Thunderbolt TDR-5S",
        tonnage: 65,
        bv: 1335,
        ammo: [
            {id: 0, type: "is:lrm15", location: "CT"},
            {id: 1, type: "is:lrm15", location: "CT"},
            {id: 2, type: "is:srm2", location: "RT"},
            {id: 3, type: "is:machinegun", location: "LA"}
        ],
        specials: []
    },
    {
        id: "tdr-5se",
        name: "Thunderbolt TDR-5SE",
        tonnage: 65,
        bv: 1414,
        ammo: [
            {id: 0, type: "is:lrm10", location: "CT"},
            {id: 1, type: "is:lrm10", location: "CT"}
        ],
        specials: []
    },
    {
        id: "arc-4m",
        name: "Archer ARC-4M",
        tonnage: 70,
        bv: 1705,
        ammo: [
            {id: 0, type: "is:lrm20", location: "LT", default: "artemisiv"},
            {id: 1, type: "is:lrm20", location: "LT", default: "artemisiv"},
            {id: 2, type: "is:lrm20", location: "RT", default: "artemisiv"},
            {id: 3, type: "is:lrm20", location: "RT", default: "artemisiv"},
        ],
        specials: ["artemisiv"]
    },
    {
        id: "arc-7c",
        name: "Archer ARC-7C",
        tonnage: 70,
        bv: 2408,
        ammo: [
            {id: 0, type: "clan:lrm20", location: "LT", default: "artemisv"},
            {id: 1, type: "clan:lrm20", location: "LT", default: "artemisv"},
            {id: 2, type: "clan:lrm20", location: "RT", default: "artemisv"},
            {id: 3, type: "clan:lrm20", location: "RT", default: "artemisv"},
        ],
        specials: ["artemisv"]
    },
    {
        id: "summoner-prime",
        name: "Summoner Prime",
        alternateNames: ["Thor Prime"],
        tonnage: 70,
        bv: 2298,
        ammo: [
            {id: 0, type: "clan:lb10xac", location: "LA"},
            {id: 1, type: "clan:lrm15", location: "LT"},
            {id: 2, type: "clan:lrm15", location: "LT"},
        ],
        specials: ["omni"]
    },
    {
        id: "summoner-a",
        name: "Summoner A",
        alternateNames: ["Thor A"],
        tonnage: 70,
        bv: 2145,
        ammo: [
            {id: 0, type: "clan:gaussrifle", location: "LA"},
            {id: 1, type: "clan:srm6", location: "LT"},
            {id: 2, type: "clan:srm6", location: "LT"},
        ],
        specials: ["omni"]
    },
    {
        id: "summoner-b",
        name: "Summoner B",
        alternateNames: ["Thor B"],
        tonnage: 70,
        bv: 2159,
        ammo: [
            {id: 0, type: "clan:lrm20", location: "LA", default: "narc"},
            {id: 1, type: "clan:lrm20", location: "LA", default: "narc"},
            {id: 2, type: "clan:lrm20", location: "RA", default: "narc"},
            {id: 3, type: "clan:lrm20", location: "RA", default: "narc"},
            {id: 4, type: "clan:srm4", location: "LA", default: "narc"},
            {id: 5, type: "clan:srm4", location: "LA", default: "narc"},
            {id: 6, type: "clan:ams", location: "LT"},
            {id: 7, type: "clan:narc", location: "LT"},
        ],
        specials: ["omni"]
    },
    {
        id: "fls-9c",
        name: "Flashman FLS-9C",
        tonnage: 75,
        bv: 1779,
        ammo: [],
        specials: ["c3i"]
    },
    {
        id: "on1-mc",
        name: "Orion ON1-MC",
        tonnage: 75,
        bv: 1501,
        ammo: [
            {id: 0, type: "is:mrm30", location: "LT"},
            {id: 1, type: "is:mrm30", location: "LT"},
            {id: 2, type: "is:mrm20", location: "LT"},
            {id: 3, type: "is:lb10xac", location: "RT"},
            {id: 4, type: "is:lb10xac", location: "RT", default: "cluster"},
        ],
        specials: ["c3s"]
    },
    {
        id: "timber-wolf-prime",
        name: "Timber Wolf Prime",
        alternateNames: ["Mad Cat Prime"],
        tonnage: 75,
        bv: 2737,
        ammo: [
            {id: 0, type: "clan:lrm20", location: "LT"},
            {id: 1, type: "clan:lrm20", location: "RT"},
            {id: 2, type: "clan:machinegun", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "timber-wolf-a",
        name: "Timber Wolf A",
        alternateNames: ["Mad Cat A"],
        tonnage: 75,
        bv: 2854,
        ammo: [
            {id: 0, type: "clan:streaksrm6", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "timber-wolf-b",
        name: "Timber Wolf B",
        alternateNames: ["Mad Cat B"],
        tonnage: 75,
        bv: 2224,
        ammo: [
            {id: 0, type: "clan:gaussrifle", location: "RA"},
            {id: 1, type: "clan:lrm10", location: "LT", default: "artemisiv"},
            {id: 2, type: "clan:srm4", location: "RT", default: "artemisiv"},
        ],
        specials: ["artemisiv", "omni"]
    },
    {
        id: "timber-wolf-pryde",
        name: "Timber Wolf Pryde",
        alternateNames: ["Mad Cat Pryde"],
        tonnage: 75,
        bv: 2900,
        ammo: [
            {id: 0, type: "clan:lrm20", location: "LT"},
            {id: 1, type: "clan:lrm20", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "aws-8q",
        name: "Awesome AWS-8Q",
        tonnage: 80,
        bv: 1605,
        ammo: [],
        specials: []
    },
    {
        id: "gargoyle-prime",
        name: "Gargoyle Prime",
        alternateNames: ["Man O' War Prime"],
        tonnage: 80,
        bv: 1537,
        ammo: [
            {id: 0, type: "clan:lb5xac", location: "LT"},
            {id: 1, type: "clan:lb5xac", location: "RT", default: "cluster"},
            {id: 2, type: "clan:srm6", location: "LT"},
            {id: 3, type: "clan:srm6", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "gargoyle-a",
        name: "Gargoyle A",
        alternateNames: ["Man O' War A"],
        tonnage: 80,
        bv: 2689,
        ammo: [],
        specials: ["omni"]
    },
    {
        id: "gargoyle-b",
        name: "Gargoyle B",
        alternateNames: ["Man O' War B"],
        tonnage: 80,
        bv: 1843,
        ammo: [
            {id: 0, type: "clan:lrm10", location: "LA", default: "artemisiv"},
            {id: 1, type: "clan:srm4", location: "LA", default: "artemisiv"},
            {id: 2, type: "clan:gaussrifle", location: "RA"},
            {id: 3, type: "clan:gaussrifle", location: "RA"},
        ],
        specials: ["artemisiv", "omni"]
    },
    {
        id: "thg-12e",
        name: "Thug THG-12E",
        tonnage: 80,
        bv: 1751,
        ammo: [
            {id: 0, type: "is:streaksrm6", location: "RT"}
        ],
        specials: ["c3i"]
    },
    {
        id: "blr-1g",
        name: "BattleMaster BLR-1G",
        tonnage: 85,
        bv: 1519,
        ammo: [
            {id: 0, type: "is:srm6", location: "LT"},
            {id: 1, type: "is:srm6", location: "LT"},
            {id: 2, type: "is:machinegun", location: "LT"}
        ],
        specials: []
    },
    {
        id: "crk-5003-c",
        name: "Katana CRK-5003-C",
        tonnage: 85,
        bv: 1618,
        ammo: [
            {id: 0, type: "is:srm6", location: "RT"},
            {id: 1, type: "is:srm6", location: "RT"},
            {id: 2, type: "is:lb10xac", location: "RT"},
            {id: 3, type: "is:lb10xac", location: "RT", default: "cluster"},
        ],
        specials: ["c3s"]
    },
    {
        id: "crk-5003-cm",
        name: "Katana CRK-5003-CM",
        tonnage: 85,
        bv: 1554,
        ammo: [
            {id: 0, type: "is:srm6", location: "RT"},
            {id: 1, type: "is:lb10xac", location: "RT"},
            {id: 2, type: "is:lb10xac", location: "RT", default: "cluster"},
        ],
        specials: ["c3m", "tag"]
    },
    {
        id: "executioner-prime",
        name: "Executioner Prime",
        alternateNames: ["Gladiator Prime"],
        tonnage: 95,
        bv: 2749,
        ammo: [
            {id: 0, type: "clan:gaussrifle", location: "LT"},
            {id: 1, type: "clan:gaussrifle", location: "LT"},
            {id: 2, type: "clan:machinegun", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "executioner-a",
        name: "Executioner A",
        alternateNames: ["Gladiator A"],
        tonnage: 95,
        bv: 3112,
        ammo: [
            {id: 0, type: "clan:machinegun", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "executioner-b",
        name: "Executioner B",
        alternateNames: ["Gladiator B"],
        tonnage: 95,
        bv: 2940,
        ammo: [
            {id: 0, type: "clan:ultraac20", location: "LT"},
            {id: 1, type: "clan:ultraac20", location: "LT"},
            {id: 2, type: "clan:ultraac20", location: "LT"},
            {id: 3, type: "clan:ams", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "as7-c",
        name: "Atlas AS7-C",
        tonnage: 100,
        bv: 2163,
        ammo: [
            {id: 0, type: "is:gaussrifle", location: "RA"},
            {id: 1, type: "is:gaussrifle", location: "RA"},
            {id: 2, type: "is:lrm20", location: "LT"},
            {id: 3, type: "is:lrm20", location: "LT"},
            {id: 4, type: "is:ams", location: "LT"},
        ],
        specials: ["c3s"]
    },
    {
        id: "as7-cm",
        name: "Atlas AS7-CM",
        tonnage: 100,
        bv: 2036,
        ammo: [
            {id: 0, type: "is:gaussrifle", location: "RA"},
            {id: 1, type: "is:gaussrifle", location: "RA"},
            {id: 2, type: "is:lrm20", location: "LT"},
            {id: 3, type: "is:lrm20", location: "LT"},
            {id: 4, type: "is:ams", location: "LT"},
        ],
        specials: ["c3m", "tag"]
    },
    {
        id: "dire-wolf-prime",
        name: "Dire Wolf Prime",
        alternateNames: ["Daishi Prime"],
        tonnage: 100,
        bv: 2712,
        ammo: [
            {id: 0, type: "clan:ultraac5", location: "LA"},
            {id: 1, type: "clan:ultraac5", location: "RA"},
            {id: 2, type: "clan:lrm10", location: "LT"},
        ],
        specials: ["omni"]
    },
    {
        id: "dire-wolf-a",
        name: "Dire Wolf A",
        alternateNames: ["Daishi A"],
        tonnage: 100,
        bv: 2855,
        ammo: [
            {id: 0, type: "clan:gaussrifle", location: "LA"},
            {id: 1, type: "clan:gaussrifle", location: "LA"},
            {id: 2, type: "clan:gaussrifle", location: "LA"},
            {id: 3, type: "clan:streaksrm6", location: "LT"},
            {id: 4, type: "clan:streaksrm6", location: "LT"},
            {id: 5, type: "clan:ams", location: "RT"},
            {id: 6, type: "clan:ams", location: "RT"},
            {id: 7, type: "clan:ams", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "dire-wolf-b",
        name: "Dire Wolf B",
        alternateNames: ["Daishi B"],
        tonnage: 100,
        bv: 2609,
        ammo: [
            {id: 0, type: "clan:lb10xac", location: "RA"},
            {id: 1, type: "clan:lb10xac", location: "RA", default: "cluster"},
            {id: 2, type: "clan:ultraac2", location: "LT"},
            {id: 3, type: "clan:ultraac2", location: "RT"},
        ],
        specials: ["omni"]
    },
    {
        id: "dire-wolf-widowmaker",
        name: "Dire Wolf Widowmaker",
        alternateNames: ["Daishi Widowmaker"],
        tonnage: 100,
        bv: 3041,
        ammo: [
            {id: 0, type: "clan:ultraac20", location: "RA"},
            {id: 1, type: "clan:ultraac20", location: "RA"},
        ],
        specials: ["omni"]
    },
    {
        id: "kgc-005",
        name: "King Crab KGC-005",
        tonnage: 100,
        bv: 2264,
        ammo: [
            {id: 0, type: "is:lb20xac", location: "LT"},
            {id: 1, type: "is:lb20xac", location: "LT"},
            {id: 2, type: "is:lb20xac", location: "LT", default: "cluster"},
            {id: 3, type: "is:lb20xac", location: "RT"},
            {id: 4, type: "is:lb20xac", location: "RT", default: "cluster"},
            {id: 5, type: "is:lb20xac", location: "RT", default: "cluster"},
            {id: 6, type: "is:streaksrm4", location: "LT"},
        ],
        specials: ["c3i"]
    },
    {
        id: "elemental-laser-5",
        name: "Elemental Battle Armor [Laser] (Sqd 5)",
        tonnage: 5,
        bv: 447,
        ammo: [
            {id: 0, type: "clan:ba-srm2", location: "Body"},
            {id: 1, type: "clan:ba-srm2", location: "Body"},
        ],
        specials: []
    },
    {
        id: "elemental-mg-5",
        name: "Elemental Battle Armor [MG] (Sqd 5)",
        tonnage: 5,
        bv: 404,
        ammo: [
            {id: 0, type: "clan:ba-srm2", location: "Body"},
            {id: 1, type: "clan:ba-srm2", location: "Body"},
        ],
        specials: []
    },
    {
        id: "elemental-flamer-5",
        name: "Elemental Battle Armor [Flamer] (Sqd 5)",
        tonnage: 5,
        bv: 404,
        ammo: [
            {id: 0, type: "clan:ba-srm2", location: "Body"},
            {id: 1, type: "clan:ba-srm2", location: "Body"},
        ],
        specials: []
    },
];

function getSkillMultiplier(gunnery, piloting) {
    switch (gunnery) {
        case 0:
            switch (piloting) {
                case 0:
                    return 2.42;
                case 1:
                    return 2.31;
                case 2:
                    return 2.21;
                case 3:
                    return 2.1;
                case 4:
                    return 1.93;
                case 5:
                    return 1.75;
                case 6:
                    return 1.68;
                case 7:
                    return 1.59;
                case 8:
                    return 1.5;
                default:
                    return 1;
            }
            break;
        case 1:
            switch (piloting) {
                case 0:
                    return 2.21;
                case 1:
                    return 2.11;
                case 2:
                    return 2.02;
                case 3:
                    return 1.92;
                case 4:
                    return 1.76;
                case 5:
                    return 1.6;
                case 6:
                    return 1.54;
                case 7:
                    return 1.46;
                case 8:
                    return 1.38;
                default:
                    return 1;
            }
            break;
        case 2:
            switch (piloting) {
                case 0:
                    return 1.93;
                case 1:
                    return 1.85;
                case 2:
                    return 1.76;
                case 3:
                    return 1.68;
                case 4:
                    return 1.54;
                case 5:
                    return 1.4;
                case 6:
                    return 1.35;
                case 7:
                    return 1.28;
                case 8:
                    return 1.21;
                default:
                    return 1;
            }
            break;
        case 3:
            switch (piloting) {
                case 0:
                    return 1.66;
                case 1:
                    return 1.58;
                case 2:
                    return 1.51;
                case 3:
                    return 1.44;
                case 4:
                    return 1.32;
                case 5:
                    return 1.2;
                case 6:
                    return 1.16;
                case 7:
                    return 1.1;
                case 8:
                    return 1.04;
                default:
                    return 1;
            }
            break;
        case 4:
            switch (piloting) {
                case 0:
                    return 1.38;
                case 1:
                    return 1.32;
                case 2:
                    return 1.26;
                case 3:
                    return 1.2;
                case 4:
                    return 1.1;
                case 5:
                    return 1;
                case 6:
                    return 0.95;
                case 7:
                    return 0.9;
                case 8:
                    return 0.85;
                default:
                    return 1;
            }
            break;
        case 5:
            switch (piloting) {
                case 0:
                    return 1.31;
                case 1:
                    return 1.19;
                case 2:
                    return 1.13;
                case 3:
                    return 1.08;
                case 4:
                    return 0.99;
                case 5:
                    return 0.9;
                case 6:
                    return 0.86;
                case 7:
                    return 0.81;
                case 8:
                    return 0.77;
                default:
                    return 1;
            }
            break;
        case 6:
            switch (piloting) {
                case 0:
                    return 1.24;
                case 1:
                    return 1.12;
                case 2:
                    return 1.07;
                case 3:
                    return 1.02;
                case 4:
                    return 0.94;
                case 5:
                    return 0.85;
                case 6:
                    return 0.81;
                case 7:
                    return 0.77;
                case 8:
                    return 0.72;
                default:
                    return 1;
            }
            break;
        case 7:
            switch (piloting) {
                case 0:
                    return 1.17;
                case 1:
                    return 1.06;
                case 2:
                    return 1.01;
                case 3:
                    return 0.96;
                case 4:
                    return 0.88;
                case 5:
                    return 0.8;
                case 6:
                    return 0.76;
                case 7:
                    return 0.72;
                case 8:
                    return 0.68;
                default:
                    return 1;
            }
            break;
        case 8:
            switch (piloting) {
                case 0:
                    return 1.1;
                case 1:
                    return 0.99;
                case 2:
                    return 0.95;
                case 3:
                    return 0.9;
                case 4:
                    return 0.83;
                case 5:
                    return 0.75;
                case 6:
                    return 0.71;
                case 7:
                    return 0.68;
                case 8:
                    return 0.64;
                default:
                    return 1;
            }
            break;
        default:
            return 1;
    }
}
