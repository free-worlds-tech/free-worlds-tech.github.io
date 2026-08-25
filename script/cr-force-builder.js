function readyInterface() {
    document.querySelectorAll(".lazy").forEach((lazyElement) => {
        lazyElement.removeAttribute("disabled");
    });
};

class DataClass {
    #listeners = {};

    addPropertyObserver(propertyName, observer) {
        if (this.#listeners[propertyName] == undefined) {
            this.#listeners[propertyName] = [];
        }
        this.#listeners[propertyName].push(observer);
    }

    removePropertyObserver(propertyName, observer) {
        if (this.#listeners[propertyName]) {
            const i = this.#listeners[propertyName].indexOf(observer);
            this.#listeners[propertyName].splice(i, 1);
        }
    }

    propertyChanged(propertyName, update) {
        if (this.#listeners[propertyName]) {
            this.#listeners[propertyName].forEach((observer) => {
                observer(update);
            });
        }
    }
}

class Force extends DataClass {
    #name = "BattleTech Force";
    #formations = [];
    support = [];
    #era = "any";
    #faction = "any";

    constructor() {
        super();
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        if (this.#name != value) {
            this.#name = value;
            this.propertyChanged("name", value);
        }
    }

    get era() {
        return this.#era;
    }

    set era(value) {
        if (this.#era != value) {
            this.#era = value;
            this.propertyChanged("era", value);
        }
    }

    get faction() {
        return this.#faction;
    }

    set faction(value) {
        if (this.#faction != value) {
            this.#faction = value;
            this.propertyChanged("faction", value);
        }
    }

    addFormation(formation) {
        this.#formations.push(formation);

        formation.addPropertyObserver("battleValue", () => this.propertyChanged("battleValue", this.battleValue));
        formation.addPropertyObserver("unitCount", () => this.propertyChanged("unitCount", this.unitCount));
    }

    removeFormation(formation) {
        const i = this.#formations.indexOf(formation);
        this.#formations.splice(i, 1);

        this.propertyChanged("battleValue", this.battleValue);
        this.propertyChanged("unitCount", this.unitCount);
    }

    forEachFormation(action) {
        this.#formations.forEach((formation) => {
            action(formation);
        });
    }

    get battleValue() {
        let bv = 0;
        this.#formations.forEach((formation) => {
            bv += formation.battleValue;
        });
        return bv;
    }

    get unitCount() {
        let count = 0;
        this.#formations.forEach((formation) => {
            count += formation.unitCount;
        });
        return count;
    }
}

class Formation extends DataClass {
    #name = "";
    #units = [];

    constructor(name) {
        super();
        this.#name = name;
        this.#units = [];
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        if (this.#name != value) {
            this.#name = value;
            this.propertyChanged("name", value);
        }
    }

    get battleValue() {
        let bv = 0;
        this.#units.forEach((unit) => {
            bv += unit.adjustedBV;
        });
        return bv;
    }

    addUnit(unit) {
        this.#units.push(unit);
        this.propertyChanged("units", { add: unit });
        this.propertyChanged("unitCount", this.unitCount);
        this.propertyChanged("battleValue", this.battleValue);
    }

    removeUnit(unit) {
        var i = this.#units.indexOf(unit);
        if (i >= 0) {
            this.#units.splice(i, 1);
            this.propertyChanged("units", { remove: unit });
            this.propertyChanged("unitCount", this.unitCount);
            this.propertyChanged("battleValue", this.battleValue);
        }
    }

    get unitCount() {
        return this.#units.length;
    }

    forEachUnit(action) {
        this.#units.forEach(unit => { 
            action(unit);
        });
    }
}

class Unit {
    constructor(name, bv, tonnage) {
        this.name = name;
        this.baseBV = bv;
        this.adjustedBV = bv;
        this.tonnage = tonnage;
    }
    name;
    baseBV;
    adjustedBV;
    tonnage;
}

class BattlefieldSupportElement {
    constructor(name, points, type) {
        this.name = name;
        this.points = points;
        this.supportType = type;
    }
    name;
    points;
    supportType;
}

function buildInitialForce() {
    let initialForce = new Force();
    initialForce.name = "BattleTech Force";

    let formation = new Formation("Formation 1");

    initialForce.addFormation(formation);
    initialForce.support = [];

    return initialForce;
}

function addForceStats() {
    const forceStatsContiner = document.getElementById("force-stats");

    const eraDisplay = document.createElement("div");
    eraDisplay.innerText = force.era == "any" ? "No Era Chosen" : getEraDisplayName(force.era);
    force.addPropertyObserver("era", (eraId) => {
        eraDisplay.innerText = eraId == "any" ? "No Era Chosen" : getEraDisplayName(eraId);
    });
    forceStatsContiner.appendChild(eraDisplay);

    const factionDisplay = document.createElement("div");
    factionDisplay.innerText = force.faction == "any" ? "No Faction Chosen" : getFactionDisplayName(force.faction);
    force.addPropertyObserver("faction", (factionId) => {
        factionDisplay.innerText = factionId == "any" ? "No Faction Chosen" : getFactionDisplayName(factionId);
    });
    forceStatsContiner.appendChild(factionDisplay);

    const countDisplay = document.createElement("div");
    countDisplay.innerText = `${force.unitCount} units`;
    force.addPropertyObserver("unitCount", (count) => {
        countDisplay.innerText = `${count} units`;
    });
    forceStatsContiner.appendChild(countDisplay);

    const bvDisplay = document.createElement("div");
    bvDisplay.innerText = `${force.battleValue.toLocaleString("en-us")} BV`;
    force.addPropertyObserver("battleValue", (bv) => {
        bvDisplay.innerText = `${bv.toLocaleString("en-us")} BV`;
    });
    forceStatsContiner.appendChild(bvDisplay);
}

function addFormationUI(formation) {
    const nameListener = (newValue) => {
        formationName.innerText = newValue;
    };

    const formationContainer = document.createElement("details");
    formationContainer.setAttribute("open", "open");

    const formationHeading = document.createElement("summary");

    formationHeading.classList.add("adv-summary");

    const formationName = document.createElement("div");
    formationName.innerText = formation.name;
    formationHeading.appendChild(formationName);

    const formationStats = document.createElement("div");
    formationStats.innerText = `${formation.unitCount} units • ${formation.battleValue.toLocaleString("en-us")} BV`;
    formationHeading.appendChild(formationStats);

    formationContainer.appendChild(formationHeading);

    const buttons = document.createElement("div");
    buttons.classList.add("toolbar");
    formationContainer.appendChild(buttons);

    const editButton = document.createElement("button");
    editButton.innerHTML = `<span class="material-symbols-outlined">edit_note</span>`;
    editButton.title = "Edit Formation";
    editButton.addEventListener("click", () => {
        showEditFormationPanel(formation);
    });
    buttons.appendChild(editButton);

    const addMechButton = document.createElement("button");
    addMechButton.innerHTML = `<span class="material-symbols-outlined">add</span>`;
    addMechButton.title = "Add 'Mech";
    addMechButton.addEventListener("click", () => {
        showAddMechPanel(formation);
    });
    buttons.appendChild(addMechButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
    deleteButton.title = "Delete Formation";
    deleteButton.classList.add("destructive");
    buttons.appendChild(deleteButton);

    const formationUnitList = document.createElement("div");
    formation.forEachUnit((unit) => {
        const unitEntry = createUnitInFormationRow(formation, unit);
        formationUnitList.appendChild(unitEntry);
    });

    formationContainer.appendChild(formationUnitList);

    document.getElementById("formation-list").appendChild(formationContainer);

    const unitsListener = (changed) => {
        formationUnitList.innerHTML = "";
        formation.forEachUnit((unit) => {
            const unitEntry = createUnitInFormationRow(formation, unit);
            formationUnitList.appendChild(unitEntry);
        });

        formationStats.innerText = `${formation.unitCount} units • ${formation.battleValue.toLocaleString("en-us")} BV`;
    };

    formation.addPropertyObserver("name", nameListener);

    formation.addPropertyObserver("units", unitsListener);

    deleteButton.addEventListener("click", () => {
        force.removeFormation(formation);
        document.getElementById("formation-list").removeChild(formationContainer);
        formation.removePropertyObserver("name", nameListener);
        formation.removePropertyObserver("units", unitsListener);
    });
}

function addSupportUI(force) {
    const supportContainer = document.createElement("details");
    const supportHeading = document.createElement("summary");

    let bsp = 0;
    let assets = 0;
    let strikes = 0;
    force.support.forEach((supportElement) => {
        bsp += supportElement.points;
        switch (supportElement.supportType) {
            case "asset": assets++; break;
            case "strike": strikes++; break;
        }
    });

    supportHeading.classList.add("adv-summary");

    const supportLabel = document.createElement("div");
    supportLabel.innerText = "Battlefield Support";
    supportHeading.appendChild(supportLabel);

    const supportStats = document.createElement("div");
    supportStats.innerText = `${assets} assets, ${strikes} strikes • ${bsp} BSP`;
    supportHeading.appendChild(supportStats);

    supportContainer.appendChild(supportHeading);

    const buttons = document.createElement("div");
    buttons.classList.add("toolbar");
    supportContainer.appendChild(buttons);

    const addStrikeButton = document.createElement("button");
    addStrikeButton.innerHTML = `<span class="material-symbols-outlined">explosion</span>`;
    addStrikeButton.title = "Add Strike";
    addStrikeButton.setAttribute("disabled", "disabled");
    buttons.appendChild(addStrikeButton);

    const addAssetButton = document.createElement("button");
    addAssetButton.innerHTML = `<span class="material-symbols-outlined">local_shipping</span>`;
    addAssetButton.title = "Add Asset";
    addAssetButton.setAttribute("disabled", "disabled");
    buttons.appendChild(addAssetButton);

    force.support.forEach((supportElement) => {
        const elementEntry = document.createElement("div");
        elementEntry.classList.add("summary-line");

        const elementName = document.createElement("div");
        elementName.innerText = supportElement.name;
        elementEntry.appendChild(elementName);

        const elementStats = document.createElement("div");
        elementStats.innerText = `${supportElement.supportType} • ${supportElement.points} BSP`;
        elementEntry.appendChild(elementStats);

        supportContainer.appendChild(elementEntry);
    });

    document.getElementById("support-list").appendChild(supportContainer);
}

function showEditForcePanel() {
    const panelHost = document.getElementById("panel-host");
    const forceView = document.getElementById("force-view");

    const titleLine = document.createElement("div");
    titleLine.classList.add("summary-line");
    const title = document.createElement("h3");
    title.innerText = force.name;
    titleLine.appendChild(title);
    const closeButton = document.createElement("button");
    closeButton.innerHTML = `<span class="material-symbols-outlined">close</span>`;
    closeButton.title = "Done";
    closeButton.addEventListener("click", () => {
        panelHost.classList.add("hidden");
        panelHost.innerHTML = "";

        forceView.classList.remove("hidden");
    });

    titleLine.appendChild(closeButton);
    panelHost.appendChild(titleLine);

    const editForceName = createLabeledTextInput("Name", "edit-force-name");
    editForceName.input.value = force.name;
    editForceName.input.addEventListener("change", () => {
        const newName = editForceName.input.value;
        force.name = newName;
        title.innerText = newName;
        document.getElementById("force-name").innerText = newName;
    });
    panelHost.appendChild(editForceName.container);

    const editForceEra = createEraSelect("edit-force-era");
    panelHost.appendChild(editForceEra.container);

    const editForceFaction = createFactionSelect("edit-force-faction");
    panelHost.appendChild(editForceFaction.container);

    bindEraAndFactionSelects("edit-force-era", "edit-force-faction");
    editForceEra.select.value = force.era;
    editForceFaction.select.value = force.faction;

    editForceEra.select.addEventListener("change", () => {
        force.era = editForceEra.select.value;
    });

    editForceFaction.select.addEventListener("change", () => {
        force.faction = editForceFaction.select.value;
    });

    forceView.classList.add("hidden");
    panelHost.classList.remove("hidden");
}

function showEditFormationPanel(formation) {
    const panelHost = document.getElementById("panel-host");
    const forceView = document.getElementById("force-view");

    const titleLine = document.createElement("div");
    titleLine.classList.add("summary-line");
    const title = document.createElement("h3");
    title.innerText = formation.name;
    titleLine.appendChild(title);
    const closeButton = document.createElement("button");
    closeButton.title = "Done";
    closeButton.innerHTML = `<span class="material-symbols-outlined">close</span>`;
    closeButton.addEventListener("click", () => {
        panelHost.classList.add("hidden");
        panelHost.innerHTML = "";

        forceView.classList.remove("hidden");
    });

    titleLine.appendChild(closeButton);
    panelHost.appendChild(titleLine);

    const editForceName = createLabeledTextInput("Name", "edit-formation-name");
    editForceName.input.value = formation.name;
    editForceName.input.addEventListener("change", () => {
        const newName = editForceName.input.value;
        formation.name = newName;
        title.innerText = newName;
    });
    panelHost.appendChild(editForceName.container);

    forceView.classList.add("hidden");
    panelHost.classList.remove("hidden");
}

function showAddMechPanel(formation) {
    const panelHost = document.getElementById("panel-host");
    const forceView = document.getElementById("force-view");

    const titleLine = document.createElement("div");
    titleLine.classList.add("summary-line");
    const title = document.createElement("h3");
    title.innerText = `Add 'Mech to ${formation.name}`;
    titleLine.appendChild(title);
    const closeButton = document.createElement("button");
    closeButton.innerHTML = `<span class="material-symbols-outlined">close</span>`;
    closeButton.title = "Done";
    closeButton.addEventListener("click", () => {
        panelHost.classList.add("hidden");
        panelHost.innerHTML = "";

        forceView.classList.remove("hidden");
    });

    titleLine.appendChild(closeButton);
    panelHost.appendChild(titleLine);

    const searchControls = document.createElement("div");

    const searchText = document.createElement("input");
    searchText.type = "text";
    searchText.placeholder = "Unit Name";
    searchControls.appendChild(searchText);

    const searchButton = document.createElement("button");
    searchButton.innerHTML = `<span class="material-symbols-outlined">search</span>`;
    searchButton.title = "Search";
    searchControls.appendChild(searchButton);

    panelHost.appendChild(searchControls);

    const searchResults = document.createElement("div");
    panelHost.appendChild(searchResults);

    searchButton.addEventListener("click", () => {
        const query = searchText.value.toLowerCase().trim();
        let searchParams = new URLSearchParams();
        if (query.length > 0) {
            searchParams.append("name", query);
        }
        searchParams.append("type", "bm");

        let searchUri = "https://fwti-unitsearch.azurewebsites.net/api/search?";
        searchUri += searchParams.toString();

        fetch(searchUri)
            .then((response) => response.json())
            .then((json) => {
                if (json.units) {
                    searchResults.innerHTML = "";
                    json.units.forEach((match) => {
                        const result = createAddUnitRow(formation, match);
                        searchResults.appendChild(result);
                    });
                } else {
                    searchResults.innerText = "Error!"
                }
            });
    });

    forceView.classList.add("hidden");
    panelHost.classList.remove("hidden");
}

function createAddUnitRow(formation, unitData) {
    buttons = [
        {
            icon: "add",
            title: "Add to Formation",
            action: () => formation.addUnit(new Unit(unitData.name, unitData.bv, unitData.tonnage))
        }
    ];

    const details = `${unitData.tonnage} tons • ${unitData.bv.toLocaleString("en-us")} BV`;

    return createRowWithButtons(unitData.name, details, buttons);
}

function createUnitInFormationRow(formation, unit) {
    buttons = [
        {
            icon: "edit_note",
            title: "Edit Unit",
            action: () => { },
            disabled: true
        },
        {
            icon: "delete",
            title: "Delete Unit",
            action: () => { formation.removeUnit(unit); },
            destructive: true
        }
    ]

    const details = `${unit.tonnage} tons • ${unit.adjustedBV.toLocaleString("en-us")} BV`;

    return createRowWithButtons(unit.name, details, buttons);
}

function createRowWithButtons(label, details, buttons) {
    const row = document.createElement("div");
    row.classList.add("row");

    const name = document.createElement("div");
    name.innerText = label;
    name.classList.add("row-title");
    row.appendChild(name);

    if (details) {
        const detailsDiv = document.createElement("div");
        detailsDiv.innerText = details;
        detailsDiv.classList.add("row-details");
        row.appendChild(detailsDiv);
    }

    buttons.forEach((buttonInfo) => {
        const button = document.createElement("button");
        button.innerHTML = `<span class="material-symbols-outlined">${buttonInfo.icon}</span>`;
        button.title = buttonInfo.title;
        button.addEventListener("click", () => {
            buttonInfo.action();
        });
        if (buttonInfo.disabled) {
            button.setAttribute("disabled", "disabled");
        }
        if (buttonInfo.destructive) {
            button.classList.add("destructive");
        }
        row.appendChild(button);
    });

    return row;
}

function createLabeledTextInput(text, id) {
    const container = document.createElement("div");
    const label = document.createElement("label");
    label.htmlFor = id;
    label.innerText = text + " ";
    container.appendChild(label);
    const input = document.createElement("input");
    input.type = "text";
    input.id = id;
    container.appendChild(input);

    return {
        container: container,
        label: label,
        input: input
    };
}

function createEraSelect(id) {
    const container = document.createElement("div");
    const label = document.createElement("label");
    label.htmlFor = id;
    label.innerText = "Era ";
    container.appendChild(label);
    const select = document.createElement("select");
    select.id = id;
    container.appendChild(select);

    const anyOption = document.createElement("option");
    anyOption.value = "any";
    anyOption.innerText = "Any Era";
    select.appendChild(anyOption);

    getErasInOrder().forEach((eraId) => {
        const option = document.createElement("option");
        option.value = eraId;
        option.innerText = getEraDisplayName(eraId);
        select.appendChild(option);
    });

    return {
        container: container,
        label: label,
        select: select
    };
}

function createFactionSelect(id) {
    const container = document.createElement("div");
    const label = document.createElement("label");
    label.htmlFor = id;
    label.innerText = "Faction ";
    container.appendChild(label);
    const select = document.createElement("select");
    select.id = id;
    container.appendChild(select);

    const anyOption = document.createElement("option");
    anyOption.value = "any";
    anyOption.innerText = "Any Faction";
    select.appendChild(anyOption);

    getFactionsInOrder().forEach((factionId) => {
        const option = document.createElement("option");
        option.value = factionId;
        option.innerText = getFactionDisplayName(factionId);
        select.appendChild(option);
    });

    return {
        container: container,
        label: label,
        select: select
    };
}

function bindEraAndFactionSelects(eraSelectId, factionSelectId) {
    const eraSelect = document.getElementById(eraSelectId);
    const factionSelect = document.getElementById(factionSelectId);

    eraSelect.addEventListener("change", () => {
        const selectedEraId = eraSelect.value;
        const selectedFactionId = factionSelect.value;

        factionSelect.innerHTML = "";

        const anyOption = document.createElement("option");
        anyOption.value = "any";
        anyOption.innerText = "Any Faction";
        factionSelect.appendChild(anyOption);

        getFilteredFactionsInOrder(selectedEraId).forEach((factionId) => {
            const option = document.createElement("option");
            option.value = factionId;
            option.innerText = getFactionDisplayName(factionId);
            factionSelect.appendChild(option);

            if (selectedFactionId) {
                factionSelect.value = selectedFactionId;
            }
        });
    });

    factionSelect.addEventListener("change", () => {
        const selectedEraId = eraSelect.value;
        const selectedFactionId = factionSelect.value;

        eraSelect.innerHTML = "";

        const anyOption = document.createElement("option");
        anyOption.value = "any";
        anyOption.innerText = "Any Era";
        eraSelect.appendChild(anyOption);

        getFilteredErasInOrder(selectedFactionId).forEach((eraId) => {
            const option = document.createElement("option");
            option.value = eraId;
            option.innerText = getEraDisplayName(eraId);
            eraSelect.appendChild(option);
        });

        if (selectedEraId) {
            eraSelect.value = selectedEraId;
        }
    });
}

let force = buildInitialForce(); // buildSampleForce();

readyInterface();
force.forEachFormation((formation) => {
    addFormationUI(formation);
});
addSupportUI(force);
addForceStats();

document.getElementById("edit-force-properties").addEventListener("click", () => {
    showEditForcePanel();
});

document.getElementById("add-formation-to-force").addEventListener("click", () => {
    const newFormation = new Formation();
    newFormation.name = "New Formation";
    force.addFormation(newFormation);
    addFormationUI(newFormation);
});

