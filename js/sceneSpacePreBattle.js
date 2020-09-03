class SceneSpacePreBattle extends Phaser.Scene {
    constructor() {
        super({ key: 'SceneSpacePreBattle' });
    }

    preload() {
        // load ship and turret images
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
        // read in ships
        this.allShips = [];
        this.gameState = {};
        this.active_ship = null;
        this.active_team = 1;
        this.map_width = 1280;
        this.map_height = 1280;
        this.tile_size = 32;
        
        this.loadInitialGameState();

        // allow teams to arrange ships from their fleet on the battlefield
        this.emitter = EventDispatcher.getInstance();
        this.emitter.on("SHIP_CLICKED", this.setSelectedShip.bind(this));
        
    }

    loadInitialGameState() {
        let gameStateString = localStorage.getItem('game');
        if(gameStateString) {
            this.gameState = JSON.parse(gameStateString);
            console.log(this.gameState);
            for(var i = 1; i <= this.gameState.teams; i++) {
                Object.keys(this.gameState["team_" + i + "_fleet"]).forEach((ship_id) => {
                    let ship_info = this.gameState["team_" + i + "_fleet"][ship_id];
                    let next_ship = new Ship({
                        scene: this,
                        x: ship_info.x,
                        y: ship_info.y,
                        hull_name: ship_info.hull_name,
                        team: ship_info.team,
                        facing: ship_info.facing,
                        ship_id: ship_id
                    });
                    next_ship.restoreFromSaveObject(ship_info);
                    console.log("created new ship " + ship_id);
                    this.allShips.push(next_ship);
                    this.bottomHUDCamera.ignore(next_ship);
                    this.bottomHUDCamera.ignore(next_ship.team_marker);
                });
            }
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

    //
    setSelectedShip(ship) {
        if(this.active_team == ship.team) {
             // set the hud to show the selected units info
             this.active_ship = ship;
             //this.setShipInfoDisplay(ship);
         }
    }

    // 
    placeSelectedShip(target) {
        if(this.active_ship) {
            this.active_ship.moveMe(target.x, target.y);
            this.active_ship.deployed = true;
        }
    }

    removeSelectedShip() {
        if(this.active_ship) {
            // TODO update this location
            this.active_ship.moveMe(0, 0);
            this.active_ship.deployed = false;
        }
    }

    // end this players ship placement and update game state 
    finishedPlacing() {
        this.saveGameState();

        this.scene.start('SceneMain');
    }

    update() {

    }

}