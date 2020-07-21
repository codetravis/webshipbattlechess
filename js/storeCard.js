class StoreCard extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);
        this.displayWidth = 96;
        this.scaleY = this.scaleX;
        this.action_name = config.action_name;
        this.item_name = config.key;
        this.item_type = config.item_type;
        config.scene.add.existing(this);
        this.selected = 0;
        this.setInteractive();
        this.on('pointerdown', this.clicked, this);
    }

    clicked() {
        // switch image to selected?
        // alternatively draw a green square behind this?
        this.toggleSelection();
        this.emitter = EventDispatcher.getInstance();
        this.emitter.emit(this.action_name, this);
    }

    toggleSelection() {
        if(this.selected === 0) {
            this.selected = 1;
            this.setTint(0x995599);
        } else {
            this.selected = 0;
            this.clearTint();
        }
    }
}