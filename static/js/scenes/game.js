export class GameScene extends Phaser.Scene {
    constructor () {
        super({ key: 'GameScene' });
    }

    init () {

    }

    preload () {
        this.game_id = localStorage.getItem('game_id');
        this.token = localStorage.getItem('token');
    }

    create () {
        this.endTurnText = this.add.text(50, 10, "End Turn");
        this.startRaidText.setInteractive();
        this.startRaidText.on('pointerdown', () => {
            socket.emit('end_turn', { 'token': token });
        });
    }

    update () {

    }
}

export default GameScene