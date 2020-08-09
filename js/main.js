var game;

window.onload = function() {

    var config = {
        type: Phaser.AUTO,
        width: 640,
        height: 860,
        parent: 'game-div',
        scene: [SceneSetup, SceneMain, SceneVictory]
    };

    game = new Phaser.Game(config);
}