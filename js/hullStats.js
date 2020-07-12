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
            }, 
            "light_scout": {
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
            },
        }
    }

}