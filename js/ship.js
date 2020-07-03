

class Ship extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.hull);
        this.displayWidth = 32;
        this.scaleY = this.scaleX;
        config.scene.add.existing(this);

        this.ship_id = config.ship_id;
        this.speed = 2;
        this.facing = config.facing;

        this.setInteractive();
        this.on('pointerdown', this.clicked, this);
    }

    clicked() {
        this.emitter = EventDispatcher.getInstance();
        this.emitter.emit("SHIP_CLICKED", this);
    }

    moveMe(x, y, facing) {
        // add animation
        this.x = x;
        this.y = y;
        this.facing = facing;
    }

}