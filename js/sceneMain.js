class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }

    preload() {
    	this.load.image("light_freighter", "images/light_freighter.svg");
    }

    create() {
        this.active_ship = null;
        this.test_ship = new Ship({ scene: this, 
                                    x: 100, 
                                    y: 100,
                                    hull: "light_freighter", 
                                    team: 0, 
                                    facing: 0, 
                                    ship_id: 1});
        
        this.emitter = EventDispatcher.getInstance();
        this.emitter.on("SHIP_CLICKED", this.setActiveShip.bind(this));
    }

    update() {

    }

    setActiveShip(ship) {
        console.log(ship.ship_id + " " + ship.x + " " + ship.y);
        this.active_ship = ship;
    }
}