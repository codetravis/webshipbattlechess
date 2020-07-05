class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    preload() {
        this.load.image("light_freighter", "images/light_freighter.svg");
        this.load.image("move_square", "images/movement_square.svg");
    }

    create() {
        this.map_width = 640;
        this.map_height = 640;
        this.allShips = [];
        this.active_ship = null;
        this.movementSquares = [];
        
        this.test_ship = new Ship({ scene: this, 
                                    x: 320, 
                                    y: 320,
                                    hull: "light_freighter", 
                                    team: 0, 
                                    facing: 0, 
                                    ship_id: 1});

        this.allShips.push(this.test_ship);

        this.test_ship_two = new Ship({ scene: this, 
            x: 352, 
            y: 320,
            hull: "light_freighter", 
            team: 0, 
            facing: 0, 
            ship_id: 2});

        this.allShips.push(this.test_ship_two);
        
        this.emitter = EventDispatcher.getInstance();
        this.emitter.on("SHIP_CLICKED", this.setActiveShip.bind(this));

        this.emitter.on("MOVE_CLICKED", this.moveActiveShip.bind(this));
    }

    update() {

    }

    setActiveShip(ship) {
        console.log(ship.ship_id + " " + ship.x + " " + ship.y);
        this.active_ship = ship;
        this.movementSquares.forEach((square) => {
            square.destroy();
        });
        this.drawMovement(ship);
    }

    drawMovement(ship) {
        this.movementSquares = [];
        for( var i = 0; i <= ship.speed; i++) {
            let plus_x = ship.x + (i * 32);
            let minus_x = ship.x - (i * 32);
            for( var j = 0; j <= ship.speed; j++) {
                if (i == 0 && j == 0) {
                    continue;
                }
                let plus_y = ship.y + (j * 32);
                let minus_y = ship.y - (j * 32);
                if(this.validateMove(plus_x, plus_y)) {
                    this.movementSquares.push(new MovementSquare({scene: this, x: plus_x, y: plus_y, key: "move_square"}));
                }
                if(this.validateMove(minus_x, minus_y)) {
                    this.movementSquares.push(new MovementSquare({scene: this, x: minus_x, y: minus_y, key: "move_square"}));
                }
                if(this.validateMove(plus_x, minus_y)) {
                    this.movementSquares.push(new MovementSquare({scene: this, x: plus_x, y: minus_y, key: "move_square"}));
                }
                if(this.validateMove(minus_x, plus_y)) {
                    this.movementSquares.push(new MovementSquare({scene: this, x: minus_x, y: plus_y, key: "move_square"}));
            
                }
            }
        }
    }

    validateMove(target_x, target_y) {
        let valid = true;
        this.allShips.forEach((ship) => {
            if(target_x == ship.x && target_y == ship.y) {
                valid = false;
            }

            if(target_x >= this.map_width || target_y >= this.map_height ||
                target_x < 32 || target_y < 32) {
                valid = false;
            }
        });
        return valid;
    }

    moveActiveShip(targetSquare) {
        this.active_ship.x = targetSquare.x;
        this.active_ship.y = targetSquare.y;

        this.movementSquares.forEach((square) => {
            square.destroy();
        });
        this.movementSquares = [];

    }

    drawTargets(ship) {

    }
}