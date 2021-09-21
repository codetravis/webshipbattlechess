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
        this.load.image("hff_corvette", "images/hff_corvette.svg");
        this.load.image("hff_frigate", "images/hff_frigate.svg");
        this.load.image("hff_destroyer", "images/hff_destroyer.svg");
        this.load.image("haxagun_light_cruiser", "images/haxagun_light_cruiser.svg");
        this.load.image("salvaged_haxagun_light_cruiser", "images/salvaged_haxagun_light_cruiser.svg");
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
        this.placementSquares = [];
        this.gameState = {};
        this.active_ship = null;
        this.active_team = 1;
        this.map_width = 1280;
        this.map_height = 1280;
        this.tile_size = 32;

        this.cameras.main.setViewport(0, 0, 608, 500);
        this.cameras.main.setBounds(-50, -50, this.map_width + 50, this.map_height + 50);

        this.mainCameraControls = new Phaser.Cameras.Controls.FixedKeyControl({
            camera: this.cameras.main,
            up: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.W),
            left: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A),
            down: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S),
            right: this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.D),
            speed: 1.0
        });
        this.mainCameraControls.start();

        this.cameras.main.centerOn(20 * this.tile_size, this.tile_size * 8);

        this.loadInitialGameState();

        this.end_deployment_button = new UIButton({
            scene: this,
            x: 400,
            y: 480,
            action_name: "FINISHED_PLACEMENT",
            key: "done_button",
            display_width: 96,
            display_height: 48
        });

        // allow teams to arrange ships from their fleet on the battlefield
        this.emitter = EventDispatcher.getInstance();
        this.emitter.on("SHIP_CLICKED", this.setSelectedShip.bind(this));
        this.emitter.on("PLACEMENT_SQUARE_CLICKED", this.placeSelectedShip.bind(this));
        this.emitter.on("REMOVE_SHIP_CLICKED", this.removeSelectedShip.bind(this));
        this.emitter.on("FINISHED_PLACEMENT", this.finishedPlacing.bind(this));
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
                });
            }
        }
    }

    saveGameState() {
        // turn ships and turrets into saveable objects before storing in game state
        this.allShips.forEach((ship) => {
            this.gameState["team_" + ship.team + "_fleet"][ship.ship_id] = ship.saveableObject();
        });
        let gameStateString = JSON.stringify(this.gameState);
        localStorage.setItem('game', gameStateString);
    }

    drawPlacementSquares() {
        this.placementSquares.forEach((square) => {
            square.destroy();
        });
        this.placementSquares = [];
        let x_begin = 12 * this.tile_size;
        let x_end = 28 * this.tile_size;
        let y_begin = (this.active_team == 1) ? this.tile_size * 8 : this.tile_size * 28;
        let y_end = y_begin + (4 * this.tile_size);

        for(let x = x_begin; x < x_end; x += this.tile_size) {
            for(let y = y_begin; y < y_end; y += this.tile_size) {

                if(this.validatePlacementSquare(x, y)) {
                    // create placement square at x, y if no ship is placed there
                    this.placementSquares.push(new ActionSquare({scene: this, x: x, y: y, key: "move_square", event_name: "PLACEMENT_SQUARE_CLICKED"}));
                }
            }
        }
    }

    validatePlacementSquare(target_x, target_y) {
        let valid = true;
        this.allShips.forEach((ship) => {
            if(target_x == ship.x && target_y == ship.y && ship.hull.core_health > 0) {
                valid = false;
            }
        });

        return valid;
    }

    //
    setSelectedShip(ship) {
        if(this.active_team == ship.team) {
             // set the hud to show the selected units info
             this.active_ship = ship;
             this.drawPlacementSquares();
             //this.setShipInfoDisplay(ship);
         }
    }

    // 
    placeSelectedShip(target) {
        if(this.active_ship) {
            this.active_ship.moveMe(target.x, target.y);
            this.active_ship.has_moved = false;
            this.active_ship.deployed = true;
            this.drawPlacementSquares();
        }
    }

    removeSelectedShip() {
        if(this.active_ship) {
            // TODO update this location
            this.active_ship.moveMe(0, 0);
            this.active_ship.deployed = false;
        }
    }

    showActiveTeamShips(team) {
        this.allShips.forEach((ship) => {
            if(ship.team === team) {
                ship.showMe();
                this.showEnemies(ship.x, ship.y, ship.scan_range, team);
            } else {
                ship.hideMe();
            }
        });
    }

    // end this players ship placement and update game state 
    finishedPlacing() {

        // check that current player has placed at least one ship
        let deployed_ships = 0;
        this.allShips.forEach((ship) => {
            if(ship.team === this.active_team && ship.deployed) {
                deployed_ships += 1;
            }
        });

        if(deployed_ships === 0) {
            return;
        }

        if(this.active_team === 2) {
            this.saveGameState();
            this.scene.start('SceneMain');
        } else {
            this.active_team += 1;
        }
    }

    update(time, delta) {
        this.mainCameraControls.update(delta);
    }

}