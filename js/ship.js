

class Ship extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.hull_name);
        this.displayWidth = 32;
        this.scaleY = this.scaleX;
        this.team = config.team;
        this.team_color = 0xffffff;
        if(this.team === 1) {
            this.team_color =  0x00ff00;
        } else if (this.team === 2) {
            this.team_color = 0xffff00;
        }
        this.team_marker = new Phaser.GameObjects.Rectangle(
            config.scene, 
            config.x, 
            config.y, 
            this.displayWidth,
            this.displayWidth,
            this.team_color,
            0.5
            );
        config.scene.add.existing(this.team_marker);
        config.scene.add.existing(this);

        let hullStats = new HullStats();
        this.hull_name = config.hull_name;
        this.hull = hullStats.getBaseHullStats(config.hull_name);
        this.ship_id = config.ship_id;
        this.scan_range = this.hull.scan_range;
        this.speed = this.hull.speed;
        this.facing = config.facing;
        this.angle = 45 * this.facing;
        this.has_moved = 0;
        this.has_faced = 0;
        this.has_attacked = 0;
        this.turn_finished = 0;
        this.core_stress = 0;
        this.initiative = this.hull.base_initiative;
        this.shield_generation = 0;
        this.data_object = 0;

        

        this.setInteractive();
        this.on('pointerdown', this.clicked, this);
    }

    clicked() {
        this.emitter = EventDispatcher.getInstance();
        this.emitter.emit("SHIP_CLICKED", this);
    }

    moveMe(x, y) {
        // add animation
        this.x = x;
        this.y = y;
        this.team_marker.x = x;
        this.team_marker.y = y;
        this.has_moved = 1;
    }

    faceMe(facing) {
        this.angle = 45 * facing;
        this.facing = facing;

        this.has_faced = 1;
    }

    prepareForAction() {
        if(this.core_stress >= this.hull.max_core_stress) {
            this.core_stress = Math.max(0, this.core_stress - this.hull.core_cooling * 3);
        } else {
            this.has_moved = 0;
            this.has_faced = 0;
            this.has_attacked = 0;
            this.shield_generation = 0;
            this.turn_finished = 0;
            this.core_stress = Math.max(0, this.core_stress - this.hull.core_cooling);
        }
    }

    hideMe() {
        this.team_marker.visible = false;
        this.visible = false;
    }

    showMe() {
        this.team_marker.visible = true;
        this.visible = true;
    }

    addTurret(turret_id, turret_key) {
        this.hull.hard_points[turret_id].turret = new Turret({scene: this.scene, x: 50 + 32 * turret_id, y: 700, key: turret_key})
    }

    receiveDamage(amount, type, face) {
        // Kinetic rounds lose damage when hitting shields to a min of 1
        // Energy beams lose damage once they hit armor to a min of 1
        // Explosive rounds damage does not bleed through shields to the armor and core
        // Ion beams do increased damage to shields, lower damage to armor, and primarily core stress to the core 
        if(this.hull[face + "_shield"] > 0) {
            let starting_shield = this.hull[face + "_shield"];

            if(type === "kinetic") {
                amount = Math.floor(amount * .90);
            }

            // ion beams do increased damage to shields
            if(type === "ion") {
                amount = Math.floor(amount * 1.10);
            }

            this.hull[face + "_shield"] = Math.max(0, this.hull[face + "_shield"] - amount);

            if(this.hull[face + "_shield"] === 0) {
                amount = Math.max(0, amount - starting_shield);
            } else {
                amount = 0;
            }

            if(type === "explosive") {
                amount = 0;
            }
        }
        
        if(this.hull[face + "_armor"] > 0 && amount > 0) {
            let starting_armor = this.hull[face + "_armor"];

            // energy weapons do reduced damage to armor
            if(type === "energy") {
                amount = Math.max(1, Math.floor(amount * .90));
            }

            // ion beams do reduced damage to armor
            if(type === "ion") {
                amount = Math.max(1, Math.floor(amount * .50));
            }

            this.hull[face + "_armor"] = Math.max(0, this.hull[face + "_armor"] - amount);

            if(this.hull[face + "_armor"] === 0) {
                amount = Math.max(0, amount - starting_armor);
            } else {
                amount = 0;
            }

            // only half of explosive damage bleeds through armor
            if(type === "explosive" && amount > 0) {
                Math.max(1, Math.floor(amount * .50))
            }
        } 
        
        if(amount > 0) {
            // when ion beams hit the hull they deal half their damage as stress, and 10% as actual damage
            if (type == "ion") {
                let stress_amount = Math.max(1, Math.floor(amount * .50));
                this.payCoreStress(stress_amount);
                amount = Math.max(1, Math.floor(amount * .10));
            }
            this.hull.core_health = Math.max(0, this.hull.core_health - amount);
        }

        if (this.hull.core_health === 0) {
            this.team_marker.destroy();
        }
    }

    payCoreStress(amount) {
        // TODO modify amount based on hull upgrades and Engineer abilities
        this.core_stress += amount;
        if(this.core_stress > this.hull.core_stress_threshold) {
            console.log("Over stressed core caused internal damage");
            this.hull.core_health -= 1;
        }
    }

    chargeShields(face) {
        if(this.shield_generation < this.hull.shield_generator) {
            let hullStats = new HullStats();
            let baseStats = hullStats.getBaseHullStats(this.hull_name);
            this.hull[face + "_shield"] = Math.min(baseStats[face + "_shield"], this.hull[face + "_shield"] + 10);
            this.payCoreStress(5);
            this.shield_generation += 1;
        }
    }

    saveableObject() {
        let temp_hull = this.hull;
        temp_hull.hard_points.forEach((hard_point) => {
            if(hard_point.turret) {
                hard_point.turret = hard_point.turret.saveableObject();
            }
        })
        return {
            hull_name: this.hull_name, 
            hull: this.hull,
            x: this.x,
            y: this.y,
            ship_id: this.ship_id,
            facing: this.facing,
            team: this.team,
            has_moved: this.has_moved,
            has_faced: this.has_faced,
            has_attacked: this.has_attacked,
            shield_generation: this.shield_generation,
            core_stress: this.core_stress,
            initiative: this.initiative,
            data_object: 1,
        }
    }

    restoreFromSaveObject(saveObject) {
        this.facing = saveObject.facing;
        this.angle = 45 * this.facing;
        this.has_moved = saveObject.has_moved;
        this.has_faced = saveObject.has_faced;
        this.has_attacked = saveObject.has_attacked;
        this.core_stress = saveObject.core_stress;
        this.shield_generation = saveObject.shield_generation;
        this.initiative = saveObject.initiative;
        this.hull = saveObject.hull;
        this.hull.hard_points.forEach((hard_point) => {
            if(hard_point.turret) {
                this.addTurret(hard_point.id, hard_point.turret.name);
            }
        });
    }

}