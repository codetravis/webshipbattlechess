class Turret extends Phaser.GameObjects.Sprite {
    constructor(config) {
        super(config.scene, config.x, config.y, config.key);

        let turretStats = new TurretStats();
        this.values = turretStats.getBaseTurretStats(config.key);

    }

    saveableObject() {
        return this.values;
    }
}