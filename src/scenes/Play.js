class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('player', './assets/mainCrab.png');
    }

    create(){

        cursors = this.input.keyboard.createCursorKeys();

        crab = this.physics.add.sprite(50, centerY, 'player').setOrigin(0.5);
        crab.setCollideWorldBounds(true);
        crab.setMaxVelocity(0, 200);
        crab.dead = false;
    }

    update(){
        if (!crab.dead){
            if(cursors.up.isDown){
                crab.body.velocity.y -= playerVelocity;
            } else if(cursors.down.isDown){
                crab.body.velocity.y += playerVelocity;
            }

        }

    }
}