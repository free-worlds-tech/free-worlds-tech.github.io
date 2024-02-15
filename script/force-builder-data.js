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
            {id: "standard", name: "Standard"}
        ]
    },
    {
        id: "is:ac2", 
        name: "AC/2", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "ap", name: "Armor-Piercing"},
            {id: "caseless", name: "Caseless", extraBV: 5},
            {id: "flechette", name: "Flechette"},
            {id: "precision", name: "Precision"}
        ]
    },
    {
        id: "is:ac5", 
        name: "AC/5", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "ap", name: "Armor-Piercing"},
            {id: "caseless", name: "Caseless", extraBV: 9},
            {id: "flechette", name: "Flechette"},
            {id: "precision", name: "Precision"}
        ]
    },
    {
        id: "is:ac10", 
        name: "AC/10", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "ap", name: "Armor-Piercing"},
            {id: "caseless", name: "Caseless", extraBV: 15},
            {id: "flechette", name: "Flechette"},
            {id: "precision", name: "Precision"}
        ]
    },
    {
        id: "is:ac20", 
        name: "AC/20", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "ap", name: "Armor-Piercing"},
            {id: "caseless", name: "Caseless", extraBV: 22},
            {id: "flechette", name: "Flechette"},
            {id: "precision", name: "Precision"}
        ]
    },
    {
        id: "is:narc", 
        name: "Narc", 
        ammoTypes: [
            {id: "standard", name: "Homing"},
            {id: "explosive", name: "Explosive"}
        ]
    },
    {
        id: "is:srm2", 
        name: "SRM 2", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "artemisiv", name: "Artemis IV-Equipped"},
            {id: "artemisv", name: "Artemis V-Equipped"},
            {id: "fragmentation", name: "Fragmentation"},
            {id: "inferno", name: "Inferno"},
            {id: "narc", name: "Narc-Equipped"}
        ]
    },
    {
        id: "is:srm4", 
        name: "SRM 4", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "artemisiv", name: "Artemis IV-Equipped"},
            {id: "artemisv", name: "Artemis V-Equipped"},
            {id: "fragmentation", name: "Fragmentation"},
            {id: "inferno", name: "Inferno"},
            {id: "narc", name: "Narc-Equipped"}
        ]
    },
    {
        id: "is:srm6", 
        name: "SRM 6", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "artemisiv", name: "Artemis IV-Equipped"},
            {id: "artemisv", name: "Artemis V-Equipped"},
            {id: "fragmentation", name: "Fragmentation"},
            {id: "inferno", name: "Inferno"},
            {id: "narc", name: "Narc-Equipped"}
        ]
    },
    {
        id: "is:lrm5", 
        name: "LRM 5", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "artemisiv", name: "Artemis IV-Equipped"},
            {id: "artemisv", name: "Artemis V-Equipped"},
            {id: "fragmentation", name: "Fragmentation"},
            {id: "narc", name: "Narc-Equipped"},
            {id: "semiguided", name: "Semi-Guided", tagBV: 6}
        ]
    },
    {
        id: "is:lrm10", 
        name: "LRM 10", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "artemisiv", name: "Artemis IV-Equipped"},
            {id: "artemisv", name: "Artemis V-Equipped"},
            {id: "fragmentation", name: "Fragmentation"},
            {id: "narc", name: "Narc-Equipped"},
            {id: "semiguided", name: "Semi-Guided", tagBV: 11}
        ]
    },
    {
        id: "is:lrm15", 
        name: "LRM 15", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "artemisiv", name: "Artemis IV-Equipped"},
            {id: "artemisv", name: "Artemis V-Equipped"},
            {id: "fragmentation", name: "Fragmentation"},
            {id: "narc", name: "Narc-Equipped"},
            {id: "semiguided", name: "Semi-Guided", tagBV: 17}
        ]
    },
    {
        id: "is:lrm20", 
        name: "LRM 20", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "artemisiv", name: "Artemis IV-Equipped"},
            {id: "artemisv", name: "Artemis V-Equipped"},
            {id: "fragmentation", name: "Fragmentation"},
            {id: "narc", name: "Narc-Equipped"},
            {id: "semiguided", name: "Semi-Guided", tagBV: 23}
        ]
    },
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
        id: "ott-7k",
        name: "Ostscout OTT-7K",
        tonnage: 35,
        bv: 484,
        ammo: [],
        specials: ["tag"]
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
        id: "aws-8q",
        name: "Awesome AWS-8Q",
        tonnage: 80,
        bv: 1605,
        ammo: [],
        specials: []
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
