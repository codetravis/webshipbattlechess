var game;

window.onload = function() {

    var config = {
        type: Phaser.AUTO,
        width: 950,
        height: 1000,
        parent: 'game-div',
        scene: [SceneStartMenu, SceneFleetStore, SceneMain, SceneVictory]
    };

    game = new Phaser.Game(config);
}