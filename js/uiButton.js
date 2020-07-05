class UIButton extends Phaser.GameObjects.Image {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        this.displayWidth = 96;
        this.displayHeight = 48;
        this.action_name = config.action_name;
        config.scene.add.existing(this);
        this.setInteractive();
        this.on('pointerdown', this.clicked, this);
    }

    clicked() {
        this.emitter = EventDispatcher.getInstance();
        this.emitter.emit(this.action_name, this);
    }
}