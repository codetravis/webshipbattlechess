export class MainMenuScene extends Phaser.Scene {
    constructor () {
        super({ key: 'MainMenuScene' });
    }

    init () {

    }

    preload () {
        
    }

    create () {
        this.token = localStorage.getItem('token');
        this.startRaidText = this.add.text(200, 200, "New Game");
        this.startRaidText.setInteractive();
        this.startRaidText.on('pointerdown', () => {
            socket.emit('end_turn', { 'token': token });
            this.scene.start('GameScene');
        });
    }

    update () {
        socket.on('game', function(data) {
            localStorage.setItem('game_id', data['game_id']);
            this.scene.start('GameScene');
        });
    }
}

export default MainMenuScene