function readyInterface() {
    document.querySelectorAll(".lazy").forEach((lazyElement) => {
        lazyElement.removeAttribute("disabled");
    });
};

class Force {
    name = "BattleTech Force";
    formations = [];
    support = [];
    era = "any";
    faction = "any";

    battleValue() {
        let bv = 0;
        this.formations.forEach((formation) => {
            bv += formation.battleValue();
        });
        return bv;
    }

    unitCount() {
        let count = 0;
        this.formations.forEach((formation) => {
            count += formation.unitCount;
        });
        return count;
    }
}

class Formation {
    #listeners;
    #name;
    #units = [];

    constructor(name) {
        this.#name = name;
        this.#listeners = {
            name: [],
            units: []
        };
    }

    get name() {
        return this.#name;
    }

    set name(value) {
        if (this.name != value) {
            this.#name = value;
            this.#propertyChanged("name", value);
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
        this.#propertyChanged("units", { add: unit });
    }

    get unitCount() {
        return this.#units.length;
    }

    forEachUnit(action) {
        this.#units.forEach(unit => { action(unit); });
    }

    addPropertyChangedListener(property, listener) {
        this.#listeners[property].push(listener);
    }

    removePropertyChangedListener(property, listener) {
        const i = this.#listeners[property].indexOf(listener);
        this.#listeners[property].splice(i, 1);
    }

    #propertyChanged(property, newValue) {
        if (this.#listeners[property]) {
            this.#listeners[property].forEach((listener) => {
                listener(newValue);
            });
        }
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

    initialForce.formations = [formation];
    initialForce.support = [];

    return initialForce;
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
    editButton.addEventListener("click", () => {
        showEditFormationPanel(formation);
    });
    buttons.appendChild(editButton);

    const addMechButton = document.createElement("button");
    addMechButton.innerHTML = `<span class="material-symbols-outlined">add</span>`;
    addMechButton.addEventListener("click", () => {
        showAddMechPanel(formation);
    });
    buttons.appendChild(addMechButton);

    const deleteButton = document.createElement("button");
    deleteButton.innerHTML = `<span class="material-symbols-outlined">delete</span>`;
    buttons.appendChild(deleteButton);

    const formationUnitList = document.createElement("div");
    formation.forEachUnit((unit) => {
        const unitEntry = document.createElement("div");
        unitEntry.classList.add("summary-line");

        const unitName = document.createElement("div");
        unitName.innerText = unit.name;
        unitEntry.appendChild(unitName);

        const unitStats = document.createElement("div");
        unitStats.innerText = `${unit.tonnage} tons • ${unit.adjustedBV.toLocaleString("en-us")} BV`;
        unitEntry.appendChild(unitStats);

        formationUnitList.appendChild(unitEntry);
    });

    formationContainer.appendChild(formationUnitList);

    document.getElementById("formation-list").appendChild(formationContainer);

    const unitsListener = (changed) => {
        formationUnitList.innerHTML = "";
        formation.forEachUnit((unit) => {
            const unitEntry = document.createElement("div");
            unitEntry.classList.add("summary-line");

            const unitName = document.createElement("div");
            unitName.innerText = unit.name;
            unitEntry.appendChild(unitName);

            const unitStats = document.createElement("div");
            unitStats.innerText = `${unit.tonnage} tons • ${unit.adjustedBV.toLocaleString("en-us")} BV`;
            unitEntry.appendChild(unitStats);

            formationUnitList.appendChild(unitEntry);
        });

        formationStats.innerText = `${formation.unitCount} units • ${formation.battleValue.toLocaleString("en-us")} BV`;
    };

    formation.addPropertyChangedListener("name", nameListener);

    formation.addPropertyChangedListener("units", unitsListener);

    deleteButton.addEventListener("click", () => {
        const i = force.formations.indexOf(formation);
        force.formations.splice(i, 1);
        document.getElementById("formation-list").removeChild(formationContainer);
        formation.removePropertyChangedListener("name", nameListener);
        formation.removePropertyChangedListener("units", unitsListener);
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
    addStrikeButton.setAttribute("disabled", "disabled");
    buttons.appendChild(addStrikeButton);

    const addAssetButton = document.createElement("button");
    addAssetButton.innerHTML = `<span class="material-symbols-outlined">local_shipping</span>`;
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
    const row = document.createElement("div");
    row.classList.add("row");

    const name = document.createElement("div");
    name.innerText = unitData.name;
    row.appendChild(name);

    const addButton = document.createElement("button");
    addButton.innerHTML = `<span class="material-symbols-outlined">add</span>`;
    row.appendChild(addButton);

    addButton.addEventListener("click", () => {
        formation.addUnit(new Unit(unitData.name, unitData.bv, unitData.tonnage));
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
force.formations.forEach((formation) => {
    addFormationUI(formation);
});
addSupportUI(force);

document.getElementById("edit-force-properties").addEventListener("click", () => {
    showEditForcePanel();
});

document.getElementById("add-formation-to-force").addEventListener("click", () => {
    const newFormation = new Formation();
    newFormation.name = "New Formation";
    force.formations.push(newFormation);
    addFormationUI(newFormation);
});

