

class Ship extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.hull_name);
        this.displayWidth = 32;
        this.scaleY = this.scaleX;
        config.scene.add.existing(this);

        let hullStats = new HullStats();
        this.hull_name = config.hull_name;
        this.hull = hullStats.getBaseHullStats(config.hull_name);
        this.ship_id = config.ship_id;
        this.scan_range = this.hull.scan_range;
        this.speed = this.hull.speed;
        this.facing = config.facing;
        this.angle = 45 * this.facing;
        this.team = config.team;
        this.has_moved = 0;
        this.has_faced = 0;
        this.has_attacked = 0;
        this.core_stress = 0;
        this.initiative = 0;

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
            this.core_stress = Math.max(0, this.core_stress - this.hull.core_cooling);
        }
    }

    hideMe() {
        this.visible = false;
    }

    showMe() {
        this.visible = true;
    }

    addTurret(turret_id, turret_key) {
        this.hull.hard_points[turret_id].turret = new Turret({scene: this.scene, x: 100, y: 800, key: turret_key})
    }

    receiveDamage(amount, type, face) {
        if(this.hull[face + "_shield"] > 0) { 
            this.hull[face + "_shield"] -= amount;
        } else if(this.hull[face + "_armor"] > 0) {
            this.hull[face + "_armor"] -= amount;
        } else {
            this.hull.core_health -= amount;
        }

        if (type == "ion") {
            this.payCoreStress(10);
        }
    }

    payCoreStress(amount) {
        this.core_stress += amount;
        if(this.core_stress > this.hull.core_stress_threshold) {
            this.hull.core_health -= 1;
        }
    }

    chargeShields(face) {
        let hullStats = new HullStats();
        let baseStats = hullStats.getBaseHullStats(this.hull_name);
        this.hull[face + "_shield"] = Math.min(baseStats[face + "_shield"], this.hull[face + "_shield"] + 1);
        this.payCoreStress(5);
    }

    saveableObject() {
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
            core_stress: this.core_stress,
            initiative: this.initiative
        }
    }

    restoreFromSaveObject(saveObject) {
        this.facing = saveObject.facing;
        this.angle = 45 * this.facing;
        this.has_moved = saveObject.has_moved;
        this.has_faced = saveObject.has_faced;
        this.has_attacked = saveObject.has_attacked;
        this.core_stress = saveObject.core_stress;
        this.initiative = saveObject.initiative;
        this.hull = saveObject.hull;
    }

}