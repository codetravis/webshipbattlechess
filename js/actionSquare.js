class ActionSquare extends Phaser.GameObjects.Image {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        this.displayWidth = 32;
        this.scaleY = this.scaleX;
        this.event_name = config.event_name;
        if(config.facing) {
            this.facing = config.facing;
        } else {
            this.facing = 0;
        }
        config.scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown', this.clicked, this);
    }

    clicked() {
        this.emitter = EventDispatcher.getInstance();
        this.emitter.emit(this.event_name, this);
    }
}