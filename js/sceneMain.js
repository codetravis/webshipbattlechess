class SceneMain extends Phaser.Scene {
    constructor() {
        super({key: 'SceneMain', active: false});
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
        this.load.image("single_concussionmissile_turret", "images/missile_turret.svg");
        this.load.image("single_105mm_turret", "images/cannon_turret.svg");
        this.load.image("move_action_button", "images/move_action_button.svg");
        this.load.image("turn_action_button", "images/turn_action_button.svg");
        this.load.image("attack_action_button", "images/attack_action_button.svg");
        this.load.image("charge_shield_front_button", "images/charge_shield_front_button.svg");
        this.load.image("charge_shield_right_button", "images/charge_shield_right_button.svg");
        this.load.image("charge_shield_left_button", "images/charge_shield_left_button.svg");
        this.load.image("charge_shield_rear_button", "images/charge_shield_rear_button.svg");
    }

    create() {
        this.active_team = 2;
        this.current_turn = 1;
        this.max_turns = 30;
        this.current_iniative = 0;
        this.action_taken = 0;
        this.map_width = 1280;
        this.map_height = 1280;

        // TODO: setup main camera and hud camera
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

        this.bottomHUDCamera = new Phaser.Cameras.Scene2D.Camera(0, 500, 608, 500);
        this.bottomHUDCamera.setScroll(0, 608);
        this.cameras.addExisting(this.bottomHUDCamera);

        this.drawMapBoundry();
        this.tile_size = 32;
        this.allShips = [];
        this.active_ship = null;
        this.movementSquares = [];
        this.attackSquares = [];
        this.facingSquares = [];
        this.attackLines = [];

        this.createUIButtons();
        this.createUIInfoDisplay();     
        
        this.emitter = EventDispatcher.getInstance();
        this.emitter.on("SHIP_CLICKED", this.setActiveShip.bind(this));
        this.emitter.on("MOVE_ACTION_SELECTED", this.showMoveActions.bind(this));
        this.emitter.on("TURN_ACTION_SELECTED", this.showTurnActions.bind(this));
        this.emitter.on("ATTACK_ACTION_SELECTED", this.showAttackActions.bind(this));
        this.emitter.on("MOVE_CLICKED", this.moveActiveShip.bind(this));
        this.emitter.on("FACE_CLICKED", this.faceActiveShip.bind(this));
        this.emitter.on("ATTACK_CLICKED", this.attackTargetShip.bind(this));
        this.emitter.on("END_TURN", this.endTurn.bind(this));
        this.emitter.on("CHARGE_SHIELD_FRONT", this.chargeActiveShipShield.bind(this));
        this.emitter.on("CHARGE_SHIELD_RIGHT", this.chargeActiveShipShield.bind(this));
        this.emitter.on("CHARGE_SHIELD_LEFT", this.chargeActiveShipShield.bind(this));
        this.emitter.on("CHARGE_SHIELD_REAR", this.chargeActiveShipShield.bind(this));

        this.loadInitialGameState();
        this.endTurn();
        this.showActiveTeamShips(this.active_team);
    }

    update(time, delta) {
        this.attackLines.forEach((line) => {
            if(line.lifespan > 0) {
                line.fade();
            } else {
                line.destroy();
            }
        });
        this.mainCameraControls.update(delta);
    }

    createUIButtons() {
        let buttons = [];
        this.end_turn_button = new UIButton({
            scene: this,
            x: 500,
            y: 680,
            action_name: "END_TURN",
            key: "end_button",
            display_width: 96,
            display_height: 48
        });
        buttons.push(this.end_turn_button);

        this.move_action_button = new UIButton({
            scene: this,
            x: 50,
            y: 680,
            action_name: "MOVE_ACTION_SELECTED",
            key: "move_action_button",
            display_width: 96,
            display_height: 96,
        });
        buttons.push(this.move_action_button);

        this.turn_action_button = new UIButton({
            scene: this,
            x: 150,
            y: 680,
            action_name: "TURN_ACTION_SELECTED",
            key: "turn_action_button",
            display_width: 96,
            display_height: 96,
        });
        buttons.push(this.turn_action_button);

        this.attack_action_button = new UIButton({
            scene: this,
            x: 250,
            y: 680,
            action_name: "ATTACK_ACTION_SELECTED",
            key: "attack_action_button",
            display_width: 96,
            display_height: 96,
        });
        buttons.push(this.attack_action_button);

        this.charge_shield_front_button = new UIButton({
            scene: this,
            x: 550,
            y: 750,
            action_name: "CHARGE_SHIELD_FRONT",
            key: "charge_shield_front_button",
            display_width: 96,
            display_height: 96,
        });
        buttons.push(this.charge_shield_front_button);
        this.charge_shield_right_button = new UIButton({
            scene: this,
            x: 575,
            y: 825,
            action_name: "CHARGE_SHIELD_RIGHT",
            key: "charge_shield_right_button",
            display_width: 96,
            display_height: 96,
        });
        buttons.push(this.charge_shield_right_button);
        this.charge_shield_left_button = new UIButton({
            scene: this,
            x: 500,
            y: 825,
            action_name: "CHARGE_SHIELD_LEFT",
            key: "charge_shield_left_button",
            display_width: 96,
            display_height: 96,
        });
        buttons.push(this.charge_shield_left_button);
        this.charge_shield_rear_button = new UIButton({
            scene: this,
            x: 550,
            y: 900,
            action_name: "CHARGE_SHIELD_REAR",
            key: "charge_shield_rear_button",
            display_width: 96,
            display_height: 96,
        });
        buttons.push(this.charge_shield_rear_button);

        this.cameras.main.ignore(buttons);
    }

    createUIInfoDisplay() {
        this.activeShipName = this.add.text(20, 720, "", {fontFamily: 'Arial'});
        this.cameras.main.ignore(this.activeShipName);
        this.activeShipHealth = this.add.text(20, 735, "", {fontFamily: 'Arial'});
        this.cameras.main.ignore(this.activeShipHealth);
        this.activeShipArmor = this.add.text(20, 750, "", {fontFamily: 'Arial'});
        this.cameras.main.ignore(this.activeShipArmor);
        this.activeShipShields = this.add.text(20, 765, "", {fontFamily: 'Arial'});
        this.cameras.main.ignore(this.activeShipShields);
        this.activeShipCoreStress = this.add.text(20, 780, "", {fontFamily: 'Arial'});
        this.cameras.main.ignore(this.activeShipCoreStress);
    }

    drawMapBoundry() {
        let top_line = this.add.line(0, 0, 1, 1, this.map_width, 1, 0xffffff);
        top_line.setOrigin(0, 0);
        this.bottomHUDCamera.ignore(top_line);
        let left_line = this.add.line(0, 0, 1, 1, 1, this.map_height, 0xffffff);
        left_line.setOrigin(0, 0);
        this.bottomHUDCamera.ignore(left_line);
        let right_line = this.add.line(0, 0, this.map_width, 1, this.map_width, this.map_height, 0xffffff);
        right_line.setOrigin(0, 0);
        this.bottomHUDCamera.ignore(right_line);
        let bottom_line = this.add.line(0, 0, 1, this.map_height, this.map_width, this.map_height, 0xffffff);
        bottom_line.setOrigin(0, 0);
        this.bottomHUDCamera.ignore(bottom_line);
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

    setActiveShip(ship) {
        if(this.active_team == ship.team && 
           this.action_taken === 0 &&
           ship.turn_finished === 0 &&
           ship.initiative === this.current_iniative) {
            // set the hud to show the selected units info
            this.clearActionSquares();

            this.active_ship = ship;
            this.setShipInfoDisplay(ship);
        }
    }

    setShipInfoDisplay(ship) {
        if(ship) {
            this.activeShipName.text = "Ship: " + ship.ship_id + " " + ship.hull.display_name;
            this.activeShipHealth.text = "Core Health: " + ship.hull.core_health;
            this.activeShipArmor.text = "Armor: Front - " + ship.hull.front_armor + " Right - "  + 
                ship.hull.right_armor + " Rear - " + ship.hull.rear_armor + " Left - " + ship.hull.left_armor;
            this.activeShipShields.text = "Shields: Front - " + ship.hull.front_shield + " Right - "  + 
                ship.hull.right_shield + " Rear - " + ship.hull.rear_shield + " Left - " + ship.hull.left_shield;
            this.activeShipCoreStress.text = "Core Stress: " + ship.core_stress + "/" + ship.hull.max_core_stress;
        } else {
            this.activeShipName.text = "";
            this.activeShipHealth.text = "";
            this.activeShipArmor.text = "";
            this.activeShipShields.text = "";
            this.activeShipCoreStress.text = "";
        }

    }

    showMoveActions() {
        this.clearActionSquares();
        if (this.active_ship && this.active_ship.has_moved === 0) {
            this.drawMovement(this.active_ship);
        }
    }

    showTurnActions() {
        this.clearActionSquares();
        if (this.active_ship && this.active_ship.has_faced === 0) {
            this.drawFacing(this.active_ship);
        }
    }

    showAttackActions() {
        this.clearActionSquares();
        if (this.active_ship && this.active_ship.has_attacked === 0) {
            this.drawAttacks(this.active_ship);
        }
    }

    clearActionSquares() {
        this.movementSquares.forEach((square) => {
            square.destroy();
        });
        this.facingSquares.forEach((square) => {
            square.destroy();
        });
        this.attackSquares.forEach((square) => {
            square.destroy();
        });
    }

    drawMovement(ship) {
        // TODO modify for only forward movement after adding turn action button?
        this.movementSquares = [];
        if(ship.has_moved === 0) {
            for( var i = 0; i <= ship.speed; i++) {
                let plus_x = ship.x + (i * this.tile_size);
                let minus_x = ship.x - (i * this.tile_size);
                for( var j = 0; j <= ship.speed; j++) {
                    if (i == 0 && j == 0) {
                        continue;
                    }

                    let plus_y = ship.y + (j * this.tile_size);
                    let minus_y = ship.y - (j * this.tile_size);
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
        this.movementSquares.forEach((square) => {
            this.bottomHUDCamera.ignore(square);
        });
    }

    drawAttacks(ship) {

        this.attackSquares.forEach((square) => {
            square.destroy();
        })
        this.attackSquares = [];

        ship.hull.hard_points.forEach((hard_point) => {
            if(hard_point.turret) {
                for(var i = 0; i <= hard_point.turret.values.range; i++) {
                    let plus_x = ship.x + (i * this.tile_size);
                    let minus_x = ship.x - (i * this.tile_size);
                    
                    for(var j = 0; j <= hard_point.turret.values.range; j++) {
                        // Can't shoot ourselves
                        if (i == 0 && j == 0) {
                            continue;
                        }
                        let plus_y = ship.y + (j * this.tile_size);
                        let minus_y = ship.y - (j * this.tile_size);
                        if(this.validateFieldOfFire(ship, {x: plus_x, y: plus_y}, hard_point)) {
                            this.attackSquares.push(new ActionSquare({scene: this, x: plus_x, y: plus_y, facing: 0, key: "attack_square", event_name: "ATTACK_CLICKED"}));
                        }
                        if(this.validateFieldOfFire(ship, {x: plus_x, y: minus_y}, hard_point)) {
                            this.attackSquares.push(new ActionSquare({scene: this, x: plus_x, y: minus_y, facing: 0, key: "attack_square", event_name: "ATTACK_CLICKED"}));
                        }
                        if(this.validateFieldOfFire(ship, {x: minus_x, y: plus_y}, hard_point)) {
                            this.attackSquares.push(new ActionSquare({scene: this, x: minus_x, y: plus_y, facing: 0, key: "attack_square", event_name: "ATTACK_CLICKED"}));
                        }
                        if(this.validateFieldOfFire(ship, {x: minus_x, y: minus_y}, hard_point)) {
                            this.attackSquares.push(new ActionSquare({scene: this, x: minus_x, y: minus_y, facing: 0, key: "attack_square", event_name: "ATTACK_CLICKED"}));
                        }
                    }
                }    
            }
        })
        this.attackSquares.forEach((square) => {
            this.bottomHUDCamera.ignore(square);
        });
    }

    validateFieldOfFire(attacker, target, hard_point) {

        if(this.distanceToTarget(attacker, target) > hard_point.turret.values.range * this.tile_size * 1.5) {
            return false;
        }

        let actual_fields_of_fire = [];
        hard_point.fields_of_fire.forEach((field) => {
            actual_fields_of_fire.push((field + attacker.facing) % 8);
        });

        if(this.sideOfSlope(target, attacker, 1) <= 0 && this.sideOfSlope(target, attacker, -1) <= 0) {
            if(actual_fields_of_fire.includes(0)) {
                return true;
            }
        }
        if(this.sideOfSlope(target, attacker, 1) <= 0 && this.sideOfSlope(target, attacker, -1) >= 0) {
            if(actual_fields_of_fire.includes(2)) {
                return true;
            }
        }
        if(this.sideOfSlope(target, attacker, 1) >= 0 && this.sideOfSlope(target, attacker, -1) >= 0) {
            if(actual_fields_of_fire.includes(4)) {
                return true;
            }
        }
        if(this.sideOfSlope(target, attacker, 1) >= 0 && this.sideOfSlope(target, attacker, -1) <= 0) {
            if(actual_fields_of_fire.includes(6)) {
                return true;
            }
        }
        if(target.x >= attacker.x && target.y <= attacker.y) {
            if(actual_fields_of_fire.includes(1)) {
                return true;
            }
        }
        if(target.x >= attacker.x && target.y >= attacker.y) {
            if(actual_fields_of_fire.includes(3)) {
                return true;
            }
        }
        if(target.x <= attacker.x && target.y >= attacker.y) {
            if(actual_fields_of_fire.includes(5)) {
                return true;
            }
        }
        if(target.x <= attacker.x && target.y <= attacker.y) {
            if(actual_fields_of_fire.includes(7)) {
                return true;
            }
        }

        return false;
    }

    drawFacing(ship) {
        // TODO: refactor
        this.facingSquares = [];
        let square_size = 32;
        if(ship.has_faced === 0) {
            if(ship.hull.turning === 1) {
                if([0, 1, 7].includes(ship.facing)) {
                    this.facingSquares.push(new ActionSquare({scene: this, x: ship.x, y: ship.y - square_size, facing: 0, key: "move_square", event_name: "FACE_CLICKED"}));
                }
                if([1, 2, 0].includes(ship.facing)) {
                    this.facingSquares.push(new ActionSquare({scene: this, x: ship.x + square_size, y: ship.y - square_size, facing: 1, key: "move_square", event_name: "FACE_CLICKED"}));
                }
                if([2, 3, 1].includes(ship.facing)) {
                    this.facingSquares.push(new ActionSquare({scene: this, x: ship.x + square_size, y: ship.y, facing: 2, key: "move_square", event_name: "FACE_CLICKED"}));
                }
                if([3, 4, 2].includes(ship.facing)) {
                    this.facingSquares.push(new ActionSquare({scene: this, x: ship.x + square_size, y: ship.y + square_size, facing: 3, key: "move_square", event_name: "FACE_CLICKED"}));
                }
                if([4, 5, 3].includes(ship.facing)) {
                    this.facingSquares.push(new ActionSquare({scene: this, x: ship.x, y: ship.y + square_size, facing: 4, key: "move_square", event_name: "FACE_CLICKED"}));
                }
                if([5, 6, 4].includes(ship.facing)) {
                    this.facingSquares.push(new ActionSquare({scene: this, x: ship.x - square_size, y: ship.y + square_size, facing: 5, key: "move_square", event_name: "FACE_CLICKED"}));
                }
                if([6, 7, 5].includes(ship.facing)) {
                    this.facingSquares.push(new ActionSquare({scene: this, x: ship.x - square_size, y: ship.y, facing: 6, key: "move_square", event_name: "FACE_CLICKED"}));
                }
                if([7, 0, 6].includes(ship.facing)) {
                    this.facingSquares.push(new ActionSquare({scene: this, x: ship.x - square_size, y: ship.y - square_size, facing: 7, key: "move_square", event_name: "FACE_CLICKED"}));
                }
            } else if(ship.hull.turning === 2) {
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
        this.facingSquares.forEach((square) => {
            this.bottomHUDCamera.ignore(square);
        });
    }

    validateMove(target_x, target_y, moving_ship) {
        let valid = true;
        this.allShips.forEach((ship) => {
            if(target_x == ship.x && target_y == ship.y && ship.hull.core_health > 0) {
                valid = false;
            }
        });

        if(target_x >= this.map_width || target_y >= this.map_height ||
            target_x < this.tile_size || target_y < this.tile_size) {
            valid = false;
        }

        if(this.distanceToTarget(moving_ship, {x: target_x, y: target_y}) > moving_ship.speed * this.tile_size * 1.5) {
            valid = false;
        }

        if(valid) {
            valid = this.considerFacing({x: target_x, y: target_y}, moving_ship);
        }

        return valid;
    }

    considerFacing(target, ship) {
        if(ship.facing === 0 && this.sideOfSlope(target, ship, 1) < 0 &&
            this.sideOfSlope(target, ship, -1) < 0) {
            return true;
        }
        if(ship.facing === 1 && target.x > ship.x && target.y < ship.y) {
            return true;
        }
        if(ship.facing === 2 && this.sideOfSlope(target, ship, 1) < 0 &&
            this.sideOfSlope(target, ship, -1) > 0) {
            return true;
        }
        if(ship.facing === 3 && target.x > ship.x && target.y > ship.y) {
            return true;
        }
        if(ship.facing === 4 && this.sideOfSlope(target, ship, 1) > 0 &&
        this.sideOfSlope(target, ship, -1) > 0) {
            return true;
        }
        if(ship.facing === 5 && target.x < ship.x && target.y > ship.y) {
            return true;
        }
        if(ship.facing === 6 && this.sideOfSlope(target, ship, 1) > 0 &&
        this.sideOfSlope(target, ship, -1) < 0) {
            return true;
        }
        if(ship.facing === 7 && target.x < ship.x && target.y < ship.y) {
            return true;
        }
        return false;
    }

    sideOfSlope(target, ship, direction) {
        let slope = { x: ship.x + 2, y: ship.y + (2 * direction) };

        // if positive, then on the right side of the slope, if negative, the left side
        return (slope.x - ship.x) * (target.y - ship.y) - (slope.y - ship.y) * (target.x - ship.x);
    }

    distanceToTarget(source, target) {
        return Math.floor(Math.sqrt(Math.pow(target.x - source.x, 2) + Math.pow(target.y - source.y, 2)));
    }

    moveActiveShip(targetSquare) {
        this.active_ship.moveMe(targetSquare.x, targetSquare.y);
        this.showEnemies(this.active_ship.x, this.active_ship.y, this.active_ship.scan_range, this.active_ship.team);

        this.movementSquares.forEach((square) => {
            square.destroy();
        });
        this.movementSquares = [];
        this.action_taken = 1;
    }

    faceActiveShip(targetSquare) {
        this.active_ship.faceMe(targetSquare.facing);

        this.facingSquares.forEach((square) => {
            square.destroy();
        });
        this.facingSquares = [];
        this.action_taken = 1;
    }

    attackTargetShip(targetSquare) {
        let target = null;
        let attack_face = null;
        this.allShips.forEach((ship) => {
            if(ship.team !== this.active_ship.team && 
                ship.visible &&
                ship.x === targetSquare.x && 
                ship.y === targetSquare.y) {
                target = ship;
                attack_face = this.determineAttackFace(this.active_ship, target);
            }
        });

        if(!target) {
            return;
        }

        let turrets = this.turretsInRange(this.active_ship, target);
        this.performAttack(this.active_ship, target, attack_face, turrets);
        console.log("Attacked " + target.ship_id + " from " + this.active_ship.ship_id);
        this.attackSquares.forEach((square) => {
            square.destroy();
        })
        this.attackSquares = [];
        this.active_ship.has_attacked = 1;
        this.action_taken = 1;
        this.setShipInfoDisplay(this.active_ship);
    }

    performAttack(attacker, target, attack_face, turrets) {
        let attack_offset = 0;
        turrets.forEach((turret) => {
            let new_attack_line = new AttackLine({scene: this, attacker: attacker, target: target, attack_name: turret.values.name, lifespan: 200, offset: attack_offset});
            attack_offset += 2;
            this.bottomHUDCamera.ignore(new_attack_line);
            this.attackLines.push(new_attack_line);
            console.log("Attacking face " + attack_face + " of " + target.ship_id);
            for(var i = 0; i < turret.values.attacks_per_round; i++) {
                let hit_roll = Math.random();
                console.log("Hit roll was " + hit_roll);
                if(hit_roll <= turret.values.ship_accuracy) {
                    target.receiveDamage(turret.values.damage, turret.values.damage_type, attack_face);
                    console.log(attack_face  + "Shields are " + target.hull[attack_face + "_shield"]);
                    console.log(attack_face + "Armor is " + target.hull[attack_face + "_armor"]);
                    console.log("Core Health is " + target.hull.core_health);
                } else {
                    console.log("Attack with " + turret.values.name + " missed");
                }
            }
            attacker.payCoreStress(turret.values.power_cost);
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
                //if(Math.abs(target.x - attacker.x) <= hard_point.turret.values.range * square_size && 
                 //   Math.abs(target.y - attacker.y) <= hard_point.turret.values.range * square_size) {
                if(this.distanceToTarget(attacker, target) <= hard_point.turret.values.range * square_size) {
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
        attack_face = (attack_face % 8) / 2;
        // 0 is attack to the front, 1 is attack to the right side, 2 is attack to the rear, 3 is attack to the left side
        let attack_faces = ["front", "left", "rear", "right"]
        return attack_faces[attack_face];
    }

    showActiveTeamShips(team) {
        this.allShips.forEach((ship) => {
            if(ship.team === team && ship.initiative === this.current_iniative) {
                this.showEnemies(ship.x, ship.y, ship.scan_range, team);
            } else {
                ship.hideMe();
            }
        });

        this.allShips.forEach((ship) => {
            if(ship.team === team) {
                ship.showMe();
                this.showEnemies(ship.x, ship.y, ship.scan_range, team);
            }
        });
    }

    resetAllShipActions() {
        this.allShips.forEach((ship) => {
            ship.prepareForAction();
        });
    }

    showEnemies(x, y, range, team) {
        this.allShips.forEach((ship) => {
            if(Math.abs(ship.x - x) <= (range * 32) && Math.abs(ship.y - y) <= (range * 32) && ship.team !== team) {
                ship.showMe();
            }
        });
    }

    getReadyShipsForCurrentInitiative() {
        let ships_to_act = [];
        let team_one_ships = 0;
        let team_two_ships = 0;
        this.allShips.forEach((ship) => {
            if(ship.turn_finished === 0 && 
               ship.hull.core_health > 0 &&
               ship.initiative + ship.reserved === this.current_iniative) {
                ships_to_act.push(ship);
                if(ship.team === 1) {
                    team_one_ships += 1;
                } else if (ship.team === 2) {
                    team_two_ships += 1;
                }
            }
        });

        return { ready_ships: ships_to_act, team_1_ships: team_one_ships, team_2_ships: team_two_ships};
    }

    chargeActiveShipShield(shieldButton) {
        if(this.active_ship) {
            console.log("Attempting to charge shield for ship: " + this.active_ship.ship_id);
            if(shieldButton.action_name.includes("FRONT")) {
                this.active_ship.chargeShields("front");
            } else if(shieldButton.action_name.includes("RIGHT")) {
                this.active_ship.chargeShields("right");
            } else if(shieldButton.action_name.includes("LEFT")) {
                this.active_ship.chargeShields("left");
            } else if(shieldButton.action_name.includes("REAR")) {
                this.active_ship.chargeShields("rear");
            }
        }
    }

    // TODO: rework this logic a bit, something still not quite right
    endTurn() {
        if(this.active_ship) {
            this.active_ship.turn_finished = 1;
            this.active_ship = null;
            this.setShipInfoDisplay(null);
        }
        let ships_to_act = this.getReadyShipsForCurrentInitiative();
        
        if(this.active_team == 1) {
            this.active_team = 2;
        } else {
            this.active_team = 1;
        }

        if(ships_to_act.ready_ships.length === 0) {
            // loop through initiatives until we hit one with ships that are ready to act
            let loop_count = 0;
            let starting_initiative = this.current_iniative;
            console.log(ships_to_act.ready_ships);
            while(loop_count === 0 && ships_to_act.ready_ships.length === 0) {
                console.log("looking for ships to act in initiative " + this.current_iniative);
                if (ships_to_act.ready_ships.length === 0) {
                    console.log("no ships ready, advancing initiative");
                    if(this.current_iniative >= 7) {
                        this.current_iniative = 1;
                        this.resetAllShipActions();
                    } else {
                        this.current_iniative += 1;
                        if(this.current_iniative === starting_initiative) {
                            console.log("No ships left to act");
                            loop_count = 1;
                        }
                    }
                    ships_to_act = this.getReadyShipsForCurrentInitiative();
                }
            } 
        }

        if(this.active_team == 1 && ships_to_act.team_1_ships === 0) {
            this.active_team = 2;
        } else if (this.active_team == 2 && ships_to_act.team_2_ships === 0) {
            this.active_team = 1;
        }

        this.showActiveTeamShips(this.active_team);

        this.attackLines.forEach((line) => {
            line.destroy();
        });
        this.attackLines = [];
        this.clearActionSquares();
        this.action_taken = 0;
        this.checkForVictory();
    }

    checkForVictory() {
        let ships_alive = [];
        let team_one_ships = 0;
        let team_two_ships = 0;
        this.allShips.forEach((ship) => {
            if(ship.hull.core_health > 0) {
                ships_alive.push(ship);
                if(ship.team === 1) {
                    team_one_ships += 1;
                } else if (ship.team === 2) {
                    team_two_ships += 1;
                }
            }
        });

        if(team_one_ships > 0 && team_two_ships === 0) {
            this.scene.start('SceneVictory');
        } else if(team_two_ships > 0 && team_one_ships === 0) {
            this.scene.start('SceneVictory');
        }
    }
}