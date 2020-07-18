class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
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
        this.active_team = 0;
        this.map_width = 640;
        this.map_height = 640;
        this.allShips = [];
        this.active_ship = null;
        this.movementSquares = [];
        this.attackSquares = [];
        this.facingSquares = [];

        this.end_turn_button = new UIButton({
            scene: this,
            x: 500,
            y: 680,
            action_name: "END_TURN",
            key: "end_button",
        });
        
        this.test_ship = new Ship({ scene: this, 
                                    x: 32 * 10, 
                                    y: 32 * 10,
                                    hull_name: "light_freighter", 
                                    team: 0, 
                                    facing: 0, 
                                    ship_id: 1});

        this.allShips.push(this.test_ship);

        this.test_ship_two = new Ship({ scene: this, 
            x: 32 * 5, 
            y: 32 * 5,
            hull_name: "light_freighter",
            team: 0, 
            facing: 0, 
            ship_id: 2});

        this.allShips.push(this.test_ship_two);

        this.test_ship_three = new Ship({ scene: this, 
            x: 32 * 2, 
            y: 32 * 2,
            hull_name: "light_scout", 
            team: 1, 
            facing: 4, 
            ship_id: 3});
        this.test_ship_three.addTurret(0, "single_laser_cannon");

        this.allShips.push(this.test_ship_three);
        
        this.emitter = EventDispatcher.getInstance();
        this.emitter.on("SHIP_CLICKED", this.setActiveShip.bind(this));

        this.emitter.on("MOVE_CLICKED", this.moveActiveShip.bind(this));
        this.emitter.on("FACE_CLICKED", this.faceActiveShip.bind(this));
        this.emitter.on("ATTACK_CLICKED", this.attackTargetShip.bind(this));
        this.emitter.on("END_TURN", this.endTurn.bind(this));

        this.resetShipActions(this.active_team);
    }

    update() {

    }

    setActiveShip(ship) {
        if(this.active_team == ship.team) {
            console.log(ship.ship_id + " " + ship.x + " " + ship.y);
            console.log(ship.hull.core_health);
            this.active_ship = ship;
            this.movementSquares.forEach((square) => {
                square.destroy();
            });
            this.facingSquares.forEach((square) => {
                square.destroy();
            });
            this.attackSquares.forEach((square) => {
                square.destroy();
            });

            if (this.active_ship.has_moved === 0) {
                this.drawMovement(ship);
            } else if (this.active_ship.has_faced === 0) {
                this.drawFacing(ship);
            } else if (this.active_ship.has_attacked === 0) {
                console.log("drawing  attacks");
                this.drawAttacks(ship);
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

    drawAttacks(ship) {
        let max_range = 0;
        let square_size = 32;
        ship.hull.hard_points.forEach((hard_point) => {
            console.log("hard point range check for: " + hard_point.name);
            if(hard_point.turret) {
                console.log("turret found with range " + hard_point.turret.values.range);
                max_range = Math.max(max_range, hard_point.turret.values.range);
                console.log("new max range " + max_range);
            }
        })

        this.attackSquares.forEach((square) => {
            square.destroy();
        })
        this.attackSquares = [];

        this.allShips.forEach((target) => {
            console.log("target team is " + target.team + " and attacker team is " + ship.team);
            console.log("distance to target in x direction " + Math.abs(target.x - ship.x));
            console.log("distance to target in y direction " + Math.abs(target.y - ship.y));
            if(target.team !== ship.team && Math.abs(target.x - ship.x) <= max_range * square_size && Math.abs(target.y - ship.y) <= max_range * square_size) {
                console.log("Drawing attack " + target.x + " " + target.y); 
                this.attackSquares.push(new ActionSquare({scene: this, x: target.x, y: target.y, facing: 0, key: "attack_square", event_name: "ATTACK_CLICKED"}));
            }
        });

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
            valid = this.considerFacing({x: target_x, y: target_y}, moving_ship);
        }
        return valid;
    }

    considerFacing(target, ship) {
        if(ship.facing === 0 && target.y > ship.y) {
            return false;
        }
        if(ship.facing === 1 && this.sideOfSlope(target, ship, 1) >= 0) {
            return false;
        }
        if(ship.facing === 2 && target.x < ship.x) {
            return false;
        }
        if(ship.facing === 3 && this.sideOfSlope(target, ship, -1) <= 0) {
            return false;
        }
        if(ship.facing === 4 && target.y < ship.y) {
            return false;
        }
        if(ship.facing === 5 && this.sideOfSlope(target, ship, 1) <= 0) {
            return false;
        }
        if(ship.facing === 6 && target.x > ship.x) {
            return false;
        }
        if(ship.facing === 7 && this.sideOfSlope(target, ship, -1) >= 0) {
            return false;
        }
        return true;
    }

    sideOfSlope(target, ship, direction) {
        let slope = { x: ship.x + 2, y: ship.y + (2 * direction) };

        // if positive, then on the right side of the slope, if negative, the left side
        return (slope.x - ship.x) * (target.y - ship.y) - (slope.y - ship.y) * (target.x - ship.x);
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

    attackTargetShip(targetSquare) {
        let target = null;
        let attack_face = null;
        this.allShips.forEach((ship) => {
            if(ship.team !== this.active_ship.team && ship.x === targetSquare.x && ship.y === targetSquare.y) {
                target = ship;
                attack_face = this.determineAttackFace(this.active_ship, target);
            }
        });

        let turrets = this.turretsInRange(this.active_ship, target);
        this.performAttack(this.active_ship, target, attack_face, turrets);
        console.log("Attacked " + target.ship_id + " from " + this.active_ship.ship_id);
        this.attackSquares.forEach((square) => {
            square.destroy();
        })
        this.attackSquares = [];
        this.active_ship.has_attacked = 1;
        // Do damage to target from active ship

    }

    performAttack(attacker, target, attack_face, turrets) {
        turrets.forEach((turret) => {
            console.log("Attacking face " + attack_face + " of " + target.ship_id);
            target.receiveDamage(turret.values.damage, turret.values.damage_type, attack_face);
            console.log(attack_face  + "Shields are " + target.hull[attack_face + "_shield"]);
            console.log(attack_face + "Armor is " + target.hull[attack_face + "_armor"]);
            console.log("Core Health is " + target.hull.core_health);
            attacker.payCoreStress(turret.power_cost);
        });

        if (target.hull.core_health <= 0) {
            target.destroy();
        }
    }

    turretsInRange(attacker, target) {
        let turrets = [];
        let square_size = 32;
        attacker.hull.hard_points.forEach((hard_point) => {
            if(hard_point.turret) {
                if(Math.abs(target.x - attacker.x) <= hard_point.turret.values.range * square_size && 
                    Math.abs(target.y - attacker.y) <= hard_point.turret.values.range * square_size) {
                        turrets.push(hard_point.turret);
                }
            }
        })
        return turrets;
    }

    determineAttackFace(attacker, target) {
        // determine section receiving damage by relative position
        let attack_face = 0;
        console.log("Target of attack is facing " + target.facing);
        if ((target.facing % 2) == 0) {
            let relative_to_postive_slope = this.sideOfSlope(attacker, target, 1);
            let relative_to_negative_slope = this.sideOfSlope(attacker, target, -1);
            if (relative_to_postive_slope <= 0 && relative_to_negative_slope <= 0) {
                // above
                attack_face = 0 + target.facing;
            } else if (relative_to_postive_slope >= 0 && relative_to_negative_slope <= 0) {
                // left?
                attack_face = 2 + target.facing;
            } else if (relative_to_postive_slope >= 0 && relative_to_negative_slope >= 0) {
                // below
                attack_face = 4 + target.facing;
            } else if (relative_to_postive_slope <= 0 && relative_to_negative_slope >= 0) {
                // right?
                attack_face = 6 + target.facing;
            }
        } else {
            let relative_to_x = attacker.x - target.x;
            let relative_to_y = attacker.y - target.y;
            if (relative_to_x >= 0 && relative_to_y <= 0) {
                // up right
                attack_face = 0 + target.facing - 1;
            } else if (relative_to_x >= 0 && relative_to_y >= 0) {
                // down right
                attack_face = 6 + target.facing - 1;
            } else if (relative_to_x <= 0 && relative_to_y >= 0) {
                // down left
                attack_face = 4 + target.facing - 1;
            } else if (relative_to_x <= 0 && relative_to_y <= 0) {
                // up left
                attack_face = 2 + target.facing - 1;
            }
        }
        console.log("Attack Face before modding " + attack_face);
        attack_face = (attack_face % 8) / 2;
        console.log("Attack face after adjustment " + attack_face);
        // 0 is attack to the front, 1 is attack to the right side, 2 is attack to the rear, 3 is attack to the left side
        let attack_faces = ["front", "left", "rear", "right"]
        return attack_faces[attack_face];
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