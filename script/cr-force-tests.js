const tests = [];

function runAllTests(outputId) {
    const output = document.getElementById(outputId);
    output.innerHTML = "";
    tests.forEach(t => {
        if (t.name != undefined) {
            let rv = false;
            try {
                rv = t.fn();
                if (rv == undefined) {
                    rv = true;
                }
            }
            catch (err) {
                rv = err;
            }

            if (rv === true) {
                const p = document.createElement("p");
                p.classList.add("success");
                p.innerText = `${t.name} PASSED`;
                output.appendChild(p);
            } else {
                const p = document.createElement("p");
                p.classList.add("failure");
                p.innerText = `${t.name} FAILED!`;
                output.appendChild(p);
            }
        }
    });
}

const tester = {
    assert: (value) => { if (value !== true) throw "not true!"; },
    equals: (expected, actual) => { if (expected != actual) throw "not equal!"; }
};

tests.push({ name: "Basic", fn: () => {
    return true;
}});

tests.push({ name: "Force Defaults", fn: () => {
    const force = new Force();
    tester.equals("BattleTech Force", force.name);
    tester.equals("any", force.era);
    tester.equals("any", force.faction);
    tester.equals(0, force.unitCount);
    tester.equals(0, force.battleValue);
    tester.equals(0, force.battlefieldSupportPoints);
    return true;
}});

tests.push({ name: "Formation Defaults", fn: () => {
    const formation = new Formation("Lance");
    tester.equals("Lance", formation.name);
    tester.equals(0, formation.battleValue);
    tester.equals(0, formation.unitCount);
    return true;
}});

tests.push({ name: "Formation Updates When Unit Added", fn: () => {
    const formation = new Formation("Lance");
    const unit = new Unit("Atlas AS7-D", 1897, 100);

    let bvChangeReported = false;
    let countChangeReported = false;

    formation.addPropertyObserver("battleValue", () => { bvChangeReported = true; });
    formation.addPropertyObserver("unitCount", () => { countChangeReported = true; });

    formation.addUnit(unit);

    tester.equals(1897, formation.battleValue);
    tester.equals(1, formation.unitCount);

    tester.assert(bvChangeReported);
    tester.assert(countChangeReported);

    return true;
}});

tests.push({ name: "Formation Updates When Unit Removed", fn: () => {
    const formation = new Formation("Lance");
    const unit = new Unit("Atlas AS7-D", 1897, 100);

    formation.addUnit(unit);

    let bvChangeReported = false;
    let countChangeReported = false;

    formation.addPropertyObserver("battleValue", () => { bvChangeReported = true; });
    formation.addPropertyObserver("unitCount", () => { countChangeReported = true; });

    formation.removeUnit(unit);

    tester.equals(0, formation.battleValue);
    tester.equals(0, formation.unitCount);

    tester.assert(bvChangeReported);
    tester.assert(countChangeReported);

    return true;
}});

tests.push({ name: "Force Updates When Unit Added", fn: () => {
    const force = new Force();
    const formation = new Formation("Lance");
    const unit = new Unit("Atlas AS7-D", 1897, 100);

    force.addFormation(formation);

    let bvChangeReported = false;
    let countChangeReported = false;

    force.addPropertyObserver("battleValue", () => { bvChangeReported = true; });
    force.addPropertyObserver("unitCount", () => { countChangeReported = true; });

    formation.addUnit(unit);

    tester.equals(1897, force.battleValue);
    tester.equals(1, force.unitCount);

    tester.assert(bvChangeReported);
    tester.assert(countChangeReported);

    return true;
}});

tests.push({ name: "Force Updates When Unit Removed", fn: () => {
    const force = new Force();
    const formation = new Formation("Lance");
    const unit = new Unit("Atlas AS7-D", 1897, 100);

    force.addFormation(formation);
    formation.addUnit(unit);

    let bvChangeReported = false;
    let countChangeReported = false;

    force.addPropertyObserver("battleValue", () => { bvChangeReported = true; });
    force.addPropertyObserver("unitCount", () => { countChangeReported = true; });

    formation.removeUnit(unit);

    tester.equals(0, force.battleValue);
    tester.equals(0, force.unitCount);

    tester.assert(bvChangeReported);
    tester.assert(countChangeReported);

    return true;
}});

tests.push({ name: "Force Updates When Asset Added", fn: () => {
    const force = new Force();
    const asset = new BattlefieldSupportElement("Demolisher Heavy Tank", 33, "asset");

    let bspChangeReported = false;
    let countChangeReported = false;

    force.addPropertyObserver("battlefieldSupportPoints", () => { bspChangeReported = true; });
    force.addPropertyObserver("unitCount", () => { countChangeReported = true; });

    force.addSupport(asset);

    tester.equals(33, force.battlefieldSupportPoints);
    tester.equals(1, force.unitCount);

    tester.assert(bspChangeReported);
    tester.assert(countChangeReported);

    return true;
}});

tests.push({ name: "Force Updates When Strike Added", fn: () => {
    const force = new Force();
    const strike = new BattlefieldSupportElement("Light Air Strike", 10, "strike");

    let bspChangeReported = false;
    let countChangeReported = false;

    force.addPropertyObserver("battlefieldSupportPoints", () => { bspChangeReported = true; });
    force.addPropertyObserver("unitCount", () => { countChangeReported = true; });

    force.addSupport(strike);

    tester.equals(10, force.battlefieldSupportPoints);
    tester.equals(0, force.unitCount);

    tester.assert(bspChangeReported);
    tester.assert(!countChangeReported);

    return true;
}});