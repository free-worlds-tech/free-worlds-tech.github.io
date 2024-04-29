function getWeaponName(weaponId) {
    const weapon = knownWeapons.find((x) => x.id == weaponId);
    return weapon ? weapon.name : weaponId;
}

function getAmmoName(weaponId, ammoId, count) {
    const weapon = knownWeapons.find((x) => x.id == weaponId);
    const ammo = weapon ? weapon.ammoTypes.find((x) => x.id == ammoId) : undefined;
    if (ammo) {
        let name = ammo.name;
        if (count) {
            let shotCount = count;
            if (ammo.shotMultiplier) {
                shotCount = Math.floor(shotCount * ammo.shotMultiplier);
            }
            name = `${name} (${shotCount})`;
        }
        return name;
    } else {
        return ammoId;
    }
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

function getAmmoRulesLevel(weaponId, ammoId) {
    const weapon = knownWeapons.find((x) => x.id == weaponId);
    const ammo = weapon ? weapon.ammoTypes.find((x) => x.id == ammoId) : undefined;
    return (ammo && ammo.level) ? ammo.level : 0;
}

function getAmmoTypes(weaponId) {
    const weapon = knownWeapons.find((x) => x.id == weaponId);
    return weapon ? weapon.ammoTypes : [{id: "standard", name: "Standard"}];
}

function getKnownUnits() {
    return knownUnits;
}

function getKnownUnit(unitId) {
    return knownUnits.find((x) => x.id == unitId);
}

function getRulesLevelString(level) {
    if (level <= 0) return "Undefined";
    if (level == 1) return "Introductory";
    if (level == 2) return "Standard";
    if (level == 3) return "Advanced";
    if (level == 4) return "Experimental";
    if (level == 5) return "Non-Canon";
}

function getAdjustedRulesLevel(unit) {
    let level = unit.unitProps.level;

    // Check for higher rules level ammo
    unit.unitProps.ammo.forEach((ammoBin, index) => {
        let ammoLevel = getAmmoRulesLevel(ammoBin.type, unit.ammoTypes.get(index));
        if (ammoLevel > level) {
            level = ammoLevel;
        }
    });

    return level;
}

let knownUnits = [];

const knownWeapons = [
    {
        id: "nailrivetgun", 
        name: "Nail/Rivet Gun", 
        ammoTypes: [
            {id: "standard", name: "Standard (300)"}
        ]
    },
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
        id: "is:grenadelauncher", 
        name: "Vehicular Grenade Launcher", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "chaff", name: "Chaff"},
            {id: "fragmentation", name: "Fragmentation"},
            {id: "incendiary", name: "Incendiary", extraBV: 7.5},
            {id: "smoke", name: "Smoke"},
        ]
    },
    {
        id: "is:lightrifle", 
        name: "Light Rifle", 
        ammoTypes: [
            {id: "standard", name: "Standard (18)"}
        ]
    },
    {
        id: "is:mediumrifle", 
        name: "Medium Rifle", 
        ammoTypes: [
            {id: "standard", name: "Standard (9)"}
        ]
    },
    {
        id: "is:heavyrifle", 
        name: "Heavy Rifle", 
        ammoTypes: [
            {id: "standard", name: "Standard (6)"}
        ]
    },
    {
        id: "is:ac2", 
        name: "AC/2", 
        ammoTypes: [
            {id: "standard", name: "Standard (45)"},
            {id: "ap", name: "Armor-Piercing (22)", level: 2},
            {id: "caseless", name: "Caseless (90)", extraBV: 5, level: 3},
            {id: "flak", name: "Flak (45)", level: 2},
            {id: "flechette", name: "Flechette (45)", level: 2},
            {id: "precision", name: "Precision (22)", level: 2},
            {id: "tracer", name: "Tracer (45)", extraBV: 1.25, level: 3},
        ]
    },
    {
        id: "is:ac5", 
        name: "AC/5", 
        ammoTypes: [
            {id: "standard", name: "Standard (20)"},
            {id: "ap", name: "Armor-Piercing (10)", level: 2},
            {id: "caseless", name: "Caseless (40)", extraBV: 9, level: 3},
            {id: "flak", name: "Flak (20)", level: 2},
            {id: "flechette", name: "Flechette (20)", level: 2},
            {id: "precision", name: "Precision (10)", level: 2},
            {id: "tracer", name: "Tracer (20)", extraBV: 2.25, level: 3},
        ]
    },
    {
        id: "is:ac10", 
        name: "AC/10", 
        ammoTypes: [
            {id: "standard", name: "Standard (10)", level: 2},
            {id: "ap", name: "Armor-Piercing (5)"},
            {id: "caseless", name: "Caseless (20)", extraBV: 15, level: 3},
            {id: "flak", name: "Flak (10)", level: 2},
            {id: "flechette", name: "Flechette (10)", level: 2},
            {id: "precision", name: "Precision (5)", level: 2},
            {id: "tracer", name: "Tracer (10)", extraBV: 3.75, level: 3},
        ]
    },
    {
        id: "is:ac20", 
        name: "AC/20", 
        ammoTypes: [
            {id: "standard", name: "Standard (5)"},
            {id: "ap", name: "Armor-Piercing (2)", level: 2},
            {id: "caseless", name: "Caseless (10)", extraBV: 22, level: 3},
            {id: "flak", name: "Flak (5)", level: 2},
            {id: "flechette", name: "Flechette (5)", level: 2},
            {id: "precision", name: "Precision (2)", level: 2},
            {id: "tracer", name: "Tracer (5)", extraBV: 5.5, level: 3},
        ]
    },
    {
        id: "is:lac2", 
        name: "Light AC/2", 
        ammoTypes: [
            {id: "standard", name: "Standard (45)"},
            {id: "ap", name: "Armor-Piercing (22)"},
            {id: "caseless", name: "Caseless (90)", extraBV: 4, level: 3},
            {id: "flak", name: "Flak (45)", level: 2},
            {id: "flechette", name: "Flechette (45)"},
            {id: "precision", name: "Precision (22)"},
            {id: "tracer", name: "Tracer (45)", extraBV: 1, level: 3},
        ]
    },
    {
        id: "is:lac5", 
        name: "Light AC/5", 
        ammoTypes: [
            {id: "standard", name: "Standard (20)"},
            {id: "ap", name: "Armor-Piercing (10)"},
            {id: "caseless", name: "Caseless (40)", extraBV: 8, level: 3},
            {id: "flak", name: "Flak (20)", level: 2},
            {id: "flechette", name: "Flechette (20)"},
            {id: "precision", name: "Precision (10)"},
            {id: "tracer", name: "Tracer (20)", extraBV: 2, level: 3},
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
        id: "is:primitiveac10", 
        name: "Primitive AC/10", 
        ammoTypes: [
            {id: "standard", name: "Standard (8)"},
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
        id: "is:ba-tubeartillery",
        name: "Tube Artillery",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
        ]
    },
    {
        id: "is:thumper",
        name: "Thumper",
        ammoTypes: [
            {id: "standard", name: "Standard (20)"},
            {id: "copperhead", name: "Copperhead (20)", tagBV: 5},
        ]
    },
    {
        id: "is:sniper",
        name: "Sniper",
        ammoTypes: [
            {id: "standard", name: "Standard (10)"},
            {id: "copperhead", name: "Copperhead (10)", tagBV: 11},
        ]
    },
    {
        id: "is:longtom",
        name: "Long Tom",
        ammoTypes: [
            {id: "standard", name: "Standard (5)"},
            {id: "copperhead", name: "Copperhead (5)", tagBV: 46},
        ]
    },
    {
        id: "is:thumpercannon",
        name: "Thumper Cannon",
        ammoTypes: [
            {id: "standard", name: "Standard (20)"},
        ]
    },
    {
        id: "is:snipercannon",
        name: "Sniper Cannon",
        ammoTypes: [
            {id: "standard", name: "Standard (10)"},
        ]
    },
    {
        id: "is:longtomcannon",
        name: "Long Tom Cannon",
        ammoTypes: [
            {id: "standard", name: "Standard (5)"},
        ]
    },
    {
        id: "is:vehicleflamer",
        name: "Vehicle Flamer",
        ammoTypes: [
            {id: "standard", name: "Standard (20)"},
            {id: "coolant", name: "Coolant (20)", level: 3},
            {id: "inferno", name: "Inferno Fuel (20)", extraBV: 2, level: 3},
            {id: "water", name: "Water (20)", level: 3},
        ]
    },
    {
        id: "is:heavyflamer",
        name: "Heavy Flamer",
        ammoTypes: [
            {id: "standard", name: "Standard (10)"},
            {id: "coolant", name: "Coolant (10)", level: 3},
            {id: "inferno", name: "Inferno Fuel (10)", extraBV: 4, level: 3},
            {id: "water", name: "Water (10)", level: 3},
        ]
    },
    {
        id: "is:fluidgun",
        name: "Fluid Gun",
        ammoTypes: [
            {id: "standard", name: "Water (20)"},
            {id: "coolant", name: "Coolant (20)"},
            {id: "corrosive", name: "Corrosive (20)", extraBV: 2},
            {id: "flameretardant", name: "Flame-Retardant Foam (20)"},
            {id: "inferno", name: "Inferno Fuel (20)", extraBV: 2},
            {id: "oilslick", name: "Oil Slick (20)"},
            {id: "obscurant", name: "Obscurant (20)"},
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
            {id: "bola", name: "Bola (6)", level: 4},
            {id: "explosive", name: "Explosive (6)"}
        ]
    },
    {
        id: "is:ba-narc", 
        name: "Narc", 
        ammoTypes: [
            {id: "standard", name: "Homing (1)"},
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
        id: "is:c3remotesensorlauncher",
        name: "C3 Remote Sensor Launcher",
        ammoTypes: [
            {id: "standard", name: "Standard (4)"},
        ]
    },
    {
        id: "is:srm2", 
        name: "SRM 2", 
        ammoTypes: [
            {id: "standard", name: "Standard (50)"},
            {id: "acid", name: "Acid (25)", extraBV: 3, level: 4},
            {id: "arad", name: "Anti-Radiation (50)", extraBV: 0.9, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (50)", requirement:"artemisiv", level: 2},
            {id: "fragmentation", name: "Fragmentation (50)", level: 2},
            {id: "heatseeking", name: "Heat-Seeking (25)", extraBV: 1.5, level: 3},
            {id: "inferno", name: "Inferno (50)", level: 2},
            {id: "magneticpulse", name: "Magnetic-Pulse (50)", extraBV: 3, level: 4},
            {id: "mineclearance", name: "Mine-Clearance (50)", level: 3},
            {id: "narc", name: "Narc-Equipped (50)", level: 2},
            {id: "smoke", name: "Smoke (50)", level: 3},
            {id: "tandem", name: "Tandem-Charge (25)", extraBV: 3, level: 4},
            {id: "teargas", name: "Tear Gas (50)", level: 3},
        ]
    },
    {
        id: "is:srm4", 
        name: "SRM 4", 
        ammoTypes: [
            {id: "standard", name: "Standard (25)"},
            {id: "acid", name: "Acid (12)", extraBV: 5, level: 4},
            {id: "arad", name: "Anti-Radiation (25)", extraBV: 1.5, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (25)", requirement:"artemisiv", level: 2},
            {id: "fragmentation", name: "Fragmentation (25)", level: 2},
            {id: "heatseeking", name: "Heat-Seeking (12)", extraBV: 2.5, level: 3},
            {id: "inferno", name: "Inferno (25)", level: 2},
            {id: "magneticpulse", name: "Magnetic-Pulse (25)", extraBV: 5, level: 4},
            {id: "mineclearance", name: "Mine-Clearance (25)", level: 3},
            {id: "narc", name: "Narc-Equipped (25)", level: 2},
            {id: "smoke", name: "Smoke (25)", level: 3},
            {id: "tandem", name: "Tandem-Charge (12)", extraBV: 5, level: 4},
            {id: "teargas", name: "Tear Gas (25)", level: 3},
        ]
    },
    {
        id: "is:srm6", 
        name: "SRM 6", 
        ammoTypes: [
            {id: "standard", name: "Standard (15)"},
            {id: "acid", name: "Acid (7)", extraBV: 7, level: 4},
            {id: "arad", name: "Anti-Radiation (15)", extraBV: 2.1, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (15)", requirement:"artemisiv", level: 2},
            {id: "fragmentation", name: "Fragmentation (15)", level: 2},
            {id: "heatseeking", name: "Heat-Seeking (7)", extraBV: 3.5, level: 3},
            {id: "inferno", name: "Inferno (15)", level: 2},
            {id: "magneticpulse", name: "Magnetic-Pulse (15)", extraBV: 7, level: 4},
            {id: "mineclearance", name: "Mine-Clearance (15)", level: 3},
            {id: "narc", name: "Narc-Equipped (15)", level: 2},
            {id: "smoke", name: "Smoke (15)", level: 3},
            {id: "tandem", name: "Tandem-Charge (7)", extraBV: 7, level: 4},
            {id: "teargas", name: "Tear Gas (15)", level: 3},
        ]
    },
    {
        id: "is:srm2:os", 
        name: "SRM 2 (OS)", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "acid", name: "Acid", extraBV: 4, level: 4},
            {id: "arad", name: "Anti-Radiation", extraBV: 1.2, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped", requirement:"artemisiv", level: 2},
            {id: "fragmentation", name: "Fragmentation", level: 2},
            {id: "heatseeking", name: "Heat-Seeking", extraBV: 2, level: 3},
            {id: "inferno", name: "Inferno", level: 2},
            {id: "magneticpulse", name: "Magnetic-Pulse", extraBV: 4, level: 4},
            {id: "mineclearance", name: "Mine-Clearance", level: 3},
            {id: "narc", name: "Narc-Equipped", level: 2},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "tandem", name: "Tandem-Charge", extraBV: 4, level: 4},
            {id: "teargas", name: "Tear Gas", level: 3},
        ]
    },
    {
        id: "is:srm4:os", 
        name: "SRM 4 (OS)", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "acid", name: "Acid", extraBV: 8, level: 4},
            {id: "arad", name: "Anti-Radiation", extraBV: 2.4, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped", requirement:"artemisiv", level: 2},
            {id: "fragmentation", name: "Fragmentation", level: 2},
            {id: "heatseeking", name: "Heat-Seeking", extraBV: 4, level: 3},
            {id: "inferno", name: "Inferno", level: 2},
            {id: "magneticpulse", name: "Magnetic-Pulse", extraBV: 8, level: 4},
            {id: "mineclearance", name: "Mine-Clearance", level: 3},
            {id: "narc", name: "Narc-Equipped", level: 2},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "tandem", name: "Tandem-Charge", extraBV: 8, level: 4},
            {id: "teargas", name: "Tear Gas", level: 3},
        ]
    },
    {
        id: "is:srm6:os", 
        name: "SRM 6 (OS)", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "acid", name: "Acid", extraBV: 12, level: 4},
            {id: "arad", name: "Anti-Radiation", extraBV: 3.6, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped", requirement:"artemisiv", level: 2},
            {id: "fragmentation", name: "Fragmentation", level: 2},
            {id: "heatseeking", name: "Heat-Seeking", extraBV: 6, level: 3},
            {id: "inferno", name: "Inferno", level: 2},
            {id: "magneticpulse", name: "Magnetic-Pulse", extraBV: 12, level: 4},
            {id: "mineclearance", name: "Mine-Clearance", level: 3},
            {id: "narc", name: "Narc-Equipped", level: 2},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "tandem", name: "Tandem-Charge", extraBV: 12, level: 4},
            {id: "teargas", name: "Tear Gas", level: 3},
        ]
    },
    {
        id: "is:srt2", 
        name: "SRT 2", 
        ammoTypes: [
            {id: "standard", name: "Standard (50)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (50)", requirement:"artemisiv", level: 2},
        ]
    },
    {
        id: "is:srt4", 
        name: "SRT 4", 
        ammoTypes: [
            {id: "standard", name: "Standard (25)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (25)", requirement:"artemisiv", level: 2},
        ]
    },
    {
        id: "is:srt6", 
        name: "SRT 6", 
        ammoTypes: [
            {id: "standard", name: "Standard (15)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (15)", requirement:"artemisiv", level: 2},
        ]
    },
    {
        id: "is:srt2:os", 
        name: "SRT 2 (OS)", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "artemisiv", name: "Artemis IV-Equipped", requirement:"artemisiv", level: 2},
        ]
    },
    {
        id: "is:srt4:os", 
        name: "SRT 4 (OS)", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "artemisiv", name: "Artemis IV-Equipped", requirement:"artemisiv", level: 2},
        ]
    },
    {
        id: "is:srt6:os", 
        name: "SRT 6 (OS)", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "artemisiv", name: "Artemis IV-Equipped", requirement:"artemisiv", level: 2},
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
        id: "is:streaksrm2:os", 
        name: "Streak SRM 2 (OS)", 
        ammoTypes: [
            {id: "standard", name: "Standard"}
        ]
    },
    {
        id: "is:streaksrm4:os", 
        name: "Streak SRM 4 (OS)", 
        ammoTypes: [
            {id: "standard", name: "Standard"}
        ]
    },
    {
        id: "is:streaksrm6:os", 
        name: "Streak SRM 6 (OS)", 
        ammoTypes: [
            {id: "standard", name: "Standard"}
        ]
    },
    {
        id: "is:lrm5", 
        name: "LRM 5", 
        ammoTypes: [
            {id: "standard", name: "Standard (24)"},
            {id: "arad", name: "Anti-Radiation (24)", extraBV: 1.8, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (24)", requirement:"artemisiv", level: 2},
            {id: "ftl", name: "Follow-the-Leader (12)", extraBV: 3, level: 4},
            {id: "fragmentation", name: "Fragmentation (24)", level: 2},
            {id: "heatseeking", name: "Heat-Seeking (12)", extraBV: 3, level: 3},
            {id: "incendiary", name: "Incendiary (24)", level: 3},
            {id: "magneticpulse", name: "Magnetic-Pulse (24)", extraBV: 6, level: 4},
            {id: "mineclearance", name: "Mine-Clearance (24)", level: 3},
            {id: "narc", name: "Narc-Equipped (24)", level: 2},
            {id: "semiguided", name: "Semi-Guided (24)", tagBV: 6, level: 2},
            {id: "smoke", name: "Smoke (24)", level: 3},
            {id: "swarm", name: "Swarm (24)", level: 3},
            {id: "swarmi", name: "Swarm-I (24)", extraBV: 1.2, level: 3},
        ]
    },
    {
        id: "is:lrm10", 
        name: "LRM 10", 
        ammoTypes: [
            {id: "standard", name: "Standard (12)"},
            {id: "arad", name: "Anti-Radiation (12)", extraBV: 3.3, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (12)", requirement:"artemisiv", level: 2},
            {id: "ftl", name: "Follow-the-Leader (6)", extraBV: 5.5, level: 4},
            {id: "fragmentation", name: "Fragmentation (12)", level: 2},
            {id: "heatseeking", name: "Heat-Seeking (6)", extraBV: 5.5, level: 3},
            {id: "incendiary", name: "Incendiary (12)", level: 3},
            {id: "magneticpulse", name: "Magnetic-Pulse (12)", extraBV: 11, level: 4},
            {id: "mineclearance", name: "Mine-Clearance (12)", level: 3},
            {id: "narc", name: "Narc-Equipped (12)", level: 2},
            {id: "semiguided", name: "Semi-Guided (12)", tagBV: 11, level: 2},
            {id: "smoke", name: "Smoke (12)", level: 3},
            {id: "swarm", name: "Swarm (12)", level: 3},
            {id: "swarmi", name: "Swarm-I (12)", extraBV: 2.2, level: 3},
        ]
    },
    {
        id: "is:lrm15", 
        name: "LRM 15", 
        ammoTypes: [
            {id: "standard", name: "Standard (8)"},
            {id: "arad", name: "Anti-Radiation (8)", extraBV: 5.1, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (8)", requirement:"artemisiv", level: 2},
            {id: "ftl", name: "Follow-the-Leader (4)", extraBV: 8.5, level: 4},
            {id: "fragmentation", name: "Fragmentation (8)", level: 2},
            {id: "heatseeking", name: "Heat-Seeking (4)", extraBV: 8.5, level: 3},
            {id: "incendiary", name: "Incendiary (8)", level: 3},
            {id: "magneticpulse", name: "Magnetic-Pulse (8)", extraBV: 17, level: 4},
            {id: "mineclearance", name: "Mine-Clearance (8)", level: 3},
            {id: "narc", name: "Narc-Equipped (8)", level: 2},
            {id: "semiguided", name: "Semi-Guided (8)", tagBV: 17, level: 2},
            {id: "smoke", name: "Smoke (8)", level: 3},
            {id: "swarm", name: "Swarm (8)", level: 3},
            {id: "swarmi", name: "Swarm-I (8)", extraBV: 3.4, level: 3},
        ]
    },
    {
        id: "is:lrm20", 
        name: "LRM 20", 
        ammoTypes: [
            {id: "standard", name: "Standard (6)"},
            {id: "arad", name: "Anti-Radiation (6)", extraBV: 6.9, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (6)", requirement:"artemisiv", level: 2},
            {id: "ftl", name: "Follow-the-Leader (3)", extraBV: 11.5, level: 4},
            {id: "fragmentation", name: "Fragmentation (6)", level: 2},
            {id: "heatseeking", name: "Heat-Seeking (3)", extraBV: 11.5, level: 3},
            {id: "incendiary", name: "Incendiary (6)", level: 3},
            {id: "magneticpulse", name: "Magnetic-Pulse (6)", extraBV: 23, level: 4},
            {id: "mineclearance", name: "Mine-Clearance (6)", level: 3},
            {id: "narc", name: "Narc-Equipped (6)", level: 2},
            {id: "semiguided", name: "Semi-Guided (6)", tagBV: 23, level: 2},
            {id: "smoke", name: "Smoke (6)", level: 3},
            {id: "swarm", name: "Swarm (6)", level: 3},
            {id: "swarmi", name: "Swarm-I (6)", extraBV: 4.6, level: 3},
        ]
    },
    {
        id: "is:lrt5", 
        name: "LRT 5", 
        ammoTypes: [
            {id: "standard", name: "Standard (24)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (24)", requirement:"artemisiv"},
        ]
    },
    {
        id: "is:lrt10", 
        name: "LRT 10", 
        ammoTypes: [
            {id: "standard", name: "Standard (12)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (12)", requirement:"artemisiv"},
        ]
    },
    {
        id: "is:lrt15", 
        name: "LRT 15", 
        ammoTypes: [
            {id: "standard", name: "Standard (8)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (8)", requirement:"artemisiv"},
        ]
    },
    {
        id: "is:lrt20", 
        name: "LRT 20", 
        ammoTypes: [
            {id: "standard", name: "Standard (6)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (6)", requirement:"artemisiv"},
        ]
    },
    {
        id: "is:nlrm5", 
        name: "Enhanced LRM 5", 
        ammoTypes: [
            {id: "standard", name: "Standard (24)"},
            {id: "arad", name: "Anti-Radiation (24)", extraBV: 2.1, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (24)", requirement:"artemisiv", level: 2},
            {id: "ftl", name: "Follow-the-Leader (12)", extraBV: 3.5, level: 4},
            {id: "fragmentation", name: "Fragmentation (24)", level: 2},
            {id: "heatseeking", name: "Heat-Seeking (12)", extraBV: 3.5, level: 3},
            {id: "incendiary", name: "Incendiary (24)", level: 3},
            {id: "magneticpulse", name: "Magnetic-Pulse (24)", extraBV: 7, level: 4},
            {id: "mineclearance", name: "Mine-Clearance (24)", level: 3},
            {id: "narc", name: "Narc-Equipped (24)", level: 2},
            {id: "semiguided", name: "Semi-Guided (24)", tagBV: 7, level: 2},
            {id: "smoke", name: "Smoke (24)", level: 3},
            {id: "swarm", name: "Swarm (24)", level: 3},
            {id: "swarmi", name: "Swarm-I (24)", extraBV: 1.4, level: 3},
        ]
    },
    {
        id: "is:nlrm10", 
        name: "Enhanced LRM 10", 
        ammoTypes: [
            {id: "standard", name: "Standard (12)"},
            {id: "arad", name: "Anti-Radiation (12)", extraBV: 3.9, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (12)", requirement:"artemisiv", level: 2},
            {id: "ftl", name: "Follow-the-Leader (6)", extraBV: 6.5, level: 4},
            {id: "fragmentation", name: "Fragmentation (12)", level: 2},
            {id: "heatseeking", name: "Heat-Seeking (6)", extraBV: 6.5, level: 3},
            {id: "incendiary", name: "Incendiary (12)", level: 3},
            {id: "magneticpulse", name: "Magnetic-Pulse (12)", extraBV: 13, level: 4},
            {id: "mineclearance", name: "Mine-Clearance (12)", level: 3},
            {id: "narc", name: "Narc-Equipped (12)", level: 2},
            {id: "semiguided", name: "Semi-Guided (12)", tagBV: 13, level: 2},
            {id: "smoke", name: "Smoke (12)", level: 3},
            {id: "swarm", name: "Swarm (12)", level: 3},
            {id: "swarmi", name: "Swarm-I (12)", extraBV: 2.6, level: 3},
        ]
    },
    {
        id: "is:nlrm15", 
        name: "Enhanced LRM 15", 
        ammoTypes: [
            {id: "standard", name: "Standard (8)"},
            {id: "arad", name: "Anti-Radiation (8)", extraBV: 6, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (8)", requirement:"artemisiv", level: 2},
            {id: "ftl", name: "Follow-the-Leader (4)", extraBV: 10, level: 4},
            {id: "fragmentation", name: "Fragmentation (8)", level: 2},
            {id: "heatseeking", name: "Heat-Seeking (4)", extraBV: 10, level: 3},
            {id: "incendiary", name: "Incendiary (8)", level: 3},
            {id: "magneticpulse", name: "Magnetic-Pulse (8)", extraBV: 20, level: 4},
            {id: "mineclearance", name: "Mine-Clearance (8)", level: 3},
            {id: "narc", name: "Narc-Equipped (8)", level: 2},
            {id: "semiguided", name: "Semi-Guided (8)", tagBV: 20, level: 2},
            {id: "smoke", name: "Smoke (8)", level: 3},
            {id: "swarm", name: "Swarm (8)", level: 3},
            {id: "swarmi", name: "Swarm-I (8)", extraBV: 4, level: 3},
        ]
    },
    {
        id: "is:nlrm20", 
        name: "Enhanced LRM 20", 
        ammoTypes: [
            {id: "standard", name: "Standard (6)"},
            {id: "arad", name: "Anti-Radiation (6)", extraBV: 7.8, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (6)", requirement:"artemisiv", level: 2},
            {id: "ftl", name: "Follow-the-Leader (3)", extraBV: 13, level: 4},
            {id: "fragmentation", name: "Fragmentation (6)", level: 2},
            {id: "heatseeking", name: "Heat-Seeking (3)", extraBV: 13, level: 3},
            {id: "incendiary", name: "Incendiary (6)", level: 3},
            {id: "magneticpulse", name: "Magnetic-Pulse (6)", extraBV: 26, level: 4},
            {id: "mineclearance", name: "Mine-Clearance (6)", level: 3},
            {id: "narc", name: "Narc-Equipped (6)", level: 2},
            {id: "semiguided", name: "Semi-Guided (6)", tagBV: 26, level: 2},
            {id: "smoke", name: "Smoke (6)", level: 3},
            {id: "swarm", name: "Swarm (6)", level: 3},
            {id: "swarmi", name: "Swarm-I (6)", extraBV: 5.2, level: 3},
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
        id: "is:mechmortar1", 
        name: "’Mech Mortar/1", 
        ammoTypes: [
            {id: "standard", name: "Armor Piercing (24)"},
            {id: "airburst", name: "Airburst (24)"},
            {id: "antipersonnel", name: "Anti-Personnel (24)"},
            {id: "flare", name: "Flare (24)"},
            {id: "semiguided", name: "Semi-Guided (24)", tagBV: 1},
            {id: "smoke", name: "Smoke (24)"},
        ]
    },
    {
        id: "is:mechmortar2", 
        name: "’Mech Mortar/2", 
        ammoTypes: [
            {id: "standard", name: "Armor Piercing (12)"},
            {id: "airburst", name: "Airburst (12)"},
            {id: "antipersonnel", name: "Anti-Personnel (12)"},
            {id: "flare", name: "Flare (12)"},
            {id: "semiguided", name: "Semi-Guided (12)", tagBV: 2},
            {id: "smoke", name: "Smoke (12)"},
        ]
    },
    {
        id: "is:mechmortar4", 
        name: "’Mech Mortar/4", 
        ammoTypes: [
            {id: "standard", name: "Armor Piercing (6)"},
            {id: "airburst", name: "Airburst (6)"},
            {id: "antipersonnel", name: "Anti-Personnel (6)"},
            {id: "flare", name: "Flare (6)"},
            {id: "semiguided", name: "Semi-Guided (6)", tagBV: 3},
            {id: "smoke", name: "Smoke (6)"},
        ]
    },
    {
        id: "is:mechmortar8", 
        name: "’Mech Mortar/8", 
        ammoTypes: [
            {id: "standard", name: "Armor Piercing (4)"},
            {id: "airburst", name: "Airburst (4)"},
            {id: "antipersonnel", name: "Anti-Personnel (4)"},
            {id: "flare", name: "Flare (4)"},
            {id: "semiguided", name: "Semi-Guided (4)", tagBV: 6},
            {id: "smoke", name: "Smoke (4)"},
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
            {id: "lrm-arad", name: "Anti-Radiation LRM (40)", extraBV: 1.2, level: 4},
            {id: "lrm-artemisiv", name: "Artemis IV-Equipped LRM (40)", requirement:"artemisiv", level: 2},
            {id: "lrm-ftl", name: "Follow-the-Leader LRM (20)", extraBV: 2, level: 4},
            {id: "lrm-fragmentation", name: "Fragmentation LRM (40)", level: 2},
            {id: "lrm-heatseeking", name: "Heat-Seeking LRM (20)", extraBV: 2, level: 3},
            {id: "lrm-incendiary", name: "Incendiary LRM (40)", level: 3},
            {id: "lrm-magneticpulse", name: "Magnetic-Pulse LRM (40)", extraBV: 4, level: 4},
            {id: "lrm-mineclearance", name: "Mine-Clearance LRM (40)", level: 3},
            {id: "lrm-narc", name: "Narc-Equipped LRM (40)", level: 2},
            {id: "lrm-semiguided", name: "Semi-Guided LRM (40)", tagBV: 4, level: 2},
            {id: "lrm-smoke", name: "Smoke LRM (40)", level: 3},
            {id: "lrm-swarm", name: "Swarm LRM (40)", level: 3},
            {id: "lrm-swarmi", name: "Swarm-I LRM (40)", extraBV: 0.8, level: 3},
            {id: "srm", name: "SRM (33)"},
            {id: "srm-acid", name: "Acid SRM (16)", extraBV: 4, level: 4},
            {id: "srm-arad", name: "Anti-Radiation SRM (33)", extraBV: 1.2, level: 4},
            {id: "srm-artemisiv", name: "Artemis IV-Equipped SRM (33)", requirement:"artemisiv", level: 2},
            {id: "srm-fragmentation", name: "Fragmentation SRM (33)", level: 2},
            {id: "srm-heatseeking", name: "Heat-Seeking SRM (16)", extraBV: 2, level: 3},
            {id: "srm-inferno", name: "Inferno SRM (33)", level: 2},
            {id: "srm-magneticpulse", name: "Magnetic-Pulse SRM (33)", extraBV: 4, level: 4},
            {id: "srm-mineclearance", name: "Mine-Clearance SRM (33)", level: 3},
            {id: "srm-narc", name: "Narc-Equipped SRM (33)", level: 2},
            {id: "srm-smoke", name: "Smoke SRM (33)", level: 3},
            {id: "srm-tandem", name: "Tandem-Charge SRM (16)", extraBV: 4, level: 4},
            {id: "srm-teargas", name: "Tear Gas SRM (33)", level: 3},
        ]
    },
    {
        id: "is:mml5",
        name: "MML 5",
        ammoTypes: [
            {id: "lrm", name: "LRM (24)"},
            {id: "lrm-arad", name: "Anti-Radiation LRM (24)", extraBV: 1.8, level: 4},
            {id: "lrm-artemisiv", name: "Artemis IV-Equipped LRM (24)", requirement:"artemisiv", level: 2},
            {id: "lrm-ftl", name: "Follow-the-Leader LRM (12)", extraBV: 3, level: 4},
            {id: "lrm-fragmentation", name: "Fragmentation LRM (24)", level: 2},
            {id: "lrm-heatseeking", name: "Heat-Seeking LRM (12)", extraBV: 3, level: 3},
            {id: "lrm-incendiary", name: "Incendiary LRM (24)", level: 3},
            {id: "lrm-magneticpulse", name: "Magnetic-Pulse LRM (24)", extraBV: 6, level: 4},
            {id: "lrm-mineclearance", name: "Mine-Clearance LRM (24)", level: 3},
            {id: "lrm-narc", name: "Narc-Equipped LRM (24)", level: 2},
            {id: "lrm-semiguided", name: "Semi-Guided LRM (24)", tagBV: 6, level: 2},
            {id: "lrm-smoke", name: "Smoke LRM (24)", level: 3},
            {id: "lrm-swarm", name: "Swarm LRM (24)", level: 3},
            {id: "lrm-swarmi", name: "Swarm-I LRM (24)", extraBV: 1.2, level: 3},
            {id: "srm", name: "SRM (20)"},
            {id: "srm-acid", name: "Acid SRM (10)", extraBV: 6, level: 4},
            {id: "srm-arad", name: "Anti-Radiation SRM (20)", extraBV: 1.8, level: 4},
            {id: "srm-artemisiv", name: "Artemis IV-Equipped SRM (20)", requirement:"artemisiv", level: 2},
            {id: "srm-fragmentation", name: "Fragmentation SRM (20)", level: 2},
            {id: "srm-heatseeking", name: "Heat-Seeking SRM (10)", extraBV: 3, level: 3},
            {id: "srm-inferno", name: "Inferno SRM (20)", level: 2},
            {id: "srm-magneticpulse", name: "Magnetic-Pulse SRM (20)", extraBV: 6, level: 4},
            {id: "srm-mineclearance", name: "Mine-Clearance SRM (20)", level: 3},
            {id: "srm-narc", name: "Narc-Equipped SRM (20)", level: 2},
            {id: "srm-smoke", name: "Smoke SRM (20)", level: 3},
            {id: "srm-tandem", name: "Tandem-Charge SRM (10)", extraBV: 6, level: 4},
            {id: "srm-teargas", name: "Tear Gas SRM (20)", level: 3},
        ]
    },
    {
        id: "is:mml7",
        name: "MML 7",
        ammoTypes: [
            {id: "lrm", name: "LRM (17)"},
            {id: "lrm-arad", name: "Anti-Radiation LRM (17)", extraBV: 2.4, level: 4},
            {id: "lrm-artemisiv", name: "Artemis IV-Equipped LRM (17)", requirement:"artemisiv", level: 2},
            {id: "lrm-ftl", name: "Follow-the-Leader LRM (8)", extraBV: 4, level: 4},
            {id: "lrm-fragmentation", name: "Fragmentation LRM (17)", level: 2},
            {id: "lrm-heatseeking", name: "Heat-Seeking LRM (8)", extraBV: 4, level: 3},
            {id: "lrm-incendiary", name: "Incendiary LRM (17)", level: 3},
            {id: "lrm-magneticpulse", name: "Magnetic-Pulse LRM (17)", extraBV: 8, level: 4},
            {id: "lrm-mineclearance", name: "Mine-Clearance LRM (17)", level: 3},
            {id: "lrm-narc", name: "Narc-Equipped LRM (17)", level: 2},
            {id: "lrm-semiguided", name: "Semi-Guided LRM (17)", tagBV: 8, level: 2},
            {id: "lrm-smoke", name: "Smoke LRM (17)", level: 3},
            {id: "lrm-swarm", name: "Swarm LRM (17)", level: 3},
            {id: "lrm-swarmi", name: "Swarm-I LRM (17)", extraBV: 1.6, level: 3},
            {id: "srm", name: "SRM (14)"},
            {id: "srm-acid", name: "Acid SRM (7)", extraBV: 8, level: 4},
            {id: "srm-arad", name: "Anti-Radiation SRM (14)", extraBV: 2.4, level: 4},
            {id: "srm-artemisiv", name: "Artemis IV-Equipped SRM (14)", requirement:"artemisiv", level: 2},
            {id: "srm-fragmentation", name: "Fragmentation SRM (14)", level: 2},
            {id: "srm-heatseeking", name: "Heat-Seeking SRM (7)", extraBV: 4, level: 3},
            {id: "srm-inferno", name: "Inferno SRM (14)", level: 2},
            {id: "srm-magneticpulse", name: "Magnetic-Pulse SRM (14)", extraBV: 8, level: 4},
            {id: "srm-mineclearance", name: "Mine-Clearance SRM (14)", level: 3},
            {id: "srm-narc", name: "Narc-Equipped SRM (14)", level: 2},
            {id: "srm-smoke", name: "Smoke SRM (14)", level: 3},
            {id: "srm-tandem", name: "Tandem-Charge SRM (7)", extraBV: 8, level: 4},
            {id: "srm-teargas", name: "Tear Gas SRM (14)", level: 3},
        ]
    },
    {
        id: "is:mml9",
        name: "MML 9",
        ammoTypes: [
            {id: "lrm", name: "LRM (13)"},
            {id: "lrm-arad", name: "Anti-Radiation LRM (13)", extraBV: 3.3, level: 4},
            {id: "lrm-artemisiv", name: "Artemis IV-Equipped LRM (13)", requirement:"artemisiv", level: 2},
            {id: "lrm-ftl", name: "Follow-the-Leader LRM (6)", extraBV: 5.5, level: 4},
            {id: "lrm-fragmentation", name: "Fragmentation LRM (13)", level: 2},
            {id: "lrm-heatseeking", name: "Heat-Seeking LRM (6)", extraBV: 5.5, level: 3},
            {id: "lrm-incendiary", name: "Incendiary LRM (13)", level: 3},
            {id: "lrm-magneticpulse", name: "Magnetic-Pulse LRM (13)", extraBV: 11, level: 4},
            {id: "lrm-mineclearance", name: "Mine-Clearance LRM (13)", level: 3},
            {id: "lrm-narc", name: "Narc-Equipped LRM (13)", level: 2},
            {id: "lrm-semiguided", name: "Semi-Guided LRM (13)", tagBV: 11, level: 2},
            {id: "lrm-smoke", name: "Smoke LRM (13)", level: 3},
            {id: "lrm-swarm", name: "Swarm LRM (13)", level: 3},
            {id: "lrm-swarmi", name: "Swarm-I LRM (13)", extraBV: 2.2, level: 3},
            {id: "srm", name: "SRM (11)"},
            {id: "srm-acid", name: "Acid SRM (5)", extraBV: 11, level: 4},
            {id: "srm-arad", name: "Anti-Radiation SRM (11)", extraBV: 3.3, level: 4},
            {id: "srm-artemisiv", name: "Artemis IV-Equipped SRM (11)", requirement:"artemisiv", level: 2},
            {id: "srm-fragmentation", name: "Fragmentation SRM (11)", level: 2},
            {id: "srm-heatseeking", name: "Heat-Seeking SRM (5)", extraBV: 5.5, level: 3},
            {id: "srm-inferno", name: "Inferno SRM (11)", level: 2},
            {id: "srm-magneticpulse", name: "Magnetic-Pulse SRM (11)", extraBV: 11, level: 4},
            {id: "srm-mineclearance", name: "Mine-Clearance SRM (11)", level: 3},
            {id: "srm-narc", name: "Narc-Equipped SRM (11)", level: 2},
            {id: "srm-smoke", name: "Smoke SRM (11)", level: 3},
            {id: "srm-tandem", name: "Tandem-Charge SRM (5)", extraBV: 11, level: 4},
            {id: "srm-teargas", name: "Tear Gas SRM (11)", level: 3},
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
            {id: "airdefense", name: "Air-Defense (5)"},
            {id: "cluster", name: "Cluster (5)"},
            {id: "homing", name: "Homing (5)", tagBV: 30},
            {id: "illumination", name: "Illumination (5)"},
            {id: "infernoiv", name: "Inferno-IV (5)"},
            {id: "laserinhibiting", name: "Laser-Inhibiting (2)"},
            {id: "smoke", name: "Smoke (5)"},
        ]
    },
    {
        id: "is:cruisemissile50", 
        name: "Cruise Missile/50", 
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
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
        id: "is:apds",
        name: "APDS",
        ammoTypes: [
            {id: "standard", name: "Standard (12)"},
        ]
    },
    {
        id: "is:mechtaser",
        name: "BattleMech Taser",
        ammoTypes: [
            {id: "standard", name: "Standard (5)"},
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
        id: "clan:pm-lb2xac",
        name: "LB 2-X AC",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "cluster", name: "Cluster"}
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
            {id: "flak", name: "Flak (40)"},
            {id: "flechette", name: "Flechette (40)"},
            {id: "tracer", name: "Tracer (40)", extraBV: 1, level: 3},
        ]
    },
    {
        id: "clan:pm-protomechac2",
        name: "ProtoMech AC/2",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "ap", name: "Armor-Piercing", shotMultiplier: 0.5},
            {id: "flak", name: "Flak"},
            {id: "flechette", name: "Flechette"},
            {id: "tracer", name: "Tracer", extraBV: 0.025, level: 3},
        ]
    },
    {
        id: "clan:protomechac4",
        name: "ProtoMech AC/4",
        ammoTypes: [
            {id: "standard", name: "Standard (20)"},
            {id: "ap", name: "Armor-Piercing (10)"},
            {id: "flak", name: "Flak (20)"},
            {id: "flechette", name: "Flechette (20)"},
            {id: "tracer", name: "Tracer (20)", extraBV: 1.5, level: 3},
        ]
    },
    {
        id: "clan:protomechac8",
        name: "ProtoMech AC/8",
        ammoTypes: [
            {id: "standard", name: "Standard (10)"},
            {id: "ap", name: "Armor-Piercing (5)"},
            {id: "flak", name: "Flak (10)"},
            {id: "flechette", name: "Flechette (10)"},
            {id: "tracer", name: "Tracer (10)", extraBV: 2, level: 3},
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
        id: "clan:thumper",
        name: "Thumper",
        ammoTypes: [
            {id: "standard", name: "Standard (20)"},
            {id: "copperhead", name: "Copperhead (20)", tagBV: 5},
        ]
    },
    {
        id: "clan:sniper",
        name: "Sniper",
        ammoTypes: [
            {id: "standard", name: "Standard (10)"},
            {id: "copperhead", name: "Copperhead (10)", tagBV: 11},
        ]
    },
    {
        id: "clan:longtom",
        name: "Long Tom",
        ammoTypes: [
            {id: "standard", name: "Standard (5)"},
            {id: "copperhead", name: "Copperhead (5)", tagBV: 46},
        ]
    },
    {
        id: "clan:thumpercannon",
        name: "Thumper Cannon",
        ammoTypes: [
            {id: "standard", name: "Standard (20)"},
        ]
    },
    {
        id: "clan:snipercannon",
        name: "Sniper Cannon",
        ammoTypes: [
            {id: "standard", name: "Standard (10)"},
        ]
    },
    {
        id: "clan:longtomcannon",
        name: "Long Tom Cannon",
        ammoTypes: [
            {id: "standard", name: "Standard (5)"},
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
        id: "clan:vehicleflamer",
        name: "Vehicle Flamer",
        ammoTypes: [
            {id: "standard", name: "Standard (20)"},
            {id: "coolant", name: "Coolant (20)", level: 3},
            {id: "inferno", name: "Inferno Fuel (20)", extraBV: 2, level: 3},
            {id: "water", name: "Water (20)", level: 3},
        ]
    },
    {
        id: "clan:heavyflamer",
        name: "Heavy Flamer",
        ammoTypes: [
            {id: "standard", name: "Standard (10)"},
            {id: "coolant", name: "Coolant (10)", level: 3},
            {id: "inferno", name: "Inferno Fuel (10)", extraBV: 4, level: 3},
            {id: "water", name: "Water (10)", level: 3},
        ]
    },
    {
        id: "clan:smallchemlaser",
        name: "Small Chemical Laser",
        ammoTypes: [
            {id: "standard", name: "Standard (60)"},
        ]
    },
    {
        id: "clan:mediumchemlaser",
        name: "Medium Chemical Laser",
        ammoTypes: [
            {id: "standard", name: "Standard (30)"},
        ]
    },
    {
        id: "clan:largechemlaser",
        name: "Large Chemical Laser",
        ammoTypes: [
            {id: "standard", name: "Standard (10)"},
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
        id: "clan:narc:os", 
        name: "Narc (OS)", 
        ammoTypes: [
            {id: "standard", name: "Homing"},
        ]
    },
    {
        id: "clan:atm3", 
        name: "ATM 3", 
        ammoTypes: [
            {id: "standard", name: "Standard (20)"},
            {id: "er", name: "Extended-Range (20)"},
            {id: "he", name: "High-Explosive (20)"},
        ]
    },
    {
        id: "clan:atm6", 
        name: "ATM 6", 
        ammoTypes: [
            {id: "standard", name: "Standard (10)"},
            {id: "er", name: "Extended-Range (10)"},
            {id: "he", name: "High-Explosive (10)"},
        ]
    },
    {
        id: "clan:atm9", 
        name: "ATM 9", 
        ammoTypes: [
            {id: "standard", name: "Standard (7)"},
            {id: "er", name: "Extended-Range (7)"},
            {id: "he", name: "High-Explosive (7)"},
        ]
    },
    {
        id: "clan:atm12", 
        name: "ATM 12", 
        ammoTypes: [
            {id: "standard", name: "Standard (5)"},
            {id: "er", name: "Extended-Range (5)"},
            {id: "he", name: "High-Explosive (5)"},
        ]
    },
    {
        id: "clan:iatm3", 
        name: "Improved ATM 3", 
        ammoTypes: [
            {id: "standard", name: "Standard (20)"},
            {id: "er", name: "Extended-Range (20)"},
            {id: "he", name: "High-Explosive (20)"},
            {id: "imp", name: "Improved Magnetic Pulse (20)", extraBV: 21},
            {id: "iiw", name: "Improved Inferno (20)", extraBV: 6.3},
        ]
    },
    {
        id: "clan:iatm6", 
        name: "Improved ATM 6", 
        ammoTypes: [
            {id: "standard", name: "Standard (10)"},
            {id: "er", name: "Extended-Range (10)"},
            {id: "he", name: "High-Explosive (10)"},
            {id: "imp", name: "Improved Magnetic Pulse (10)", extraBV: 39},
            {id: "iiw", name: "Improved Inferno (10)", extraBV: 11.7},
        ]
    },
    {
        id: "clan:iatm9", 
        name: "Improved ATM 9", 
        ammoTypes: [
            {id: "standard", name: "Standard (7)"},
            {id: "er", name: "Extended-Range (7)"},
            {id: "he", name: "High-Explosive (7)"},
            {id: "imp", name: "Improved Magnetic Pulse (7)", extraBV: 54},
            {id: "iiw", name: "Improved Inferno (7)", extraBV: 16.2},
        ]
    },
    {
        id: "clan:iatm12", 
        name: "Improved ATM 12", 
        ammoTypes: [
            {id: "standard", name: "Standard (5)"},
            {id: "er", name: "Extended-Range (5)"},
            {id: "he", name: "High-Explosive (5)"},
            {id: "imp", name: "Improved Magnetic Pulse (5)", extraBV: 78},
            {id: "iiw", name: "Improved Inferno (5)", extraBV: 23.4},
        ]
    },
    {
        id: "clan:fusillade", 
        name: "Fusillade", 
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "er", name: "Extended-Range (1)"},
            {id: "he", name: "High-Explosive (1)"},
            {id: "imp", name: "Improved Magnetic Pulse (1)", extraBV: 5.5},
            {id: "iiw", name: "Improved Inferno (1)", extraBV: 1.65},
        ]
    },
    {
        id: "clan:srm2", 
        name: "SRM 2", 
        ammoTypes: [
            {id: "standard", name: "Standard (50)"},
            {id: "arad", name: "Anti-Radiation (50)", extraBV: 0.9, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (50)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (50)", requirement:"artemisv"},
            {id: "heatseeking", name: "Heat-Seeking (25)", extraBV: 1.5, level: 3},
            {id: "inferno", name: "Inferno (50)"},
            {id: "narc", name: "Narc-Equipped (50)"},
            {id: "smoke", name: "Smoke (50)", level: 3},
        ]
    },
    {
        id: "clan:srm4", 
        name: "SRM 4", 
        ammoTypes: [
            {id: "standard", name: "Standard (25)"},
            {id: "arad", name: "Anti-Radiation (25)", extraBV: 1.5, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (25)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (25)", requirement:"artemisv"},
            {id: "heatseeking", name: "Heat-Seeking (12)", extraBV: 2.5, level: 3},
            {id: "inferno", name: "Inferno (25)"},
            {id: "narc", name: "Narc-Equipped (25)"},
            {id: "smoke", name: "Smoke (25)", level: 3},
        ]
    },
    {
        id: "clan:srm6", 
        name: "SRM 6", 
        ammoTypes: [
            {id: "standard", name: "Standard (15)"},
            {id: "arad", name: "Anti-Radiation (15)", extraBV: 2.1, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (15)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (15)", requirement:"artemisv"},
            {id: "heatseeking", name: "Heat-Seeking (7)", extraBV: 3.5, level: 3},
            {id: "inferno", name: "Inferno (15)"},
            {id: "narc", name: "Narc-Equipped (15)"},
            {id: "smoke", name: "Smoke (15)", level: 3},
        ]
    },
    {
        id: "clan:improvedsrm2", 
        name: "Improved SRM 2", 
        ammoTypes: [
            {id: "standard", name: "Standard (50)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (50)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (50)", requirement:"artemisv"},
            {id: "heatseeking", name: "Heat-Seeking (25)", extraBV: 2, level: 3},
            {id: "inferno", name: "Inferno (50)"},
            {id: "narc", name: "Narc-Equipped (50)"},
            {id: "smoke", name: "Smoke (50)", level: 3},
        ]
    },
    {
        id: "clan:improvedsrm4", 
        name: "Improved SRM 4", 
        ammoTypes: [
            {id: "standard", name: "Standard (25)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (25)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (25)", requirement:"artemisv"},
            {id: "heatseeking", name: "Heat-Seeking (15)", extraBV: 3.5, level: 3},
            {id: "inferno", name: "Inferno (25)"},
            {id: "narc", name: "Narc-Equipped (25)"},
            {id: "smoke", name: "Smoke (25)", level: 3},
        ]
    },
    {
        id: "clan:improvedsrm6", 
        name: "Improved SRM 6", 
        ammoTypes: [
            {id: "standard", name: "Standard (15)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (15)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (15)", requirement:"artemisv"},
            {id: "heatseeking", name: "Heat-Seeking (7)", extraBV: 5, level: 3},
            {id: "inferno", name: "Inferno (15)"},
            {id: "narc", name: "Narc-Equipped (15)"},
            {id: "smoke", name: "Smoke (15)", level: 3},
        ]
    },
    {
        id: "clan:srm2:os", 
        name: "SRM 2 (OS)", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "artemisiv", name: "Artemis IV-Equipped", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped", requirement:"artemisv"},
            {id: "heatseeking", name: "Heat-Seeking", extraBV: 2, level: 3},
            {id: "inferno", name: "Inferno"},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
        ]
    },
    {
        id: "clan:srm4:os", 
        name: "SRM 4 (OS)", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "artemisiv", name: "Artemis IV-Equipped", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped", requirement:"artemisv"},
            {id: "heatseeking", name: "Heat-Seeking", extraBV: 8, level: 3},
            {id: "inferno", name: "Inferno"},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
        ]
    },
    {
        id: "clan:srm6:os", 
        name: "SRM 6 (OS)", 
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "artemisiv", name: "Artemis IV-Equipped", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped", requirement:"artemisv"},
            {id: "heatseeking", name: "Heat-Seeking", extraBV: 12, level: 3},
            {id: "inferno", name: "Inferno"},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
        ]
    },
    { 
        id: "clan:srt2", 
        name: "SRT 2", 
        ammoTypes: [
            {id: "standard", name: "Standard (50)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (50)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (50)", requirement:"artemisv"},
        ]
    },
    {
        id: "clan:srt4", 
        name: "SRT 4", 
        ammoTypes: [
            {id: "standard", name: "Standard (25)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (25)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (25)", requirement:"artemisv"},
        ]
    },
    {
        id: "clan:srt6", 
        name: "SRT 6", 
        ammoTypes: [
            {id: "standard", name: "Standard (15)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (15)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (15)", requirement:"artemisv"},
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
        id: "clan:streaksrm2:os", 
        name: "Streak SRM 2 (OS)", 
        ammoTypes: [
            {id: "standard", name: "Standard"}
        ]
    },
    {
        id: "clan:streaksrm4:os", 
        name: "Streak SRM 4 (OS)", 
        ammoTypes: [
            {id: "standard", name: "Standard"}
        ]
    },
    {
        id: "clan:streaksrm6:os", 
        name: "Streak SRM 6 (OS)", 
        ammoTypes: [
            {id: "standard", name: "Standard"}
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
            {id: "arad", name: "Anti-Radiation (24)", extraBV: 2.1, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (24)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (24)", requirement:"artemisv"},
            {id: "ftl", name: "Follow-the-Leader (12)", extraBV: 3.5, level: 4},
            {id: "heatseeking", name: "Heat-Seeking (12)", extraBV: 3.5, level: 3},
            {id: "incendiary", name: "Incendiary (24)", level: 3},
            {id: "narc", name: "Narc-Equipped (24)"},
            {id: "smoke", name: "Smoke (24)", level: 3},
            {id: "swarm", name: "Swarm (24)", level: 3},
        ]
    },
    {
        id: "clan:lrm10", 
        name: "LRM 10", 
        ammoTypes: [
            {id: "standard", name: "Standard (12)"},
            {id: "arad", name: "Anti-Radiation (12)", extraBV: 4.2, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (12)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (12)", requirement:"artemisv"},
            {id: "ftl", name: "Follow-the-Leader (6)", extraBV: 7, level: 4},
            {id: "heatseeking", name: "Heat-Seeking (6)", extraBV: 7, level: 3},
            {id: "incendiary", name: "Incendiary (12)", level: 3},
            {id: "narc", name: "Narc-Equipped (12)"},
            {id: "smoke", name: "Smoke (12)", level: 3},
            {id: "swarm", name: "Swarm (12)", level: 3},
        ]
    },
    {
        id: "clan:lrm15", 
        name: "LRM 15", 
        ammoTypes: [
            {id: "standard", name: "Standard (8)"},
            {id: "arad", name: "Anti-Radiation (8)", extraBV: 6.3, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (8)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (8)", requirement:"artemisv"},
            {id: "ftl", name: "Follow-the-Leader (4)", extraBV: 10.5, level: 4},
            {id: "heatseeking", name: "Heat-Seeking (4)", extraBV: 10.5, level: 3},
            {id: "incendiary", name: "Incendiary (8)", level: 3},
            {id: "narc", name: "Narc-Equipped (8)"},
            {id: "smoke", name: "Smoke (8)", level: 3},
            {id: "swarm", name: "Swarm (8)", level: 3},
        ]
    },
    {
        id: "clan:lrm20", 
        name: "LRM 20", 
        ammoTypes: [
            {id: "standard", name: "Standard (6)"},
            {id: "arad", name: "Anti-Radiation (6)", extraBV: 8.1, level: 4},
            {id: "artemisiv", name: "Artemis IV-Equipped (6)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (6)", requirement:"artemisv"},
            {id: "ftl", name: "Follow-the-Leader (3)", extraBV: 13.5, level: 4},
            {id: "heatseeking", name: "Heat-Seeking (3)", extraBV: 13.5, level: 3},
            {id: "incendiary", name: "Incendiary (6)", level: 3},
            {id: "narc", name: "Narc-Equipped (6)"},
            {id: "smoke", name: "Smoke (6)", level: 3},
            {id: "swarm", name: "Swarm (6)", level: 3},
        ]
    },
    {
        id: "clan:improvedlrm5", 
        name: "Improved LRM 5", 
        ammoTypes: [
            {id: "standard", name: "Standard (24)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (24)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (24)", requirement:"artemisv"},
            {id: "heatseeking", name: "Heat-Seeking (12)", extraBV: 3, level: 3},
            {id: "incendiary", name: "Incendiary (24)", level: 3},
            {id: "narc", name: "Narc-Equipped (24)"},
            {id: "smoke", name: "Smoke (24)", level: 3},
            {id: "swarm", name: "Swarm (24)", level: 3},
        ]
    },
    {
        id: "clan:improvedlrm10", 
        name: "Improved LRM 10", 
        ammoTypes: [
            {id: "standard", name: "Standard (12)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (12)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (12)", requirement:"artemisv"},
            {id: "heatseeking", name: "Heat-Seeking (6)", extraBV: 5.5, level: 3},
            {id: "incendiary", name: "Incendiary (12)", level: 3},
            {id: "narc", name: "Narc-Equipped (12)"},
            {id: "smoke", name: "Smoke (12)", level: 3},
            {id: "swarm", name: "Swarm (12)", level: 3},
        ]
    },
    {
        id: "clan:improvedlrm15", 
        name: "Improved LRM 15", 
        ammoTypes: [
            {id: "standard", name: "Standard (8)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (8)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (8)", requirement:"artemisv"},
            {id: "heatseeking", name: "Heat-Seeking (4)", extraBV: 8.5, level: 3},
            {id: "incendiary", name: "Incendiary (8)", level: 3},
            {id: "narc", name: "Narc-Equipped (8)"},
            {id: "smoke", name: "Smoke (8)", level: 3},
            {id: "swarm", name: "Swarm (8)", level: 3},
        ]
    },
    {
        id: "clan:improvedlrm20", 
        name: "Improved LRM 20", 
        ammoTypes: [
            {id: "standard", name: "Standard (6)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (6)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (6)", requirement:"artemisv"},
            {id: "heatseeking", name: "Heat-Seeking (3)", extraBV: 11.5, level: 3},
            {id: "incendiary", name: "Incendiary (6)", level: 3},
            {id: "narc", name: "Narc-Equipped (6)"},
            {id: "smoke", name: "Smoke (6)", level: 3},
            {id: "swarm", name: "Swarm (6)", level: 3},
        ]
    },
    {
        id: "clan:lrt5", 
        name: "LRT 5", 
        ammoTypes: [
            {id: "standard", name: "Standard (24)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (24)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (24)", requirement:"artemisv"},
        ]
    },
    {
        id: "clan:lrt10", 
        name: "LRT 10", 
        ammoTypes: [
            {id: "standard", name: "Standard (12)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (12)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (12)", requirement:"artemisv"},
        ]
    },
    {
        id: "clan:lrt15", 
        name: "LRT 15", 
        ammoTypes: [
            {id: "standard", name: "Standard (8)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (8)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (8)", requirement:"artemisv"},
        ]
    },
    {
        id: "clan:lrt20", 
        name: "LRT 20", 
        ammoTypes: [
            {id: "standard", name: "Standard (6)"},
            {id: "artemisiv", name: "Artemis IV-Equipped (6)", requirement:"artemisiv"},
            {id: "artemisv", name: "Artemis V-Equipped (6)", requirement:"artemisv"},
        ]
    },
    {
        id: "clan:mechmortar1", 
        name: "’Mech Mortar/1", 
        ammoTypes: [
            {id: "standard", name: "Armor Piercing (24)"},
            {id: "airburst", name: "Airburst (24)"},
            {id: "antipersonnel", name: "Anti-Personnel (24)"},
            {id: "flare", name: "Flare (24)"},
            {id: "smoke", name: "Smoke (24)"},
        ]
    },
    {
        id: "clan:mechmortar2", 
        name: "’Mech Mortar/2", 
        ammoTypes: [
            {id: "standard", name: "Armor Piercing (12)"},
            {id: "airburst", name: "Airburst (12)"},
            {id: "antipersonnel", name: "Anti-Personnel (12)"},
            {id: "flare", name: "Flare (12)"},
            {id: "smoke", name: "Smoke (12)"},
        ]
    },
    {
        id: "clan:mechmortar4", 
        name: "’Mech Mortar/4", 
        ammoTypes: [
            {id: "standard", name: "Armor Piercing (6)"},
            {id: "airburst", name: "Airburst (6)"},
            {id: "antipersonnel", name: "Anti-Personnel (6)"},
            {id: "flare", name: "Flare (6)"},
            {id: "smoke", name: "Smoke (6)"},
        ]
    },
    {
        id: "clan:mechmortar8", 
        name: "’Mech Mortar/8", 
        ammoTypes: [
            {id: "standard", name: "Armor Piercing (4)"},
            {id: "airburst", name: "Airburst (4)"},
            {id: "antipersonnel", name: "Anti-Personnel (4)"},
            {id: "flare", name: "Flare (4)"},
            {id: "smoke", name: "Smoke (4)"},
        ]
    },
    {
        id: "clan:arrowiv", 
        name: "Arrow IV", 
        ammoTypes: [
            {id: "standard", name: "Standard (5)"},
            {id: "cluster", name: "Cluster (5)"},
            {id: "homing", name: "Homing (5)", tagBV: 30},
            {id: "illumination", name: "Illumination (5)"},
            {id: "smoke", name: "Smoke (5)"},
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
        id: "is:ba-lrm1",
        name: "LRM 1",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-lrm2",
        name: "LRM 2",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-lrm3",
        name: "LRM 3",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-lrm4",
        name: "LRM 4",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-lrm5",
        name: "LRM 5",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-lrm1:os",
        name: "LRM 1 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-lrm2:os",
        name: "LRM 2 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-lrm3:os",
        name: "LRM 3 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-lrm4:os",
        name: "LRM 4 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-lrm5:os",
        name: "LRM 5 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-mrm1",
        name: "MRM 1",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"}
        ]
    },
    {
        id: "is:ba-mrm2",
        name: "MRM 2",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"}
        ]
    },
    {
        id: "is:ba-mrm3",
        name: "MRM 3",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"}
        ]
    },
    {
        id: "is:ba-mrm4",
        name: "MRM 4",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"}
        ]
    },
    {
        id: "is:ba-mrm5",
        name: "MRM 5",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"}
        ]
    },
    {
        id: "is:ba-mrm1:os",
        name: "MRM 1 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"}
        ]
    },
    {
        id: "is:ba-mrm2:os",
        name: "MRM 2 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"}
        ]
    },
    {
        id: "is:ba-mrm3:os",
        name: "MRM 3 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"}
        ]
    },
    {
        id: "is:ba-mrm4:os",
        name: "MRM 4 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"}
        ]
    },
    {
        id: "is:ba-mrm5:os",
        name: "MRM 5 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"}
        ]
    },
    {
        id: "is:ba-rl1",
        name: "RL 1",
        ammoTypes: [
            {id: "standard", name: "Standard"}
        ]
    },
    {
        id: "is:ba-rl2",
        name: "RL 2",
        ammoTypes: [
            {id: "standard", name: "Standard"}
        ]
    },
    {
        id: "is:ba-rl3",
        name: "RL 3",
        ammoTypes: [
            {id: "standard", name: "Standard"}
        ]
    },
    {
        id: "is:ba-rl4",
        name: "RL 4",
        ammoTypes: [
            {id: "standard", name: "Standard"}
        ]
    },
    {
        id: "is:ba-rl5",
        name: "RL 5",
        ammoTypes: [
            {id: "standard", name: "Standard"}
        ]
    },
    {
        id: "is:ba-srm1",
        name: "SRM 1",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "inferno", name: "Inferno (1)"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-srm2",
        name: "SRM 2",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "inferno", name: "Inferno (1)"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-srm3",
        name: "SRM 3",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "inferno", name: "Inferno (1)"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-srm4",
        name: "SRM 4",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "inferno", name: "Inferno (1)"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-srm5",
        name: "SRM 5",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "inferno", name: "Inferno (1)"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-srm6",
        name: "SRM 6",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "inferno", name: "Inferno (1)"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-srm1:os",
        name: "SRM 1 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "inferno", name: "Inferno"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-srm2:os",
        name: "SRM 2 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "inferno", name: "Inferno"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-srm3:os",
        name: "SRM 3 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "inferno", name: "Inferno"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-srm4:os",
        name: "SRM 4 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "inferno", name: "Inferno"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-srm5:os",
        name: "SRM 5 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "inferno", name: "Inferno"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "is:ba-srm6:os",
        name: "SRM 6 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "inferno", name: "Inferno"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-lrm1",
        name: "LRM 1",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "multipurpose", name: "Multi-Purpose (1)", requirement:"umu"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-lrm2",
        name: "LRM 2",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "multipurpose", name: "Multi-Purpose (1)", requirement:"umu"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-lrm3",
        name: "LRM 3",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "multipurpose", name: "Multi-Purpose (1)", requirement:"umu"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-lrm4",
        name: "LRM 4",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "multipurpose", name: "Multi-Purpose (1)", requirement:"umu"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-lrm5",
        name: "LRM 5",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "multipurpose", name: "Multi-Purpose (1)", requirement:"umu"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-lrm1:os",
        name: "LRM 1 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "multipurpose", name: "Multi-Purpose", requirement:"umu"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-lrm2:os",
        name: "LRM 2 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "multipurpose", name: "Multi-Purpose", requirement:"umu"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-lrm3:os",
        name: "LRM 3 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "multipurpose", name: "Multi-Purpose", requirement:"umu"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-lrm4:os",
        name: "LRM 4 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "multipurpose", name: "Multi-Purpose", requirement:"umu"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-lrm5:os",
        name: "LRM 5 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "multipurpose", name: "Multi-Purpose", requirement:"umu"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-srm1",
        name: "SRM 1",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "inferno", name: "Inferno (1)"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
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
    },
    {
        id: "clan:ba-srm3",
        name: "SRM 3",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "inferno", name: "Inferno (1)"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-srm4",
        name: "SRM 4",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "inferno", name: "Inferno (1)"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-srm5",
        name: "SRM 5",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "inferno", name: "Inferno (1)"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-srm6",
        name: "SRM 6",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
            {id: "inferno", name: "Inferno (1)"},
            {id: "torpedo", name: "Torpedo (1)", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-srm1:os",
        name: "SRM 1 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "inferno", name: "Inferno"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-srm2:os",
        name: "SRM 2 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "inferno", name: "Inferno"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-srm3:os",
        name: "SRM 3 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "inferno", name: "Inferno"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-srm4:os",
        name: "SRM 4 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "inferno", name: "Inferno"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-srm5:os",
        name: "SRM 5 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "inferno", name: "Inferno"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-srm6:os",
        name: "SRM 6 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "inferno", name: "Inferno"},
            {id: "torpedo", name: "Torpedo", requirement:"umu"}
        ]
    },
    {
        id: "clan:ba-advancedsrm1",
        name: "Advanced SRM 1",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
        ]
    },
    {
        id: "clan:ba-advancedsrm2",
        name: "Advanced SRM 2",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
        ]
    },
    {
        id: "clan:ba-advancedsrm3",
        name: "Advanced SRM 3",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
        ]
    },
    {
        id: "clan:ba-advancedsrm4",
        name: "Advanced SRM 4",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
        ]
    },
    {
        id: "clan:ba-advancedsrm5",
        name: "Advanced SRM 5",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
        ]
    },
    {
        id: "clan:ba-advancedsrm6",
        name: "Advanced SRM 6",
        ammoTypes: [
            {id: "standard", name: "Standard (1)"},
        ]
    },
    {
        id: "clan:ba-advancedsrm1:os",
        name: "Advanced SRM 1 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "clan:ba-advancedsrm2:os",
        name: "Advanced SRM 2 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "clan:ba-advancedsrm3:os",
        name: "Advanced SRM 3 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "clan:ba-advancedsrm4:os",
        name: "Advanced SRM 4 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "clan:ba-advancedsrm5:os",
        name: "Advanced SRM 5 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "clan:ba-advancedsrm6:os",
        name: "Advanced SRM 6 (OS)",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "clan:pm-machinegun",
        name: "Machine Gun",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "clan:pm-lightmachinegun",
        name: "Light Machine Gun",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "clan:pm-apgaussrifle",
        name: "AP Gauss Rifle",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "clan:pm-mediumchemlaser",
        name: "Medium Chemical Laser",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "clan:pm-plasmacannon",
        name: "Plasma Cannon",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "clan:pm-lrm1",
        name: "LRM 1",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.005, level: 4},
            {id: "ftl", name: "Follow-the-Leader", shotMultiplier: 0.5, extraBV: 0.008, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", shotMultiplier: 0.5, extraBV: 0.008, level: 3},
            {id: "incendiary", name: "Incendiary", level: 3},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "swarm", name: "Swarm", level: 3},
        ]
    },
    {
        id: "clan:pm-lrm2",
        name: "LRM 2",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.015, level: 4},
            {id: "ftl", name: "Follow-the-Leader", shotMultiplier: 0.5, extraBV: 0.025, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", shotMultiplier: 0.5, extraBV: 0.025, level: 3},
            {id: "incendiary", name: "Incendiary", level: 3},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "swarm", name: "Swarm", level: 3},
        ]
    },
    {
        id: "clan:pm-lrm3",
        name: "LRM 3",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.0225, level: 4},
            {id: "ftl", name: "Follow-the-Leader", shotMultiplier: 0.5, extraBV: 0.038, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", shotMultiplier: 0.5, extraBV: 0.038, level: 3},
            {id: "incendiary", name: "Incendiary", level: 3},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "swarm", name: "Swarm", level: 3},
        ]
    },
    {
        id: "clan:pm-lrm4",
        name: "LRM 4",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.06, level: 4},
            {id: "ftl", name: "Follow-the-Leader", shotMultiplier: 0.5, extraBV: 0.1, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", shotMultiplier: 0.5, extraBV: 0.1, level: 3},
            {id: "incendiary", name: "Incendiary", level: 3},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "swarm", name: "Swarm", level: 3},
        ]
    },
    {
        id: "clan:pm-lrm5",
        name: "LRM 5",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.0875, level: 4},
            {id: "ftl", name: "Follow-the-Leader", shotMultiplier: 0.5, extraBV: 0.146, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", shotMultiplier: 0.5, extraBV: 0.146, level: 3},
            {id: "incendiary", name: "Incendiary", level: 3},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "swarm", name: "Swarm", level: 3},
        ]
    },
    {
        id: "clan:pm-lrm6",
        name: "LRM 6",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.135, level: 4},
            {id: "ftl", name: "Follow-the-Leader", shotMultiplier: 0.5, extraBV: 0.225, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", shotMultiplier: 0.5, extraBV: 0.225, level: 3},
            {id: "incendiary", name: "Incendiary", level: 3},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "swarm", name: "Swarm", level: 3},
        ]
    },
    {
        id: "clan:pm-lrm7",
        name: "LRM 7",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.175, level: 4},
            {id: "ftl", name: "Follow-the-Leader", shotMultiplier: 0.5, extraBV: 0.292, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", shotMultiplier: 0.5, extraBV: 0.292, level: 3},
            {id: "incendiary", name: "Incendiary", level: 3},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "swarm", name: "Swarm", level: 3},
        ]
    },
    {
        id: "clan:pm-lrm8",
        name: "LRM 8",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.22, level: 4},
            {id: "ftl", name: "Follow-the-Leader", shotMultiplier: 0.5, extraBV: 0.367, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", shotMultiplier: 0.5, extraBV: 0.367, level: 3},
            {id: "incendiary", name: "Incendiary", level: 3},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "swarm", name: "Swarm", level: 3},
        ]
    },
    {
        id: "clan:pm-lrm9",
        name: "LRM 9",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.27, level: 4},
            {id: "ftl", name: "Follow-the-Leader", shotMultiplier: 0.5, extraBV: 0.450, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", shotMultiplier: 0.5, extraBV: 0.450, level: 3},
            {id: "incendiary", name: "Incendiary", level: 3},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "swarm", name: "Swarm", level: 3},
        ]
    },
    {
        id: "clan:pm-lrm10",
        name: "LRM 10",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.35, level: 4},
            {id: "ftl", name: "Follow-the-Leader", shotMultiplier: 0.5, extraBV: 0.583, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", shotMultiplier: 0.5, extraBV: 0.583, level: 3},
            {id: "incendiary", name: "Incendiary", level: 3},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "swarm", name: "Swarm", level: 3},
        ]
    },
    {
        id: "clan:pm-lrm11",
        name: "LRM 11",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.44, level: 4},
            {id: "ftl", name: "Follow-the-Leader", shotMultiplier: 0.5, extraBV: 0.733, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", shotMultiplier: 0.5, extraBV: 0.733, level: 3},
            {id: "incendiary", name: "Incendiary", level: 3},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "swarm", name: "Swarm", level: 3},
        ]
    },
    {
        id: "clan:pm-lrm12",
        name: "LRM 12",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.54, level: 4},
            {id: "ftl", name: "Follow-the-Leader", shotMultiplier: 0.5, extraBV: 0.900, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", shotMultiplier: 0.5, extraBV: 0.900, level: 3},
            {id: "incendiary", name: "Incendiary", level: 3},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "swarm", name: "Swarm", level: 3},
        ]
    },
    {
        id: "clan:pm-lrm13",
        name: "LRM 13",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.617, level: 4},
            {id: "ftl", name: "Follow-the-Leader", shotMultiplier: 0.5, extraBV: 1.029, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", shotMultiplier: 0.5, extraBV: 1.029, level: 3},
            {id: "incendiary", name: "Incendiary", level: 3},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "swarm", name: "Swarm", level: 3},
        ]
    },
    {
        id: "clan:pm-lrm14",
        name: "LRM 14",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.70, level: 4},
            {id: "ftl", name: "Follow-the-Leader", shotMultiplier: 0.5, extraBV: 1.166, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", shotMultiplier: 0.5, extraBV: 1.166, level: 3},
            {id: "incendiary", name: "Incendiary", level: 3},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "swarm", name: "Swarm", level: 3},
        ]
    },
    {
        id: "clan:pm-lrm15",
        name: "LRM 15",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.787, level: 4},
            {id: "ftl", name: "Follow-the-Leader", shotMultiplier: 0.5, extraBV: 1.312, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", shotMultiplier: 0.5, extraBV: 1.312, level: 3},
            {id: "incendiary", name: "Incendiary", level: 3},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
            {id: "swarm", name: "Swarm", level: 3},
        ]
    },
    {
        id: "clan:pm-streaklrm5",
        name: "Streak LRM 5",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "clan:pm-srm1",
        name: "SRM 1",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.006, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", extraBV: 0.01, level: 3},
            {id: "inferno", name: "Inferno"},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
        ]
    },
    {
        id: "clan:pm-srm2",
        name: "SRM 2",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.018, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", extraBV: 0.03, level: 3},
            {id: "inferno", name: "Inferno"},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
        ]
    },
    {
        id: "clan:pm-srm3",
        name: "SRM 3",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.036, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", extraBV: 0.06, level: 3},
            {id: "inferno", name: "Inferno"},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
        ]
    },
    {
        id: "clan:pm-srm4",
        name: "SRM 4",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.06, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", extraBV: 0.1, level: 3},
            {id: "inferno", name: "Inferno"},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
        ]
    },
    {
        id: "clan:pm-srm5",
        name: "SRM 5",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.09, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", extraBV: 0.15, level: 3},
            {id: "inferno", name: "Inferno"},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
        ]
    },
    {
        id: "clan:pm-srm6",
        name: "SRM 6",
        ammoTypes: [
            {id: "standard", name: "Standard"},
            {id: "arad", name: "Anti-Radiation", extraBV: 0.126, level: 4},
            {id: "heatseeking", name: "Heat-Seeking", extraBV: 0.21, level: 3},
            {id: "inferno", name: "Inferno"},
            {id: "narc", name: "Narc-Equipped"},
            {id: "smoke", name: "Smoke", level: 3},
        ]
    },
    {
        id: "clan:pm-streaksrm1",
        name: "Streak SRM 1",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "clan:pm-streaksrm2",
        name: "Streak SRM 2",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "clan:pm-streaksrm3",
        name: "Streak SRM 3",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "clan:pm-streaksrm4",
        name: "Streak SRM 4",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "clan:pm-streaksrm5",
        name: "Streak SRM 5",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "clan:pm-streaksrm6",
        name: "Streak SRM 6",
        ammoTypes: [
            {id: "standard", name: "Standard"},
        ]
    },
    {
        id: "minedispenser",
        name: "Mine Dispenser",
        ammoTypes: [
            {id: "standard", name: "Standard (2)"},
        ]
    },
    {
        id: "ba-minedispenser",
        name: "Mine Dispenser",
        ammoTypes: [
            {id: "standard", name: "Standard (2)"},
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
