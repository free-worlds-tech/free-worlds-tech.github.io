let nextUnitId = 1;
let nextNetworkId = 1;

const force = new Map();
const networks = new Map();

const c3mUnits = [];
const c3sUnits = [];
const c3iUnits = [];

readyInterface();

function readyInterface() {
    const units = getKnownUnits();

    const $unitPicker = $("#unit-picker");

    $unitPicker.children().remove();

    units.forEach((unit) => {
        $unitPicker.append(`<option value='${unit.id}'>${unit.name}</option>`);
    });

    $unitPicker.first().attr("selected", "selected");

    $unitPicker.removeAttr("disabled");

    $("#add-unit-button").removeAttr("disabled");
    $("#clear-units-button").removeAttr("disabled");
    $("#download-button").removeAttr("disabled");
    $("#search-button").removeAttr("disabled");

    const urlParams = new URLSearchParams(window.location.search);
    const debugParam = urlParams.get('debug');
    if (debugParam == "true") {
        $("body").append("<h3>Debug</h3>");
        $("body").append(
            `<div>
                <button type="button" onclick="dumpDebugData()">Dump Debug Data</button>
                <pre id="debug-output"></pre>
            </div>`
        );
    }

    showRandomUnits();
}

function searchKeyDown(e) {
    if (e.key == "Enter") {
        searchUnits();
    }
}

function showRandomUnits() {
    const knownUnits = getKnownUnits();
    let results = [];

    while (results.length < 10) {
        const randomId = Math.floor(Math.random() * knownUnits.length);
        const randomUnit = knownUnits[randomId];
        if (!results.find((x) => x.id == randomUnit.id)) {
            results.push(randomUnit);
        }
    }

    showUnitList(results);
}

function searchUnits() {
    const knownUnits = getKnownUnits();
    const query = $("#search-box").val().toLowerCase();

    let results = [];
    knownUnits.forEach((unit) => {
        if (results.length < 10 && unit.name.toLowerCase().includes(query)) {
            results.push(unit);
        }
    });

    showUnitList(results);
}

function showUnitList(list) {
    $("#search-results").children().remove();

    if (list.length == 0) {
        $("#search-results").append(`<li><em>No units found.</em></li>`);
    } else {
        list.forEach((unit) => {
            $("#search-results").append(`<li style="display:flex"><span style="flex:1">${unit.name}</span><button type='button' onclick='addUnitById("${unit.id}")'>➕</button></li>`);
        });
    }
}

function addSelectedUnit() {
    const unitProps = getUnitProperties();
    addUnit(unitProps);
}

function addUnitById(unitId) {
    const unitProps = getKnownUnit(unitId);
    addUnit(unitProps);
}

function addUnit(unitProps) {
    const currentId = nextUnitId++;

    const newUnit = {
        id: currentId,
        unitProps: unitProps,
        crew: "",
        gunnery: 4,
        piloting: 5,
        adjustedBV: unitProps.bv,
        ammoTypes: new Map(),
        bvNotes: []
    };

    unitProps.ammo.forEach((ammoBin) => {
        newUnit.ammoTypes.set(ammoBin.id, ammoBin.default ? ammoBin.default : "standard");
    });

    force.set(currentId, newUnit);

    addUnitRow(newUnit);
    addUnitAmmoSelector(newUnit);

    if (unitProps.specials.includes("c3m")) {
        c3mUnits.push({id: currentId, linked: false});
    }
    if (unitProps.specials.includes("c3s")) {
        c3sUnits.push({id: currentId, linked: false});
    }
    if (unitProps.specials.includes("c3i")) {
        c3iUnits.push({id: currentId, linked: false});
    }
    updateC3Eligibility();
    addUnitToAllNetworks(newUnit);
}

function getUnitFullName(unit) {
    const unitName = unit.unitProps.name;
    const crewName = unit.crew;

    if (crewName != "") {
        return `${unitName} | ${crewName}`;
    } else {
        return `${unitName} #${unit.id}`
    }
}

function addUnitRow(unit)
{
    const $row = $("<tr>", {id: "unit-" + unit.id});
    $row.append("<td class='unit-name'>" + unit.unitProps.name + "</td");
    $row.append("<td><input type='text' placeholder='Name' onchange='updateCrewName(" + unit.id + ")'></td>");
    $row.append(createSkillPicker(unit.id, "gunnery-skill", unit.gunnery));
    $row.append(createSkillPicker(unit.id, "piloting-skill", unit.piloting));
    $row.append("<td class='tonnage'>" + unit.unitProps.tonnage + "</td>");
    $row.append("<td class='bv'>" + unit.unitProps.bv + "</td>");
    $row.append("<td class='adj-bv'>" + unit.adjustedBV + "</td>");
    $row.append("<td><button type='button' onclick='removeUnit(" + unit.id + ")'>❌</button></td>");
    $("#force-table-body").append($row);
    
    updateTotals();
}

function addUnitAmmoSelector(unit)
{
    // Check if the unit uses any ammo
    if (unit.unitProps.ammo.length > 0)
    {
        const unitLabel = "ammo-" + unit.id;
        const $ammoSelections = $("<details>", {id: unitLabel});
        $ammoSelections.append(`<summary>${getUnitFullName(unit)}</summary>`)
        unit.unitProps.ammo.forEach(element => {
            const slotLabel = unitLabel + "-slot-" + element.id;
            const selectLabel = slotLabel + "-sel";
            const $selection = $("<div>", {id: slotLabel});
            
            let slotTitle = getWeaponName(element.type);
            slotTitle += " (" + element.location + ")";
            
            let ammoOptions = getAmmoTypes(element.type);

            $selection.append("<label for='" + selectLabel + "'>" + slotTitle + "</label>");
            
            $ammoSelect = $("<select>", { id: selectLabel, class: "ammo" });

            ammoOptions.forEach(option => {
                if (option.requirement) {
                    if (!unit.unitProps.specials.includes(option.requirement)) {
                        return;
                    }
                }
                if (element.default ? option.id == element.default : option.id == "standard") {
                    $ammoSelect.append(`<option value='${option.id}' selected='selected'>${option.name}</option>`);
                } else {
                    $ammoSelect.append(`<option value='${option.id}'>${option.name}</option>`);
                }
            });

            $ammoSelect.on("change", function(e) {
                const ammoType = e.target.value;
        
                unit.ammoTypes.set(element.id, ammoType);
        
                updateUnitBV(unit);
                adjustTAGUnitsBV();
            });

            $selection.append($ammoSelect);

            $ammoSelections.append($selection);
        });

        $("#ammo-selections").append($ammoSelections);
    }
}

function getUnitProperties() {
    const $unitPicker = $("#unit-picker");
    const unitId = $unitPicker.find("option:selected").val();
    
    return getKnownUnit(unitId);
}

function updateUnitBV(unit, fromNetworkChange) {
    const g = unit.gunnery;
    const p = unit.piloting;

    let modifiedBV = unit.unitProps.bv;

    const bvNotes = [];

    // Add BV for alternate ammunition types
    const alternateAmmoBV = getAlternateAmmoBV(unit);
    modifiedBV += alternateAmmoBV;
    if (alternateAmmoBV > 0) {
        bvNotes.push({note: "Alternate Ammo", amount: Math.round(alternateAmmoBV)});
    }

    // Add BV for TAG and semi-guided ammo in the force
    const semiGuidedAmmoBV = getAdditionalBVforTAG(unit);
    if (semiGuidedAmmoBV > 0) {
        modifiedBV += semiGuidedAmmoBV;
        bvNotes.push({note: "TAG", amount: semiGuidedAmmoBV});
    }

    // C3 networks
    let connectedNetwork = undefined;
    if (unit.unitProps.specials.includes("c3m") || unit.unitProps.specials.includes("c3s")) {
        networks.forEach((network) => {
            if (network.type == "c3") {
                if (network.rootUnit.id == unit.id || network.rootUnit.links.find((x) => x.id == unit.id)) {
                    connectedNetwork = network;
                    const networkBV = Math.round(getNetworkBV(network.id));
                    modifiedBV += networkBV;
                    bvNotes.push({note: "C3", amount: networkBV});
                }
            }
        });
    }
    if (unit.unitProps.specials.includes("c3i")) {
        networks.forEach((network) => {
            if (network.type == "c3i") {
                if (network.units.find((x) => x.id == unit.id)) {
                    connectedNetwork = network;
                    const networkBV = Math.round(getNetworkBV(network.id));
                    modifiedBV += networkBV;
                    bvNotes.push({note: "C3i", amount: networkBV});
                }
            }
        });
    }
    if (connectedNetwork && !fromNetworkChange) {
        updateNetworkBV(connectedNetwork);
    }

    const multiplier = getSkillMultiplier(g,p);
    unit.adjustedBV = Math.round(modifiedBV * multiplier);
    if (multiplier != 1) {
        bvNotes.push({note: `Skills ×${multiplier}`, amount:(unit.adjustedBV - modifiedBV)});
    }

    unit.bvNotes = bvNotes;
    const $adjbv = $("#unit-" + unit.id + " .adj-bv");

    $adjbv.text(unit.adjustedBV);

    updateTotals();
}

function getAlternateAmmoBV(unit) {
    let alternateAmmoBV = 0;
    unit.unitProps.ammo.forEach((ammoBin) => {
        const addedValue = getAmmoAdditionalBV(ammoBin.type, unit.ammoTypes.get(ammoBin.id));
        alternateAmmoBV += addedValue;
    });
    return Math.round(alternateAmmoBV);
}

function getAdditionalBVforTAG(unit) {
    if (unit.unitProps.specials.includes("tag")) {
        const semiGuidedAmmoBV = Math.round(getSemiGuidedAmmoValueForForce());
        return semiGuidedAmmoBV;
    }
    return 0;
}

function getNetworkBVforUnit(unit) {
    let unitBV = unit.unitProps.bv;
    unitBV += getAlternateAmmoBV(unit);
    unitBV += getAdditionalBVforTAG(unit);
    return unitBV;
}

function getNetworkBV(networkId) {
    const network = networks.get(networkId);
    if (network.type == "c3") {
        let networkBV = 0;
        let unitCount = 1;
        const rootUnit = force.get(network.rootUnit.id);

        networkBV += getNetworkBVforUnit(rootUnit) * 0.05;

        network.rootUnit.links.forEach((link) => {
            const linkedUnit = force.get(link.id);
            if (linkedUnit) {
                networkBV += getNetworkBVforUnit(linkedUnit) * 0.05;
                unitCount += 1;
            }
        });

        return unitCount > 1 ? networkBV : 0;
    } else if (network.type == "c3i") {
        let networkBV = 0
        let unitCount = 0;
        network.units.forEach((link) => {
            const linkedUnit = force.get(link.id);
            if (linkedUnit) {
                networkBV += getNetworkBVforUnit(linkedUnit) * 0.05;
                unitCount += 1;
            }
        });

        return unitCount > 1 ? networkBV : 0;
    }

    return 0;
}

function adjustTAGUnitsBV() {
    force.forEach((unit) => {
        if (unit.unitProps.specials.includes("tag")) {
            updateUnitBV(unit);
        }
    });
}

function getSemiGuidedAmmoValueForForce()
{
    let total = 0;
    force.forEach((unit) => {
        unit.unitProps.ammo.forEach((ammoBin) => {
            const addedValue = getTAGAdditionalBV(ammoBin.type, unit.ammoTypes.get(ammoBin.id));
            total += addedValue;
        });
    });
    return total;
}

function createSkillPicker(id, type, initialRating)
{
    const $select = $("<select>");
    for (let i = 0; i <= 8; i++) {
        const $option = $("<option>", {value: i});
        $option.append(i)
        if (i == initialRating) {
            $option.prop("selected", true);
        }
        $select.append($option);
    }

    $select.on("change", function(e) {
        const skill = Number(e.target.value);

        const unit = force.get(id);
        if (type === "gunnery-skill") {
            unit.gunnery = skill;
        } else if (type === "piloting-skill") {
            unit.piloting = skill;
        }

        updateUnitBV(unit);
    });

    const $td = $("<td>");
    $td.addClass("skill");
    $td.addClass(type);
    $td.append($select);
    return $td;
}

function removeUnit(id) {
    $("#unit-" + id).remove();
    $("#ammo-" + id).remove();

    force.delete(id);

    // Have to re-calculate units with TAG because removed unit
    // might have had semi-guided ammo.
    adjustTAGUnitsBV();

    const c3mIndex = c3mUnits.findIndex((x) => x.id == id);
    if (c3mIndex != -1) {
        c3mUnits.splice(c3mIndex, 1);
    }

    const c3sIndex = c3sUnits.findIndex((x) => x.id == id);
    if (c3sIndex != -1) {
        c3sUnits.splice(c3sIndex, 1);
    }

    const c3iIndex = c3iUnits.findIndex((x) => x.id == id);
    if (c3iIndex != -1) {
        c3iUnits.splice(c3iIndex, 1);
    }

    // Adjust network UI to account for the unit.
    removeUnitFromAllNetworks(id);

    // Update the total fields to reflect removed unit.
    updateTotals();

    updateC3Eligibility();
}

function clearUnits() {
    $("#force-table-body").children().remove();
    $("#ammo-selections").children().remove();
    $("#network-setups").children().remove();

    force.clear();
    networks.clear();
    c3mUnits.splice(0, c3mUnits.length);
    c3sUnits.splice(0, c3sUnits.length);
    c3iUnits.splice(0, c3iUnits.length);

    updateTotals();

    updateC3Eligibility();
}

function updateTotals() {
    let totalTonnage = 0;
    let totalBV = 0;
    let totalAdjBV = 0;

    force.forEach((unit) => {
        totalTonnage += unit.unitProps.tonnage;
        totalBV += unit.unitProps.bv;
        totalAdjBV += unit.adjustedBV;
    });

    $("#tonnage-total").text(totalTonnage);
    $("#bv-total").text(totalBV);
    $("#adj-bv-total").text(totalAdjBV);
}

function updateCrewName(id) {
    const unit = force.get(id);
    const crewName = $("#unit-" + id + " input").val();
    
    unit.crew = crewName;

    $("#ammo-" + id + " summary").text(getUnitFullName(unit));

    $(`option.network[value='${id}']`).text(getUnitFullName(unit));
}

function downloadForce() {
    let contents = "# Saved Force\n";
    contents += "\n";
    contents += "| Unit | Crew | Gunnery | Piloting | Tonnage | Base BV | Adjusted BV |\n";
    contents += "| :--- | :--- | :-----: | :------: | ------: | ------: | ----------: |\n";
    let totalTonnage = 0;
    let totalBV = 0;
    let totalAdjBV = 0;
    force.forEach((unit) => {
        contents += `| ${unit.unitProps.name} | ${unit.crew} | ${unit.gunnery} | ${unit.piloting} | ${unit.unitProps.tonnage} | ${unit.unitProps.bv} | ${unit.adjustedBV} |\n`;
        totalTonnage += unit.unitProps.tonnage;
        totalBV += unit.unitProps.bv;
        totalAdjBV += unit.adjustedBV;
    });
    contents += `| **TOTAL** |  |  |  | ${totalTonnage} | ${totalBV} | ${totalAdjBV} |\n`;
    contents += "\n";
    contents += "## Ammo Selections\n";
    force.forEach((unit) => {
        if (unit.unitProps.ammo.length > 0) {
            contents += `### ${getUnitFullName(unit)}\n`;
            
            unit.unitProps.ammo.forEach((ammoBin) => {
                const weaponName = getWeaponName(ammoBin.type);
                const ammoName = getAmmoName(ammoBin.type, unit.ammoTypes.get(ammoBin.id));
                contents += `- ${weaponName} (${ammoBin.location}): ${ammoName}\n`;
            });
        }
    });
    contents += "\n";
    contents += "## Networks\n";
    networks.forEach((network) => {
        if (network.type == "c3") {
            contents += "### C3 Network\n";
            const rootUnit = force.get(network.rootUnit.id);
            contents += `- ${getUnitFullName(rootUnit)}\n`
            network.rootUnit.links.forEach((link) => {
                const linkedUnit = force.get(link.id);
                if (linkedUnit) {
                    contents += `  - ${getUnitFullName(linkedUnit)}\n`
                }
            });
        } else if (network.type == "c3i") {
            contents += "### C3i Network\n";
            network.units.forEach((link) => {
                const linkedUnit = force.get(link.id);
                if (linkedUnit) {
                    contents += `- ${getUnitFullName(linkedUnit)}\n`;
                }
            });
        }
    });
    contents += "\n";
    contents += "## BV Breakdown\n";
    force.forEach((unit) => {
        contents += `- ${getUnitFullName(unit)}: ${unit.unitProps.bv}`;
        unit.bvNotes.forEach((note) => {
            if (note.amount > 0) {
                contents += ` + ${note.amount} (${note.note})`
            } else {
                contents += ` - ${Math.abs(note.amount)} (${note.note})`
            }
        });
        contents += ` = ${unit.adjustedBV}\n`;
    });
    contents += "\n";

    let tempElement = document.createElement('a');
    tempElement.setAttribute('href', 'data:text/markdown;charset=utf-8,' + encodeURIComponent(contents));
    tempElement.setAttribute('download', 'saved-force.md');

    tempElement.style.display = 'none';
    document.body.appendChild(tempElement);

    tempElement.click();

    document.body.removeChild(tempElement);
}

function updateC3Eligibility() {
    // TODO: Once c3m->c3m links are supported, update this...
    let c3mAvailable = c3mUnits.find((x) => !x.linked) != undefined;
    let c3sAvailable = c3sUnits.find((x) => !x.linked) != undefined;

    let c3iAvailableCount = 0;
    c3iUnits.forEach((c3i) => {
        if (!c3i.linked) {
            c3iAvailableCount += 1;
        }
    });

    if (c3mAvailable && c3sAvailable) {
        $("#add-c3-network-button").removeAttr("disabled");
    } else {
        $("#add-c3-network-button").attr("disabled", "disabled");
    }

    if (c3iAvailableCount > 1) {
        $("#add-c3i-network-button").removeAttr("disabled");
    } else {
        $("#add-c3i-network-button").attr("disabled", "disabled");
    }
}

function addC3Network() {
    const currentId = nextNetworkId++;

    const defaultRoot = c3mUnits.find((x) => !x.linked);

    const network = {
        id: currentId,
        type: "c3",
        rootUnit: {
            id: defaultRoot.id, 
            type: "m", 
            linkType: "s", 
            links: [
                {id: 0, type: "s"},
                {id: 0, type: "s"},
                {id: 0, type: "s"}
            ]
        }
    };

    defaultRoot.linked = true;

    networks.set(currentId, network);

    addNetworkEditor(network);
    updateNetworkBV(network);
    updateC3Eligibility();
}

function addC3iNetwork() {
    const currentId = nextNetworkId++;

    const network = {
        id: currentId,
        type: "c3i",
        units: [
            {id: 0},
            {id: 0},
            {id: 0},
            {id: 0},
            {id: 0},
            {id: 0},
        ]
    }

    networks.set(currentId, network);

    addNetworkEditor(network);
    updateNetworkBV(network);
    updateC3Eligibility();
}

function addNetworkEditor(network) {
    const networkLabel = `network-${network.id}`;
    const $networkEditor = $("<details>", {id: networkLabel});
    if (network.type == "c3") {
        $networkEditor.append(`<summary>C<sup>3</sup> Network #${network.id}</summary>`);

        $networkEditor.append("<p><strong>Work in Progress: </strong> C<sup>3</sup>M to C<sup>3</sup>M links are not supported yet.</p>")

        const $rootSelect = $("<select>", {class: "network c3m"});
        c3mUnits.forEach((c3mLink) => {
            const c3mUnit = force.get(c3mLink.id);
            const $c3mUnitOption = $("<option>", {
                class: "network c3m", 
                value: `${c3mLink.id}`,
                text: getUnitFullName(c3mUnit)
            });
            if (c3mLink.linked && c3mLink.id != network.rootUnit.id) {
                $c3mUnitOption.attr("disabled", "disabled");
                $c3mUnitOption.attr("hidden", "hidden");
            }
            $rootSelect.append($c3mUnitOption);
        });
        $rootSelect.on("change", function(e) {
            const previousUnitId = network.rootUnit.id;
            network.rootUnit.id = Number(e.target.value);
            c3mUnits.find((x) => x.id == network.rootUnit.id).linked = true;

            // Update BV to reflect network change
            updateNetworkBV(network);
            const previousUnit = force.get(previousUnitId);
            if (previousUnit) {
                c3mUnits.find((x) => x.id == previousUnitId).linked = false;
                updateUnitBV(previousUnit, true);
            }
            updateC3Eligibility();
        });
        $networkEditor.append($rootSelect);

        // TODO: Support c3m->c3m links...
        // $networkEditor.append(`<label><input type='checkbox' id='${networkLabel}-type'>Link to additional C<sup>3</sup>M computers</label>`);

        const $linksList = $("<ul>");
        for (let i = 0; i < 3; i++) {
            const $linkListItem = $("<li>");
            const $linkSelect = $("<select>", {id: `${networkLabel}-${i}`, class: "network c3s"});
            $linkSelect.append(`<option class='network' value='0' selected>~EMPTY~</option>`);
            c3sUnits.forEach((c3s) => {
                const c3sUnit = force.get(c3s.id);
                const $c3sUnitOption = $("<option>", {
                    class: "network c3s",
                    value: `${c3s.id}`,
                    text: getUnitFullName(c3sUnit)
                });
                if (c3s.linked) {
                    $c3sUnitOption.attr("disabled", "disabled");
                    $c3sUnitOption.attr("hidden", "hidden");
                }
                $linkSelect.append($c3sUnitOption);
            });
            $linkSelect.on("change", function(e) {
                const previousUnitId = network.rootUnit.links[i].id;
                const newUnitId = Number(e.target.value);
                network.rootUnit.links[i].id = newUnitId;
                if (newUnitId != 0) {
                    c3sUnits.find((x) => x.id == newUnitId).linked = true;
                    markNetworkUnitAsLinked(newUnitId);
                }

                // Update BV to reflect network change
                updateNetworkBV(network);
                const previousUnit = force.get(previousUnitId);
                if (previousUnit) {
                    c3sUnits.find((x) => x.id == previousUnitId).linked = false;
                    updateUnitBV(previousUnit, true);
                    markNetworkUnitAsUnlinked(previousUnitId);
                }
                updateC3Eligibility();
            });
            $linkListItem.append($linkSelect);
            $linksList.append($linkListItem);
        }
        $networkEditor.append($linksList);
        $networkEditor.append(`<button type='button' class='network' onclick='removeNetwork(${network.id})'>Remove Nework</button>`);

    } else {
        $networkEditor.append(`<summary>C<sup>3</sup>i Network #${network.id}</summary>`);
        for (let i = 0; i < 6; i++) {
            const $unitSelect = $("<select>", {id: `${networkLabel}-${i}`, class: "network c3i"});
            $unitSelect.append(`<option class='network' value='0' selected>~EMPTY~</option>`);
            c3iUnits.forEach((c3i) => {
                const c3iUnit = force.get(c3i.id);
                const $c3iUnitOption = $("<option>", {
                    class: "network c3i",
                    value: `${c3i.id}`,
                    text: getUnitFullName(c3iUnit)
                });
                if (c3i.linked) {
                    $c3iUnitOption.attr("disabled", "disabled");
                    $c3iUnitOption.attr("hidden", "hidden");
                }
                $unitSelect.append($c3iUnitOption);
            });
            $unitSelect.on("change", function(e) {
                const previousUnitId = network.units[i].id;
                const newUnitId = Number(e.target.value);
                network.units[i].id = newUnitId;
                if (newUnitId != 0) {
                    c3iUnits.find((x) => x.id == newUnitId).linked = true;
                    markNetworkUnitAsLinked(newUnitId);
                }
                updateNetworkBV(network);
                const previousUnit = force.get(previousUnitId);
                if (previousUnit) {
                    c3iUnits.find((x) => x.id == previousUnitId).linked = false;
                    updateUnitBV(previousUnit, true);
                    markNetworkUnitAsUnlinked(previousUnitId);
                }
                updateC3Eligibility();
            });

            $networkEditor.append($unitSelect);
        }
        $networkEditor.append(`<button type='button' class='network' onclick='removeNetwork(${network.id})'>Remove Nework</button>`);
    }

    $("#network-setups").append($networkEditor);
}

function markNetworkUnitAsLinked(unitId) {
    const $c3SelectMatches = $(`select.network[value!='${unitId}'] option[value='${unitId}']`);
    $c3SelectMatches.attr("disabled", "disabled");
    $c3SelectMatches.attr("hidden", "hidden");
}

function markNetworkUnitAsUnlinked(unitId) {
    const $c3SelectMatches = $(`option.network[value='${unitId}']`);
    $c3SelectMatches.removeAttr("disabled");
    $c3SelectMatches.removeAttr("hidden");
}

function addUnitToAllNetworks(addedUnit) {
    // Add new unit to network UIs
    if (addedUnit.unitProps.specials.includes("c3m")) {
        $(`select.network.c3m`).append(`<option class='network c3m' value='${addedUnit.id}'>${getUnitFullName(addedUnit)}</option>`);
    }

    if (addedUnit.unitProps.specials.includes("c3s")) {
        $(`select.network.c3s`).append(`<option class='network c3s' value='${addedUnit.id}'>${getUnitFullName(addedUnit)}</option>`);
    }

    if (addedUnit.unitProps.specials.includes("c3i")) {
        $(`select.network.c3i`).append(`<option class='network c3i' value='${addedUnit.id}'>${getUnitFullName(addedUnit)}</option>`);
    }
}

function removeUnitFromAllNetworks(removedUnitId) {
    networks.forEach((network) => {
        removeUnitFromNetwork(network, removedUnitId);
    });
    $(`select.network option[value='${removedUnitId}']`).remove();
}

function removeUnitFromNetwork(network, removedUnitId) {
    if (network.type == "c3") {
        const rootUnitId = network.rootUnit.id;
        if (rootUnitId == removedUnitId) {
            // Delete network since its root is gone
            $(`#network-${network.id}`).remove();
            networks.delete(network.id);
            updateNetworkBV(network);
            network.rootUnit.links.forEach((link) => {
                const linkedUnit = c3sUnits.find((x) => x.id == link.id);
                if (linkedUnit) {
                    linkedUnit.linked = false;
                }
                markNetworkUnitAsUnlinked(link.id);
            });
            return;
        }

        network.rootUnit.links.forEach((link, index) => {
            const linkUnitId = link.id;
            if (linkUnitId == removedUnitId) {
                link.id = 0;
                $(`#network-${network.id}-${index}`).val(0);
                updateNetworkBV(network);
            }
        });
    } else if (network.type == "c3i") {
        network.units.forEach((link, index) => {
            const linkUnitId = link.id;
            if (linkUnitId == removedUnitId) {
                link.id = 0;
                $(`#network-${network.id}-${index}`).val(0);
                updateNetworkBV(network);
            }
        });
    }
}

function removeNetwork(networkId) {
    $(`#network-${networkId}`).remove();
    const network = networks.get(networkId);
    networks.delete(networkId);
    updateNetworkBV(network);
    if (network.type == "c3") {
        const rootUnit = c3mUnits.find((x) => x.id == network.rootUnit.id);
        if (rootUnit) {
            rootUnit.linked = false;
        }
        markNetworkUnitAsUnlinked(rootUnit.id);
        network.rootUnit.links.forEach((link) => {
            const linkedUnit = c3sUnits.find((x) => x.id == link.id);
            if (linkedUnit) {
                linkedUnit.linked = false;
            }
            markNetworkUnitAsUnlinked(link.id);
        });
    } else if (network.type == "c3i") {
        network.units.forEach((link) => {
            const linkedUnit = c3iUnits.find((x) => x.id == link.id);
            if (linkedUnit) {
                linkedUnit.linked = false;
            }
            markNetworkUnitAsUnlinked(link.id);
        });
    }
    updateC3Eligibility();
}

function updateNetworkBV(network) {
    if (network.type == "c3") {
        const rootUnit = force.get(network.rootUnit.id);
        if (rootUnit) {
            updateUnitBV(rootUnit, true);
        }

        network.rootUnit.links.forEach((link) => {
            const linkedUnit = force.get(link.id);
            if (linkedUnit) {
                updateUnitBV(linkedUnit, true);
            }
        });
    } else if (network.type == "c3i") {
        network.units.forEach((link) => {
            const linkedUnit = force.get(link.id);
            if (linkedUnit) {
                updateUnitBV(linkedUnit, true);
            }
        });
    }
}

function dumpDebugData() {
    $("#debug-output").children().remove();

    let data = "";

    force.forEach((unit) => {
        data += `${unit.id}: ${getUnitFullName(unit)} ${unit.unitProps.bv} ${unit.adjustedBV}\n`;
        unit.bvNotes.forEach((note) => {
            data += `  - ${note.note}: ${note.amount}\n`;
        });
    });

    data += "\n";
    networks.forEach((network) => {
        data += `${network.id}: ${network.type}\n`
        if (network.type == "c3") {
            data += `- ${network.rootUnit.id}\n`;
            network.rootUnit.links.forEach((link) => {
                data += `  - ${link.id}\n`;
            });
        } else if (network.type == "c3i") {
            network.units.forEach((link) => {
                data += `- ${link.id}\n`;
            });
        }
    });

    data += "\n";
    data += "c3m: ";
    c3mUnits.forEach((c3m) => {
        data += `${c3m.id}:${c3m.linked}, `;
    });
    data += "\n";

    data += "\n";
    data += "c3s: ";
    c3sUnits.forEach((c3s) => {
        data += `${c3s.id}:${c3s.linked}, `;
    });
    data += "\n";

    data += "\n";
    data += "c3i: ";
    c3iUnits.forEach((c3i) => {
        data += `${c3i.id}:${c3i.linked}, `;
    });
    data += "\n";

    $("#debug-output").text(data);
}