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
                base_value: 500,
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
                core_health: 50,
                max_core_stress: 70,
                core_stress_threshold: 50,
                core_cooling: 15,
                shield_generator: 1,
                storage_space: 50,
                hard_points: [
                    {
                        id: 0,
                        name: "Top Turret",
                        fields_of_fire: [0, 1, 2, 3, 4, 5, 6, 7],
                        turret: null,
                    },
                ]
            }, 
            "light_scout": {
                name: "light_scout",
                display_name: "Terran Scout Frigate",
                description: "Fast but lightly armed and armored, the light scout is used for patrol and reconasaince",
                base_value: 750,
                speed: 3,
                turning: 2,
                max_turrets: 2,
                scan_range: 4,
                front_armor: 60,
                right_armor: 60,
                left_armor: 60,
                rear_armor: 50,
                front_shield: 80,
                right_shield: 80,
                left_shield: 80,
                rear_shield: 80,
                core_health: 100,
                max_core_stress: 100,
                core_stress_threshold: 60,
                core_cooling: 20,
                shield_generator: 1,
                storage_space: 5,
                hard_points: [
                    {
                        id: 0,
                        name: "Top Turret",
                        fields_of_fire: [0, 1, 2, 6, 7],
                        turret: null,
                    },
                    {
                        id: 1,
                        name: "Bottom Turret",
                        fields_of_fire: [0, 1, 2, 6, 7],
                        turret: null,
                    }
                ]
            },
            "wedge_destroyer": {
                name: "wedge_destroyer",
                display_name: "Terran Destroyer",
                description: "The Wedge packs immense firepower for its size. All turrets overlap fields of fire in the forward arc",
                base_value: 1000,
                speed: 2,
                turning: 2,
                max_turrets: 5,
                scan_range: 3,
                front_armor: 100,
                right_armor: 80,
                left_armor: 80,
                rear_armor: 60,
                front_shield: 100,
                right_shield: 80,
                left_shield: 80,
                rear_shield: 60,
                core_health: 200,
                max_core_stress: 150,
                core_stress_threshold: 100,
                core_cooling: 40,
                shield_generator: 2,
                storage_space: 10,
                hard_points: [
                    {
                        id: 0,
                        name: "Nose Turret",
                        fields_of_fire: [0],
                        turret: null,
                    },
                    {
                        id: 1,
                        name: "Left Front Turret",
                        fields_of_fire: [0, 7],
                        turret: null,
                    },
                    {
                        id: 2,
                        name: "Right Front Turret",
                        fields_of_fire: [0, 1],
                        turret: null,
                    },
                    {
                        id: 3,
                        name: "Left Mid Turret",
                        fields_of_fire: [0, 7],
                        turret: null,
                    },
                    {
                        id: 4,
                        name: "Right Mid Turret",
                        fields_of_fire: [0, 1],
                        turret: null,
                    },
                ]
            },
        }
    }

}