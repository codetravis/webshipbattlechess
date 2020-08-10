var game;

window.onload = function() {

    var config = {
        type: Phaser.AUTO,
        width: 1000,
        height: 1000,
        parent: 'game-div',
        scene: [SceneSetup, SceneMain, SceneVictory]
    };

    game = new Phaser.Game(config);
}