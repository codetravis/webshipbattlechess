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
                description: "The light freighter is primarily used by merchants for hauling goods but can be repurposed",
                base_value: 50,
                speed: 2,
                max_turrets: 1,
                scan_range: 2,
                front_armor: 5,
                right_armor: 5,
                left_armor: 5,
                rear_armor: 4,
                front_shield: 5,
                right_shield: 5,
                left_shield: 5,
                rear_shield: 5,
                core_health: 5,
                max_core_stress: 70,
                core_stress_threshold: 50,
                core_cooling: 15,
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
                description: "Fast but lightly armed and armored, the light scout is used for patrol and reconasaince",
                base_value: 75,
                speed: 3,
                max_turrets: 2,
                scan_range: 4,
                front_armor: 6,
                right_armor: 6,
                left_armor: 6,
                rear_armor: 5,
                front_shield: 8,
                right_shield: 8,
                left_shield: 8,
                rear_shield: 8,
                core_health: 10,
                max_core_stress: 100,
                core_stress_threshold: 60,
                core_cooling: 20,
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
        }
    }

}