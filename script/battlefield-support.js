const knownSupport = [
{ name: "Alacorn Heavy Tank Mk. VII", type: "asset", bsp: 31, mp: "3t", tmm: 1, range: "6/12/18", skill: 6, dmg: "20D × 2", check: 12, threshold: 8, specials: "No Turret", source: "Hot Spots: Draconis Reach", upgrade: 36 },
{ name: "Behemoth Heavy Tank (Davion)", type: "asset", bsp: 34, mp: "2t", tmm: 0, range: "7/14/21", skill: 6, dmg: "15D × 2", check: 10, threshold: 8, specials: "-", source: "Force Pack: Recon & Hunter Lances", upgrade: 39 },
{ name: "Behemoth Heavy Tank (Kurita Upgrade)", type: "asset", bsp: 40, mp: "2t", tmm: 0, range: "6/12/18", skill: 6, dmg: "10D × 4", check: 10, threshold: 8, specials: "Crit Seeker", source: "Force Pack: Recon & Hunter Lances", upgrade: 46 },
{ name: "Behemoth Heavy Tank (Kurita)", type: "asset", bsp: 33, mp: "2t", tmm: 0, range: "6/12/18", skill: 6, dmg: "10D × 3", check: 10, threshold: 8, specials: "IF 1", source: "Force Pack: Recon & Hunter Lances", upgrade: 38 },
{ name: "Behemoth Heavy Tank", type: "asset", bsp: 32, mp: "2t", tmm: 0, range: "5/10/15", skill: 6, dmg: "10D × 3", check: 10, threshold: 8, specials: "Crit Seeker, IF 3", source: "Force Pack: Recon & Hunter Lances", upgrade: 37 },
{ name: "Bulldog Medium Tank (Chemical)", type: "asset", bsp: 21, mp: "5t", tmm: 2, range: "5/10/15", skill: 6, dmg: "9D", check: 10, threshold: 5, specials: "-", source: "Force Pack: Rifle & Command Lances", upgrade: 24 },
{ name: "Bulldog Medium Tank (ERLL)", type: "asset", bsp: 20, mp: "4t", tmm: 1, range: "7/14/21", skill: 6, dmg: "9D", check: 10, threshold: 5, specials: "-", source: "Force Pack: Rifle & Command Lances", upgrade: 23 },
{ name: "Bulldog Medium Tank (Plasma)", type: "asset", bsp: 18, mp: "4t", tmm: 1, range: "5/10/15", skill: 6, dmg: "11D", check: 10, threshold: 5, specials: "AI", source: "Force Pack: Rifle & Command Lances", upgrade: 21 },
{ name: "Bulldog Medium Tank", type: "asset", bsp: 16, mp: "4t", tmm: 1, range: "5/10/15", skill: 6, dmg: "9D", check: 8, threshold: 5, specials: "-", source: "Force Pack: Rifle & Command Lances", upgrade: 19 },
{ name: "Clan Foot Point Conventional Infantry", type: "asset", bsp: 7, mp: "1f", tmm: 0, range: "1/2/3", skill: 6, dmg: "5D × 2", check: 8, threshold: 1, specials: "Nimble, Spotter, Swarm", source: "Aces: Scouring Sands", upgrade: 8 },
{ name: "Condor Heavy Hover Tank (Laser)", type: "asset", bsp: 24, mp: "8h", tmm: 3, range: "4/8/12", skill: 6, dmg: "7D × 3", check: 7, threshold: 5, specials: "-", source: "Force Pack: Assault & Cavalry Lances", upgrade: 28 },
{ name: "Condor Heavy Hover Tank (Ultra)", type: "asset", bsp: 30, mp: "9h", tmm: 3, range: "5/10/15", skill: 6, dmg: "10D × 2", check: 7, threshold: 5, specials: "AMS, TAG", source: "Force Pack: Assault & Cavalry Lances", upgrade: 35 },
{ name: "Condor Heavy Hover Tank (Upgrade)", type: "asset", bsp: 24, mp: "9h", tmm: 3, range: "7/14/21", skill: 6, dmg: "5D × 3", check: 7, threshold: 5, specials: "IF 2", source: "Force Pack: Assault & Cavalry Lances", upgrade: 28 },
{ name: "Condor Heavy Hover Tank", type: "asset", bsp: 20, mp: "8h", tmm: 3, range: "3/6/9", skill: 6, dmg: "5D × 3", check: 7, threshold: 5, specials: "-", source: "Force Pack: Assault & Cavalry Lances", upgrade: 23 },
{ name: "Coolant Truck (Hover)", type: "asset", bsp: 14, mp: "8h", tmm: 3, range: "1/2/3", skill: 6, dmg: "4D", check: 7, threshold: 5, specials: "-", source: "Force Pack: Second Star League Assault Lance", upgrade: 16 },
{ name: "Coolant Truck 135-K", type: "asset", bsp: 10, mp: "4w", tmm: 1, range: "1/2/3", skill: 6, dmg: "4D", check: 7, threshold: 5, specials: "-", source: "Force Pack: Second Star League Assault Lance", upgrade: 12 },
{ name: "Demolisher Heavy Tank (Cell)", type: "asset", bsp: 46, mp: "4t", tmm: 1, range: "3/6/9", skill: 6, dmg: "20D × 3", check: 10, threshold: 8, specials: "-", source: "Force Pack: Assault & Cavalry Lances", upgrade: 53 },
{ name: "Demolisher Heavy Tank (Clan)", type: "asset", bsp: 37, mp: "3t", tmm: 1, range: "4/8/12", skill: 6, dmg: "9D × 4", check: 10, threshold: 8, specials: "Crit Seeker", source: "Force Pack: Assault & Cavalry Lances", upgrade: 43 },
{ name: "Demolisher Heavy Tank (Gauss)", type: "asset", bsp: 36, mp: "3t", tmm: 1, range: "7/14/21", skill: 6, dmg: "15D × 2", check: 9, threshold: 8, specials: "-", source: "Force Pack: Assault & Cavalry Lances", upgrade: 42 },
{ name: "Demolisher Heavy Tank", type: "asset", bsp: 33, mp: "3t", tmm: 1, range: "3/6/9", skill: 6, dmg: "20D × 2", check: 9, threshold: 8, specials: "-", source: "Force Pack: Assault & Cavalry Lances", upgrade: 38 },
{ name: "Drillson Heavy Hover Tank (MML)", type: "asset", bsp: 19, mp: "8h", tmm: 3, range: "5/10/15", skill: 6, dmg: "9D", check: 7, threshold: 5, specials: "Crit Seeker, IF 1", source: "Force Pack: Heavy Battle & Sweep Lances", upgrade: 22 },
{ name: "Drillson Heavy Hover Tank (Streak)", type: "asset", bsp: 22, mp: "9h", tmm: 3, range: "3/6/9", skill: 6, dmg: "9D × 2", check: 7, threshold: 5, specials: "Crit Seeker", source: "Force Pack: Heavy Battle & Sweep Lances", upgrade: 26 },
{ name: "Drillson Heavy Hover Tank C", type: "asset", bsp: 22, mp: "9h", tmm: 3, range: "5/10/15", skill: 6, dmg: "8D × 2", check: 7, threshold: 5, specials: "IF 1", source: "Force Pack: Heavy Battle & Sweep Lances", upgrade: 26 },
{ name: "Drillson Heavy Hover Tank", type: "asset", bsp: 18, mp: "9h", tmm: 3, range: "5/10/15", skill: 6, dmg: "9D", check: 7, threshold: 5, specials: "IF 1", source: "Force Pack: Heavy Battle & Sweep Lances", upgrade: 21 },
{ name: "Elemental Battle Armor (AP Gauss)", type: "asset", bsp: 19, mp: "3j", tmm: 2, range: "2/4/6", skill: 5, dmg: "6D × 2", check: 9, threshold: 5, specials: "Mechanized, Nimble, Spotter, Swarm", source: "Aces: Scouring Sands", upgrade: 22 },
{ name: "Elemental Battle Armor", type: "asset", bsp: 17, mp: "3j", tmm: 2, range: "1/2/3", skill: 5, dmg: "6D × 2", check: 9, threshold: 5, specials: "Mechanized, Nimble, Spotter, Swarm", source: "Mercenaries Box Set", upgrade: 20 },
{ name: "Elemental III Battle Armor", type: "asset", bsp: 26, mp: "3j", tmm: 3, range: "3/6/9", skill: 5, dmg: "6D × 2", check: 9, threshold: 5, specials: "Mechanized, Nimble, Spotter, Swarm", source: "Hot Spots: Hinterlands", upgrade: 30 },
{ name: "Enyo Strike Tank (ER Pulse)", type: "asset", bsp: 39, mp: "5t", tmm: 2, range: "4/8/12", skill: 5, dmg: "7D × 4", check: 10, threshold: 5, specials: "Crit Seeker", source: "Hot Spots: Hinterlands", upgrade: 45 },
{ name: "Enyo Strike Tank", type: "asset", bsp: 49, mp: "6t", tmm: 2, range: "4/8/12", skill: 5, dmg: "9D × 5", check: 9, threshold: 5, specials: "Crit Seeker", source: "Hot Spots: Hinterlands", upgrade: 57 },
{ name: "Epona Pursuit Vehicle A", type: "asset", bsp: 46, mp: "9h", tmm: 3, range: "5/10/15", skill: 5, dmg: "7D × 5", check: 7, threshold: 5, specials: "IF 5, TAG", source: "Hot Spots: Hinterlands", upgrade: 53 },
{ name: "Epona Pursuit Vehicle Prime", type: "asset", bsp: 43, mp: "9h", tmm: 3, range: "4/8/12", skill: 4, dmg: "9D × 4", check: 7, threshold: 5, specials: "TC", source: "Hot Spots: Hinterlands", upgrade: 50 },
{ name: "Eurus MBT A", type: "asset", bsp: 57, mp: "6t", tmm: 2, range: "4/8/12", skill: 4, dmg: "20D × 2", check: 11, threshold: 5, specials: "TC", source: "Hot Spots: Hinterlands", upgrade: 66 },
{ name: "Eurus MBT Prime", type: "asset", bsp: 44, mp: "5t", tmm: 2, range: "7/14/21", skill: 5, dmg: "12D × 2", check: 11, threshold: 5, specials: "AMS", source: "Hot Spots: Hinterlands", upgrade: 51 },
{ name: "Flatbed Truck (SRM)", type: "asset", bsp: 10, mp: "5w", tmm: 2, range: "3/6/9", skill: 6, dmg: "3D", check: 5, threshold: 5, specials: "No Turret", source: "Hot Spots: Draconis Reach", upgrade: 12 },
{ name: "Foot Conventional Infantry", type: "asset", bsp: 7, mp: "1f", tmm: 0, range: "1/2/3", skill: 6, dmg: "5D × 2", check: 8, threshold: 1, specials: "Nimble, Spotter, Swarm", source: "Mercenaries Box Set", upgrade: 8 },
{ name: "Fox Armored Car", type: "asset", bsp: 18, mp: "11h", tmm: 4, range: "2/4/6", skill: 6, dmg: "5D × 2", check: 7, threshold: 5, specials: "-", source: "Hot Spots: Draconis Reach", upgrade: 21 },
{ name: "Galleon GAL-100 Light Tank", type: "asset", bsp: 13, mp: "6t", tmm: 2, range: "3/6/9", skill: 6, dmg: "5D", check: 7, threshold: 5, specials: "-", source: "Mercenaries Box Set", upgrade: 15 },
{ name: "Hawk Moth II Gunship", type: "asset", bsp: 25, mp: "11v", tmm: 5, range: "3/6/9", skill: 6, dmg: "6D × 4", check: 4, threshold: 5, specials: "Crit Seeker", source: "Hot Spots: Draconis Reach", upgrade: 29 },
{ name: "Heavy Emplacement", type: "asset", bsp: 13, mp: "0", tmm: 0, range: "3/6/9", skill: 5, dmg: "15D", check: 10, threshold: 8, specials: "Immobile, No Turret, Spotter", source: "Mercenaries Box Set", upgrade: 15 },
{ name: "Heavy Hover APC", type: "asset", bsp: 16, mp: "8h", tmm: 3, range: "1/2/3", skill: 6, dmg: "4D", check: 6, threshold: 5, specials: "AI, APC 3", source: "Aces: Scouring Sands", upgrade: 19 },
{ name: "Hephaestus Scout Tank Prime", type: "asset", bsp: 38, mp: "8h", tmm: 3, range: "4/8/12", skill: 5, dmg: "7D × 2", check: 7, threshold: 5, specials: "APC 2, ECM 6, PRB, TAG, TC", source: "Hot Spots: Hinterlands", upgrade: 44 },
{ name: "Hetzer Wheeled Assault Gun (Cell)", type: "asset", bsp: 26, mp: "5w", tmm: 2, range: "3/6/9", skill: 6, dmg: "30D", check: 8, threshold: 5, specials: "No Turret", source: "Force Pack: Rifle & Command Lances", upgrade: 30 },
{ name: "Hetzer Wheeled Assault Gun (SRM)", type: "asset", bsp: 29, mp: "4w", tmm: 1, range: "3/6/9", skill: 6, dmg: "8D × 5", check: 8, threshold: 5, specials: "Crit Seeker, No Turret", source: "Force Pack: Rifle & Command Lances", upgrade: 34 },
{ name: "Hetzer Wheeled Assault Gun C", type: "asset", bsp: 23, mp: "4w", tmm: 1, range: "8/16/24", skill: 6, dmg: "6D × 3", check: 8, threshold: 5, specials: "No Turret", source: "Force Pack: Rifle & Command Lances", upgrade: 27 },
{ name: "Hetzer Wheeled Assault Gun", type: "asset", bsp: 19, mp: "4w", tmm: 1, range: "3/6/9", skill: 6, dmg: "20D", check: 8, threshold: 5, specials: "No Turret", source: "Force Pack: Rifle & Command Lances", upgrade: 22 },
{ name: "Inner Sphere Battle Armor", type: "asset", bsp: 13, mp: "3j", tmm: 2, range: "1/2/3", skill: 6, dmg: "5D × 2", check: 8, threshold: 5, specials: "Mechanized, Nimble, Spotter, Swarm", source: "Mercenaries Box Set", upgrade: 15 },
{ name: "J. Edgar Light Hover Tank (Light PPC)", type: "asset", bsp: 19, mp: "11h", tmm: 3, range: "6/12/18", skill: 5, dmg: "5D", check: 7, threshold: 5, specials: "TC", source: "Force Pack: Heavy Battle & Sweep Lances", upgrade: 22 },
{ name: "J. Edgar Light Hover Tank (TAG)", type: "asset", bsp: 23, mp: "11h", tmm: 3, range: "3/6/9", skill: 6, dmg: "5D × 2", check: 7, threshold: 5, specials: "PRB, TAG", source: "Force Pack: Heavy Battle & Sweep Lances", upgrade: 27 },
{ name: "J. Edgar Light Hover Tank (X-Pulse)", type: "asset", bsp: 17, mp: "11h", tmm: 3, range: "3/6/9", skill: 6, dmg: "5D × 2", check: 7, threshold: 5, specials: "-", source: "Force Pack: Heavy Battle & Sweep Lances", upgrade: 20 },
{ name: "J. Edgar Light Hover Tank", type: "asset", bsp: 17, mp: "11h", tmm: 3, range: "3/6/9", skill: 6, dmg: "5D × 2", check: 7, threshold: 5, specials: "-", source: "Force Pack: Heavy Battle & Sweep Lances", upgrade: 20 },
{ name: "Jump Conventional Infantry", type: "asset", bsp: 12, mp: "3j", tmm: 2, range: "1/2/3", skill: 6, dmg: "5D × 2", check: 8, threshold: 1, specials: "Nimble, Spotter, Swarm", source: "Mercenaries Box Set", upgrade: 14 },
{ name: "Light Emplacement", type: "asset", bsp: 13, mp: "0", tmm: 0, range: "7/14/21", skill: 5, dmg: "10D", check: 10, threshold: 8, specials: "Immobile, No Turret, Spotter", source: "Mercenaries Box Set", upgrade: 15 },
{ name: "LRM Carrier (3055 Upgrade)", type: "asset", bsp: 27, mp: "2t", tmm: 0, range: "7/14/21", skill: 6, dmg: "10D × 3", check: 7, threshold: 5, specials: "IF 9, No Turret", source: "Force Pack: Battle & Fire Lances", upgrade: 32 },
{ name: "LRM Carrier (Arrow IV Carrier)", type: "asset", bsp: 58, mp: "3t", tmm: 1, range: "-", skill: 6, dmg: "-", check: 7, threshold: 5, specials: "ARROW 2", source: "Force Pack: Battle & Fire Lances" },
{ name: "LRM Carrier C", type: "asset", bsp: 31, mp: "4t", tmm: 1, range: "7/14/21", skill: 6, dmg: "9D × 3", check: 8, threshold: 5, specials: "IF 7, No Turret", source: "Force Pack: Battle & Fire Lances", upgrade: 36 },
{ name: "LRM Carrier", type: "asset", bsp: 28, mp: "3t", tmm: 1, range: "7/14/21", skill: 6, dmg: "9D × 3", check: 7, threshold: 5, specials: "IF 7, No Turret", source: "Force Pack: Battle & Fire Lances", upgrade: 32 },
{ name: "M.A.S.H. Truck (AMS)", type: "asset", bsp: 11, mp: "5w", tmm: 2, range: "-", skill: 6, dmg: "-", check: 7, threshold: 5, specials: "AMS, MASH", source: "Force Pack: Objectives", upgrade: 13 },
{ name: "M.A.S.H. Truck", type: "asset", bsp: 13, mp: "5w", tmm: 2, range: "1/2/3", skill: 6, dmg: "6D", check: 7, threshold: 5, specials: "MASH", source: "Force Pack: Objectives", upgrade: 15 },
{ name: "Manticore Heavy Tank (C3S)", type: "asset", bsp: 28, mp: "4t", tmm: 1, range: "6/12/18", skill: 6, dmg: "10D × 2", check: 10, threshold: 5, specials: "IF 1", source: "Force Pack: Battle & Fire Lances", upgrade: 32 },
{ name: "Manticore Heavy Tank (HPPC)", type: "asset", bsp: 28, mp: "4t", tmm: 1, range: "6/12/18", skill: 5, dmg: "15D", check: 10, threshold: 5, specials: "AMS, IF 1, TC", source: "Force Pack: Battle & Fire Lances", upgrade: 32 },
{ name: "Manticore Heavy Tank (XL)", type: "asset", bsp: 26, mp: "4t", tmm: 1, range: "7/14/21", skill: 5, dmg: "11D", check: 10, threshold: 5, specials: "IF 1, TC", source: "Force Pack: Battle & Fire Lances", upgrade: 30 },
{ name: "Manticore Heavy Tank", type: "asset", bsp: 21, mp: "4t", tmm: 1, range: "6/12/18", skill: 6, dmg: "11D", check: 10, threshold: 5, specials: "IF 1", source: "Force Pack: Battle & Fire Lances", upgrade: 24 },
{ name: "Maxim Hover Transport", type: "asset", bsp: 23, mp: "8h", tmm: 3, range: "3/6/9", skill: 6, dmg: "5D × 4", check: 7, threshold: 5, specials: "APC 1, IF 2", source: "Mercenaries Box Set", upgrade: 27 },
{ name: "Mechanized/Motorized Conventional Infantry", type: "asset", bsp: 12, mp: "4t", tmm: 1, range: "1/2/3", skill: 6, dmg: "5D × 2", check: 8, threshold: 1, specials: "Nimble, Spotter, Swarm", source: "Mercenaries Box Set", upgrade: 14 },
{ name: "Medium Emplacement", type: "asset", bsp: 13, mp: "0", tmm: 0, range: "5/10/15", skill: 5, dmg: "12D", check: 10, threshold: 8, specials: "Immobile, No Turret, Spotter", source: "Mercenaries Box Set", upgrade: 15 },
{ name: "MG Nest Emplacement", type: "asset", bsp: 8, mp: "0", tmm: 0, range: "2/4/6", skill: 5, dmg: "4D", check: 9, threshold: 5, specials: "AI, Immobile, No Turret, Spotter", source: "Mercenaries Box Set", upgrade: 9 },
{ name: "Mobile HQ (Browning)", type: "asset", bsp: 18, mp: "7w", tmm: 3, range: "-", skill: 6, dmg: "-", check: 7, threshold: 5, specials: "AMS, ECM 6", source: "Force Pack: Objectives", upgrade: 21 },
{ name: "Mobile HQ", type: "asset", bsp: 29, mp: "6w", tmm: 2, range: "3/6/9", skill: 6, dmg: "5D", check: 7, threshold: 5, specials: "Commander", source: "Force Pack: Objectives", upgrade: 34 },
{ name: "Mobile Long Tom LT-MOB-25", type: "asset", bsp: 66, mp: "2t", tmm: 0, range: "-", skill: 8, dmg: "-", check: 7, threshold: 5, specials: "Artillery (LT), No Turret", source: "Force Pack: Objectives" },
{ name: "Mobile Long Tom LT-MOB-25F", type: "asset", bsp: 70, mp: "3t", tmm: 1, range: "-", skill: 8, dmg: "-", check: 7, threshold: 5, specials: "Artillery (LT), No Turret", source: "Force Pack: Objectives" },
{ name: "Narukami Heavy Tank NK-1C", type: "asset", bsp: 39, mp: "3t", tmm: 0, range: "6/12/18", skill: 6, dmg: "12D × 3", check: 11, threshold: 8, specials: "AMS", source: "Hot Spots: Draconis Reach", upgrade: 45 },
{ name: "Ontos Heavy Tank (3053 Upgrade)", type: "asset", bsp: 39, mp: "3t", tmm: 1, range: "3/6/9", skill: 6, dmg: "9D × 5", check: 10, threshold: 8, specials: "IF 2", source: "Force Pack: Recon & Hunter Lances", upgrade: 45 },
{ name: "Ontos Heavy Tank (Chemical Laser)", type: "asset", bsp: 58, mp: "3t", tmm: 1, range: "5/10/15", skill: 6, dmg: "8D × 8", check: 10, threshold: 8, specials: "IF 1", source: "Force Pack: Recon & Hunter Lances", upgrade: 67 },
{ name: "Ontos Heavy Tank (Light Gauss)", type: "asset", bsp: 35, mp: "3t", tmm: 1, range: "8/16/24", skill: 6, dmg: "8D × 3", check: 10, threshold: 8, specials: "-", source: "Force Pack: Recon & Hunter Lances", upgrade: 41 },
{ name: "Ontos Heavy Tank", type: "asset", bsp: 32, mp: "3t", tmm: 1, range: "3/6/9", skill: 6, dmg: "9D × 4", check: 9, threshold: 8, specials: "IF 1", source: "Force Pack: Recon & Hunter Lances", upgrade: 37 },
{ name: "Ordnance Transport J-27 (Armor)", type: "asset", bsp: 10, mp: "5t", tmm: 2, range: "1/2/3", skill: 6, dmg: "2D", check: 5, threshold: 5, specials: "-", source: "Force Pack: Third Star League Strike Team", upgrade: 12 },
{ name: "Ordnance Transport J-27", type: "asset", bsp: 10, mp: "5t", tmm: 2, range: "1/2/3", skill: 6, dmg: "2D", check: 5, threshold: 5, specials: "-", source: "Force Pack: Third Star League Strike Team", upgrade: 12 },
{ name: "Pandion Combat WiGE", type: "asset", bsp: 23, mp: "10g", tmm: 5, range: "4/8/12", skill: 6, dmg: "5D × 3", check: 5, threshold: 5, specials: "PRB", source: "Hot Spots: Draconis Reach", upgrade: 27 },
{ name: "Patton Tank (Taurian)", type: "asset", bsp: 24, mp: "5t", tmm: 2, range: "6/12/18", skill: 6, dmg: "11D", check: 11, threshold: 5, specials: "-", source: "Force Pack: Heavy Battle & Sweep Lances", upgrade: 28 },
{ name: "Patton Tank (Ultra)", type: "asset", bsp: 29, mp: "4t", tmm: 1, range: "6/12/18", skill: 6, dmg: "10D × 2", check: 11, threshold: 5, specials: "-", source: "Force Pack: Heavy Battle & Sweep Lances", upgrade: 34 },
{ name: "Patton Tank (XL)", type: "asset", bsp: 34, mp: "4t", tmm: 1, range: "6/12/18", skill: 5, dmg: "10D × 2", check: 11, threshold: 5, specials: "TC", source: "Force Pack: Heavy Battle & Sweep Lances", upgrade: 39 },
{ name: "Patton Tank", type: "asset", bsp: 20, mp: "4t", tmm: 1, range: "5/10/15", skill: 6, dmg: "10D", check: 11, threshold: 5, specials: "-", source: "Force Pack: Heavy Battle & Sweep Lances", upgrade: 23 },
{ name: "Pegasus Scout Hover Tank (3058 Upgrade)", type: "asset", bsp: 28, mp: "9h", tmm: 3, range: "3/6/9", skill: 6, dmg: "7D × 3", check: 6, threshold: 5, specials: "Crit Seeker, PRB, TAG", source: "Force Pack: Assault & Cavalry Lances", upgrade: 32 },
{ name: "Pegasus Scout Hover Tank (C3)", type: "asset", bsp: 27, mp: "9h", tmm: 3, range: "3/6/9", skill: 6, dmg: "7D × 4", check: 7, threshold: 5, specials: "Crit Seeker", source: "Force Pack: Assault & Cavalry Lances", upgrade: 31 },
{ name: "Pegasus Scout Hover Tank (Upgrade)", type: "asset", bsp: 26, mp: "11h", tmm: 4, range: "3/6/9", skill: 6, dmg: "7D × 3", check: 7, threshold: 5, specials: "Crit Seeker, IF 1, PRB", source: "Force Pack: Assault & Cavalry Lances", upgrade: 30 },
{ name: "Pegasus Scout Hover Tank", type: "asset", bsp: 23, mp: "8h", tmm: 3, range: "3/6/9", skill: 6, dmg: "7D × 3", check: 7, threshold: 5, specials: "Crit Seeker", source: "Force Pack: Assault & Cavalry Lances", upgrade: 27 },
{ name: "Pike Support Vehicle (Clan)", type: "asset", bsp: 27, mp: "3t", tmm: 1, range: "9/18/27", skill: 6, dmg: "5D × 3", check: 10, threshold: 5, specials: "-", source: "Force Pack: Heavy Battle & Sweep Lances", upgrade: 31 },
{ name: "Pike Support Vehicle (LB-X)", type: "asset", bsp: 25, mp: "3t", tmm: 1, range: "7/14/21", skill: 6, dmg: "5D × 3", check: 10, threshold: 5, specials: "-", source: "Force Pack: Heavy Battle & Sweep Lances", upgrade: 29 },
{ name: "Pike Support Vehicle (Missile)", type: "asset", bsp: 32, mp: "3t", tmm: 1, range: "7/14/21", skill: 6, dmg: "5D × 5", check: 9, threshold: 5, specials: "IF 5", source: "Force Pack: Heavy Battle & Sweep Lances", upgrade: 37 },
{ name: "Pike Support Vehicle", type: "asset", bsp: 17, mp: "3t", tmm: 1, range: "8/16/24", skill: 6, dmg: "6D", check: 9, threshold: 5, specials: "-", source: "Force Pack: Heavy Battle & Sweep Lances", upgrade: 20 },
{ name: "Pilum Heavy Tank (Arrow IV)", type: "asset", bsp: 60, mp: "4w", tmm: 1, range: "-", skill: 6, dmg: "-", check: 10, threshold: 5, specials: "ARROW", source: "Hot Spots: Draconis Reach", upgrade: 70 },
{ name: "Saracen Mk II HCV", type: "asset", bsp: 29, mp: "10h", tmm: 4, range: "2/4/6", skill: 6, dmg: "7D × 3", check: 7, threshold: 5, specials: "ECM 6", source: "Hot Spots: Draconis Reach", upgrade: 34 },
{ name: "Savannah Master Hovercraft (Interdictor)", type: "asset", bsp: 17, mp: "13h", tmm: 4, range: "-", skill: 0, dmg: "-", check: 5, threshold: 5, specials: "ECM 6", source: "Salvage Box: Savannah Master" },
{ name: "Savannah Master Hovercraft (Reflective)", type: "asset", bsp: 14, mp: "13h", tmm: 4, range: "4/8/12", skill: 6, dmg: "5D", check: 5, threshold: 5, specials: "No Turret, RFA", source: "Salvage Box: Savannah Master", upgrade: 16 },
{ name: "Savannah Master Hovercraft (SL)", type: "asset", bsp: 13, mp: "13h", tmm: 4, range: "1/2/3", skill: 6, dmg: "6D", check: 5, threshold: 5, specials: "No Turret", source: "Salvage Box: Savannah Master", upgrade: 15 },
{ name: "Savannah Master Hovercraft", type: "asset", bsp: 13, mp: "13h", tmm: 4, range: "3/6/9", skill: 6, dmg: "5D", check: 5, threshold: 5, specials: "No Turret", source: "Salvage Box: Savannah Master", upgrade: 15 },
{ name: "Savior Repair Vehicle", type: "asset", bsp: 13, mp: "4t", tmm: 1, range: "1/2/3", skill: 6, dmg: "3D", check: 7, threshold: 5, specials: "APC 2, MFB", source: "Force Pack: Third Star League Battle Group", upgrade: 15 },
{ name: "Schrek AC Carrier", type: "asset", bsp: 23, mp: "3t", tmm: 1, range: "6/12/18", skill: 6, dmg: "5D × 3", check: 9, threshold: 8, specials: "-", source: "Force Pack: Assault & Cavalry Lances", upgrade: 27 },
{ name: "Schrek Gauss Carrier", type: "asset", bsp: 43, mp: "3t", tmm: 2, range: "8/16/24", skill: 6, dmg: "8D × 3", check: 9, threshold: 8, specials: "ECM 6", source: "Force Pack: Assault & Cavalry Lances", upgrade: 50 },
{ name: "Schrek PPC Carrier (XL)", type: "asset", bsp: 34, mp: "4t", tmm: 1, range: "6/12/18", skill: 6, dmg: "10D × 3", check: 9, threshold: 8, specials: "-", source: "Force Pack: Assault & Cavalry Lances", upgrade: 39 },
{ name: "Schrek PPC Carrier", type: "asset", bsp: 31, mp: "3t", tmm: 1, range: "6/12/18", skill: 6, dmg: "10D × 3", check: 8, threshold: 8, specials: "-", source: "Force Pack: Assault & Cavalry Lances", upgrade: 36 },
{ name: "Skulker Wheeled Scout Tank (C3M)", type: "asset", bsp: 28, mp: "7w", tmm: 3, range: "-", skill: 6, dmg: "5D", check: 7, threshold: 5, specials: "Commander", source: "Force Pack: Recon & Hunter Lances", upgrade: 32 },
{ name: "Skulker Wheeled Scout Tank (SRM)", type: "asset", bsp: 14, mp: "7w", tmm: 3, range: "3/6/9", skill: 6, dmg: "5D", check: 7, threshold: 5, specials: "No Turret", source: "Force Pack: Recon & Hunter Lances", upgrade: 16 },
{ name: "Skulker Wheeled Scout Tank C", type: "asset", bsp: 18, mp: "9w", tmm: 3, range: "3/6/9", skill: 6, dmg: "5D", check: 7, threshold: 5, specials: "ECM 3, PRB, No Turret", source: "Force Pack: Recon & Hunter Lances", upgrade: 21 },
{ name: "Skulker Wheeled Scout Tank", type: "asset", bsp: 14, mp: "7w", tmm: 3, range: "3/6/9", skill: 6, dmg: "5D", check: 7, threshold: 5, specials: "No Turret", source: "Force Pack: Recon & Hunter Lances", upgrade: 16 },
{ name: "SRM Carrier (3054 Upgrade)", type: "asset", bsp: 31, mp: "3t", tmm: 1, range: "3/6/9", skill: 6, dmg: "10D × 5", check: 7, threshold: 5, specials: "Crit Seeker, No Turret", source: "Force Pack: Battle & Fire Lances", upgrade: 36 },
{ name: "SRM Carrier (C3)", type: "asset", bsp: 37, mp: "3t", tmm: 1, range: "3/6/9", skill: 6, dmg: "10D × 5", check: 7, threshold: 5, specials: "Crit Seeker, ECM 6, No Turret", source: "Force Pack: Battle & Fire Lances", upgrade: 43 },
{ name: "SRM Carrier C", type: "asset", bsp: 34, mp: "4t", tmm: 1, range: "3/6/9", skill: 6, dmg: "10D × 5", check: 8, threshold: 5, specials: "Crit Seeker, No Turret", source: "Force Pack: Battle & Fire Lances", upgrade: 39 },
{ name: "SRM Carrier", type: "asset", bsp: 31, mp: "3t", tmm: 1, range: "3/6/9", skill: 6, dmg: "10D × 5", check: 7, threshold: 5, specials: "Crit Seeker, No Turret", source: "Force Pack: Battle & Fire Lances", upgrade: 36 },
{ name: "Striker Light Tank (Stealth)", type: "asset", bsp: 32, mp: "5w", tmm: 3, range: "3/6/9", skill: 6, dmg: "7D × 3", check: 8, threshold: 5, specials: "Crit Seeker, ECM 6, IF 2", source: "Hot Spots: Draconis Reach", upgrade: 37 },
{ name: "Striker Light Tank", type: "asset", bsp: 18, mp: "5w", tmm: 2, range: "3/6/9", skill: 6, dmg: "8D", check: 8, threshold: 5, specials: "IF 1", source: "Hot Spots: Draconis Reach", upgrade: 21 },
{ name: "Sturmfeur Heavy Tank (Assault)", type: "asset", bsp: 40, mp: "3t", tmm: 1, range: "6/12/18", skill: 6, dmg: "22D", check: 12, threshold: 8, specials: "ECM 6, IF 5", source: "Force Pack: Rifle & Command Lances", upgrade: 46 },
{ name: "Sturmfeur Heavy Tank (Cell)", type: "asset", bsp: 40, mp: "4t", tmm: 1, range: "7/14/21", skill: 6, dmg: "9D × 3", check: 12, threshold: 8, specials: "IF 6", source: "Force Pack: Rifle & Command Lances", upgrade: 46 },
{ name: "Sturmfeur Heavy Tank (SRM)", type: "asset", bsp: 35, mp: "3t", tmm: 1, range: "3/6/9", skill: 6, dmg: "8D × 4", check: 12, threshold: 8, specials: "Crit Seeker, IF 2", source: "Force Pack: Rifle & Command Lances", upgrade: 41 },
{ name: "Sturmfeur Heavy Tank", type: "asset", bsp: 37, mp: "3t", tmm: 1, range: "7/14/21", skill: 6, dmg: "8D × 3", check: 12, threshold: 8, specials: "IF 5", source: "Force Pack: Rifle & Command Lances", upgrade: 43 },
{ name: "Tokugawa Heavy Tank (MRM)", type: "asset", bsp: 38, mp: "4w", tmm: 1, range: "4/8/12", skill: 6, dmg: "7D × 5", check: 10, threshold: 5, specials: "TAG", source: "Hot Spots: Draconis Reach", upgrade: 44 },
{ name: "Vedette Medium Tank (Armor)", type: "asset", bsp: 22, mp: "5t", tmm: 2, range: "6/12/18", skill: 6, dmg: "11D", check: 9, threshold: 5, specials: "-", source: "Force Pack: Battle & Fire Lances", upgrade: 26 },
{ name: "Vedette Medium Tank (Cell)", type: "asset", bsp: 20, mp: "5t", tmm: 2, range: "6/12/18", skill: 6, dmg: "10D", check: 8, threshold: 5, specials: "AMS", source: "Force Pack: Battle & Fire Lances", upgrade: 23 },
{ name: "Vedette Medium Tank (Ultra)", type: "asset", bsp: 18, mp: "5t", tmm: 2, range: "6/12/18", skill: 6, dmg: "8D", check: 8, threshold: 5, specials: "-", source: "Force Pack: Battle & Fire Lances", upgrade: 21 },
{ name: "Vedette Medium Tank", type: "asset", bsp: 16, mp: "5t", tmm: 2, range: "6/12/18", skill: 6, dmg: "5D", check: 8, threshold: 5, specials: "-", source: "Force Pack: Battle & Fire Lances", upgrade: 19 },
{ name: "Von Luckner VNL-K65N", type: "asset", bsp: 31, mp: "3t", tmm: 1, range: "3/6/9", skill: 6, dmg: "30D", check: 10, threshold: 8, specials: "Crit Seeker, IF 1", source: "Force Pack: Rifle & Command Lances", upgrade: 36 },
{ name: "Von Luckner VNL-K70", type: "asset", bsp: 30, mp: "3t", tmm: 1, range: "6/12/18", skill: 6, dmg: "11D × 2", check: 10, threshold: 8, specials: "IF 1", source: "Force Pack: Rifle & Command Lances", upgrade: 35 },
{ name: "Von Luckner VNL-K75N", type: "asset", bsp: 35, mp: "3t", tmm: 1, range: "3/6/9", skill: 6, dmg: "20D × 2", check: 10, threshold: 8, specials: "-", source: "Force Pack: Rifle & Command Lances", upgrade: 41 },
{ name: "Von Luckner VNL-K85N", type: "asset", bsp: 37, mp: "3t", tmm: 1, range: "4/8/12", skill: 6, dmg: "8D × 4", check: 12, threshold: 8, specials: "Crit Seeker", source: "Force Pack: Rifle & Command Lances", upgrade: 43 },
{ name: "Warrior H-7 Attack Helicopter", type: "asset", bsp: 12, mp: "9v", tmm: 4, range: "8/16/24", skill: 6, dmg: "2D", check: 5, threshold: 5, specials: "No Turret", source: "Force Pack: Recon & Hunter Lances", upgrade: 14 }
];

function displayMatchingSupport(query) {
    const list = document.getElementById("support-list");

    const lowerQuery = query.toLowerCase();

    list.innerHTML = "";

    let matched = false;

    knownSupport.forEach((entry) => {
        let match = (entry.name.toLowerCase().indexOf(lowerQuery) != -1) ||
                    (entry.source.toLocaleLowerCase().indexOf(lowerQuery) != -1) ||
                    (entry.specials.toLocaleLowerCase().indexOf(lowerQuery) != -1);

        if (match) {
            const row = document.createElement("li");
            row.classList.add("unit-costs");
            
            const name = document.createElement("span");
            name.innerText = entry.name;
            row.appendChild(name);

            const points = document.createElement("span");
            points.innerText = entry.bsp;
            points.style.textAlign = "right";
            row.appendChild(points);

            row.style.cursor = "pointer";
            row.addEventListener("click", () => {
                selectRow(row);
                displaySupport(entry);
            });

            list.appendChild(row);

            if (!matched)
            {
                selectRow(row);
                displaySupport(entry);
                matched = true;
            }
        }
    });
}

function selectRow(row) {
    const selectedRows = document.getElementsByClassName("selected-row");
    for (let i = 0; i < selectedRows.length; i++) {
        selectedRows.item(i).classList.remove("selected-row");
    }
    row.classList.add("selected-row");
}

function displaySupport(supportItem) {
    const name = document.getElementById("sc-name");
    name.innerText = supportItem.name;

    const bsp = document.getElementById("sc-bsp");
    let bspHtml = `<span>${supportItem.bsp}</span>`;
    if (supportItem.upgrade > 0) {
        bspHtml += ` <span class="upgrade-text">(${supportItem.upgrade})</span>`;
    }
    bsp.innerHTML = bspHtml;

    const mp = document.getElementById("sc-mp");
    mp.innerText = supportItem.mp;

    const tmm = document.getElementById("sc-tmm");
    tmm.innerText = `+${supportItem.tmm}`;

    const range = document.getElementById("sc-range");
    range.innerText = supportItem.range;

    const skill = document.getElementById("sc-skill");
    let skillText = supportItem.skill > 0 ? supportItem.skill : "-";
    let skillHtml = `<span>${skillText}</span>`;
    if (supportItem.upgrade > 0) {
        skillHtml += ` <span class="upgrade-text">(${supportItem.skill - 1})</span>`;
    }
    skill.innerHTML = skillHtml;

    const dmg = document.getElementById("sc-dmg");
    dmg.innerText = supportItem.dmg;

    const check = document.getElementById("sc-check");
    check.innerText = supportItem.check;

    const threshold = document.getElementById("sc-threshold");
    threshold.innerText = supportItem.threshold;

    const specials = document.getElementById("sc-specials");
    specials.innerText = supportItem.specials;

    const source = document.getElementById("sc-source");
    source.innerText = supportItem.source;
}

displayMatchingSupport("");
//displaySupport(knownSupport[0]);

document.getElementById("search-text").addEventListener("input", () => {
    displayMatchingSupport(document.getElementById("search-text").value);
});