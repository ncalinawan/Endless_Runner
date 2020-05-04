/* Title
Created by: Mai Ngyuen, Kiara Yupangco, and Noel Calinawan
Game Title: Crab Runner
Date Completed: May 3rd oops LOL

We included a mechanic that lets you multiply point gain by raving WOOOO! (optimal way is to stock up 2 party hats,
and right before it checks to see that your party hat count is full, use both party hats plus a third that you recently obtain
to get an 8x multiplier!) Our entire group struggled with how to use the JSON file, but we fought through it and figured it out
as a team :)

We borrowed music which is cited where it is loaded, but we created all the art for the game, to create a cool and fun aesthetic!
In addition, we want to make the assets stand out from the background (both the crab and the obstacles), so making them cartoonish
allows players to easily spot them. The entire aesthetics of this game is to make it look fun and colorful and entertaining to play (especially
the game over screen is pleasing to the eye! Yum.).

We added some sort of challenge to the game by making the crab's movement intentionally drift after pressing the up or down button. 
It's because it encourages players to think fast to move away from the obstacles while partying. This crab parties hard, so don't let them crash!
*/
let config = {
    type: Phaser.CANVAS,
    width: 1200,
    height: 600,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH
    },
    physics: {
        default: 'arcade',
        arcade:{
            x: 0,
            y: 330,
            width: 1200,
            height: 270,
        }
    },
    scene: [ Load, Title, Play, Tutorial, Gameover ]

}


let game = new Phaser.Game(config);

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
let bgm;
let raveMusic;

let obstacleSprites = ['seaweed', 'trash', 'shells', 'sc1', 'sc2'];
