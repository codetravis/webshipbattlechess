class SceneSetup extends Phaser.Scene {
    constructor() {
        super('SceneSetup');
    }

    preload() {
        this.load.image("light_freighter", "images/light_freighter.svg");
        this.load.image("light_scout", "images/light_scout.svg");
        this.load.image("move_square", "images/movement_square.svg");
        this.load.image("attack_square", "images/attack_square.svg");
        this.load.image("end_button", "images/movement_square.svg");
        this.load.image("single_laser_cannon", "images/single_laser.png");
    }

    create() {
        this.selectedCard = null;
        this.test_card = new StoreCard({scene: this, x: 20, y: 20, key: "light_freighter", action_name: "SET_SELECTED_HULL"});
        this.credits = 300;

        this.emitter = EventDispatcher.getInstance();
        this.emitter.on("START_GAME", this.startGame.bind(this));
        this.emitter.on("SET_SELECTED_HULL", this.setHullSelection.bind(this));
        this.emitter.on("BUY_SELECTED_HULL", this.buySelectedHull.bind(this));
    }

    startGame() {
        this.scene.start('SceneMain');
    }

    setHullSelection(selected_card) {
        this.selectedCard = selected_card;
        // get hull stats
        // display in view area
    }

    buySelectedHull() {
        
    }

    update() {

    }
}