class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    preload() {
        this.load.image("light_freighter", "images/light_freighter.svg");
        this.load.image("move_square", "images/movement_square.svg");
    }

    create() {
        this.active_ship = null;
        this.movementSquares = [];
        this.test_ship = new Ship({ scene: this, 
                                    x: 100, 
                                    y: 100,
                                    hull: "light_freighter", 
                                    team: 0, 
                                    facing: 0, 
                                    ship_id: 1});
        
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
                this.movementSquares.push(new MovementSquare({scene: this, x: plus_x, y: plus_y, key: "move_square"}));
                this.movementSquares.push(new MovementSquare({scene: this, x: minus_x, y: minus_y, key: "move_square"}));
                this.movementSquares.push(new MovementSquare({scene: this, x: plus_x, y: minus_y, key: "move_square"}));
                this.movementSquares.push(new MovementSquare({scene: this, x: minus_x, y: plus_y, key: "move_square"}));
            }
        }
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