class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    preload() {
        this.load.image("light_freighter", "images/light_freighter.svg");
        this.load.image("light_scout", "images/light_scout.svg");
        this.load.image("move_square", "images/movement_square.svg");
        this.load.image("end_button", "images/movement_square.svg");
    }

    create() {
        this.active_team = 0;
        this.map_width = 640;
        this.map_height = 640;
        this.allShips = [];
        this.active_ship = null;
        this.movementSquares = [];
        this.facingSquares = [];

        this.end_turn_button = new UIButton({
            scene: this,
            x: 500,
            y: 680,
            action_name: "END_TURN",
            key: "end_button",
        });
        
        this.test_ship = new Ship({ scene: this, 
                                    x: 320, 
                                    y: 320,
                                    hull: "light_freighter", 
                                    speed: 2,
                                    team: 0, 
                                    facing: 0, 
                                    ship_id: 1});

        this.allShips.push(this.test_ship);

        this.test_ship_two = new Ship({ scene: this, 
            x: 352, 
            y: 320,
            hull: "light_freighter",
            speed: 2,
            team: 0, 
            facing: 0, 
            ship_id: 2});

        this.allShips.push(this.test_ship_two);

        this.test_ship_three = new Ship({ scene: this, 
            x: 32, 
            y: 32,
            hull: "light_scout", 
            speed: 3,
            team: 1, 
            facing: 4, 
            ship_id: 3});

        this.allShips.push(this.test_ship_three);
        
        this.emitter = EventDispatcher.getInstance();
        this.emitter.on("SHIP_CLICKED", this.setActiveShip.bind(this));

        this.emitter.on("MOVE_CLICKED", this.moveActiveShip.bind(this));
        this.emitter.on("FACE_CLICKED", this.faceActiveShip.bind(this));
        this.emitter.on("END_TURN", this.endTurn.bind(this));

        this.resetShipActions(this.active_team);
    }

    update() {

    }

    setActiveShip(ship) {
        if(this.active_team == ship.team) {
            console.log(ship.ship_id + " " + ship.x + " " + ship.y);
            this.active_ship = ship;
            this.movementSquares.forEach((square) => {
                square.destroy();
            });
            this.facingSquares.forEach((square) => {
                square.destroy();
            });
            if (this.active_ship.has_moved === 0) {
                this.drawMovement(ship);
            } else if (this.active_ship.has_faced === 0) {
                this.drawFacing(ship);
            }
        }
    }

    drawMovement(ship) {
        this.movementSquares = [];
        if(ship.has_moved === 0) {
            for( var i = 0; i <= ship.speed; i++) {
                let plus_x = ship.x + (i * 32);
                let minus_x = ship.x - (i * 32);
                for( var j = 0; j <= ship.speed; j++) {
                    if (i == 0 && j == 0) {
                        continue;
                    }
                    let plus_y = ship.y + (j * 32);
                    let minus_y = ship.y - (j * 32);
                    if(this.validateMove(plus_x, plus_y, ship)) {
                        this.movementSquares.push(new ActionSquare({scene: this, x: plus_x, y: plus_y, key: "move_square", event_name: "MOVE_CLICKED"}));
                    }
                    if(this.validateMove(minus_x, minus_y, ship)) {
                        this.movementSquares.push(new ActionSquare({scene: this, x: minus_x, y: minus_y, key: "move_square", event_name: "MOVE_CLICKED"}));
                    }
                    if(this.validateMove(plus_x, minus_y, ship)) {
                        this.movementSquares.push(new ActionSquare({scene: this, x: plus_x, y: minus_y, key: "move_square", event_name: "MOVE_CLICKED"}));
                    }
                    if(this.validateMove(minus_x, plus_y, ship)) {
                        this.movementSquares.push(new ActionSquare({scene: this, x: minus_x, y: plus_y, key: "move_square", event_name: "MOVE_CLICKED"}));
                    }
                }
            }
        }
    }

    drawFacing(ship) {
        this.facingSquares = [];
        let square_size = 32;
        if(ship.has_faced === 0) {
                if([0, 1, 2, 6, 7].includes(ship.facing)) {
                    this.facingSquares.push(new ActionSquare({scene: this, x: ship.x, y: ship.y - square_size, facing: 0, key: "move_square", event_name: "FACE_CLICKED"}));
                }
                if([1, 2, 3, 7, 0].includes(ship.facing)) {
                    this.facingSquares.push(new ActionSquare({scene: this, x: ship.x + square_size, y: ship.y - square_size, facing: 1, key: "move_square", event_name: "FACE_CLICKED"}));
                }
                if([2, 3, 4, 0, 1].includes(ship.facing)) {
                    this.facingSquares.push(new ActionSquare({scene: this, x: ship.x + square_size, y: ship.y, facing: 2, key: "move_square", event_name: "FACE_CLICKED"}));
                }
                if([3, 4, 5, 1, 2].includes(ship.facing)) {
                    this.facingSquares.push(new ActionSquare({scene: this, x: ship.x + square_size, y: ship.y + square_size, facing: 3, key: "move_square", event_name: "FACE_CLICKED"}));
                }
                if([4, 5, 6, 2, 3].includes(ship.facing)) {
                    this.facingSquares.push(new ActionSquare({scene: this, x: ship.x, y: ship.y + square_size, facing: 4, key: "move_square", event_name: "FACE_CLICKED"}));
                }
                if([5, 6, 7, 3, 4].includes(ship.facing)) {
                    this.facingSquares.push(new ActionSquare({scene: this, x: ship.x - square_size, y: ship.y + square_size, facing: 5, key: "move_square", event_name: "FACE_CLICKED"}));
                }
                if([6, 7, 0, 4, 5].includes(ship.facing)) {
                    this.facingSquares.push(new ActionSquare({scene: this, x: ship.x - square_size, y: ship.y, facing: 6, key: "move_square", event_name: "FACE_CLICKED"}));
                }
                if([7, 0, 1, 5, 6].includes(ship.facing)) {
                    this.facingSquares.push(new ActionSquare({scene: this, x: ship.x - square_size, y: ship.y - square_size, facing: 7, key: "move_square", event_name: "FACE_CLICKED"}));
                }
        }
    }

    validateMove(target_x, target_y, moving_ship) {
        let valid = true;
        this.allShips.forEach((ship) => {
            if(target_x == ship.x && target_y == ship.y) {
                valid = false;
            }
        });

        if(target_x >= this.map_width || target_y >= this.map_height ||
            target_x < 32 || target_y < 32) {
            valid = false;
        }

        if(valid) {
            valid = this.considerFacing(target_x, target_y, moving_ship);
        }
        return valid;
    }

    considerFacing(target_x, target_y, ship) {
        if(ship.facing === 0 && target_y > ship.y) {
            return false;
        }
        if(ship.facing === 1 && this.sideOfSlope(target_x, target_y, ship, 1) >= 0) {
            return false;
        }
        if(ship.facing === 2 && target_x < ship.x) {
            return false;
        }
        if(ship.facing === 3 && this.sideOfSlope(target_x, target_y, ship, -1) <= 0) {
            return false;
        }
        if(ship.facing === 4 && target_y < ship.y) {
            return false;
        }
        if(ship.facing === 5 && this.sideOfSlope(target_x, target_y, ship, 1) <= 0) {
            return false;
        }
        if(ship.facing === 6 && target_x > ship.x) {
            return false;
        }
        if(ship.facing === 7 && this.sideOfSlope(target_x, target_y, ship, -1) >= 0) {
            return false;
        }
        return true;
    }

    sideOfSlope(target_x, target_y, ship, direction) {
        let slope = { x: ship.x + 2, y: ship.y + (2 * direction) };

        return (slope.x - ship.x) * (target_y - ship.y) - (slope.y - ship.y) * (target_x - ship.x);
    }

    moveActiveShip(targetSquare) {
        this.active_ship.moveMe(targetSquare.x, targetSquare.y);
        this.showEnemies(this.active_ship.x, this.active_ship.y, this.active_ship.scan_range, this.active_ship.team);

        this.movementSquares.forEach((square) => {
            square.destroy();
        });
        this.movementSquares = [];

    }

    faceActiveShip(targetSquare) {
        this.active_ship.faceMe(targetSquare.facing);

        this.facingSquares.forEach((square) => {
            square.destroy();
        });
        this.facingSquares = [];
    }

    drawTargets(ship) {

    }

    resetShipActions(team) {
        this.allShips.forEach((ship) => {
            if(ship.team === team) {
                ship.prepareForAction();
                ship.showMe();
                this.showEnemies(ship.x, ship.y, ship.scan_range, team);
            } else {
                ship.hideMe();
            }
        });

        this.allShips.forEach((ship) => {
            if(ship.team === team) {
                this.showEnemies(ship.x, ship.y, ship.scan_range, team);
            }
        });
    }

    showEnemies(x, y, range, team) {
        this.allShips.forEach((ship) => {
            if(Math.abs(ship.x - x) <= (range * 32) && Math.abs(ship.y - y) <= (range * 32) && ship.team !== team) {
                ship.showMe();
            }
        });
    }

    endTurn() {
        if(this.active_team == 0) {
            this.active_team = 1;
        } else {
            this.active_team = 0;
        }
        this.resetShipActions(this.active_team);
    }
}