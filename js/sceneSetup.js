class SceneSetup extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneSetup' });
    }

    preload() {
        this.load.image("light_freighter", "images/light_freighter.svg");
        this.load.image("medium_freighter", "images/medium_freighter.svg");
        this.load.image("drudge_freighter", "images/drudge_freighter.svg");
        this.load.image("light_scout", "images/light_scout.svg");
        this.load.image("wedge_destroyer", "images/wedge_destroyer.svg");
        this.load.image("shield_cruiser", "images/shield_cruiser.svg");
        this.load.image("move_square", "images/movement_square.svg");
        this.load.image("attack_square", "images/attack_square.svg");
        this.load.image("end_button", "images/movement_square.svg");
        this.load.image("single_laser_turret", "images/single_laser_turret.svg");
        this.load.image("single_ion_turret", "images/single_ion_turret.svg");
        this.load.image("single_blaster_turret", "images/single_blaster_turret.svg");
        this.load.image("single_turbolaser_turret", "images/single_turbolaser_turret.svg");
        this.load.image("single_concussionmissile_turret", "images/single_missile_turret.svg");
        this.load.image("single_105mm_turret", "images/single_cannon_turret.svg");
        this.load.image("dual_laser_turret", "images/dual_laser_turret.svg");
        this.load.image("dual_ion_turret", "images/dual_ion_turret.svg");
        this.load.image("dual_blaster_turret", "images/dual_blaster_turret.svg");
        this.load.image("dual_105mm_turret", "images/dual_cannon_turret.svg");
        this.load.image("dual_turbolaser_turret", "images/dual_turbolaser_turret.svg");
        this.load.image("dual_concussionmissile_turret", "images/dual_missile_turret.svg");
        this.load.image("triple_laser_turret", "images/triple_laser_turret.svg");
        this.load.image("triple_ion_turret", "images/triple_ion_turret.svg");
        this.load.image("triple_blaster_turret", "images/triple_blaster_turret.svg");
        this.load.image("triple_105mm_turret", "images/triple_cannon_turret.svg");
        this.load.image("triple_turbolaser_turret", "images/triple_turbolaser_turret.svg");
        this.load.image("quad_laser_turret", "images/quad_laser_turret.svg");
        this.load.image("quad_ion_turret", "images/quad_ion_turret.svg");
        this.load.image("quad_blaster_turret", "images/quad_blaster_turret.svg");
        this.load.image("quad_105mm_turret", "images/quad_cannon_turret.svg");
        this.load.image("quad_turbolaser_turret", "images/quad_turbolaser_turret.svg");
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
        this.active_hard_point_id = null;
        this.cardsInStore = [];
        this.storePage = 1;
        this.storePageSize = 3;
        this.storeState = "BUYING_HULL";
        
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

        this.nextStoreButton = new UIButton({
            scene: this,
            x: 520,
            y: 100,
            action_name: "STORE_NEXT",
            key: "next_arrow",
            display_width: 48,
            display_height: 64
        });

        this.previousStoreButton = new UIButton({
            scene: this,
            x: 48,
            y: 100,
            action_name: "STORE_PREVIOUS",
            key: "previous_arrow",
            display_width: 48,
            display_height: 64
        });

        this.nextHardPointButton = new UIButton({
            scene: this,
            x: 520,
            y: 390,
            action_name: "HARD_POINT_NEXT",
            key:"next_arrow",
            display_width: 48,
            display_height: 48
        });

        this.previousHardPointButton = new UIButton({
            scene: this,
            x: 48,
            y: 390,
            action_name: "HARD_POINT_PREVIOUS",
            key: "previous_arrow",
            display_width: 48,
            display_height: 48
        });

        this.hard_point_name = this.add.text(80, 370, "", {fontFamily: 'Arial'});
        this.hard_point_fof = this.add.text(80, 390, "", {fontFamily: 'Arial'});
        this.hard_point_size = this.add.text(80, 410, "", {fontFamily: 'Arial'});
        this.hard_point_turret_name = this.add.text(80, 430, "", {fontFamily: 'Arial'});

        this.loadShipCards();
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
        this.emitter.on("HARD_POINT_NEXT", this.nextHardPoint.bind(this));
        this.emitter.on("HARD_POINT_PREVIOUS", this.previousHardPoint.bind(this));
    }

    startGame() {
        let ship_count = Object.keys(this.gameState["team_" + this.team + "_fleet"]);
        if(this.team < this.max_teams) {
            if(ship_count.length === 0) {
                console.log("cannot continue with no ships in fleet");
                return;
            }
            console.log("Next team's setup begins");
            this.hideFleet(this.team);
            this.team++;
            this.creditsRemaining.text = "Credits Remaining: " + this.gameState["team_" + this.team + "_credits"];
            this.loadShipCards();
        } else {
            this.setInitialShipPostions();
            this.saveGameState();
            this.scene.start('SceneMain');
        }
    }

    hideFleet(team) {
        Object.keys(this.gameState["team_" + team + "_fleet"]).forEach((ship_id) => {
            this.gameState["team_" + team + "_fleet"][ship_id].hideMe();
        });
    }

    setInitialShipPostions() {
        for(var i = 1; i <= this.max_teams; i++) {
            Object.keys(this.gameState["team_" + i + "_fleet"]).forEach((ship_id) => {
                this.gameState["team_" + i + "_fleet"][ship_id].y = this.tile_size + (i - 1) * 96; //* this.map_height;
            });
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

    nextHardPoint() {
        this.active_hard_point_id += 1;
        if(this.active_hard_point_id >= this.active_ship.hull.hard_points.length) {
            this.active_hard_point_id = 0;
        }
        this.showActiveHardPoint();
    }

    previousHardPoint() {
        this.active_hard_point_id -= 1;
        if(this.active_hard_point_id < 0) {
            this.active_hard_point_id = this.active_ship.hull.hard_points.length - 1;
        }
        this.showActiveHardPoint();
    }

    loadShipCards() {
        if(this.storeState === "BUYING_TURRET") {
            this.storePage = 1;
            this.hard_point_name.text = "";
            this.hard_point_fof.text = "";
            this.hard_point_size.text = "";
            this.hard_point_turret_name.text = "";
        }
        this.clearStore();
        this.storeState = "BUYING_HULL";
        this.startGameButton.visible = true;
        this.nextHardPointButton.visible = false;
        this.previousHardPointButton.visible = false;
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
        this.startGameButton.visible = false;
        this.nextHardPointButton.visible = true;
        this.previousHardPointButton.visible = true;
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
                let turret_size = "Standard";
                if(turret.size === 2) {
                    turret_size = "Large";
                }
                this.displayCardName.text = turret.display_name + " - " + turret_size;
                this.displayCardCost.text = "Cost: " + turret.base_value + " Cr";
            }
        }
    }

    buySelectedCard() {
        if(this.selectedCard && this.selectedCard.item_type == "hull") {
            let next_ship_id = this.gameState.last_ship_id + 1;
            let new_ship = new Ship({ 
                scene: this, 
                x: this.tile_size * 2 + next_ship_id * this.tile_size, 
                y: 680,
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
                this.showActiveHardPoint()
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
                if(!this.active_hard_point_id) {
                    this.active_hard_point_id = 0;
                }
                if(!this.active_ship.hull.hard_points[this.active_hard_point_id].turret && new_turret && 
                    new_turret.values.size === this.active_ship.hull.hard_points[this.active_hard_point_id].size) {
                    this.gameState["team_" + this.team + "_credits"] -= new_turret.values.base_value;
                    this.active_ship.hull.hard_points[this.active_hard_point_id].turret = new_turret;
                    new_turret = null;
                    this.showActiveHardPoint();
                }
                
            }
        }

        this.creditsRemaining.text = "Credits Remaining: " + this.gameState["team_" + this.team + "_credits"];
    }

    showActiveHardPoint() {
        if(this.active_ship) {
            if(!this.active_hard_point_id) {
                this.active_hard_point_id = 0;
            }

            let fof_names = ["Front", "Front Right", "Right", "Rear Right", "Rear", "Rear Left", "Left", "Front Left"];
            let hard_point = this.active_ship.hull.hard_points[this.active_hard_point_id];
            this.hard_point_name.text = hard_point.name;
            let fof_text = "";
            hard_point.fields_of_fire.forEach((fof) => {
                fof_text = fof_text + fof_names[fof] + ", ";
            });
            this.hard_point_fof.text = fof_text;
            if(hard_point.size === 1) {
                this.hard_point_size.text = "Standard";
            } else if(hard_point.size === 2) {
                this.hard_point_size.text = "Large";
            }

            if(hard_point.turret) {
                this.hard_point_turret_name.text = hard_point.turret.values.display_name;
            } else {
                this.hard_point_turret_name.text = "";
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
                teams: 2,
                team_1_credits: 200000,
                team_2_credits: 200000,
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