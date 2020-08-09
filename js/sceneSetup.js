class SceneSetup extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneSetup' });
    }

    preload() {
        this.load.image("light_freighter", "images/light_freighter.svg");
        this.load.image("light_scout", "images/light_scout.svg");
        this.load.image("wedge_destroyer", "images/wedge_destroyer.svg");
        this.load.image("move_square", "images/movement_square.svg");
        this.load.image("attack_square", "images/attack_square.svg");
        this.load.image("end_button", "images/movement_square.svg");
        this.load.image("single_laser_turret", "images/single_laser.png");
        this.load.image("single_blaster_turret", "images/single_laser.png");
        this.load.image("single_turbolaser_turret", "images/single_laser.png");
        this.load.image("single_concussionmissle_turret", "images/missile_turret.svg");
        this.load.image("single_105mm_turret", "images/cannon_turret.svg");
        this.load.image("buy_button", "images/buy_button.svg");
        this.load.image("done_button", "images/done_button.svg");
        this.load.image("next_arrow", "images/next_arrow.svg");
        this.load.image("previous_arrow", "images/previous_arrow.svg");
    }

    create() {
        this.gameState = {};
        // check for existing game state
        this.loadGameState();
        this.selectedCard = null;
        this.active_ship = null;
        this.cardsInStore = [];
        this.storePage = 1;
        this.storePageSize = 3;
        this.storeState = "BUYING_HULL";
        this.loadShipCards();
        
        this.team = 1;
        this.max_teams = 2;
        this.tile_size = 32;
        this.map_width = 608;
        this.map_height = 608;
        this.startGameButton = new UIButton({
            scene: this,
            x: 500,
            y: 680,
            action_name: "START_GAME",
            key: "end_button",
            display_width: 96,
            display_height: 48
        });

        this.buyButton = new UIButton({
            scene: this,
            x: 250,
            y: 480,
            action_name: "BUY_SELECTED_CARD",
            key: "buy_button",
            display_width: 96,
            display_height: 48
        });

        this.doneButton = new UIButton({
            scene: this,
            x: 450,
            y: 480,
            action_name: "DONE_WITH_SHIP",
            key: "done_button",
            display_width: 96,
            display_height: 48
        });

        this.nextButton = new UIButton({
            scene: this,
            x: 520,
            y: 100,
            action_name: "STORE_NEXT",
            key: "next_arrow",
            display_width: 48,
            display_height: 64
        });

        this.previousButton = new UIButton({
            scene: this,
            x: 48,
            y: 100,
            action_name: "STORE_PREVIOUS",
            key: "previous_arrow",
            display_width: 48,
            display_height: 64
        });

        this.creditsRemaining = this.add.text(50, 250, "Credits Remaining: " + this.gameState["team_" + this.team + "_credits"], {fontFamily: 'Arial'});
        this.displayCardName = this.add.text(50, 300, "Nothing Selected", {fontFamily: 'Arial'});
        this.displayCardCost = this.add.text(50, 320, "Cost: ", {fontFamily: 'Arial'});

        this.emitter = EventDispatcher.getInstance();
        this.emitter.on("START_GAME", this.startGame.bind(this));
        this.emitter.on("SET_SELECTED_HULL", this.setCardSelection.bind(this));
        this.emitter.on("SET_SELECTED_TURRET", this.setCardSelection.bind(this));
        this.emitter.on("BUY_SELECTED_CARD", this.buySelectedCard.bind(this));
        this.emitter.on("DONE_WITH_SHIP", this.loadShipCards.bind(this));
        this.emitter.on("STORE_NEXT", this.nextStorePage.bind(this));
        this.emitter.on("STORE_PREVIOUS", this.previousStorePage.bind(this));
    }

    startGame() {
        if(this.team < this.max_teams) {
            console.log("Next team's setup begins");
            this.team++;
            this.creditsRemaining.text = "Credits Remaining: " + this.gameState["team_" + this.team + "_credits"];
            this.loadShipCards();
        } else {
            this.saveGameState();
            this.scene.start('SceneMain');
        }
    }

    clearStore() {
        this.cardsInStore.forEach((card) => {
            card.destroy();
        });
        this.cardsInStore = [];
    }

    nextStorePage() {
        this.clearStore();
        this.storePage += 1;
        console.log("On Store Page: " + this.storePage);
        if (this.storeState === "BUYING_HULL") {
            this.loadShipCards();
        } else {
            this.loadTurretCards();
        }
    }

    previousStorePage() {
        this.clearStore();
        this.storePage = Math.max(1, this.storePage - 1);
        console.log("On Store Page: " + this.storePage);
        if (this.storeState === "BUYING_HULL") {
            this.loadShipCards();
        } else {
            this.loadTurretCards();
        }
    }

    loadShipCards() {
        if(this.storeState === "BUYING_TURRET") {
            this.storePage = 1;
        }
        this.clearStore();
        this.storeState = "BUYING_HULL";
        let hullStats = new HullStats();
        console.log(hullStats.hulls);
        let card_count = 1;
        let display_order = 1;
        let card_width = 120;

        let hull_keys = Object.keys(hullStats.hulls);
        if(this.storePage * this.storePageSize - this.storePageSize >= hull_keys.length) {
            this.storePage = 1;
        }

        hull_keys.forEach((key) => {

            if(card_count > this.storePage * this.storePageSize || 
               card_count <= this.storePage * this.storePageSize - this.storePageSize) {
                console.log("Card " + card_count + " is not on page " + this.storePage);
                card_count++;
                return;
            }
            let hull = hullStats.getBaseHullStats(key);
            let hull_card = new StoreCard({scene: this, x: card_width * display_order, y: card_width, key: hull.name, action_name: "SET_SELECTED_HULL", item_type: "hull"});
            this.cardsInStore.push(hull_card);
            display_order++;
            card_count++;
        });
        
    }

    loadTurretCards() {
        if(this.storeState === "BUYING_HULL") {
            this.storePage = 1;
        }
        this.clearStore();
        this.storeState = "BUYING_TURRET";
        let turretStats = new TurretStats();
        let card_count = 1;
        let display_order = 1;
        let card_width = 120;

        let turret_keys = Object.keys(turretStats.turrets);
        if(this.storePage * this.storePageSize - this.storePageSize >= turret_keys.length) {
            this.storePage = 1;
        }
    
        turret_keys.forEach((key) => {

            if(card_count > this.storePage * this.storePageSize || 
                card_count <= this.storePage * this.storePageSize - this.storePageSize) {
                console.log("Card " + card_count + " is not on page " + this.storePage);
                 card_count++;
                 return;
             }
            let turret = turretStats.getBaseTurretStats(key);
            let turret_card = new StoreCard({scene: this, x: card_width * display_order, y: card_width, key: turret.name, action_name: "SET_SELECTED_TURRET", item_type: "turret"});
            this.cardsInStore.push(turret_card);
            display_order++;
            card_count++;
        });
    }

    setCardSelection(selected_card) {
        if(this.selectedCard && this.selectedCard.item_name !== selected_card.item_name) {
            this.selectedCard.toggleSelection();
        }

        this.selectedCard = selected_card;
        this.displaySelectedHullStats();
    }

    displaySelectedHullStats() {
        if(this.selectedCard) {
            if( this.storeState === "BUYING_HULL" ) {
                let hullStats = new HullStats();
                let hull = hullStats.getBaseHullStats(this.selectedCard.item_name);
                this.displayCardName.text = hull.display_name;
                this.displayCardCost.text = "Cost: " + hull.base_value + " Cr";
            } else if (this.storeState === "BUYING_TURRET") {
                let turretStats = new TurretStats();
                let turret = turretStats.getBaseTurretStats(this.selectedCard.item_name);
                console.log(turret);
                this.displayCardName.text = turret.display_name;
                this.displayCardCost.text = "Cost: " + turret.base_value + " Cr";
            }
        }
    }

    buySelectedCard() {
        if(this.selectedCard && this.selectedCard.item_type == "hull") {
            let next_ship_id = this.gameState.last_ship_id + 1;
            let new_ship = new Ship({ 
                scene: this, 
                x: next_ship_id * 32, 
                y: this.tile_size + (this.team - 1) * (this.map_height - (this.tile_size * 2)),
                hull_name: this.selectedCard.item_name,
                team: this.team, 
                facing: (this.team * 4) % 8, 
                ship_id: next_ship_id
            });

            console.log(this.gameState["team_" + this.team + "_credits"]);
            console.log(new_ship.hull.base_value);
            if(this.gameState["team_" + this.team + "_credits"] >= new_ship.hull.base_value) {
                this.gameState["team_" + this.team + "_credits"] -= new_ship.hull.base_value;
                this.gameState["team_" + this.team + "_fleet"][new_ship.ship_id] = new_ship;
                // transition to outfitting ship with weapons
                this.active_ship = this.gameState["team_" + this.team + "_fleet"][new_ship.ship_id];
                this.gameState.last_ship_id = next_ship_id;
                this.storePage = 1;
                this.loadTurretCards();
            } else {
                new_ship.destroy();
                console.log("Not enough credits");
            }
        } else if(this.selectedCard && this.selectedCard.item_type == "turret") {
            // assign turret to ship
            let new_turret = new Turret({
                scene: this,
                x: 0,
                y: 0,
                key: this.selectedCard.item_name
            });

            if(this.gameState["team_" + this.team + "_credits"] >= new_turret.values.base_value) {

                this.active_ship.hull.hard_points.forEach((hard_point) => {
                    if(!hard_point.turret && new_turret) {
                        this.gameState["team_" + this.team + "_credits"] -= new_turret.values.base_value;
                        hard_point.turret = new_turret;
                        console.log("Adding turret " + new_turret.values.name + " to hard point " + hard_point.id);
                        new_turret = null;
                    }
                });
            }
        }

        this.creditsRemaining.text = "Credits Remaining: " + this.gameState["team_" + this.team + "_credits"];
    }

    loadGameState() {
        let gameStateString = localStorage.getItem('game');
        if(gameStateString) {
            this.gameState = JSON.parse(gameStateString);
        } else {
            this.gameState = {
                last_ship_id: 0,
                teams: 2,
                team_1_credits: 100000,
                team_2_credits: 100000,
                team_1_fleet: {},
                team_2_fleet: {}
            };
            this.saveGameState();
        }
    }

    saveGameState() {
        // turn ships and turrets into saveable objects before storing in game state
        for(var i = 1; i <= this.max_teams; i++) {
            Object.keys(this.gameState["team_" + i + "_fleet"]).forEach((ship_id) => {
                if(this.gameState["team_" + i + "_fleet"][ship_id].data_object === 0) {
                    this.gameState["team_" + i + "_fleet"][ship_id] = this.gameState["team_" + i + "_fleet"][ship_id].saveableObject();
                }
            });
        }
        let gameStateString = JSON.stringify(this.gameState);
        localStorage.setItem('game', gameStateString);
    }

    update() {

    }
}