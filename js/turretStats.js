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
                base_value: 1000,
                damage: 10,
                attacks_per_round: 1,
                ship_accuracy: 0.85,
                fighter_accuracy: 0.15,
                range: 3,
                power_cost: 10,
                max_ammo: 0,
                ammo: 0,
            }, 
            "single_ion_turret": {
                name: "single_ion_turret",
                display_name: "Single Ion Turret",
                description: "Primarily used to overload target ships core for disabling and capture",
                damage_type: "ion",
                size: 1,
                base_value: 2000,
                damage: 10,
                attacks_per_round: 1,
                ship_accuracy: 0.75,
                fighter_accuracy: 0.10,
                range: 2,
                power_cost: 15,
                max_ammo: 0,
                ammo: 0,
            },
            "single_blaster_turret": {
                name: "single_blaster_turret",
                display_name: "Single Blaster Turret",
                description: "Short range but quick firing, the blaster cannon is devastating up close but has a high power cost",
                damage_type: "energy",
                size: 1,
                base_value: 1000,
                damage: 8,
                attacks_per_round: 2,
                ship_accuracy: 0.95,
                fighter_accuracy: 0.30,
                range: 1,
                power_cost: 5,
                max_ammo: 0,
                ammo: 0,
            },
            "single_turbolaser_turret": {
                name: "single_turbolaser_turret",
                display_name: "Single Turbolaser Turret",
                description: "Higher power and higher range but also at extreme cost, turbo lasers are the choice for dealing with tougher targets",
                damage_type: "energy",
                size: 2,
                base_value: 5000,
                damage: 50,
                attacks_per_round: 1,
                ship_accuracy: 0.75,
                fighter_accuracy: 0.05,
                range: 5,
                power_cost: 55,
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
                range: 5,
                power_cost: 5,
                max_ammo: 20,
                ammo: 20,
            },
            "single_concussionmissile_turret": {
                name: "single_concussionmissile_turret",
                display_name: "Single Concussion Missile Turret",
                description: "Guided missiles with perfect accuarcy. Can be destroyed by point defense systems and explode against shields without damaging the ship beyond. Can be dodged by fast moving fighters. Low ammo.",
                damage_type: "explosive",
                size: 1,
                base_value: 6000,
                damage: 65,
                attacks_per_round: 1,
                ship_accuracy: 1.00,
                fighter_accuracy: 0.50,
                range: 4,
                power_cost: 5,
                max_ammo: 6,
                ammo: 6,
            },
            "dual_laser_turret": {
                name: "dual_laser_turret",
                display_name: "Dual Laser Turret",
                description: "Medium range and good damage to power ratio, the laser cannon is a core part of a well rounded ships weapons compliment",
                damage_type: "energy",
                size: 1,
                base_value: 2500,
                damage: 10,
                attacks_per_round: 2,
                ship_accuracy: 0.85,
                fighter_accuracy: 0.15,
                range: 3,
                power_cost: 11,
                max_ammo: 0,
                ammo: 0,
            }, 
            "dual_ion_turret": {
                name: "dual_ion_turret",
                display_name: "Dual Ion Turret",
                description: "Primarily used to overload target ships core for disabling and capture",
                damage_type: "ion",
                size: 1,
                base_value: 4500,
                damage: 10,
                attacks_per_round: 2,
                ship_accuracy: 0.75,
                fighter_accuracy: 0.10,
                range: 2,
                power_cost: 16,
                max_ammo: 0,
                ammo: 0,
            },
            "dual_blaster_turret": {
                name: "dual_blaster_turret",
                display_name: "Dual Blaster Turret",
                description: "Short range but quick firing, the blaster cannon is devastating up close but has a high power cost",
                damage_type: "energy",
                size: 1,
                base_value: 2500,
                damage: 8,
                attacks_per_round: 4,
                ship_accuracy: 0.95,
                fighter_accuracy: 0.30,
                range: 1,
                power_cost: 6,
                max_ammo: 0,
                ammo: 0,
            },
            "dual_turbolaser_turret": {
                name: "dual_turbolaser_turret",
                display_name: "Dual Turbolaser Turret",
                description: "Higher power and higher range but also at extreme cost, turbo lasers are the choice for dealing with tougher targets",
                damage_type: "energy",
                size: 2,
                base_value: 11000,
                damage: 50,
                attacks_per_round: 2,
                ship_accuracy: 0.75,
                fighter_accuracy: 0.05,
                range: 5,
                power_cost: 60,
                max_ammo: 0,
                ammo: 0,
            },
            "dual_105mm_turret": {
                name: "dual_105mm_turret",
                display_name: "Dual 105mm Cannon Turret",
                description: "Tried and true method of delivering pain, cannons fire armor piercing kinetic rounds at great speeds. Low accuracy",
                damage_type: "kinetic",
                size: 1,
                base_value: 11000,
                damage: 30,
                attacks_per_round: 2,
                ship_accuracy: 0.65,
                fighter_accuracy: 0.05,
                range: 5,
                power_cost: 6,
                max_ammo: 24,
                ammo: 24,
            },
            "dual_concussionmissile_turret": {
                name: "dual_concussionmissile_turret",
                display_name: "Dual Concussion Missile Turret",
                description: "Guided missiles with perfect accuarcy. Can be destroyed by point defense systems and explode against shields without damaging the ship beyond. Can be dodged by fast moving fighters. Low ammo.",
                damage_type: "explosive",
                size: 1,
                base_value: 15000,
                damage: 65,
                attacks_per_round: 2,
                ship_accuracy: 1.00,
                fighter_accuracy: 0.50,
                range: 5,
                power_cost: 6,
                max_ammo: 8,
                ammo: 8,
            },
            "triple_laser_turret": {
                name: "triple_laser_turret",
                display_name: "Triple Laser Turret",
                description: "Medium range and good damage to power ratio, the laser cannon is a core part of a well rounded ships weapons compliment",
                damage_type: "energy",
                size: 1,
                base_value: 4000,
                damage: 10,
                attacks_per_round: 3,
                ship_accuracy: 0.85,
                fighter_accuracy: 0.15,
                range: 3,
                power_cost: 12,
                max_ammo: 0,
                ammo: 0,
            }, 
            "triple_ion_turret": {
                name: "triple_ion_turret",
                display_name: "Triple Ion Turret",
                description: "Primarily used to overload target ships core for disabling and capture",
                damage_type: "ion",
                size: 1,
                base_value: 6000,
                damage: 10,
                attacks_per_round: 3,
                ship_accuracy: 0.75,
                fighter_accuracy: 0.10,
                range: 2,
                power_cost: 17,
                max_ammo: 0,
                ammo: 0,
            },
            "triple_blaster_turret": {
                name: "triple_blaster_turret",
                display_name: "Triple Blaster Turret",
                description: "Short range but quick firing, the blaster cannon is devastating up close but has a high power cost",
                damage_type: "energy",
                size: 1,
                base_value: 4000,
                damage: 8,
                attacks_per_round: 6,
                ship_accuracy: 0.95,
                fighter_accuracy: 0.30,
                range: 1,
                power_cost: 7,
                max_ammo: 0,
                ammo: 0,
            },
            "triple_turbolaser_turret": {
                name: "triple_turbolaser_turret",
                display_name: "Triple Turbolaser Turret",
                description: "Higher power and higher range but also at extreme cost, turbo lasers are the choice for dealing with tougher targets",
                damage_type: "energy",
                size: 2,
                base_value: 17000,
                damage: 50,
                attacks_per_round: 3,
                ship_accuracy: 0.75,
                fighter_accuracy: 0.05,
                range: 5,
                power_cost: 65,
                max_ammo: 0,
                ammo: 0,
            },
            "triple_105mm_turret": {
                name: "triple_105mm_turret",
                display_name: "Triple 105mm Cannon Turret",
                description: "Tried and true method of delivering pain, cannons fire armor piercing kinetic rounds at great speeds. Low accuracy",
                damage_type: "kinetic",
                size: 1,
                base_value: 17000,
                damage: 30,
                attacks_per_round: 3,
                ship_accuracy: 0.65,
                fighter_accuracy: 0.05,
                range: 5,
                power_cost: 7,
                max_ammo: 27,
                ammo: 27,
            },
            "quad_laser_turret": {
                name: "quad_laser_turret",
                display_name: "Quad Laser Turret",
                description: "Medium range and good damage to power ratio, the laser cannon is a core part of a well rounded ships weapons compliment",
                damage_type: "energy",
                size: 1,
                base_value: 5500,
                damage: 10,
                attacks_per_round: 4,
                ship_accuracy: 0.85,
                fighter_accuracy: 0.15,
                range: 3,
                power_cost: 13,
                max_ammo: 0,
                ammo: 0,
            }, 
            "quad_ion_turret": {
                name: "quad_ion_turret",
                display_name: "Quad Ion Turret",
                description: "Primarily used to overload target ships core for disabling and capture",
                damage_type: "ion",
                size: 1,
                base_value: 7500,
                damage: 10,
                attacks_per_round: 4,
                ship_accuracy: 0.75,
                fighter_accuracy: 0.10,
                range: 2,
                power_cost: 18,
                max_ammo: 0,
                ammo: 0,
            },
            "quad_blaster_turret": {
                name: "quad_blaster_turret",
                display_name: "Quad Blaster Turret",
                description: "Short range but quick firing, the blaster cannon is devastating up close but has a high power cost",
                damage_type: "energy",
                size: 1,
                base_value: 5500,
                damage: 8,
                attacks_per_round: 8,
                ship_accuracy: 0.95,
                fighter_accuracy: 0.30,
                range: 1,
                power_cost: 8,
                max_ammo: 0,
                ammo: 0,
            },
            "quad_turbolaser_turret": {
                name: "quad_turbolaser_turret",
                display_name: "Quad Turbolaser Turret",
                description: "Higher power and higher range but also at extreme cost, turbo lasers are the choice for dealing with tougher targets",
                damage_type: "energy",
                size: 2,
                base_value: 23000,
                damage: 50,
                attacks_per_round: 4,
                ship_accuracy: 0.75,
                fighter_accuracy: 0.05,
                range: 5,
                power_cost: 70,
                max_ammo: 0,
                ammo: 0,
            },
            "quad_105mm_turret": {
                name: "quad_105mm_turret",
                display_name: "Quad 105mm Cannon Turret",
                description: "Tried and true method of delivering pain, cannons fire armor piercing kinetic rounds at great speeds. Low accuracy",
                damage_type: "kinetic",
                size: 1,
                base_value: 23000,
                damage: 30,
                attacks_per_round: 4,
                ship_accuracy: 0.65,
                fighter_accuracy: 0.05,
                range: 5,
                power_cost: 8,
                max_ammo: 32,
                ammo: 32,
            },
        }
    }

}