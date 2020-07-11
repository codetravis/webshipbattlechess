class HullStats {

    getBaseHullStats(hull) {
        return hulls()[hull];
    }

    hulls() {
        return {
            "light_freighter": {
                "speed": 2,
                "turrets": 2,
                "scan_range": 2,
                "front_armor": 5,
                "right_armor": 5,
                "left_armor": 5,
                "rear_armor": 5,
                "front_shield": 5,
                "right_shield": 5,
                "left_shield": 5,
                "rear_shield": 5,
                "core_health": 10, 
            }
        }
    }

}