class TurretStats {

    constructor() {
        this.turrets = this.generateTurrets();
    }

    getBaseTurretStats(turret_name) {
        return this.turrets[turret_name];
    }

    generateTurrets() {
        return {
            "single_laser_turret": {
                name: "single_laser_turret",
                description: "Medium range and good damage to power ratio, the laser cannon is a core part of a well rounded ships weapons compliment",
                damage_type: "energy",
                damage: 3,
                attacks_per_round: 1,
                ship_accuracy: 0.75,
                fighter_accuracy: 0.15,
                range: 2,
                power_cost: 10,
            }, 
            "single_blaster_turret": {
                name: "single_blaster_turret",
                description: "Short range but quick firing, the blaster cannon is devastating up close but has a high power cost",
                damage_type: "energy",
                damage: 2,
                attacks_per_round: 3,
                ship_accuracy: 0.90,
                fighter_accuracy: 0.30,
                range: 1,
                power_cost: 30,
            },
            "single_turbolaser_turret": {
                name: "single_turbolaser_turret",
                description: "Higher power and higher range but also at extreme cost, turbo lasers are the choice for dealing with tougher targets",
                damage_type: "energy",
                damage: 8,
                attacks_per_round: 1,
                ship_accuracy: 0.65,
                fighter_accuracy: 0.05,
                range: 5,
                power_cost: 50,
            },
        }
    }

}