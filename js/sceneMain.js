class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    preload() {
    	this.load.image("light_freighter", "images/light_freighter.svg");
    }

    create() {
        this.test_image = this.add.sprite(100, 100, "light_freighter");
        this.test_image.displayWidth = 32;
        this.test_image.scaleY = this.test_image.scaleX;
    }

    update() {}
}