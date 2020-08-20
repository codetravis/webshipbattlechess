class SceneVictory extends Phaser.Scene {
    constructor() {
        super({key: 'SceneVictory', active: false});
    }

    preload() {
        this.load.image("continue_button", "images/movement_square.svg");
    }

    create() {

        this.gameState = {};
        this.add.text(300, 300, "VICTORY!", {fontFamily: 'Arial'});
        this.end_turn_button = new UIButton({
            scene: this,
            x: 300,
            y: 500,
            action_name: "CONTINUE_CLICKED",
            key: "continue_button",
            display_width: 96,
            display_height: 48
        });

        this.emitter = EventDispatcher.getInstance();
        this.emitter.on("CONTINUE_CLICKED", this.goToSetup.bind(this));
    }

    update() {

    }

    goToSetup() {
        this.refreshGameState();
        this.scene.start('SceneSetup');
    }

    refreshGameState() {
        this.gameState = {
            last_ship_id: 0,
            teams: 2,
            team_1_credits: 200000,
            team_2_credits: 200000,
            team_1_fleet: {},
            team_2_fleet: {}
        };
        this.saveGameState();
    }

    saveGameState() {
        let gameStateString = JSON.stringify(this.gameState);
        localStorage.setItem('game', gameStateString);
    }

}