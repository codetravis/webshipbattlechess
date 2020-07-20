class SceneSetup extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneSetup' });
    }

    preload() {
        this.load.image("light_freighter", "images/light_freighter.svg");
        this.load.image("light_scout", "images/light_scout.svg");
        this.load.image("move_square", "images/movement_square.svg");
        this.load.image("attack_square", "images/attack_square.svg");
        this.load.image("end_button", "images/movement_square.svg");
        this.load.image("single_laser_cannon", "images/single_laser.png");
        this.load.image("buy_button", "images/buy_button.svg");
    }

    create() {
        this.gameState = {};
        // check for existing game state
        this.loadGameState();
        this.selectedCard = null;
        this.test_card = new StoreCard({scene: this, x: 96, y: 96, key: "light_freighter", action_name: "SET_SELECTED_HULL"});
        this.team = 1;
        this.max_teams = 2;
        this.startGameButton = new UIButton({
            scene: this,
            x: 500,
            y: 680,
            action_name: "START_GAME",
            key: "end_button",
        });

        this.buyButton = new UIButton({
            scene: this,
            x: 250,
            y: 480,
            action_name: "BUY_SELECTED_HULL",
            key: "buy_button",
        });

        this.emitter = EventDispatcher.getInstance();
        this.emitter.on("START_GAME", this.startGame.bind(this));
        this.emitter.on("SET_SELECTED_HULL", this.setHullSelection.bind(this));
        this.emitter.on("BUY_SELECTED_HULL", this.buySelectedHull.bind(this));
    }

    startGame() {
        if(this.team < this.max_teams) {
            this.team++;
        } else {
            this.scene.start('SceneMain');
        }
    }

    setHullSelection(selected_card) {
        if(this.selectedCard && this.selectedCard.item_name !== selected_card.item_name) {
            this.selectedCard.toggleSelection();
        }
        this.selectedCard = selected_card;
        // get hull stats
        // display in view area
    }

    buySelectedHull() {
        if(this.selectedCard) {
            let next_ship_id = this.gameState.last_ship_id + 1;
            let new_ship = new Ship({ 
                scene: this, 
                x: next_ship_id * 32, 
                y: 500,
                hull_name: this.selectedCard.item_name,
                team: this.team, 
                facing: 0, 
                ship_id: next_ship_id
            });

            if(this.gameState["team_" + this.team + "_credits"] >= new_ship.hull.value) {
                this.gameState["team_" + this.team + "_credits"] -= new_ship.hull.value;
                // add ship to fleet
            } else {
                console.log("Not enough credits");
            }
        }
    }

    loadGameState() {
        let gameStateString = localStorage.getItem('game');
        if(gameStateString) {
            this.gameState = JSON.parse(gameStateString);
        } else {
            this.gameState = {
                last_ship_id: 0,
                team_one_credits: 300,
                team_two_credits: 300,
                team_1_fleet: {},
                team_2_fleet: {}
            };
            this.saveGameState();
        }
    }

    saveGameState() {
        let gameStateString = JSON.stringify(this.gameState);
        localStorage.setItem('game', gameStateString);
    }

    update() {

    }
}