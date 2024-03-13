let nextUnitId = 1;
let nextNetworkId = 1;

let debugMode = false;
let searchInProgress = false;

const force = new Map();
const networks = new Map();

let previousSearchQuery = "";
let searchResumeToken = 0;

const c3mUnits = [];
const c3sUnits = [];
const c3iUnits = [];

readyInterface();

function readyInterface() {
    $(".lazy").removeAttr("disabled");

    const urlParams = new URLSearchParams(window.location.search);
    const debugParam = urlParams.get('debug');
    if (debugParam == "true") {
        debugMode = true;
        $("body").append("<h3 class='no-print'>Debug</h3>");
        $("body").append(
            `<div class="no-print">
                <button type="button" onclick="dumpDebugData()">Dump Debug Data</button>
                <pre id="debug-output"></pre>
            </div>`
        );
    }
}

function searchKeyDown(e) {
    if (e.key == "Enter") {
        searchUnits();
    }
}

function searchUnits() {
    if (searchInProgress) {
        // Avoid starting a new search while waiting for results
        return;
    }

    const query = $("#search-box").val().toLowerCase().trim();
    let moreAvailable = false;

    const searchEra = $("#search-era").val();
    const searchFaction = $("#search-faction").val();

    let minTonnage = 0;
    let maxTonnage = Number.MAX_VALUE;

    const minTonnageValue = $("#search-min-tonnage").val();
    const maxTonnageValue = $("#search-max-tonnage").val();
    if (minTonnageValue != "") {
        minTonnage = Number(minTonnageValue);
    }
    if (maxTonnageValue != "") {
        maxTonnage = Number(maxTonnageValue);
    }

    let minBV = 0;
    let maxBV = Number.MAX_VALUE;

    const minBVValue = $("#search-min-bv").val();
    const maxBVValue = $("#search-max-bv").val();
    if (minBVValue != "") {
        minBV = Number(minBVValue);
    }
    if (maxBVValue != "") {
        maxBV = Number(maxBVValue);
    }

    const requireC3M = $("#search-c3m").is(":checked");
    const requireC3S = $("#search-c3s").is(":checked");
    const requireC3i = $("#search-c3i").is(":checked");
    const requireOmni = $("#search-omni").is(":checked");
    const requireTAG = $("#search-tag").is(":checked");

    let searchParams = new URLSearchParams();
    if (query.length > 0) {
        searchParams.append("name", query);
    }
    if (searchEra != "any") {
        searchParams.append("era", searchEra);
    }
    if (searchFaction != "any") {
        searchParams.append("faction", searchFaction);
    }
    if (minBV != 0) {
        searchParams.append("minBV", minBV);
    }
    if (maxBV != Number.MAX_VALUE) {
        searchParams.append("maxBV", maxBV);
    }
    if (minTonnage != 0) {
        searchParams.append("minTon", minTonnage);
    }
    if (maxTonnage != Number.MAX_VALUE) {
        searchParams.append("maxTon", maxTonnage);
    }
    if (requireC3M) {
        searchParams.append("c3m", "1");
    }
    if (requireC3S) {
        searchParams.append("c3s", "1");
    }
    if (requireC3i) {
        searchParams.append("c3i", "1");
    }
    if (requireOmni) {
        searchParams.append("omni", "1");
    }
    if (requireTAG) {
        searchParams.append("tag", "1");
    }

    showSearchStatus("Searching...");
    searchInProgress = true;

    let searchUri = "https://fwti-unitsearch.azurewebsites.net/api/search?";
    if (debugMode) {
        searchUri = "http://localhost:7071/api/search?";
    }
    previousSearchQuery = searchParams.toString();
    searchUri += previousSearchQuery;

    $.ajax({
        url: searchUri,
        dataType: "json",
        success: (result) => {
            let more = false;
            if (result.units) {
                knownUnits = result.units;
                more = result.resume > 0;
                searchResumeToken = result.resume;
            } else {
                if (result.length > 10)
                {
                    result.pop();
                    more = true;
                }
                knownUnits = result;
            }
            showUnitList(knownUnits, more, false);
            searchInProgress = false;
        },
        error: () => {
            showSearchStatus("Request failed!");
            searchInProgress = false;
        }
    });
}

function resumeSearch() {
    let searchUri = "https://fwti-unitsearch.azurewebsites.net/api/search?";
    if (debugMode) {
        searchUri = "http://localhost:7071/api/search?";
    }
    searchUri += previousSearchQuery;
    if (previousSearchQuery.length > 0) {
        searchUri += "&";
    }
    searchUri += `r=${searchResumeToken}`;

    searchInProgress = true;
    showUnitList(knownUnits, false, true);

    $.ajax({
        url: searchUri,
        dataType: "json",
        success: (result) => {
            let more = false;
            if (result.units) {
                result.units.forEach((unit) => {
                    knownUnits.push(unit);
                });
                more = result.resume > 0;
                searchResumeToken = result.resume;
            }
            showUnitList(knownUnits, more, false);
            searchInProgress = false;
        },
        error: () => {
            showUnitList(knownUnits, false, false);
            searchInProgress = false;
        }
    });
}

function showSearchStatus(message) {
    $("#search-results").children().remove();
    $("#search-results").append(`<li><em>${message}</em></li>`);
}

function showUnitList(list, moreAvailable, searching) {
    $("#search-results").children().remove();

    if (list.length == 0) {
        $("#search-results").append(`<li><em>No units found.</em></li>`);
    } else {
        list.forEach((unit) => {
            $("#search-results").append(`<li><button title='Add unit to force' type='button' onclick='addUnitById("${unit.id}")'><span class="material-symbols-outlined">add</span></button><span class="search-result">${unit.name}<span class="subtle"> - ${unit.bv.toLocaleString("en-us")} BV</span></span></li>`);
        });
        if (moreAvailable) {
            if (searchResumeToken) {
                $("#search-results").append(`<li><button title='Show more' type='button' onclick='resumeSearch()'>Show More</button><em>More units available.</em></li>`);
            } else {
                $("#search-results").append(`<li><em>More units available.</em></li>`);
            }
        }
        if (searching) {
            $("#search-results").append(`<li><em>Searching...</em></li>`);
        }
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
    let nonStandardSkills = false;

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

    unitProps.ammo.forEach((ammoBin, index) => {
        newUnit.ammoTypes.set(index, ammoBin.default ? ammoBin.default : "standard");
    });

    if (unitProps.unitType.startsWith("CI")) {
        if (!unitProps.specials.includes("anti-mech")) {
            // Conventional infantry without Anti-Mech training have their skill fixed at 8
            newUnit.piloting = 8;
            nonStandardSkills = true;
        }
    }

    let crewCount = 1;
    if (unitProps.specials.includes("commandconsole")) {
        crewCount = 2;
    } else if (unitProps.unitType == "QV") {
        crewCount = 2;
    } else if (unitProps.unitType == "BM:Tripod" || unitProps.unitType == "IM:Tripod") {
        crewCount = 2;
        if (unitProps.tonnage > 100) {
            crewCount = 3;
        }
    }

    if (crewCount >= 2) {
        newUnit.crew2 = "";
        newUnit.gunnery2 = 4;
        newUnit.piloting2 = 5;
    }

    if (crewCount >= 3) {
        newUnit.crew3 = "";
        newUnit.gunnery3 = 4;
        newUnit.piloting3 = 5;
    }

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
    addUnitToAllNetworkSelects(newUnit);

    if (unitProps.specials.includes("tag") || nonStandardSkills) {
        updateUnitBV(newUnit);
    }
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
    const $li = $("<li>", {id: `unit-${unit.id}`, class: "unit-entry"});
    
    const $headerRow = $("<div>", {class: "unit-entry-header"});
    $headerRow.append("<button class='remove-button' type='button' title='Remove unit from force' onclick='removeUnit(" + unit.id + ")'><span class='material-symbols-outlined'>delete</span></button>");
    $headerRow.append(`<h4>${unit.unitProps.name}</h4>`);
    $li.append($headerRow);

    const $costsDiv = $("<div>", {class: "unit-costs"});
    $costsDiv.append(`<span>Tonnage: <span class='tonnage'>${unit.unitProps.tonnage}</span></span>`);
    $costsDiv.append(`<span>Base BV: <span class='bv'>${unit.unitProps.bv}</span></span>`);
    $costsDiv.append(`<span>Adjusted BV: <span class='adj-bv'>${unit.adjustedBV}</span></span>`);
    $li.append($costsDiv);

    let secondarySkillName = getSecondarySkillName(unit);
    let crewPlaceholder = "MechWarrior Name";
    let fixedSecondarySkill = false;

    if (unit.unitProps.unitType == "BA") {
        crewPlaceholder = "Unit Name";
    } else if (unit.unitProps.unitType.startsWith("CV")) {
        crewPlaceholder = "Crew Name";
    } else if (unit.unitProps.unitType == "PM") {
        crewPlaceholder = "Pilot Name";
    } else if (unit.unitProps.unitType == "QV") {
        crewPlaceholder = "Pilot Name";
    } else if (unit.unitProps.unitType == "BM:Tripod" || unit.unitProps.unitType == "IM:Tripod") {
        crewPlaceholder = "Pilot Name";
    } else if (unit.unitProps.unitType.startsWith("CI")) {
        crewPlaceholder = "Unit Name";
        if (unit.unitProps.unitType != "CI:Mechanized") {
            if (!unit.unitProps.specials.includes("anti-mech")) {
                fixedSecondarySkill = true;
            }
        }
    }

    const $crewDiv = $("<div>", {class: "unit-crew"});
    $crewDiv.append(`<input class='crew-name crew1' type='text' placeholder='${crewPlaceholder}' onchange='updateCrewName(${unit.id})'>`);
    $crewDiv.append(createSkillPicker(unit.id, "g", "Gunnery", unit.gunnery));
    if (secondarySkillName.length > 0) {
        $crewDiv.append(createSkillPicker(unit.id, "p", secondarySkillName, unit.piloting, fixedSecondarySkill));
    }
    $li.append($crewDiv);

    let secondCrewPlaceholder = "";
    let secondCrewSecondarySkillName = "Piloting";

    let thirdCrewPlaceholder = "";
    let thirdCrewSecondarySkillName = "Piloting";

    if (unit.unitProps.specials.includes("commandconsole")) {
        secondCrewPlaceholder = "Command Console MechWarrior Name";
    } else if (unit.unitProps.unitType == "QV") {
        secondCrewPlaceholder = "Gunner Name";
    } else if (unit.unitProps.unitType == "BM:Tripod" || unit.unitProps.unitType == "IM:Tripod") {
        secondCrewPlaceholder = "Equipment/Gunnery Officer Name";
        if (unit.unitProps.tonnage > 100) {
            thirdCrewPlaceholder = "Technical Officer Name";
        }
    }

    if (secondCrewPlaceholder.length > 0) {
        const $crewDiv2 = $("<div>", {class: "unit-crew"});
        $crewDiv2.append(`<input class='crew-name crew2' type='text' placeholder='${secondCrewPlaceholder}' onchange='updateCrewName(${unit.id},"second")'>`);
        $crewDiv2.append(createSkillPicker(unit.id, "g2", "Gunnery", unit.gunnery));
        $crewDiv2.append(createSkillPicker(unit.id, "p2", secondCrewSecondarySkillName, unit.piloting));
        $li.append($crewDiv2);
    }

    if (thirdCrewPlaceholder.length > 0) {
        const $crewDiv3 = $("<div>", {class: "unit-crew"});
        $crewDiv3.append(`<input class='crew-name crew3' type='text' placeholder='${thirdCrewPlaceholder}' onchange='updateCrewName(${unit.id},"third")'>`);
        $crewDiv3.append(createSkillPicker(unit.id, "g3", "Gunnery", unit.gunnery));
        $crewDiv3.append(createSkillPicker(unit.id, "p3", thirdCrewSecondarySkillName, unit.piloting));
        $li.append($crewDiv3);
    }

    $("#force-list").append($li);

    updateTotals();
}

function addUnitAmmoSelector(unit)
{
    // Check if the unit uses any ammo
    if (unit.unitProps.ammo.length > 0) {
        let hasChoices = false;

        const unitLabel = "ammo-" + unit.id;
        const $ammoSelections = $("<details>", {id: unitLabel});
        $ammoSelections.append(`<summary>Ammo Selections</summary>`)
        unit.unitProps.ammo.forEach((element, index) => {
            const slotLabel = unitLabel + "-slot-" + index;
            const selectLabel = slotLabel + "-sel";
            
            let slotTitle = getWeaponName(element.type);
            slotTitle += " (" + element.location + ")";
            
            let ammoOptions = getAmmoTypes(element.type);

            if (ammoOptions.length > 1) {
                const $selection = $("<div>", {id: slotLabel});
                $selection.append("<label for='" + selectLabel + "'>" + slotTitle + "</label>");
                
                $ammoSelect = $("<select>", { id: selectLabel, class: "ammo" });

                let availableOptions = 0;
                ammoOptions.forEach(option => {
                    if (option.requirement) {
                        if (!unit.unitProps.specials.includes(option.requirement)) {
                            return;
                        }
                    }
                    availableOptions += 1;
                    const ammoName = getAmmoName(element.type, option.id, element.shots);
                    if (element.default ? option.id == element.default : option.id == "standard") {
                        $ammoSelect.append(`<option value='${option.id}' selected='selected'>${ammoName}</option>`);
                    } else {
                        $ammoSelect.append(`<option value='${option.id}'>${ammoName}</option>`);
                    }
                });
                if (availableOptions > 1) {
                    hasChoices = true;
                }

                $ammoSelect.on("change", function(e) {
                    const ammoType = e.target.value;

                    const previousAmmoType = unit.ammoTypes.get(index);
            
                    unit.ammoTypes.set(index, ammoType);

                    if (previousAmmoType == "caseless" || ammoType == "caseless") {
                        // Need to ensure exclusivity of caseless ammo
                        
                        // If switching from other to "caseless", switch all other ammo entries for the same weapon type to "caseless"
                        if (previousAmmoType == "caseless" && ammoType != "caseless") {
                            clearExclusiveAmmo(unit, element.type, "caseless", "standard");
                        }

                        // If switching from "caseless" to other, switch all other ammo entries for the same weapon from "caseless" to "standard"
                        if (previousAmmoType != "caseless" && ammoType == "caseless") {
                            setExclusiveAmmo(unit, element.type, "caseless");
                        }
                    }
            
                    updateUnitBV(unit);
                    adjustTAGUnitsBV();
                });

                $selection.append($ammoSelect);

                $ammoSelections.append($selection);
            }
        });

        if (hasChoices) {
            $(`#unit-${unit.id}`).append($ammoSelections);
        }
    }
}

function clearExclusiveAmmo(unit, weaponType, exclusiveAmmoType, defaultAmmoType) {
    const unitLabel = "ammo-" + unit.id;
    unit.unitProps.ammo.forEach((ammoBin, index) => {
        const slotLabel = unitLabel + "-slot-" + index;
        const selectLabel = slotLabel + "-sel";

        if (ammoBin.type == weaponType) {
            const currentType = unit.ammoTypes.get(index);
            if (currentType == exclusiveAmmoType) {
                unit.ammoTypes.set(index, defaultAmmoType);
                $(`#${selectLabel}`).val(defaultAmmoType);
            }
        }
    });
}

function setExclusiveAmmo(unit, weaponType, exclusiveAmmoType) {
    const unitLabel = "ammo-" + unit.id;
    unit.unitProps.ammo.forEach((ammoBin, index) => {
        const slotLabel = unitLabel + "-slot-" + index;
        const selectLabel = slotLabel + "-sel";

        if (ammoBin.type == weaponType) {
            const currentType = unit.ammoTypes.get(index);
            if (currentType != exclusiveAmmoType) {
                unit.ammoTypes.set(index, exclusiveAmmoType);
                $(`#${selectLabel}`).val(exclusiveAmmoType);
            }
        }
    });
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
                forEachNetworkUnit(network, (networkUnit) => {
                    if (unit.id == networkUnit.id) {
                        connectedNetwork = network;
                        const networkBV = Math.round(getNetworkBV(network.id, unit.unitProps.specials.includes("boostedc3")));
                        modifiedBV += networkBV;
                        bvNotes.push({note: "C3", amount: networkBV});
                    }
                });
            }
        });
    }
    if (unit.unitProps.specials.includes("c3i")) {
        networks.forEach((network) => {
            if (network.type == "c3i") {
                forEachNetworkUnit(network, (networkUnit) => {
                    if (unit.id == networkUnit.id) {
                        connectedNetwork = network;
                        const networkBV = Math.round(getNetworkBV(network.id, false));
                        modifiedBV += networkBV;
                        bvNotes.push({note: "C3i", amount: networkBV});
                    }
                });
            }
        });
    }
    if (connectedNetwork && !fromNetworkChange) {
        updateNetworkBV(connectedNetwork);
    }

    let multiplier = getSkillMultiplier(g,p);
    if (unit.unitProps.specials.includes("commandconsole")) {
        const ccMultiplier = getSkillMultiplier(unit.gunnery2, unit.piloting2);
        if (ccMultiplier > multiplier) {
            multiplier = ccMultiplier;
        }
    } else if (unit.unitProps.unitType == "QV") {
        const avgGunnery = Math.round((unit.gunnery + unit.gunnery2) / 2.0);
        const avgPiloting = Math.round((unit.piloting + unit.piloting2) / 2.0);
        multiplier = getSkillMultiplier(avgGunnery, avgPiloting);
    } else if (unit.unitProps.unitType == "BM:Tripod" || unit.unitProps.unitType == "IM:Tripod") {
        if (unit.unitProps.tonnage > 100) {
            const avgGunnery = Math.round((unit.gunnery + unit.gunnery2 + unit.gunnery3) / 3.0);
            const avgPiloting = Math.round((unit.piloting + unit.piloting2 + unit.piloting3) / 3.0);
            multiplier = getSkillMultiplier(avgGunnery, avgPiloting);
        } else {
            const avgGunnery = Math.round((unit.gunnery + unit.gunnery2) / 2.0);
            const avgPiloting = Math.round((unit.piloting + unit.piloting2) / 2.0);
            multiplier = getSkillMultiplier(avgGunnery, avgPiloting);
        }
    }
    unit.adjustedBV = Math.round(modifiedBV * multiplier);
    if (multiplier != 1) {
        bvNotes.push({note: `Skills ×${multiplier}`, amount:(unit.adjustedBV - modifiedBV), multiplier: multiplier});
    }

    unit.bvNotes = bvNotes;
    const $adjbv = $("#unit-" + unit.id + " .adj-bv");

    $adjbv.text(unit.adjustedBV);

    updateTotals();
}

function getAlternateAmmoBV(unit) {
    let alternateAmmoBV = 0;
    unit.unitProps.ammo.forEach((ammoBin, index) => {
        const addedValue = getAmmoAdditionalBV(ammoBin.type, unit.ammoTypes.get(index));
        alternateAmmoBV += addedValue;
    });
    return Math.round(alternateAmmoBV);
}

function getAdditionalBVforTAG(unit) {
    let tagCount = 0;
    unit.unitProps.specials.forEach((special) => {
        if (special == "tag") {
            tagCount += 1;
        }
    });
    if (tagCount > 0) {
        const semiGuidedAmmoBV = Math.round(tagCount * getSemiGuidedAmmoValueForForce());
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

function getNetworkBV(networkId, isBoosted) {
    let networkBV = 0;
    let unitCount = 0;
    const network = networks.get(networkId);

    let multiplier = 0.05;
    if (isBoosted) {
        multiplier = 0.07;
    }

    forEachNetworkUnit(network, (unit) => {
        networkBV += getNetworkBVforUnit(unit) * multiplier;
        unitCount += 1;
    });

    return unitCount > 1 ? networkBV : 0;
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
        unit.unitProps.ammo.forEach((ammoBin, index) => {
            const addedValue = getTAGAdditionalBV(ammoBin.type, unit.ammoTypes.get(index));
            total += addedValue;
        });
    });
    return total;
}

function createSkillPicker(id, type, label, initialRating, fixedSkill)
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
        if (type === "g") {
            unit.gunnery = skill;
        } else if (type === "p") {
            unit.piloting = skill;
        } else if (type === "g2") {
            unit.gunnery2 = skill;
        } else if (type === "p2") {
            unit.piloting2 = skill;
        } else if (type === "g3") {
            unit.gunnery3 = skill;
        } else if (type === "p3") {
            unit.piloting3 = skill;
        }

        updateUnitBV(unit);
    });

    if (fixedSkill) {
        $select.attr("disabled", "disabled");
    }

    const $label = $("<label>");
    $label.addClass("crew-skill");
    $label.text(`${label}:`);
    $label.append($select);
    return $label;
}

function removeUnit(id) {
    $("#unit-" + id).remove();

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
    $("#force-list").children().remove();
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

function updateCrewName(id, position) {
    const unit = force.get(id);
    
    if (position == "second") {
        const crewName = $("#unit-" + id + " .crew-name.crew2").val();
        unit.crew2 = crewName;
    } else if (position == "third") {
        const crewName = $("#unit-" + id + " .crew-name.crew3").val();
        unit.crew3 = crewName;
    } else {
        const crewName = $("#unit-" + id + " .crew-name.crew1").val();
        unit.crew = crewName;
        $(`option.network[value='${id}']`).text(getUnitFullName(unit));
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
        let crewName = unit.crew;
        let gunnery = `${unit.gunnery}`;
        let piloting = `${unit.piloting}`;
        if (unit.crew2 != undefined) {
            crewName += `, ${unit.crew2}`;
            gunnery += `, ${unit.gunnery2}`;
            piloting += `, ${unit.piloting2}`;
        }
        if (unit.crew3 != undefined) {
            crewName += `, ${unit.crew3}`;
            gunnery += `, ${unit.gunnery3}`;
            piloting += `, ${unit.piloting3}`;
        }
        contents += `| ${unit.unitProps.name} | ${crewName} | ${gunnery} | ${piloting} | ${unit.unitProps.tonnage} | ${unit.unitProps.bv} | ${unit.adjustedBV} |\n`;
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
            
            unit.unitProps.ammo.forEach((ammoBin, index) => {
                const weaponName = getWeaponName(ammoBin.type);
                const ammoName = getAmmoName(ammoBin.type, unit.ammoTypes.get(index), ammoBin.shots);
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
                    contents += `  - ${getUnitFullName(linkedUnit)}\n`;
                } else if (link.id == -1) {
                    contents += "  - Self-link\n";
                }
                if (link.links) {
                    link.links.forEach((sublink) => {
                        const sublinkedUnit = force.get(sublink.id);
                        if (sublinkedUnit) {
                            contents += `    - ${getUnitFullName(sublinkedUnit)}\n`;
                        }
                    });
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

function readyPrintContent() {
    const $forceList = $("#force-list-print");

    let totalTonnage = 0;
    let totalBV = 0;
    let totalAdjBV = 0;
    let unitCount = 0;

    $forceList.append("<h1>BattleTech Force</h1>");

    const $unitTable = $("<table>", {class: "full-width small-font"});
    const $headerRow = $("<tr>");
    $headerRow.append("<th>Unit</th>");
    $headerRow.append("<th>Type</th>"); 
    $headerRow.append("<th class='center-align'>Skill</th>"); 
    $headerRow.append("<th class='right-align'>Tonnage</th>"); 
    $headerRow.append("<th class='right-align'>Base BV</th>"); 
    $headerRow.append("<th class='right-align'>Adjusted BV</th>"); 
    $unitTable.append($headerRow);

    force.forEach((unit) => {
        const unitName = getUnitFullName(unit);

        const unitTonnage = unit.unitProps.tonnage;
        const unitBaseBV = unit.unitProps.bv;
        const unitAdjBV = unit.adjustedBV;

        const $unitRow = $("<tr>");

        let unitType = "BattleMech";
        let unitSkills = `${unit.gunnery}/${unit.piloting}`;

        if (unit.unitProps.unitType.startsWith("CV")) {
            unitType = "Vehicle";
        } else if (unit.unitProps.unitType.startsWith("BA")) {
            unitType = "Battle Armor";
        } else if (unit.unitProps.unitType.startsWith("PM")) {
            unitType = "ProtoMech";
            unitSkills = `${unit.gunnery}`;
        } else if (unit.unitProps.unitType.startsWith("CI")) {
            unitType = "Infantry";
            if (unit.unitProps.unitType == "CI:Mechanized") {
                unitSkills = `${unit.gunnery}`;
            }
        }

        if (unit.crew2 != undefined) {
            if (unit.gunnery != unit.gunnery2 || unit.piloting != unit.piloting2) {
                unitSkills = "*";
            }
        }
        if (unit.crew3 != undefined) {
            if (unit.gunnery != unit.gunnery3 || unit.piloting != unit.piloting3) {
                unitSkills = "*";
            }
        }

        $unitRow.append(`<td>${unitName}</td>`);
        $unitRow.append(`<td>${unitType}</td>`);
        $unitRow.append(`<td class="center-align">${unitSkills}</td>`);
        $unitRow.append(`<td class="right-align">${unitTonnage.toLocaleString("en-us")}</td>`);
        $unitRow.append(`<td class="right-align">${unitBaseBV.toLocaleString("en-us")}</td>`);
        $unitRow.append(`<td class="right-align">${unitAdjBV.toLocaleString("en-us")}</td>`);

        $unitTable.append($unitRow);

        totalTonnage += unitTonnage;
        totalBV += unitBaseBV;
        totalAdjBV += unitAdjBV;
        unitCount += 1;
    });

    const $footerRow = $("<tr>");
    $footerRow.append(`<th>${unitCount} Unit${unitCount == 1 ? "" : "s"}</th>`);
    $footerRow.append("<th></th>"); 
    $footerRow.append("<th></th>"); 
    $footerRow.append(`<th class="right-align">${totalTonnage.toLocaleString("en-us")}</th>`); 
    $footerRow.append(`<th class="right-align">${totalBV.toLocaleString("en-us")}</th>`); 
    $footerRow.append(`<th class="right-align">${totalAdjBV.toLocaleString("en-us")}</th>`); 
    $unitTable.append($footerRow);

    $forceList.append($unitTable);

    if (networks.size > 0) {
        networks.forEach((network) => {
            const $networkList = $("<ul>");

            if (network.type == "c3") {
                $forceList.append("<h3>C<sup>3</sup> Network</h3>");
                const $rootListItem = $("<li>");
                const rootUnit = force.get(network.rootUnit.id);
                $rootListItem.text(getUnitFullName(rootUnit));

                const $linkList = $("<ul>");
                let linkCount = 0;

                network.rootUnit.links.forEach((link) => {
                    const $linkItem = $("<li>");
                    if (link.id > 0) {
                        const linkUnit = force.get(link.id);
                        $linkItem.text(getUnitFullName(linkUnit));

                        if (link.links) {
                            const $sublinkList = $("<ul>");
                            let sublinkCount = 0;
                            link.links.forEach((sublink) => {
                                if (sublink.id > 0) {
                                    const sublinkUnit = force.get(sublink.id);
                                    $sublinkList.append(`<li>${getUnitFullName(sublinkUnit)}</li>`);
                                    sublinkCount += 1;
                                }
                            });
                            if (sublinkCount > 0) {
                                $linkItem.append($sublinkList);
                            }
                        }

                        $linkList.append($linkItem);
                        linkCount += 1;
                    } else if (link.id == -1) {
                        $linkItem.text("Self-Link");

                        if (link.links) {
                            const $sublinkList = $("<ul>");
                            let sublinkCount = 0;
                            link.links.forEach((sublink) => {
                                if (sublink.id > 0) {
                                    const sublinkUnit = force.get(sublink.id);
                                    $sublinkList.append(`<li>${getUnitFullName(sublinkUnit)}</li>`);
                                    sublinkCount += 1;
                                }
                            });
                            if (sublinkCount > 0) {
                                $linkItem.append($sublinkList);
                            }
                        }

                        $linkList.append($linkItem);
                        linkCount += 1;
                    } 
                });

                if (linkCount > 0) {
                    $rootListItem.append($linkList);
                }

                $networkList.append($rootListItem);
            }
            else if (network.type == "c3i") {
                $forceList.append("<h3>C<sup>3</sup>i Network</h3>");
                network.units.forEach((link) => {
                    const linkedUnit = force.get(link.id);
                    if (linkedUnit) {
                        $networkList.append(`<li>${getUnitFullName(linkedUnit)}</li>`);
                    }
                });
            }

            $forceList.append($networkList);
        });
    }

    const $pageBreakDiv = $("<div>", {class: "new-page"});
    $forceList.append($pageBreakDiv);

    force.forEach((unit) => {
        const $unitDiv = $("<div>", {class: "small-font avoid-break"});
        $unitDiv.append(`<h2>${getUnitFullName(unit)}</h2>`);

        const $costsDiv = $("<div>", {class: "flex-row"});
        $costsDiv.append(`<span class="flex-item"><b>Tonnage:</b> ${unit.unitProps.tonnage.toLocaleString("en-us")}</span>`);
        $costsDiv.append(`<span class="flex-item"><b>Base BV:</b> ${unit.unitProps.bv.toLocaleString("en-us")}</span>`);
        $costsDiv.append(`<span class="flex-item"><b>Adjusted BV:</b> ${unit.adjustedBV.toLocaleString("en-us")}</span>`);
        $unitDiv.append($costsDiv);

        let crewName = unit.crew;
        let secondarySkill = getSecondarySkillName(unit);
        const positionName = getCrewPositionName(unit, 1);

        const $crewDiv = $("<div>", {class: "flex-row"});
        $crewDiv.append(`<span class="flex-item"><b>${positionName}:</b> ${crewName}</span>`);
        $crewDiv.append(`<span class="flex-item"><b>Gunnery:</b> ${unit.gunnery}</span>`);
        if (secondarySkill.length > 0) {
            $crewDiv.append(`<span class="flex-item"><b>${secondarySkill}:</b> ${unit.piloting}</span>`);
        } else {
            $crewDiv.append(`<span class="flex-item"></span>`);
        }
        $unitDiv.append($crewDiv);

        if (unit.crew2 != undefined) {
            const $crew2Div = $("<div>", {class: "flex-row"});
            const position2Name = getCrewPositionName(unit, 2);
            $crew2Div.append(`<span class="flex-item"><b>${position2Name}:</b> ${unit.crew2}</span>`);
            $crew2Div.append(`<span class="flex-item"><b>Gunnery:</b> ${unit.gunnery2}</span>`);
            if (secondarySkill.length > 0) {
                $crew2Div.append(`<span class="flex-item"><b>${secondarySkill}:</b> ${unit.piloting2}</span>`);
            } else {
                $crew2Div.append(`<span class="flex-item"></span>`);
            }
            $unitDiv.append($crew2Div);
        }

        if (unit.crew3 != undefined) {
            const $crew3Div = $("<div>", {class: "flex-row"});
            const position3Name = getCrewPositionName(unit, 3);
            $crew3Div.append(`<span class="flex-item"><b>${position3Name}:</b> ${unit.crew3}</span>`);
            $crew3Div.append(`<span class="flex-item"><b>Gunnery:</b> ${unit.gunnery3}</span>`);
            if (secondarySkill.length > 0) {
                $crew3Div.append(`<span class="flex-item"><b>${secondarySkill}:</b> ${unit.piloting3}</span>`);
            } else {
                $crew3Div.append(`<span class="flex-item"></span>`);
            }
            $unitDiv.append($crew3Div);
        }

        let ammoSelectionCount = 0;
        const $ammoList = $("<ul>", {class: "multi-column"});
        unit.unitProps.ammo.forEach((ammoBin, ammoIndex) => {
            const weaponName = getWeaponName(ammoBin.type);
            const selectedAmmoType = unit.ammoTypes.get(ammoIndex);
            const ammoName = getAmmoName(ammoBin.type, selectedAmmoType, ammoBin.shots);
            $ammoList.append(`<li>${weaponName} (${ammoBin.location}): ${ammoName}</li>`);
            ammoSelectionCount += 1;
        });
        if (ammoSelectionCount > 0) {
            $unitDiv.append($ammoList);
        }

        let bvCalculation = `${unit.unitProps.bv.toLocaleString("en-us")}`;
        let skillMultiplier = 1;
        unit.bvNotes.forEach((note) => {
            if (note.multiplier != undefined) {
                skillMultiplier = note.multiplier;
            } else {
                if (note.amount >= 0) {
                    bvCalculation += ` + ${note.amount.toLocaleString("en-us")} (${note.note})`;
                } else {
                    bvCalculation += ` - ${Math.abs(note.amount).toLocaleString("en-us")} (${note.note})`;
                }
            }
        });
        bvCalculation = `(${bvCalculation}) × ${skillMultiplier}`
        bvCalculation += ` = ${unit.adjustedBV.toLocaleString("en-us")}`;
        $unitDiv.append(`<p><b>Battle Value Calculation:</b> ${bvCalculation}</p>`);

        $forceList.append($unitDiv);
    });
}

function cleanUpPrintContent() {
    const $forceList = $("#force-list-print");

    // Remove any old print contents
    $forceList.children().remove();
}

function printForce() {
    window.print();
}

function updateC3Eligibility() {
    let c3mAvailable = c3mUnits.find((x) => !x.linked) != undefined;

    let c3iAvailableCount = 0;
    c3iUnits.forEach((c3i) => {
        if (!c3i.linked) {
            c3iAvailableCount += 1;
        }
    });

    if (c3mAvailable) {
        $("#add-c3-network-button").removeAttr("disabled");
    } else {
        $("#add-c3-network-button").attr("disabled", "disabled");
    }

    if (c3iAvailableCount > 1) {
        $("#add-c3i-network-button").removeAttr("disabled");
    } else {
        $("#add-c3i-network-button").attr("disabled", "disabled");
    }

    networks.forEach((network) => {
        updateNetworkFull(network);
    });
}

function addC3Network() {
    const currentId = nextNetworkId++;

    const defaultRoot = c3mUnits.find((x) => !x.linked);

    const network = {
        id: currentId,
        type: "c3",
        rootUnit: {
            id: defaultRoot.id,  
            linkType: "s", 
            links: [
                {id: 0},
                {id: 0},
                {id: 0},
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

function updateSelfLinksForC3Editor(network) {
    if (network.type == "c3" && network.rootUnit.linkType == "m") {
        const networkLabel = `network-${network.id}`;
        const $networkEditor = $(`#${networkLabel}`);
        let c3mCount = 0;
        const rootUnit = force.get(network.rootUnit.id);
        rootUnit.unitProps.specials.forEach((special) => {
            if (special == "c3m") {
                c3mCount += 1;
            }
        });

        $networkEditor.find(`option[value="-1"]`).remove();

        if (c3mCount > 1) {
            // Add self options
            $networkEditor.find(`#${networkLabel}-0`).append(`<option value='-1'>${getUnitFullName(rootUnit)} (Self-link)</option>`);
            if (c3mCount > 2) {
                $networkEditor.find(`#${networkLabel}-1`).append(`<option value='-1'>${getUnitFullName(rootUnit)} (Self-link)</option>`);
            }
            if (c3mCount > 3) {
                $networkEditor.find(`#${networkLabel}-2`).append(`<option value='-1'>${getUnitFullName(rootUnit)} (Self-link)</option>`);
            }
        }
    }
}

function updateNetworkFull(network) {
    if (network.type == "c3") {
        const networkLabel = `network-${network.id}`;
        const $networkEditor = $(`#${networkLabel}`);

        let unitCount = 0;
        forEachNetworkUnit(network, (unit) => {
            unitCount += 1;
        });

        if (unitCount == 12) {
            for (let i = 0; i < 3; i++) {
                for (let j = 0; j < 3; j++) {
                    const $select = $(`#${networkLabel}-${i}-${j}`);
                    if ($select.val() == "0") {
                        $select.attr("disabled", "disabled");
                    }
                }
            }
        } else {
            for (let i = 0; i < 3; i++) {
                const $c3mSelect = $(`#${networkLabel}-${i}`);
                if ($c3mSelect.val() != 0) {
                    for (let j = 0; j < 3; j++) {
                        const $select = $(`#${networkLabel}-${i}-${j}`);
                        if ($select.val() == "0") {
                            $select.removeAttr("disabled");
                        }
                    }
                }
            }
        }
    }
}

function rebuildC3NetworkEditor(network) {
    const networkLabel = `network-${network.id}`;
    const $networkEditor = $(`#${networkLabel}`);

    $networkEditor.children().remove();

    $networkEditor.append(`<summary>C<sup>3</sup> Network #${network.id}</summary>`);

    const $rootSelect = $("<select>", {class: "network c3m"});
    c3mUnits.forEach((c3mLink) => {
        const c3mUnit = force.get(c3mLink.id);
        const $c3mUnitOption = $("<option>", {
            class: "network c3m", 
            value: `${c3mLink.id}`,
            text: getUnitFullName(c3mUnit)
        });
        if (c3mLink.id == network.rootUnit.id) {
            $c3mUnitOption.attr("selected", "selected");
        }
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
        updateSelfLinksForC3Editor(network);
    });
    $networkEditor.append($rootSelect);
    
    $networkEditor.append(`<label><input type='checkbox' id='${networkLabel}-type' ${network.rootUnit.linkType == "m" ? "checked" : ""}>Link to additional C<sup>3</sup>M computers</label>`);
    $networkEditor.find(`#${networkLabel}-type`).on("change", function() {
        const unitsToRemove = [];
        forEachNetworkUnit(network, (networkUnit) => {
            if (network.rootUnit.id != networkUnit.id) {
                unitsToRemove.push(networkUnit);
            }
        });
        if (this.checked) {
            network.rootUnit.linkType = "m";
            network.rootUnit.links[0] = {id: 0, links: [{id: 0},{id: 0},{id: 0},]};
            network.rootUnit.links[1] = {id: 0, links: [{id: 0},{id: 0},{id: 0},]};
            network.rootUnit.links[2] = {id: 0, links: [{id: 0},{id: 0},{id: 0},]};
        } else {
            network.rootUnit.linkType = "s";
            network.rootUnit.links[0] = {id: 0};
            network.rootUnit.links[1] = {id: 0};
            network.rootUnit.links[2] = {id: 0};
        }
        unitsToRemove.forEach((unitToRemove) => {
            const c3m = c3mUnits.find((x) => x.id == unitToRemove.id);
            if (c3m) {
                c3m.linked = false;
            }
            const c3s = c3sUnits.find((x) => x.id == unitToRemove.id);
            if (c3s) {
                c3s.linked = false;
            }
            const c3i = c3iUnits.find((x) => x.id == unitToRemove.id);
            if (c3i) {
                c3i.linked = false;
            }
            markNetworkUnitAsUnlinked(unitToRemove.id);
            updateUnitBV(unitToRemove);
        });
        updateNetworkBV(network);
        
        rebuildC3NetworkEditor(network);
    });

    const $linksList = $("<ul>");
    if (network.rootUnit.linkType == "m") {
        for (let i = 0; i < 3; i++) {
            const $linkListItem = $("<li>");
            const $linkSelect = $("<select>", {id: `${networkLabel}-${i}`, class: "network c3m"});
            $linkSelect.append(`<option class='network' value='0' selected>~EMPTY~</option>`);
            c3mUnits.forEach((c3m) => {
                const c3mUnit = force.get(c3m.id);
                const $c3mUnitOption = $("<option>", {
                    class: "network c3m",
                    value: `${c3m.id}`,
                    text: getUnitFullName(c3mUnit)
                });
                if (c3m.linked) {
                    $c3mUnitOption.attr("disabled", "disabled");
                    $c3mUnitOption.attr("hidden", "hidden");
                }
                $linkSelect.append($c3mUnitOption);
            });
            $linkSelect.on("change", function(e) {
                const previousUnitId = network.rootUnit.links[i].id;
                const newUnitId = Number(e.target.value);
                network.rootUnit.links[i].id = newUnitId;
                if (newUnitId != 0) {
                    if (newUnitId > 0) {
                        c3mUnits.find((x) => x.id == newUnitId).linked = true;
                        markNetworkUnitAsLinked(newUnitId);
                    }

                    for (let j = 0; j < 3; j++) {
                        $(`#${networkLabel}-${i}-${j}`).removeAttr("disabled");
                    }
                } else {
                    for (let j = 0; j < 3; j++) {
                        $(`#${networkLabel}-${i}-${j}`).attr("disabled", "disabled");
                        $(`#${networkLabel}-${i}-${j}`).val(0);
                        const idToRemove = network.rootUnit.links[i].links[j].id;
                        if (idToRemove != 0) {
                            network.rootUnit.links[i].links[j].id = 0;
                            const c3s = c3sUnits.find((x) => x.id == idToRemove);
                            if (c3s) {
                                c3s.linked = false;
                            }
                            markNetworkUnitAsUnlinked(idToRemove);
                            const unitToRemove = force.get(idToRemove);
                            if (unitToRemove) {
                                updateUnitBV(unitToRemove);
                            }
                        }
                    }
                }

                // Update BV to reflect network change
                updateNetworkBV(network);
                const previousUnit = force.get(previousUnitId);
                if (previousUnit) {
                    c3mUnits.find((x) => x.id == previousUnitId).linked = false;
                    updateUnitBV(previousUnit, true);
                    markNetworkUnitAsUnlinked(previousUnitId);
                }
                updateC3Eligibility();
            });
            $linkListItem.append($linkSelect);

            const $sublinkList = $("<ul>");
            for (let j = 0; j < network.rootUnit.links[i].links.length; j++) {
                const $sublinkListItem = $("<li>");
                const $sublinkSelect = $("<select>", {id: `${networkLabel}-${i}-${j}`, class: "network c3s", disabled: "disabled"});
                $sublinkSelect.append(`<option class='network' value='0' selected>~EMPTY~</option>`);
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
                    $sublinkSelect.append($c3sUnitOption);
                });
                $sublinkSelect.on("change", function(e) {
                    const previousUnitId = network.rootUnit.links[i].links[j].id;
                    const newUnitId = Number(e.target.value);
                    network.rootUnit.links[i].links[j].id = newUnitId;
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
                $sublinkListItem.append($sublinkSelect);
                $sublinkList.append($sublinkListItem);
            }

            $linkListItem.append($sublinkList);

            $linksList.append($linkListItem);
        }
    } else {
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
    }
    $networkEditor.append($linksList);
    $networkEditor.append(`<button type='button' title='Remove C3 network' class='network' onclick='removeNetwork(${network.id})'>Remove Nework</button>`);
    updateSelfLinksForC3Editor(network);
}

function addNetworkEditor(network) {
    const networkLabel = `network-${network.id}`;
    const $networkEditor = $("<details>", {id: networkLabel});
    if (network.type == "c3") {
        $("#network-setups").append($networkEditor);
        rebuildC3NetworkEditor(network);
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
        $networkEditor.append(`<button type='button' title='Remove C3i network' class='network' onclick='removeNetwork(${network.id})'>Remove Nework</button>`);
        $("#network-setups").append($networkEditor);
    }
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

function addUnitToAllNetworkSelects(addedUnit) {
    // Add new unit as an option in network UIs
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
            removeNetwork(network.id);
            return;
        }

        network.rootUnit.links.forEach((link, index) => {
            const linkUnitId = link.id;
            if (linkUnitId == removedUnitId) {
                link.id = 0;
                $(`#network-${network.id}-${index}`).val(0);
                updateNetworkBV(network);

                if (link.links) {
                    for (let j = 0; j < 3; j++) {
                        $(`#network-${network.id}-${index}-${j}`).val(0);
                        $(`#network-${network.id}-${index}-${j}`).attr("disabled", "disabled");
                        const idToRemove = network.rootUnit.links[index].links[j].id;
                        if (idToRemove != 0) {
                            network.rootUnit.links[index].links[j].id = 0;
                            const c3s = c3sUnits.find((x) => x.id == idToRemove);
                            if (c3s) {
                                c3s.linked = false;
                            }
                            markNetworkUnitAsUnlinked(idToRemove);
                            const unitToRemove = force.get(idToRemove);
                            if (unitToRemove) {
                                updateUnitBV(unitToRemove);
                            }
                        }
                    }
                }
            }
            if (link.links) {
                link.links.forEach((sublink, subindex) => {
                    if (sublink.id == removedUnitId) {
                        sublink.id = 0;
                        $(`#network-${network.id}-${index}-${subindex}`).val(0);
                        updateNetworkBV(network);
                    }
                });
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
    forEachNetworkUnit(network, (unit) => {
        const c3m = c3mUnits.find((x) => x.id == unit.id);
        if (c3m) {
            c3m.linked = false;
        }
        const c3s = c3sUnits.find((x) => x.id == unit.id);
        if (c3s) {
            c3s.linked = false;
        }
        const c3i = c3iUnits.find((x) => x.id == unit.id);
        if (c3i) {
            c3i.linked = false;
        }
        markNetworkUnitAsUnlinked(unit.id);
    });
    updateC3Eligibility();
}

function updateNetworkBV(network) {
    forEachNetworkUnit(network, (unit) => {
        updateUnitBV(unit, true);
    });
}

function forEachNetworkUnit(network, f) {
    if (network.type == "c3") {
        const rootUnit = force.get(network.rootUnit.id);
        if (rootUnit) {
            f(rootUnit);
        }
        network.rootUnit.links.forEach((link) => {
            const linkedUnit = force.get(link.id);
            if (linkedUnit) {
                f(linkedUnit);
            }
            if (link.links) {
                link.links.forEach((sublink) => {
                    const sublinkedUnit = force.get(sublink.id);
                    if (sublinkedUnit) {
                        f(sublinkedUnit);
                    }
                });
            }
        });
    } else if (network.type == "c3i") {
        network.units.forEach((link) => {
            const linkedUnit = force.get(link.id);
            if (linkedUnit) {
                f(linkedUnit);
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
                if (link.links) {
                    link.links.forEach((sublink) => {
                        data += `    - ${sublink.id}\n`;
                    });
                }
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

function getSecondarySkillName(unit) {
    let secondarySkillName = "Piloting";
    if (unit.unitProps.unitType == "BA") {
        secondarySkillName = "Anti-’Mech";
    } else if (unit.unitProps.unitType.startsWith("CV")) {
        if (unit.unitProps.unitType != "CV:VTOL" && unit.unitProps.unitType != "CV:WiGE") {
            secondarySkillName = "Driving";
        }
    } else if (unit.unitProps.unitType == "PM") {
        secondarySkillName = "";
    } else if (unit.unitProps.unitType.startsWith("CI")) {
        secondarySkillName = "";
        if (unit.unitProps.unitType != "CI:Mechanized") {
            secondarySkillName = "Anti-’Mech";
        }
    }
    return secondarySkillName;
}

function getCrewPositionName(unit, slot) {
    let positionName = "MechWarrior";
    if (slot == 2) {
        positionName = "Command Console MechWarrior";
    }
    if (unit.unitProps.unitType == "BA") {
        positionName = "Unit";
    } else if (unit.unitProps.unitType.startsWith("CV")) {
        positionName = "Crew";
    } else if (unit.unitProps.unitType == "PM") {
        positionName = "Pilot";
    } else if (unit.unitProps.unitType == "QV") {
        positionName = "Pilot";
        if (slot == 2) {
            positionName = "Gunner";
        } 
    } else if (unit.unitProps.unitType == "BM:Tripod" || unit.unitProps.unitType == "IM:Tripod") {
        positionName = "Pilot";
        if (slot == 2) {
            positionName = "Equipment/Gunnery Officer";
        } else if (slot == 3) {
            positionName = "Technical Officer";
        }
    } else if (unit.unitProps.unitType.startsWith("CI")) {
        positionName = "Unit";
    }

    return positionName;
}