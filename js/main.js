var game;

window.onload = function() {

    var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 1000,
        parent: 'game-div',
        scene: [SceneSetup, SceneMain, SceneVictory]
    };

    game = new Phaser.Game(config);
}