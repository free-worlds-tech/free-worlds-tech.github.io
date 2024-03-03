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

let knownUnits = [];

const knownWeapons = [
    {
        id: "is:lightmachinegun", 
        name: "Light Machine Gun", 
        ammoTypes: [
            {id: "standard", name: "Standard (200)"}
        ]
    },
    {
        id: "is:lightmachinegun:halfton", 
        name: "Light Machine Gun", 
        ammoTypes: [
            {id: "standard", name: "Standard (100)"}
        ]
    },
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
        id: "is:heavymachinegun", 
        name: "Heavy Machine Gun", 
        ammoTypes: [
            {id: "standard", name: "Standard (100)"}
        ]
    },
    {
        id: "is:heavymachinegun:halfton", 
        name: "Heavy Machine Gun", 
        ammoTypes: [
            {id: "standard", name: "Standard (50)"}
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
        id: "is:lac2", 
        name: "Light AC/2", 
        ammoTypes: [
            {id: "standard", name: "Standard (45)"},
            {id: "ap", name: "Armor-Piercing (22)"},
            {id: "caseless", name: "Caseless (90)", extraBV: 4},
            {id: "flechette", name: "Flechette (45)"},
            {id: "precision", name: "Precision (22)"}
        ]
    },
    {
        id: "is:lac5", 
        name: "Light AC/5", 
        ammoTypes: [
            {id: "standard", name: "Standard (20)"},
            {id: "ap", name: "Armor-Piercing (10)"},
            {id: "caseless", name: "Caseless (40)", extraBV: 8},
            {id: "flechette", name: "Flechette (20)"},
            {id: "precision", name: "Precision (10)"}
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
        id: "is:ultraac2",
        name: "Ultra AC/2",
        ammoTypes: [
            {id: "standard", name: "Standard (45)"}
        ]
    },
    {
        id: "is:ultraac5",
        name: "Ultra AC/5",
        ammoTypes: [
            {id: "standard", name: "Standard (20)"}
        ]
    },
    {
        id: "is:ultraac10",
        name: "Ultra AC/10",
        ammoTypes: [
            {id: "standard", name: "Standard (10)"}
        ]
    },
    {
        id: "is:ultraac20",
        name: "Ultra AC/20",
        ammoTypes: [
            {id: "standard", name: "Standard (5)"}
        ]
    },
    {
        id: "is:rac2",
        name: "Rotary AC/2",
        ammoTypes: [
            {id: "standard", name: "Standard (45)"}
        ]
    },
    {
        id: "is:rac5",
        name: "Rotary AC/5",
        ammoTypes: [
            {id: "standard", name: "Standard (20)"}
        ]
    },
    {
        id: "is:hvac2",
        name: "Hyper-Velocity AC/2",
        ammoTypes: [
            {id: "standard", name: "Standard (30)"}
        ]
    },
    {
        id: "is:hvac5",
        name: "Hyper-Velocity AC/5",
        ammoTypes: [
            {id: "standard", name: "Standard (15)"}
        ]
    },
    {
        id: "is:hvac10",
        name: "Hyper-Velocity AC/10",
        ammoTypes: [
            {id: "standard", name: "Standard (8)"}
        ]
    },
    {
        id: "is:lightgaussrifle",
        name: "Light Gauss Rifle",
        ammoTypes: [
            {id: "standard", name: "Standard (16)"},
        ]
    },
    {
        id: "is:magshot",
        name: "Magshot Gauss Rifle",
        ammoTypes: [
            {id: "standard", name: "Standard (50)"},
        ]
    },
    {
        id: "is:gaussrifleprototype",
        name: "Prototype Gauss Rifle",
        ammoTypes: [
            {id: "standard", name: "Standard (8)"},
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
        id: "is:heavygaussrifle",
        name: "Heavy Gauss Rifle",
        ammoTypes: [
            {id: "standard", name: "Standard (4)"},
        ]
    },
    {
        id: "is:improvedheavygaussrifle",
        name: "Improved Heavy Gauss Rifle",
        ammoTypes: [
            {id: "standard", name: "Standard (4)"},
        ]
    },
    {
        id: "is:silverbullet",
        name: "Silver Bullet Gauss",
        ammoTypes: [
            {id: "standard", name: "Standard (8)"},
        ]
    },
    {
        id: "is:vehicleflamer",
        name: "Vehicle Flamer",
        ammoTypes: [
            {id: "standard", name: "Standard (20)"}
        ]
    },
    {
        id: "is:heavyflamer",
        name: "Heavy Flamer",
        ammoTypes: [
            {id: "standard", name: "Standard (10)"}
        ]
    },
    {
        id: "is:plasmarifle",
        name: "Plasma Rifle",
        ammoTypes: [
            {id: "standard", name: "Standard (10)"}
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
        id: "is:nlrm5", 
        name: "Enhanced LRM 5", 
        ammoTypes: [
            {id: "standard", name: "Standard (24)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (24)", requirement:"artemisiv"},
            {id: "fragmentation", name: "Fragmentation (24)"},
            {id: "narc", name: "Narc-Equipped (24)"},
            {id: "semiguided", name: "Semi-Guided (24)", tagBV: 7}
        ]
    },
    {
        id: "is:nlrm10", 
        name: "Enhanced LRM 10", 
        ammoTypes: [
            {id: "standard", name: "Standard (12)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (12)", requirement:"artemisiv"},
            {id: "fragmentation", name: "Fragmentation (12)"},
            {id: "narc", name: "Narc-Equipped (12)"},
            {id: "semiguided", name: "Semi-Guided (12)", tagBV: 13}
        ]
    },
    {
        id: "is:nlrm15", 
        name: "Enhanced LRM 15", 
        ammoTypes: [
            {id: "standard", name: "Standard (8)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (8)", requirement:"artemisiv"},
            {id: "fragmentation", name: "Fragmentation (8)"},
            {id: "narc", name: "Narc-Equipped (8)"},
            {id: "semiguided", name: "Semi-Guided (8)", tagBV: 20}
        ]
    },
    {
        id: "is:nlrm20", 
        name: "Enhanced LRM 20", 
        ammoTypes: [
            {id: "standard", name: "Standard (6)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (6)", requirement:"artemisiv"},
            {id: "fragmentation", name: "Fragmentation (6)"},
            {id: "narc", name: "Narc-Equipped (6)"},
            {id: "semiguided", name: "Semi-Guided (6)", tagBV: 26}
        ]
    },
    {
        id: "is:elrm5", 
        name: "ELRM 5", 
        ammoTypes: [
            {id: "standard", name: "Standard (18)"},
        ]
    },
    {
        id: "is:elrm10", 
        name: "ELRM 10", 
        ammoTypes: [
            {id: "standard", name: "Standard (9)"},
        ]
    },
    {
        id: "is:elrm15", 
        name: "ELRM 15", 
        ammoTypes: [
            {id: "standard", name: "Standard (6)"},
        ]
    },
    {
        id: "is:elrm20", 
        name: "ELRM 20", 
        ammoTypes: [
            {id: "standard", name: "Standard (4)"},
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
        id: "is:mml3",
        name: "MML 3",
        ammoTypes: [
            {id: "lrm", name: "LRM (40)"},
            {id: "lrm-artemisiv", name: "Artemis IV-Equipped LRM (40)", requirement:"artemisiv"},
            {id: "lrm-fragmentation", name: "Fragmentation LRM (40)"},
            {id: "lrm-narc", name: "Narc-Equipped LRM (40)"},
            {id: "lrm-semiguided", name: "Semi-Guided LRM (40)", tagBV: 4},
            {id: "srm", name: "SRM (33)"},
            {id: "srm-artemisiv", name: "Artemis IV-Equipped SRM (33)", requirement:"artemisiv"},
            {id: "srm-fragmentation", name: "Fragmentation SRM (33)"},
            {id: "srm-inferno", name: "Inferno SRM (33)"},
            {id: "srm-narc", name: "Narc-Equipped SRM (33)"}
        ]
    },
    {
        id: "is:mml5",
        name: "MML 5",
        ammoTypes: [
            {id: "lrm", name: "LRM (24)"},
            {id: "lrm-artemisiv", name: "Artemis IV-Equipped LRM (24)", requirement:"artemisiv"},
            {id: "lrm-fragmentation", name: "Fragmentation LRM (24)"},
            {id: "lrm-narc", name: "Narc-Equipped LRM (24)"},
            {id: "lrm-semiguided", name: "Semi-Guided LRM (24)", tagBV: 6},
            {id: "srm", name: "SRM (20)"},
            {id: "srm-artemisiv", name: "Artemis IV-Equipped SRM (20)", requirement:"artemisiv"},
            {id: "srm-fragmentation", name: "Fragmentation SRM (20)"},
            {id: "srm-inferno", name: "Inferno SRM (20)"},
            {id: "srm-narc", name: "Narc-Equipped SRM (20)"}
        ]
    },
    {
        id: "is:mml7",
        name: "MML 7",
        ammoTypes: [
            {id: "lrm", name: "LRM (17)"},
            {id: "lrm-artemisiv", name: "Artemis IV-Equipped LRM (17)", requirement:"artemisiv"},
            {id: "lrm-fragmentation", name: "Fragmentation LRM (17)"},
            {id: "lrm-narc", name: "Narc-Equipped LRM (17)"},
            {id: "lrm-semiguided", name: "Semi-Guided LRM (17)", tagBV: 8},
            {id: "srm", name: "SRM (14)"},
            {id: "srm-artemisiv", name: "Artemis IV-Equipped SRM (14)", requirement:"artemisiv"},
            {id: "srm-fragmentation", name: "Fragmentation SRM (14)"},
            {id: "srm-inferno", name: "Inferno SRM (14)"},
            {id: "srm-narc", name: "Narc-Equipped SRM (14)"}
        ]
    },
    {
        id: "is:mml9",
        name: "MML 9",
        ammoTypes: [
            {id: "lrm", name: "LRM (13)"},
            {id: "lrm-artemisiv", name: "Artemis IV-Equipped LRM (13)", requirement:"artemisiv"},
            {id: "lrm-fragmentation", name: "Fragmentation LRM (13)"},
            {id: "lrm-narc", name: "Narc-Equipped LRM (13)"},
            {id: "lrm-semiguided", name: "Semi-Guided LRM (13)", tagBV: 11},
            {id: "srm", name: "SRM (11)"},
            {id: "srm-artemisiv", name: "Artemis IV-Equipped SRM (11)", requirement:"artemisiv"},
            {id: "srm-fragmentation", name: "Fragmentation SRM (11)"},
            {id: "srm-inferno", name: "Inferno SRM (11)"},
            {id: "srm-narc", name: "Narc-Equipped SRM (11)"}
        ]
    },
    {
        id: "is:thunderbolt5", 
        name: "Thunderbolt 5", 
        ammoTypes: [
            {id: "standard", name: "Standard (12)"},
        ]
    },
    {
        id: "is:thunderbolt10", 
        name: "Thunderbolt 10", 
        ammoTypes: [
            {id: "standard", name: "Standard (6)"},
        ]
    },
    {
        id: "is:thunderbolt15", 
        name: "Thunderbolt 15", 
        ammoTypes: [
            {id: "standard", name: "Standard (4)"},
        ]
    },
    {
        id: "is:thunderbolt20", 
        name: "Thunderbolt 20", 
        ammoTypes: [
            {id: "standard", name: "Standard (3)"},
        ]
    },
    {
        id: "is:arrowiv", 
        name: "Arrow IV", 
        ammoTypes: [
            {id: "standard", name: "Standard (5)"},
            {id: "homing", name: "Homing (5)", tagBV: 30},
        ]
    },
    {
        id: "is:antimissilesystem",
        name: "AMS",
        ammoTypes: [
            {id: "standard", name: "Standard (12)"},
        ]
    },
    {
        id: "clan:lightmachinegun", 
        name: "Light Machine Gun", 
        ammoTypes: [
            {id: "standard", name: "Standard (200)"}
        ]
    },
    {
        id: "clan:lightmachinegun:halfton", 
        name: "Light Machine Gun", 
        ammoTypes: [
            {id: "standard", name: "Standard (100)"}
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
        id: "clan:heavymachinegun", 
        name: "Heavy Machine Gun", 
        ammoTypes: [
            {id: "standard", name: "Standard (100)"}
        ]
    },
    {
        id: "clan:heavymachinegun:halfton", 
        name: "Heavy Machine Gun", 
        ammoTypes: [
            {id: "standard", name: "Standard (50)"}
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
        id: "clan:rac2",
        name: "Rotary AC/2",
        ammoTypes: [
            {id: "standard", name: "Standard (45)"}
        ]
    },
    {
        id: "clan:rac5",
        name: "Rotary AC/5",
        ammoTypes: [
            {id: "standard", name: "Standard (20)"}
        ]
    },
    {
        id: "clan:protomechac2",
        name: "ProtoMech AC/2",
        ammoTypes: [
            {id: "standard", name: "Standard (40)"},
            {id: "ap", name: "Armor-Piercing (20)"},
            {id: "flechette", name: "Flechette (40)"},
        ]
    },
    {
        id: "clan:protomechac4",
        name: "ProtoMech AC/4",
        ammoTypes: [
            {id: "standard", name: "Standard (20)"},
            {id: "ap", name: "Armor-Piercing (10)"},
            {id: "flechette", name: "Flechette (20)"},
        ]
    },
    {
        id: "clan:protomechac8",
        name: "ProtoMech AC/8",
        ammoTypes: [
            {id: "standard", name: "Standard (10)"},
            {id: "ap", name: "Armor-Piercing (5)"},
            {id: "flechette", name: "Flechette (10)"},
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
        id: "clan:improvedgaussrifle",
        name: "Improved Gauss Rifle",
        ammoTypes: [
            {id: "standard", name: "Standard (8)"},
        ]
    },
    {
        id: "clan:hag20",
        name: "HAG 20",
        ammoTypes: [
            {id: "standard", name: "Standard (6)"},
        ]
    },
    {
        id: "clan:hag30",
        name: "HAG 30",
        ammoTypes: [
            {id: "standard", name: "Standard (4)"},
        ]
    },
    {
        id: "clan:hag40",
        name: "HAG 40",
        ammoTypes: [
            {id: "standard", name: "Standard (3)"},
        ]
    },
    {
        id: "clan:apgaussrifle",
        name: "AP Gauss Rifle",
        ammoTypes: [
            {id: "standard", name: "Standard (40)"},
        ]
    },
    {
        id: "clan:heavyflamer",
        name: "Heavy Flamer",
        ammoTypes: [
            {id: "standard", name: "Standard (10)"}
        ]
    },
    {
        id: "clan:plasmacannon",
        name: "Plasma Cannon",
        ammoTypes: [
            {id: "standard", name: "Standard (10)"}
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
        id: "clan:atm3", 
        name: "ATM 3", 
        ammoTypes: [
            {id: "standard", name: "Standard (20)"},
            {id: "er", name: "ER (20)"},
            {id: "he", name: "HE (20)"},
        ]
    },
    {
        id: "clan:atm6", 
        name: "ATM 6", 
        ammoTypes: [
            {id: "standard", name: "Standard (10)"},
            {id: "er", name: "ER (10)"},
            {id: "he", name: "HE (10)"},
        ]
    },
    {
        id: "clan:atm9", 
        name: "ATM 9", 
        ammoTypes: [
            {id: "standard", name: "Standard (7)"},
            {id: "er", name: "ER (7)"},
            {id: "he", name: "HE (7)"},
        ]
    },
    {
        id: "clan:atm12", 
        name: "ATM 12", 
        ammoTypes: [
            {id: "standard", name: "Standard (5)"},
            {id: "er", name: "ER (5)"},
            {id: "he", name: "HE (5)"},
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
        id: "clan:streaklrm5", 
        name: "Streak LRM 5", 
        ammoTypes: [
            {id: "standard", name: "Standard (24)"}
        ]
    },
    {
        id: "clan:streaklrm10", 
        name: "Streak LRM 10", 
        ammoTypes: [
            {id: "standard", name: "Standard (12)"}
        ]
    },
    {
        id: "clan:streaklrm15", 
        name: "Streak LRM 15", 
        ammoTypes: [
            {id: "standard", name: "Standard (8)"}
        ]
    },
    {
        id: "clan:streaklrm20", 
        name: "Streak LRM 20", 
        ammoTypes: [
            {id: "standard", name: "Standard (6)"}
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
        id: "clan:arrowiv", 
        name: "Arrow IV", 
        ammoTypes: [
            {id: "standard", name: "Standard (5)"},
            {id: "homing", name: "Homing (5)", tagBV: 30},
        ]
    },
    {
        id: "clan:antimissilesystem",
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
