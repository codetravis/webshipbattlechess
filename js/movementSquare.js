class MovementSquare extends Phaser.GameObjects.Image {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        this.displayWidth = 32;
        this.scaleY = this.scaleX;
        config.scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown', this.clicked, this);
    }

    clicked() {
        this.emitter = EventDispatcher.getInstance();
        this.emitter.emit("MOVE_CLICKED", this);
    }
}