

class Ship extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.hull_name);
        this.displayWidth = 32;
        this.scaleY = this.scaleX;
        config.scene.add.existing(this);

        let hullStats = new HullStats();
        this.hull = hullStats.getBaseHullStats(config.hull_name);
        this.turrets = [];
        this.ship_id = config.ship_id;
        this.scan_range = this.hull.scan_range;
        this.speed = this.hull.speed;
        this.facing = config.facing;
        this.angle = 45 * this.facing;
        this.team = config.team;
        this.has_moved = 0;
        this.has_faced = 0;
        this.energy = 0;
        this.core_heat = 0;

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
        this.has_moved = 0;
        this.has_faced = 0;
    }

    hideMe() {
        this.visible = false;
    }

    showMe() {
        this.visible = true;
    }

    addTurret(turret_key) {
        if(this.turrets.length < this.hull.max_turrets) {
            let new_turret = new Turret({scene: this.scene, x: 32 * this.turrets.length, y: 800, key: turret_key});
            this.turrets.push(new_turret);
            return true
        }
        return false;
    }

}