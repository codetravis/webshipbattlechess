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
                display_name: "Single Laser Turret",
                description: "Medium range and good damage to power ratio, the laser cannon is a core part of a well rounded ships weapons compliment",
                damage_type: "energy",
                size: 1,
                base_value: 5000,
                damage: 30,
                attacks_per_round: 1,
                ship_accuracy: 0.85,
                fighter_accuracy: 0.15,
                range: 2,
                power_cost: 10,
                max_ammo: 0,
                ammo: 0,
            }, 
            "single_blaster_turret": {
                name: "single_blaster_turret",
                display_name: "Single Blaster Turret",
                description: "Short range but quick firing, the blaster cannon is devastating up close but has a high power cost",
                damage_type: "energy",
                size: 1,
                base_value: 3000,
                damage: 20,
                attacks_per_round: 3,
                ship_accuracy: 0.95,
                fighter_accuracy: 0.30,
                range: 1,
                power_cost: 30,
                max_ammo: 0,
                ammo: 0,
            },
            "single_turbolaser_turret": {
                name: "single_turbolaser_turret",
                display_name: "Single Turbolaser Turret",
                description: "Higher power and higher range but also at extreme cost, turbo lasers are the choice for dealing with tougher targets",
                damage_type: "energy",
                size: 2,
                base_value: 10000,
                damage: 80,
                attacks_per_round: 1,
                ship_accuracy: 0.75,
                fighter_accuracy: 0.05,
                range: 5,
                power_cost: 50,
                max_ammo: 0,
                ammo: 0,
            },
            "single_105mm_turret": {
                name: "single_105mm_turret",
                display_name: "Single 105mm Cannon Turret",
                description: "Tried and true method of delivering pain, cannons fire armor piercing kinetic rounds at great speeds. Low accuracy",
                damage_type: "kinetic",
                size: 1,
                base_value: 5000,
                damage: 30,
                attacks_per_round: 1,
                ship_accuracy: 0.65,
                fighter_accuracy: 0.05,
                range: 4,
                power_cost: 5,
                max_ammo: 50,
                ammo: 50,
            },
            "single_concussionmissle_turret": {
                name: "single_concussionmissle_turret",
                display_name: "Single Concussion Missile Turret",
                description: "Guided missiles with perfect accuarcy. Can be destroyed by point defense systems and explode against shields without damaging the ship beyond. Can be dodged by fast moving fighters. Low ammo.",
                damage_type: "explosive",
                size: 1,
                base_value: 10000,
                damage: 50,
                attacks_per_round: 1,
                ship_accuracy: 1.00,
                fighter_accuracy: 0.50,
                range: 5,
                power_cost: 5,
                max_ammo: 6,
                ammo: 6,
            },
        }
    }

}