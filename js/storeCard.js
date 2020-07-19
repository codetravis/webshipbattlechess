class StoreCard extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        this.displayWidth = 64;
        this.scaleY = this.scaleX * 2;
        this.action_name = config.action_name;
        this.item_name = config.key;
        config.scene.add.existing(this);
        this.selected = 0;
        this.setInteractive();
        this.on('pointerdown', this.clicked, this);
    }

    clicked() {
        // switch image to selected?
        // alternatively draw a green square behind this?
        if(this.selected === 0) {
            this.selected = 1;
            this.tint = 0x00ff00;
        } else {
            this.selected = 0;
            this.tint = 0x000000;
        }
        this.emitter = EventDispatcher.getInstance();
        this.emitter.emit(this.action_name, this);
    }
}