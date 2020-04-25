class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('player', './assets/mainCrab.png');
        this.load.image('beach', './assets/tile_background.png');
        this.load.image('clouds', './assets/clouds.png');
        this.load.image('Trash', './assets/trash.png');
        
    }

    create(){
        
        this.obstacleSpeed = -450;

        cursors = this.input.keyboard.createCursorKeys();

        this.beach = this.add.tileSprite(0, 0, 1200, 600, 'beach').setOrigin(0,0);
        this.clouds = this.add.tileSprite(0, 0, 1200, 600, 'clouds').setOrigin(0,0);

        crab = this.physics.add.sprite(50, centerY + 175, 'player').setOrigin(0.5);
        crab.setCollideWorldBounds(true);
        crab.setMaxVelocity(0, 200);
        crab.dead = false;

        this.obstacleGroup = this.add.group({
            runChildUpdate: true
        });
        this.addObstacle(); 
    } 
    
    addObstacle(){
        let obstacle = new Obstacle(this, this.obstacleSpeed);
        this.obstacleGroup.add(obstacle);
    } 

    update(){
        if (!crab.dead){
            if(cursors.left.isDown){
                crab.body.velocity.y -= playerVelocity;
            } else if(cursors.right.isDown){
                crab.body.velocity.y += playerVelocity;
            }

            this.physics.world.collide(crab, this.obstacleGroup, this.crabCollision, null, this);

        }
        this.clouds.tilePositionX += 1;
        this.beach.tilePositionX += 4;
    }

    crabCollision(){
        crab.dead = true;
        crab.destroy();

    }
}