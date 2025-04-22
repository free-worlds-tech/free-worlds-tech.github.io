function calculateForUI() {
    const text = document.getElementById("weapon-json").value;
    const weapon = JSON.parse(text);

    let options = {
        baseToHit: 4,
        multiplier: 1,
        ammoWeaponMultiplier: 1.2,
        ammoCostMultiplier: 0.125
    };

    let baseToHit = parseInt(document.getElementById("base-to-hit").value);
    if (!Number.isNaN(baseToHit)) {
        baseToHit = Math.floor(baseToHit);
        document.getElementById("base-to-hit").value = baseToHit;
        options.baseToHit = baseToHit;
        options.multiplier = (rollAbove(4) + rollAbove(6) + rollAbove(8))/(rollAbove(baseToHit) + rollAbove(baseToHit + 2) + rollAbove(baseToHit + 4));
    }


    const freeAmmo = document.getElementById("chk-ammo-is-free").checked;
    if (freeAmmo) {
        options.ammoWeaponMultiplier = 1.5;
        options.ammoCostMultiplier = 0;
    }

    const headBreachers = document.getElementById("chk-head-breachers").checked;
    if (headBreachers) {
        options.increaseHeadBreacherBV = true;
    }

    const discountJams = document.getElementById("chk-discount-jams").checked;
    if (discountJams) {
        options.reduceBVForJamRate = true;
    }

    let bv = calculate(weapon, options);

    if (weapon.usesAmmo) {
        document.getElementById("official-bv").innerText = `${weapon.officialBV} + ${weapon.officialAmmoBV}`
        document.getElementById("calculated-bv").innerText = `${bv.weapon} + ${bv.ammo}`

        const officialTotal = weapon.officialBV + weapon.officialAmmoBV;
        const calculatedTotal = bv.weapon + bv.ammo;
        document.getElementById("bv-efficiency").innerText = `${Math.round(100 * calculatedTotal / officialTotal)}%`
    } else {
        document.getElementById("official-bv").innerText = `${weapon.officialBV}`
        document.getElementById("calculated-bv").innerText = `${bv.weapon}`
        document.getElementById("bv-efficiency").innerText = `${Math.round(100 * bv.weapon / weapon.officialBV)}%`
    }
}

function loadWeapon() {
    const selectedWeapon = document.getElementById("known-weapons").value;
    const jsonTextArea = document.getElementById("weapon-json");
    const loadedWeapon = getKnownWeapons()[selectedWeapon];
    jsonTextArea.value = JSON.stringify(loadedWeapon, null, 2);

    calculateForUI();
}

// Initialize UI
const weaponSelector = document.getElementById("known-weapons");
getKnownWeapons().forEach((weapon, index) => {
    let option = document.createElement("option");
    option.value = index;
    option.innerText = weapon.name;
    weaponSelector.appendChild(option);
});
loadWeapon();