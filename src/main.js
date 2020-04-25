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
    scene: [ Title, Play, Tutorial ]

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
let level;
let highScore;
let newHighScore = false;