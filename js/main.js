var game;

window.onload = function() {

    var config = {
        type: Phaser.AUTO,
        width: 640,
        height: 860,
        parent: 'game-div',
        scene: [SceneMain, SceneSetup]
    };

    game = new Phaser.Game(config);
}