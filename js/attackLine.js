class AttackLine extends Phaser.GameObjects.Line {

    constructor(config) {
        let stroke_color = 0;
        if(config.attack_type === "laser") {
            stroke_color = 0x00ff00;
        } else if (config.attack_type === "ion") {
            stroke_color = 0xff00ff;
        } else if (config.attack_type === "blaster") {
            stroke_color = 0xff0000;
        } else if (config.attack_type === "turbolaser") {
            stroke_color = 0xffff00;
        }
        let offset = (config.offset) ? config.offset : 0;
        super(config.scene, 0, 0, config.attacker.x + offset, config.attacker.y + offset, config.target.x, config.target.y, stroke_color); 
        this.setOrigin(0, 0);
        config.scene.add.existing(this);
        this.lifespan = config.lifespan;
    }

    fade() {
        this.alpha = Math.max(0, this.alpha - .005);
        this.lifespan -= 1;
    }
}