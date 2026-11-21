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
    #support = [];
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

    addSupport(supportElement) {
        this.#support.push(supportElement);

        this.propertyChanged("support", {add: supportElement});
        this.propertyChanged("battlefieldSupportPoints", this.battlefieldSupportPoints);
        if (supportElement.supportType == "asset") {
            this.propertyChanged("unitCount", this.unitCount);
        }
    }

    removeSupport(supportElement) {
        const i = this.#support.indexOf(supportElement);
        this.#support.splice(i, 1);

        this.propertyChanged("support", {remove: supportElement});
        this.propertyChanged("battlefieldSupportPoints", this.battlefieldSupportPoints);
        if (supportElement.supportType == "asset") {
            this.propertyChanged("unitCount", this.unitCount);
        }
    }

    forEachSupport(action) {
        this.#support.forEach((supportElement) => {
            action(supportElement);
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
        this.#support.forEach((supportItem) => {
            if (supportItem.supportType == "asset") {
                count += 1;
            }
        });
        return count;
    }

    get battlefieldSupportPoints() {
        let bsp = 0;
        this.#support.forEach((supportElement) => {
            bsp += supportElement.points;
        });
        return bsp;
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
