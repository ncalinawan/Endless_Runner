
/*
Communicate how to play w/ clear instructions (5) (Explain what Rave mechanic does in tutorial)
Include an animated character(s) that use a texture atlas (5)
Have looping background music (5)
Use sound effects for key mechanics, UI, and/or significant events according to your design (5)
Include some metric of accomplishment that a player can improve over time, e.g., score (5)
Be theoretically endless (5)
Be playable for at least 15 seconds for a new player of low to moderate skill (5)
*/
let config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 600,
   // scale: {
   //     autoCenter: Phaser.Scale.CENTER_BOTH
   // },
    physics: {
        default: 'arcade',
        arcade:{
            x: 0,
            y: 330,
            width: 1200,
            height: 270,
        }
    },
    scene: [ Title, Play, Tutorial, Gameover ]

}


let game = new Phaser.Game(config);

//game.settings = {
//    obstacleSpeed: 3
//}

let centerX = game.config.width/2;
let centerY = game.config.height/2;
let crab = null;
const playerWidth = 80;
const playerHeight = 50;
const playerVelocity = 40;
let cursors;
let keyA, keyT, keyF, keyR;
let time;
let score;
let highScore;
let newHighScore = false;