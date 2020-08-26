class SceneStartMenu extends Phaser.Scene {
    constructor() {
        super({key: 'SceneStartMenu', active: false});
    }

    preload() {
        this.load.image("hotseat_button", "images/movement_square.svg");
    }

    create() {

        this.begin_hotseat_button = new UIButton({
            scene: this,
            x: 250,
            y: 250,
            action_name: "HOTSEAT_OPTION_CLICKED",
            key: "hotseat_button",
            display_width: 96,
            display_height: 48
        });

        this.emitter = EventDispatcher.getInstance();
        this.emitter.on("HOTSEAT_OPTION_CLICKED", this.beginHotseatBattle.bind(this));
    }

    beginHotseatBattle() {
        this.scene.start('SceneSetup');
    }

    update() {

    }

}