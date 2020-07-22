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
        this.load.image("single_laser_turret", "images/single_laser.png");
        this.load.image("single_blaster_turret", "images/single_laser.png");
        this.load.image("single_turbolaser_turret", "images/single_laser.png");
        this.load.image("buy_button", "images/buy_button.svg");
    }

    create() {
        this.gameState = {};
        // check for existing game state
        this.loadGameState();
        this.selectedCard = null;
        this.active_ship = null;
        this.cardsInStore = [];
        this.loadShipCards();
        
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
            action_name: "BUY_SELECTED_CARD",
            key: "buy_button",
        });

        this.emitter = EventDispatcher.getInstance();
        this.emitter.on("START_GAME", this.startGame.bind(this));
        this.emitter.on("SET_SELECTED_HULL", this.setCardSelection.bind(this));
        this.emitter.on("SET_SELECTED_TURRET", this.setCardSelection.bind(this));
        this.emitter.on("BUY_SELECTED_CARD", this.buySelectedCard.bind(this));
    }

    startGame() {
        if(this.team < this.max_teams) {
            this.team++;
        } else {
            this.scene.start('SceneMain');
        }
    }

    clearStore() {
        this.cardsInStore.forEach((card) => {
            card.destroy();
        });
        this.cardsInStore = [];
    }

    loadShipCards() {
        this.clearStore();
        let hullStats = new HullStats();
        console.log(hullStats.hulls);
        let card_count = 1;
        let card_width = 96;
        Object.keys(hullStats.hulls).forEach((key) => {
            let hull = hullStats.getBaseHullStats(key);
            let test_card = new StoreCard({scene: this, x: card_width * card_count, y: card_width, key: hull.name, action_name: "SET_SELECTED_HULL", item_type: "hull"});
            this.cardsInStore.push(test_card);
            card_count++;
        });
        
    }

    loadTurretCards() {
        this.clearStore();
        let turretStats = new TurretStats();
        let card_count = 1;
        let card_width = 96;
        Object.keys(turretStats.turrets).forEach((key) => {
            let turret = turretStats.getBaseTurretStats(key);
            let test_card = new StoreCard({scene: this, x: card_width * card_count, y: card_width, key: turret.name, action_name: "SET_SELECTED_TURRET", item_type: "turret"});
            this.cardsInStore.push(test_card);
            card_count++;
        });
    }

    setCardSelection(selected_card) {
        if(this.selectedCard && this.selectedCard.item_name !== selected_card.item_name) {
            this.selectedCard.toggleSelection();
        }
        this.selectedCard = selected_card;
        // get hull stats
        // display in view area
    }

    buySelectedCard() {
        if(this.selectedCard && this.selectedCard.item_type == "hull") {
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

            console.log(this.gameState["team_" + this.team + "_credits"]);
            console.log(new_ship.hull.base_value);
            if(this.gameState["team_" + this.team + "_credits"] >= new_ship.hull.base_value) {
                this.gameState["team_" + this.team + "_credits"] -= new_ship.hull.base_value;
                this.gameState["team_" + this.team + "_fleet"][new_ship.ship_id] = new_ship;
                // transition to outfitting ship with weapons
                this.active_ship = this.gameState["team_" + this.team + "_fleet"][new_ship.ship_id];
                this.loadTurretCards();
            } else {
                new_ship.destroy();
                console.log("Not enough credits");
            }
        } else if(this.selectedCard && this.selectedCard.item_type == "turret") {
            // 
        }
    }

    loadGameState() {
        let gameStateString = localStorage.getItem('game');
        if(gameStateString) {
            this.gameState = JSON.parse(gameStateString);
        } else {
            this.gameState = {
                last_ship_id: 0,
                team_1_credits: 300,
                team_2_credits: 300,
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