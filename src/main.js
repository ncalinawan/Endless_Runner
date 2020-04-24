let config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 600,
   // scale: {
   //     autoCenter: Phaser.Scale.CENTER_BOTH
   // },
    physics: {
        default: 'arcade',
    },
    scene: [ Play ]
}

let game = new Phaser.Game(config);

let centerX = game.config.width/2;
let centerY = game.config.height/2;
let crab = null;
const playerWidth = 80;
const playerHeight = 43;
const playerVelocity = 40;
let cursors;