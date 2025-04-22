function rollAbove(number) {
    if (number < 2) return 1;
    if (number > 12) return 0;
    switch (number) {
        case 2: return 1;
        case 3: return 0.9722;
        case 4: return 0.9166;
        case 5: return 0.8333;
        case 6: return 0.7222;
        case 7: return 0.5833;
        case 8: return 0.4166;
        case 9: return 0.2777;
        case 10: return 0.1666;
        case 11: return 0.0833;
        case 12: return 0.0277;
    }
}

function rollExactly(number) {
    switch (number) {
        case 2: return 0.0277;
        case 3: return 0.0555;
        case 4: return 0.0833;
        case 5: return 0.1111;
        case 6: return 0.1388;
        case 7: return 0.1666;
        case 8: return 0.1388;
        case 9: return 0.1111;
        case 10: return 0.0833;
        case 11: return 0.0555;
        case 12: return 0.0277;
    }
    return 0;
}

function clusterTable(shots) {
    switch (shots) {
        case 1: return [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1];
        case 2: return [1, 1, 1, 1, 1, 1, 2, 2, 2, 2, 2];
        case 3: return [1, 1, 1, 2, 2, 2, 2, 2, 3, 3, 3];
        case 4: return [1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4];
        case 5: return [1, 2, 2, 3, 3, 3, 3, 4, 4, 5, 5];
        case 6: return [2, 2, 3, 3, 4, 4, 4, 5, 5, 6, 6];
        case 7: return [2, 2, 3, 4, 4, 4, 4, 6, 6, 7, 7];
        case 8: return [3, 3, 4, 4, 5, 5, 5, 6, 6, 8, 8];
        case 9: return [3, 3, 4, 5, 5, 5, 5, 7, 7, 9, 9];
        case 10: return [3, 3, 4, 6, 6, 6, 6, 8, 8, 10, 10];
        case 11: return [4, 4, 5, 7, 7, 7, 7, 9, 9, 11, 11];
        case 12: return [4, 4, 5, 8, 8, 8, 8, 10, 10, 12, 12];
        case 13: return [4, 4, 5, 8, 8, 8, 8, 11, 11, 13, 13];
        case 14: return [5, 5, 6, 9, 9, 9, 9, 11, 11, 14, 14];
        case 15: return [5, 5, 6, 9, 9, 9, 9, 12, 12, 15, 15];
        case 16: return [5, 5, 7, 10, 10, 10, 10, 13, 13, 16, 16];
        case 17: return [5, 5, 7, 10, 10, 10, 10, 14, 14, 17, 17];
        case 18: return [6, 6, 8, 11, 11, 11, 11, 14, 14, 18, 18];
        case 19: return [6, 6, 8, 11, 11, 11, 11, 15, 15, 19, 19];
        case 20: return [6, 6, 9, 12, 12, 12, 12, 16, 16, 20, 20];
        case 21: return [7, 7, 9, 13, 13, 13, 13, 17, 17, 21, 21];
        case 22: return [7, 7, 9, 14, 14, 14, 14, 18, 18, 22, 22];
        case 23: return [7, 7, 10, 15, 15, 15, 15, 19, 19, 23, 23];
        case 24: return [8, 8, 10, 16, 16, 16, 16, 20, 20, 24, 24];
        case 25: return [8, 8, 10, 16, 16, 16, 16, 21, 21, 25, 25];
        case 26: return [9, 9, 11, 17, 17, 17, 17, 21, 21, 26, 26];
        case 27: return [9, 9, 11, 17, 17, 17, 17, 22, 22, 27, 27];
        case 28: return [9, 9, 11, 17, 17, 17, 17, 23, 23, 28, 28];
        case 29: return [10, 10, 12, 18, 18, 18, 18, 23, 23, 29, 29];
        case 30: return [10, 10, 12, 18, 18, 18, 18, 24, 24, 30, 30];
        case 40: return [12, 12, 18, 24, 24, 24, 24, 32, 32, 40, 40];
        default: return [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    }
}

function averageCluster(shots, modifier) {
    const clusterColumn = clusterTable(shots);
    let average = 0;
    for (let r = 2; r <= 12; r++) {
        let modifiedRoll = r + modifier;
        if (modifiedRoll < 2) modifiedRoll = 2;
        if (modifiedRoll > 12) modifiedRoll = 12;

        average += rollExactly(r) * clusterColumn[modifiedRoll - 2];
    }
    return average;
}

function calculate(weapon, options) {
    let bv = 0;

    let maxRange = weapon.longRange ? weapon.longRange : 0;
    if (weapon.modes) {
        weapon.modes.forEach((mode) => {
            if (mode.longRange > maxRange) {
                maxRange = mode.longRange;
            }
        });
    }

    for (let i = 1; i <= maxRange; i++) {
        if (weapon.modes) {
            let modeBVs = [];
            weapon.modes.forEach((mode) => {
                modeBVs.push(calculateAtRange(mode, i, options));
            });
            bv += Math.max(...modeBVs);
        } else {
            bv += calculateAtRange(weapon, i, options);
        }
        
    }

    if (weapon.usesAmmo) {
        bv = bv * options.ammoWeaponMultiplier;
    } else {
        bv = bv * 1.5;
    }

    const weaponBV = Math.round(bv * options.multiplier);
    const ammoBV = weapon.usesAmmo ? Math.round(bv * options.multiplier * options.ammoCostMultiplier) : 0;

    return {
        weapon: weaponBV,
        ammo: ammoBV
    };
}

function calculateAtRange(weaponOrMode, range, options) {
    let targetNumber = options.baseToHit;
    let toHitMod = 0;
    let damageForRange = weaponOrMode.damage;

    if (range > weaponOrMode.longRange) {
        return 0;
    }

    if (weaponOrMode.shots) {
        if (weaponOrMode.streak) {
            damageForRange = weaponOrMode.shots * weaponOrMode.damagePerShot;
        }
        else {
            damageForRange = averageCluster(weaponOrMode.shots, weaponOrMode.clusterModifier ? weaponOrMode.clusterModifier : 0) * weaponOrMode.damagePerShot;
        }
    }

    if (weaponOrMode.toHitMod) {
        toHitMod = weaponOrMode.toHitMod;
    }

    if (range <= weaponOrMode.minRange) {
        targetNumber += (weaponOrMode.minRange - range + 1);
    }

    if (range <= weaponOrMode.shortRange) {
        // No modifier
        if (weaponOrMode.shortDamage) {
            damageForRange = weaponOrMode.shortDamage;
        }
        if (weaponOrMode.shortToHitMod) {
            toHitMod = weaponOrMode.shortToHitMod;
        }
        if (weaponOrMode.shots && weaponOrMode.shortClusterModifier) {
            damageForRange = averageCluster(weaponOrMode.shots, weaponOrMode.shortClusterModifier) * weaponOrMode.damagePerShot;
        }
    } else if (range <= weaponOrMode.mediumRange) {
        targetNumber += 2;
        if (weaponOrMode.mediumDamage) {
            damageForRange = weaponOrMode.mediumDamage;
        }
        if (weaponOrMode.mediumToHitMod) {
            toHitMod = weaponOrMode.mediumToHitMod;
        }
        if (weaponOrMode.shots && weaponOrMode.mediumClusterModifier) {
            damageForRange = averageCluster(weaponOrMode.shots, weaponOrMode.mediumClusterModifier) * weaponOrMode.damagePerShot;
        }
    } else {
        targetNumber += 4;
        if (weaponOrMode.longDamage) {
            damageForRange = weaponOrMode.longDamage;
        }
        if (weaponOrMode.longToHitMod) {
            toHitMod = weaponOrMode.longToHitMod;
        }
        if (weaponOrMode.shots && weaponOrMode.longClusterModifier) {
            damageForRange = averageCluster(weaponOrMode.shots, weaponOrMode.longClusterModifier) * weaponOrMode.damagePerShot;
        }
    }

    targetNumber += toHitMod;

    let effectiveDamage = damageForRange;
    if (weaponOrMode.heatInflicted) {
        effectiveDamage += weaponOrMode.heatInflicted;
    }
    if (weaponOrMode.bonusDamageToNonMechs) {
        effectiveDamage += weaponOrMode.bonusDamageToNonMechs;
    }

    if (options.reduceBVForJamRate && weaponOrMode.rapidFire) {
        if (weaponOrMode.shots) {
            const jamsOn = 1 + Math.floor((weaponOrMode.shots) / 2);
            const attacksWithoutJams = rollAbove(jamsOn + 1);
            effectiveDamage = (attacksWithoutJams) * effectiveDamage;
        }
    }

    bvForRange = rollAbove(targetNumber) * effectiveDamage;

    if (damageForRange >= 12) {
        if (weaponOrMode.damageCluster) {
            if (weaponOrMode.damageCluster >= 12) {
                bvForRange = bvForRange * 1.2;
            }
        } else {
            bvForRange = bvForRange * 1.2;
        }
    } else if (damageForRange >= 10 && options.increaseHeadBreacherBV) {
        if (weaponOrMode.damageCluster) {
            if (weaponOrMode.damageCluster >= 10) {
                bvForRange = bvForRange * 1.05;
            }
        } else {
            bvForRange = bvForRange * 1.05;
        }
    }

    return bvForRange;
}