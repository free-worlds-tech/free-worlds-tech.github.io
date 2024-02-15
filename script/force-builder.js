let nextId = 1;

const force = new Map();

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

    const currentId = nextId++;

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
        $ammoSelections.append("<summary>" + unit.unitProps.name + " #" + unit.id + "</summary>")
        unit.unitProps.ammo.forEach(element => {
            const slotLabel = unitLabel + "-slot-" + element.id;
            const selectLabel = slotLabel + "-sel";
            const $selection = $("<div>", {id: slotLabel});
            
            let slotTitle = getWeaponName(element.type);
            slotTitle += " (" + element.location.toUpperCase() + ")";
            
            let ammoOptions = getAmmoTypes(element.type);

            $selection.append("<label for='" + selectLabel + "'>" + slotTitle + "</label>");
            
            $ammoSelect = $("<select>", { id: selectLabel });

            ammoOptions.forEach(option => {
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

function updateUnitBV(unit) {
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

    unit.adjustedBV = Math.round(modifiedBV * getSkillMultiplier(g,p));

    const $adjbv = $("#unit-" + unit.id + " .adj-bv");

    $adjbv.text(unit.adjustedBV);

    updateTotals();
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

    // Update the total fields to reflect removed unit.
    updateTotals();
}

function clearUnits() {
    $("#force-table-body").children().remove();
    $("#ammo-selections").children().remove();

    force.clear();

    updateTotals();
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
    const unitName = unit.unitProps.name;
    
    unit.crew = crewName;

    if (crewName != "") {
        $("#ammo-" + id + " summary").text(unitName + " | " + crewName);
    } else {
        $("#ammo-" + id + " summary").text(unitName + " #" + id);
    }
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
            contents += `### ${unit.unitProps.name}`;
            if (unit.crew != "") {
                contents += ` ${unit.crew}\n`;
            } else {
                contents += "\n";
            }
            
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