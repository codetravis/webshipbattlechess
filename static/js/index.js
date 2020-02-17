import Phaser from "phaser";
import { GameScene } from "./scenes/game";
import { MainMenuScene } from "./scenes/main-menu-scene";

var socket = io('http://127.0.0.1:5000');

$('document').ready(function() {
    var token = localStorage.getItem('token');
    
    socket.on('connect', function(){
    });
    socket.on('game', function(data){
        console.log(data);
    });
    socket.on('disconnect', function(){
    });
    
    $("#new_game").on('click', function() {
        console.log("new game button clicked");
        socket.emit('new_game', { 'token': token });
    });
});

const config = {
    type: Phaser.AUTO,
    parent: "phaser-example",
    width: 800,
    height: 600,
    physics: {
      default: 'arcade',
      arcade: {
        gravity: { y: 0 },
        debug: true
      }
    },
    scene: [MainMenuScene, GameScene]
  };

const game = new Phaser.Game(config);
