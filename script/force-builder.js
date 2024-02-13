let unitId = 0;

function addUnit() {
    const unit = getUnitProperties();

    const $row = $("<tr>", {id: "unit-" + unitId});
    $row.append("<td>" + unit.name + "</td");
    $row.append("<td><input type='text' placeholder='Name'></td>");
    $row.append(createSkillPicker(unitId, "gunnery-skill", 4));
    $row.append(createSkillPicker(unitId, "piloting-skill", 5));
    $row.append("<td class='tonnage right aligned'>" + unit.tonnage + "</td>");
    $row.append("<td class='bv right aligned'>" + unit.bv + "</td>");
    $row.append("<td class='adj-bv right aligned'>" + unit.bv + "</td>");
    $row.append("<td><button type='button' onclick='removeUnit(" + unitId + ")'>❌</button></td>");
    $("#force-table-body").append($row);
    

    updateTotals();

    if (unit.ammo.length > 0)
    {
        const unitLabel = "ammo-" + unitId;
        const $ammoSelections = $("<div>", {id: unitLabel});
        $ammoSelections.append("<h4>" + unit.name + "</h4>")
        unit.ammo.forEach(element => {
            const slotLabel = unitLabel + "-slot-" + element.id;
            const selectLabel = slotLabel + "-sel";
            const $selection = $("<div>", {id: slotLabel});
            
            let slotTitle = element.type;
            switch(element.type) {
                case "is:machinegun": slotTitle = "Machine Gun"; break;
                case "is:ac2": slotTitle = "AC/2"; break;
                case "is:ac5": slotTitle = "AC/5"; break;
                case "is:ac10": slotTitle = "AC/10"; break;
                case "is:ac20": slotTitle = "AC/20"; break;
                case "is:srm2": slotTitle = "SRM 2"; break;
                case "is:srm4": slotTitle = "SRM 4"; break;
                case "is:srm6": slotTitle = "SRM 6"; break;
                case "is:lrm5": slotTitle = "LRM 5"; break;
                case "is:lrm10": slotTitle = "LRM 10"; break;
                case "is:lrm15": slotTitle = "LRM 15"; break;
                case "is:lrm20": slotTitle = "LRM 20"; break;
            }
            slotTitle += " (" + element.location.toUpperCase() + ")";
            
            let ammoOptions = [];

            switch(element.type) {
                case "is:ac2":
                case "is:ac5":
                case "is:ac10":
                case "is:ac20":
                    ammoOptions = [
                        {label: "Standard", value: "standard"},
                        {label: "Armor-Piercing", value: "ap"},
                        {label: "Caseless", value: "caseless"},
                        {label: "Flechette", value: "flechette"},
                        {label: "Precision", value: "precision"}
                    ];
                    break;
                case "is:srm2":
                case "is:srm4":
                case "is:srm6":
                    ammoOptions = [
                        {label: "Standard", value: "standard"},
                        {label: "Artemis IV-Equipped", value: "artemisiv"},
                        {label: "Artemis V-Equipped", value: "artemisv"},
                        {label: "Fragmentation", value: "fragmentation"},
                        {label: "Inferno", value: "inferno"},
                        {label: "Narc-Equipped", value: "narc"}
                    ];
                    break;
                case "is:lrm5":
                case "is:lrm10":
                case "is:lrm15":
                case "is:lrm20":
                    ammoOptions = [
                        {label: "Standard", value: "standard"},
                        {label: "Artemis IV-Equipped", value: "artemisiv"},
                        {label: "Artemis V-Equipped", value: "artemisv"},
                        {label: "Fragmentation", value: "fragmentation"},
                        {label: "Narc-Equipped", value: "narc"},
                        {label: "Semi-Guided", value: "semi-guided"}
                    ];
                    break;
                default:
                    ammoOptions = [
                        {label: "Standard", value: "standard"}
                    ]
            }

            $selection.append("<label for='" + selectLabel + "'>" + slotTitle + "</label>");
            
            $ammoSelect = $("<select>", { id: selectLabel });

            ammoOptions.forEach(option => {
                $ammoSelect.append("<option value='" + option.value + "'>" + option.label + "</option>")
            });

            $selection.append($ammoSelect);

            $ammoSelections.append($selection);
        });

        $("#ammo-selections").append($ammoSelections);
    }

    
    unitId++;
}

function getUnitProperties() {
    const $unitPicker = $("#unit-picker");
    const unitId = $unitPicker.find("option:selected").val();
    switch (unitId) {
        case "lct-1e":
            return {
                name: "Locust LCT-1E",
                tonnage: 20,
                bv: 553,
                ammo: []
            };
        case "lct-1v":
            return {
                name: "Locust LCT-1V",
                tonnage: 20,
                bv: 432,
                ammo: [
                    {id: 0, type: "is:machinegun", location: "ct"}
                ]
            };
        case "com-2d":
            return {
                name: "Commando COM-2D",
                tonnage: 25,
                bv: 541,
                ammo: [
                    {id: 0, type: "is:srm6", location: "lt"},
                    {id: 1, type: "is:srm4", location: "rt"}
                ]
            };
        case "com-3a":
            return {
                name: "Commando COM-3A",
                tonnage: 25,
                bv: 540,
                ammo: [
                    {id: 0, type: "is:srm6", location: "rt"}
                ]
            };
        case "grf-1n":
            return {
                name: "Griffin GRF-1N",
                tonnage: 55,
                bv: 1272,
                ammo: [
                    {id: 0, type: "is:lrm10", location: "rt"},
                    {id: 1, type: "is:lrm10", location: "rt"}
                ]
            };
        case "grf-1s":
            return {
                name: "Griffin GRF-1S",
                tonnage: 55,
                bv: 1253,
                ammo: [
                    {id: 0, type: "is:lrm5", location: "rt"}
                ]
            };
        case "shd-2h":
            return {
                name: "Shadow Hawk SHD-2H",
                tonnage: 55,
                bv: 1064,
                ammo: [
                    {id: 0, type: "is:ac5", location: "lt"},
                    {id: 1, type: "is:srm2", location: "ct"},
                    {id: 2, type: "is:lrm5", location: "rt"}
                ]
            };
        case "wvr-6m":
            return {
                name: "Wolverine WVR-6M",
                tonnage: 55,
                bv: 1291,
                ammo: [
                    {id: 0, type: "is:srm6", location: "rt"}
                ]
            };
        case "wvr-6r":
            return {
                name: "Wolverine WVR-6R",
                tonnage: 55,
                bv: 1101,
                ammo: [
                    {id: 0, type: "is:ac5", location: "ra"},
                    {id: 1, type: "is:srm6", location: "lt"}
                ]
            };
        case "cplt-c1":
            return {
                name: "Catapult CPLT-C1",
                tonnage: 65,
                bv: 1399,
                ammo: [
                    {id: 0, type: "is:lrm15", location: "lt"},
                    {id: 1, type: "is:lrm15", location: "rt"}
                ]
            };
        case "cplt-k2":
            return {
                name: "Catapult CPLT-K2",
                tonnage: 65,
                bv: 1319,
                ammo: [
                    {id: 0, type: "is:machinegun", location: "ct"}
                ]
            };
        case "tdr-5s":
            return {
                name: "Thunderbolt TDR-5S",
                tonnage: 65,
                bv: 1335,
                ammo: [
                    {id: 0, type: "is:lrm15", location: "ct"},
                    {id: 1, type: "is:lrm15", location: "ct"},
                    {id: 2, type: "is:srm2", location: "rt"},
                    {id: 3, type: "is:machinegun", location: "la"}
                ]
            };
        case "tdr-5se":
            return {
                name: "Thunderbolt TDR-5SE",
                tonnage: 65,
                bv: 1414,
                ammo: [
                    {id: 0, type: "is:lrm10", location: "ct"},
                    {id: 1, type: "is:lrm10", location: "ct"}
                ]
            };
        case "aws-8q":
            return {
                name: "Awesome AWS-8Q",
                tonnage: 80,
                bv: 1605,
                ammo: []
            };
        case "blr-1g":
            return {
                name: "BattleMaster BLR-1G",
                tonnage: 85,
                bv: 1519,
                ammo: [
                    {id: 0, type: "is:srm6", location: "lt"},
                    {id: 1, type: "is:srm6", location: "lt"},
                    {id: 2, type: "is:machinegun", location: "lt"}
                ]
            };
    }
    
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
        let $g = $("#unit-" + id + " .gunnery-skill select");
        let g = Number($g.find("option:selected").val());
        let $p = $("#unit-" + id + " .piloting-skill select");
        let p = Number($p.find("option:selected").val());
        let bv = Number($("#unit-" + id + " .bv").text());
        let $adjbv = $("#unit-" + id + " .adj-bv");

        $adjbv.text(Math.round(bv * getSkillMultiplier(g,p)));

        updateTotals();
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

    updateTotals();
}

function clearUnits() {
    $("#force-table-body").children().remove("*");

    $("#ammo-selections").children().remove();

    updateTotals();
}

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

function updateTotals() {
    let totalTonnage = 0;
    $(".tonnage").each(function sum(index) {
        totalTonnage += Number($(this).text());
    });
    $("#tonnage-total").text(totalTonnage);

    let totalBV = 0;
    $(".bv").each(function sum(index) {
        totalBV += Number($(this).text());
    });
    $("#bv-total").text(totalBV);

    let totalAdjBV = 0;
    $(".adj-bv").each(function sum(index) {
        totalAdjBV += Number($(this).text());
    });
    $("#adj-bv-total").text(totalAdjBV);
}

function downloadForce() {
    let contents = "Not Implemented!";

    let tempElement = document.createElement('a');
    tempElement.setAttribute('href', 'data:text/markdown;charset=utf-8,' + encodeURIComponent(contents));
    tempElement.setAttribute('download', 'saved-force.md');

    tempElement.style.display = 'none';
    document.body.appendChild(tempElement);

    tempElement.click();

    document.body.removeChild(tempElement);
}