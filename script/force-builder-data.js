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
            {id: "caseless", name: "Caseless"},
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
            {id: "caseless", name: "Caseless"},
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
            {id: "caseless", name: "Caseless"},
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
            {id: "caseless", name: "Caseless"},
            {id: "flechette", name: "Flechette"},
            {id: "precision", name: "Precision"}
        ]
    },
    {
        id: "is:nrc", 
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
            {id: "semiguided", name: "Semi-Guided"}
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
            {id: "semiguided", name: "Semi-Guided"}
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
            {id: "semiguided", name: "Semi-Guided"}
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
            {id: "semiguided", name: "Semi-Guided"}
        ]
    },
];

function getWeaponName(weaponId) {
    const weapon = knownWeapons.find((x) => x.id == weaponId);
    return weapon ? weapon.name : weaponId;
}

function getAmmoName(weaponId, ammoId) {
    const weapon = knownWeapons.find((x) => x.id == weaponId);
    const ammo = weapon ? weapon.ammoTypes.find((x) => x.id == ammoId) : undefined;
    return ammo ? ammo.name : ammoId;
}

function getAmmoTypes(weaponId) {
    const weapon = knownWeapons.find((x) => x.id == weaponId);
    return weapon ? weapon.ammoTypes : [{id: "standard", name: "Standard"}];
}
