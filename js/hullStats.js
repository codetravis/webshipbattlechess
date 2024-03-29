class HullStats {

    constructor() {
        this.hulls = this.generateHulls();
    }

    getBaseHullStats(hull) {
        return this.hulls[hull];
    }

    generateHulls() {
        return {
            "light_freighter": {
                name: "light_freighter",
                display_name: "Terran Light Freighter",
                description: "The light freighter is primarily used by merchants for hauling goods but can be repurposed",
                base_value: 10000,
                base_initiative: 2,
                speed: 2,
                turning: 1,
                max_turrets: 1,
                scan_range: 2,
                front_armor: 20,
                right_armor: 20,
                left_armor: 20,
                rear_armor: 20,
                front_shield: 50,
                right_shield: 50,
                left_shield: 50,
                rear_shield: 50,
                core_health: 40,
                max_core_stress: 100,
                core_stress_threshold: 70,
                core_cooling: 15,
                shield_generator: 1,
                storage_space: 50,
                hard_points: [
                    {
                        id: 0,
                        name: "Top Turret",
                        size: 1,
                        fields_of_fire: [0, 1, 2, 3, 4, 5, 6, 7],
                        turret: null,
                        active: true,
                    },
                ]
            }, 
            "light_scout": {
                name: "light_scout",
                display_name: "Terran Dart Scout Corvette",
                description: "Fast but lightly armed and armored, the light scout corevett is used for patrol and reconasaince",
                base_value: 10000,
                base_initiative: 5,
                speed: 4,
                turning: 2,
                max_turrets: 2,
                scan_range: 6,
                front_armor: 50,
                right_armor: 50,
                left_armor: 50,
                rear_armor: 45,
                front_shield: 50,
                right_shield: 50,
                left_shield: 50,
                rear_shield: 50,
                core_health: 55,
                max_core_stress: 200,
                core_stress_threshold: 180,
                core_cooling: 20,
                shield_generator: 1,
                storage_space: 5,
                hard_points: [
                    {
                        id: 0,
                        name: "Top Turret",
                        size: 1,
                        fields_of_fire: [0, 1, 2, 6, 7],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 1,
                        name: "Bottom Turret",
                        size: 1,
                        fields_of_fire: [0, 1, 2, 6, 7],
                        turret: null,
                        active: true,
                    }
                ]
            },
            "wedge_destroyer": {
                name: "wedge_destroyer",
                display_name: "Terran Arrowhead Destroyer",
                description: "The Wedge packs immense firepower for its size. All turrets overlap fields of fire in the forward arc",
                base_value: 18000,
                base_initiative: 3,
                speed: 2,
                turning: 2,
                max_turrets: 5,
                scan_range: 3,
                front_armor: 125,
                right_armor: 115,
                left_armor: 115,
                rear_armor: 100,
                front_shield: 125,
                right_shield: 115,
                left_shield: 115,
                rear_shield: 100,
                core_health: 120,
                max_core_stress: 800,
                core_stress_threshold: 700,
                core_cooling: 60,
                shield_generator: 3,
                storage_space: 10,
                hard_points: [
                    {
                        id: 0,
                        name: "Nose Turret",
                        size: 1,
                        fields_of_fire: [0],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 1,
                        name: "Left Front Turret",
                        size: 2,
                        fields_of_fire: [0, 7],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 2,
                        name: "Right Front Turret",
                        size: 2,
                        fields_of_fire: [0, 1],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 3,
                        name: "Left Mid Turret",
                        size: 1,
                        fields_of_fire: [0, 7],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 4,
                        name: "Right Mid Turret",
                        size: 1,
                        fields_of_fire: [0, 1],
                        turret: null,
                        active: true,
                    },
                ]
            },
            "hff_corvette": {
                name: "hff_corvette",
                display_name: "HFF Corvette",
                description: "The Homeo Fleet Forces Corvette is primarily for patrol and escort, occasionally for scouting and occasionally as extra point defense screen for larger ships",
                base_value: 11000,
                base_initiative: 5,
                speed: 3,
                turning: 4,
                max_turrets: 2,
                scan_range: 3,
                front_armor: 30,
                right_armor: 30,
                left_armor: 30,
                rear_armor: 20,
                front_shield: 25,
                right_shield: 30,
                left_shield: 30,
                rear_shield: 20,
                core_health: 30,
                max_core_stress: 220,
                core_stress_threshold: 180,
                core_cooling: 25,
                shield_generator: 2,
                storage_space: 10,
                hard_points: [
                    {
                        id: 0,
                        name: "Top Turret",
                        size: 1,
                        fields_of_fire: [0, 1, 2, 3, 4, 5, 6, 7],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 1,
                        name: "Bottom Turret",
                        size: 1,
                        fields_of_fire: [0, 1, 2, 3, 4, 5, 6, 7],
                        turret: null,
                        active: true,
                    }
                ]
            },
            "hff_frigate": {
                name: "hff_frigate",
                display_name: "HFF Frigate",
                description: "The Homeo Fleet Forces Frigate has a similar design and role to the corvette but with additional armor and usually carries at least 1 larger weapon",
                base_value: 14000,
                base_initiative: 4,
                speed: 3,
                turning: 3,
                max_turrets: 3,
                scan_range: 3,
                front_armor: 40,
                right_armor: 40,
                left_armor: 40,
                rear_armor: 30,
                front_shield: 30,
                right_shield: 35,
                left_shield: 35,
                rear_shield: 25,
                core_health: 35,
                max_core_stress: 330,
                core_stress_threshold: 270,
                core_cooling: 30,
                shield_generator: 2,
                storage_space: 15,
                hard_points: [
                    {
                        id: 0,
                        name: "Top Turret",
                        size: 1,
                        fields_of_fire: [0, 1, 2, 3, 4, 5, 6, 7],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 1,
                        name: "Large Front Turret",
                        size: 2,
                        fields_of_fire: [0, 1, 7],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 2,
                        name: "Rear Turret",
                        size: 1,
                        fields_of_fire: [3, 4, 5],
                        turret: null,
                        active: true,
                    },
                ]
            },
            "hff_destroyer": {
                name: "hff_destroyer",
                display_name: "HFF Destroyer",
                description: "The Homeo Fleet Forces Destroyer Fast and deadly. Destroyers fill the role of torpedo attack craft and pursuit ships.",
                base_value: 19000,
                base_initiative: 3,
                speed: 4,
                turning: 3,
                max_turrets: 5,
                scan_range: 3,
                front_armor: 45,
                right_armor: 45,
                left_armor: 45,
                rear_armor: 35,
                front_shield: 35,
                right_shield: 40,
                left_shield: 40,
                rear_shield: 30,
                core_health: 50,
                max_core_stress: 470,
                core_stress_threshold: 350,
                core_cooling: 45,
                shield_generator: 2,
                storage_space: 20,
                hard_points: [
                    {
                        id: 0,
                        name: "Front Large Turret",
                        size: 2,
                        fields_of_fire: [0, 1, 7],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 1,
                        name: "Front Standard Turret",
                        size: 1,
                        fields_of_fire: [0, 1, 7],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 2,
                        name: "Right Standard Turret",
                        size: 1,
                        fields_of_fire: [1, 2, 3],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 3,
                        name: "Left Standard Turret",
                        size: 1,
                        fields_of_fire: [5, 6, 7],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 4,
                        name: "Rear Turret",
                        size: 1,
                        fields_of_fire: [3, 4, 5],
                        turret: null,
                        active: true,
                    },
                ]
            },
            "medium_freighter": {
                name: "medium_freighter",
                display_name: "Medium Wallet Freighter",
                description: "Medium freighters form the backbone of most merchant fleets for their good cost to size ratio",
                base_value: 15000,
                base_initiative: 2,
                speed: 2,
                turning: 1,
                max_turrets: 5,
                scan_range: 2,
                front_armor: 20,
                right_armor: 20,
                left_armor: 20,
                rear_armor: 15,
                front_shield: 50,
                right_shield: 50,
                left_shield: 50,
                rear_shield: 45,
                core_health: 80,
                max_core_stress: 100,
                core_stress_threshold: 80,
                core_cooling: 15,
                shield_generator: 1,
                storage_space: 100,
                hard_points: [
                    {
                        id: 0,
                        name: "Top Turret",
                        size: 1,
                        fields_of_fire: [0, 1, 2, 3, 4, 5, 6, 7],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 1,
                        name: "Left Front Turret",
                        size: 1,
                        fields_of_fire: [6, 7],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 2,
                        name: "Right Front Turret",
                        size: 1,
                        fields_of_fire: [1, 2],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 3,
                        name: "Left Rear Turret",
                        size: 1,
                        fields_of_fire: [5, 6],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 4,
                        name: "Right Rear Turret",
                        size: 1,
                        fields_of_fire: [3, 4],
                        turret: null,
                        active: true,
                    },
                ]
            },
            "shield_cruiser": {
                name: "shield_cruiser",
                display_name: "Dwarven Shield Cruiser",
                description: "Dwarven Shield style cruisers form a core part of their battle line, know for their exceptionally strong front armor, but not their maneuverability",
                base_value: 23500,
                base_initiative: 3,
                speed: 2,
                turning: 1,
                max_turrets: 6,
                scan_range: 3,
                front_armor: 180,
                right_armor: 150,
                left_armor: 150,
                rear_armor: 135,
                front_shield: 220,
                right_shield: 200,
                left_shield: 200,
                rear_shield: 185,
                core_health: 180,
                max_core_stress: 1540,
                core_stress_threshold: 1350,
                core_cooling: 120,
                shield_generator: 6,
                storage_space: 50,
                hard_points: [
                    {
                        id: 0,
                        name: "Left Turret",
                        size: 2,
                        fields_of_fire: [0, 6, 7],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 1,
                        name: "Left Front Turret",
                        size: 2,
                        fields_of_fire: [0, 7],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 2,
                        name: "Right Front Turret",
                        size: 2,
                        fields_of_fire: [0, 1],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 3,
                        name: "Right Turret",
                        size: 2,
                        fields_of_fire: [0, 1, 2],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 4,
                        name: "Left Rear Turret",
                        size: 1,
                        fields_of_fire: [4],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 5,
                        name: "Right Rear Turret",
                        size: 1,
                        fields_of_fire: [4],
                        turret: null,
                        active: true,
                    },
                ]
            },
            "haxagun_light_cruiser": {
                name: "haxagun_light_cruiser",
                display_name: "Haxagun Light Cruiser",
                description: "Meant for long range patrol, small task force flagship, and supporting fire for larger ships",
                base_value: 19500,
                base_initiative: 3,
                speed: 3,
                turning: 3,
                max_turrets: 4,
                scan_range: 3,
                front_armor: 50,
                right_armor: 50,
                left_armor: 50,
                rear_armor: 40,
                front_shield: 40,
                right_shield: 45,
                left_shield: 45,
                rear_shield: 40,
                core_health: 55,
                max_core_stress: 550,
                core_stress_threshold: 470,
                core_cooling: 65,
                shield_generator: 2,
                storage_space: 25,
                hard_points: [
                    {
                        id: 0,
                        name: "Front Large Turret",
                        size: 2,
                        fields_of_fire: [0, 1, 3, 6, 7],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 1,
                        name: "Rear Large Turret",
                        size: 2,
                        fields_of_fire: [2, 3, 4, 5, 6],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 2,
                        name: "Right Cheek Turret",
                        size: 1,
                        fields_of_fire: [1],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 3,
                        name: "Left Cheek Turret",
                        size: 1,
                        fields_of_fire: [7],
                        turret: null,
                        active: true,
                    },
                ]
            },
            "salvaged_haxagun_light_cruiser": {
                name: "salvaged_haxagun_light_cruiser",
                display_name: "Salvaged Haxagun Light Cruiser",
                description: "Salvaged and partially damaged light cruiser",
                base_value: 5000,
                base_initiative: 2,
                speed: 1,
                turning: 2,
                max_turrets: 2,
                scan_range: 2,
                front_armor: 50,
                right_armor: 50,
                left_armor: 20,
                rear_armor: 40,
                front_shield: 0,
                right_shield: 0,
                left_shield: 0,
                rear_shield: 0,
                core_health: 40,
                max_core_stress: 300,
                core_stress_threshold: 150,
                core_cooling: 25,
                shield_generator: 0,
                storage_space: 10,
                hard_points: [
                    {
                        id: 0,
                        name: "Front Large Turret",
                        size: 2,
                        fields_of_fire: [0, 1, 3, 6, 7],
                        turret: null,
                        active: true,
                    },
                    {
                        id: 1,
                        name: "Right Cheek Turret",
                        size: 1,
                        fields_of_fire: [1],
                        turret: null,
                        active: true,
                    }
                ]
            },
        }
    }

}