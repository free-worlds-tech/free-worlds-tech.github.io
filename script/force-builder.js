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
}

function addUnit() {
    const unit = getUnitProperties();

    const currentId = nextUnitId++;

    const newUnit = {
        id: currentId,
        unitProps: unit,
        crew: "",
        gunnery: 4,
        piloting: 5,
        adjustedBV: unit.bv,
        ammoTypes: new Map()
    };

    unit.ammo.forEach((ammoBin) => {
        newUnit.ammoTypes.set(ammoBin.id, ammoBin.default ? ammoBin.default : "standard");
    });

    force.set(currentId, newUnit);

    addUnitRow(newUnit);
    addUnitAmmoSelector(newUnit);

    if (unit.specials.includes("c3m")) {
        c3mUnits.push({id: currentId, linked: false});
    }
    if (unit.specials.includes("c3s")) {
        c3sUnits.push({id: currentId, linked: false});
    }
    if (unit.specials.includes("c3i")) {
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

    // Add BV for alternate ammunition types
    unit.unitProps.ammo.forEach((ammoBin) => {
        const addedValue = getAmmoAdditionalBV(ammoBin.type, unit.ammoTypes.get(ammoBin.id));
        modifiedBV += addedValue;
    });

    // Add BV for TAG and semi-guided ammo in the force
    if (unit.unitProps.specials.includes("tag")) {
        modifiedBV += getSemiGuidedAmmoValueForForce();
    }

    // C3 networks
    let connectedNetwork = undefined;
    if (unit.unitProps.specials.includes("c3m") || unit.unitProps.specials.includes("c3s")) {
        networks.forEach((network) => {
            if (network.type == "c3") {
                if (network.rootUnit.id == unit.id || network.rootUnit.links.find((x) => x.id == unit.id)) {
                    connectedNetwork = network;
                    modifiedBV += getNetworkBV(network.id);
                }
            }
        });
    }
    if (connectedNetwork && !fromNetworkChange) {
        updateNetworkBV(connectedNetwork);
    }

    unit.adjustedBV = Math.round(modifiedBV * getSkillMultiplier(g,p));

    const $adjbv = $("#unit-" + unit.id + " .adj-bv");

    $adjbv.text(unit.adjustedBV);

    updateTotals();
}

function getNetworkBV(networkId) {
    const network = networks.get(networkId);
    if (network.type == "c3") {
        let networkBV = 0;
        const rootUnit = force.get(network.rootUnit.id);

        // TODO: This should include alternate munitions and TAG BV...

        networkBV += rootUnit.unitProps.bv * 0.05;

        network.rootUnit.links.forEach((link) => {
            const linkedUnit = force.get(link.id);
            if (linkedUnit) {
                networkBV += linkedUnit.unitProps.bv * 0.05;
            }
        });

        return networkBV;
    }
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

function addNetworkEditor(network) {
    const networkLabel = `network-${network.id}`;
    const $networkEditor = $("<details>", {id: networkLabel});
    if (network.type == "c3") {
        $networkEditor.append(`<summary>C<sup>3</sup> Network #${network.id}</summary>`);

        const $rootSelect = $("<select>", {class: "network c3m"});
        c3mUnits.forEach((c3mLink) => {
            const c3mUnit = force.get(c3mLink.id);
            $rootSelect.append(`<option class='network c3m' value='${c3mLink.id}'>${getUnitFullName(c3mUnit)}</option>`);
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
            $linkSelect.append(`<option class='network' value='0' selected>~EMPTY~</option>`)
            c3sUnits.forEach((c3s) => {
                const c3sUnit = force.get(c3s.id);
                $linkSelect.append(`<option class='network c3s' value='${c3s.id}'>${getUnitFullName(c3sUnit)}</option>`);
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
    }

    $("#network-setups").append($networkEditor);
}

function markNetworkUnitAsLinked(unitId) {
    const $c3sSelectMatches = $(`select.network.c3s[value!='${unitId}'] option[value='${unitId}']`);
    $c3sSelectMatches.attr("disabled", "disabled");
    $c3sSelectMatches.attr("hidden", "hidden");
}

function markNetworkUnitAsUnlinked(unitId) {
    const $c3sSelectMatches = $(`option.network.c3s[value='${unitId}']`);
    $c3sSelectMatches.removeAttr("disabled");
    $c3sSelectMatches.removeAttr("hidden");
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
    }
}

function dumpDebugData() {
    $("#debug-output").children().remove();

    let data = "";

    force.forEach((unit) => {
        data += `${unit.id}: ${getUnitFullName(unit)} ${unit.unitProps.bv} ${unit.adjustedBV}\n`;
    });

    data += "\n";
    networks.forEach((network) => {
        data += `${network.id}: ${network.type}\n`
        if (network.type == "c3") {
            data += `- ${network.rootUnit.id}\n`;
            network.rootUnit.links.forEach((link) => {
                data += `  - ${link.id}\n`;
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