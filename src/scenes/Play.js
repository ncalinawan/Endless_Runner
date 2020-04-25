class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('player', './assets/mainCrab.png');
        this.load.image('beach', './assets/tile_background.png');
        this.load.image('clouds', './assets/clouds.png');
    }

    create(){
        cursors = this.input.keyboard.createCursorKeys();

        this.beach = this.add.tileSprite(0, 0, 1200, 600, 'beach').setOrigin(0,0);
        this.clouds = this.add.tileSprite(0, 0, 1200, 600, 'clouds').setOrigin(0,0);

        crab = this.physics.add.sprite(50, centerY + 175, 'player').setOrigin(0.5);
        crab.setCollideWorldBounds(true);
        crab.setMaxVelocity(0, 200);
        crab.dead = false;
    }

    update(){
        if (!crab.dead){
            if(cursors.left.isDown){
                crab.body.velocity.y -= playerVelocity;
            } else if(cursors.right.isDown){
                crab.body.velocity.y += playerVelocity;
            }

        }

        this.clouds.tilePositionX += 1;
        this.beach.tilePositionX += 4;
    }
}