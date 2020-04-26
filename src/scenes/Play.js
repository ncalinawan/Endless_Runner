class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('player', './assets/mainCrab.png');
        this.load.image('beach', './assets/tile_background.png');
        this.load.image('clouds', './assets/clouds.png');
        this.load.image('seaweed', './assets/seaweed.png');
        
    }

    create(){
        score = 1;
        time = 1;
        this.bgSpeed = 6;
        this.obstacleSpeed = -360;

        cursors = this.input.keyboard.createCursorKeys();

        this.beach = this.add.tileSprite(0, 0, 1200, 600, 'beach').setOrigin(0,0);
        this.clouds = this.add.tileSprite(0, 0, 1200, 600, 'clouds').setOrigin(0,0);

        let scoreConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            backgroundColor: 'rgba(255,255,255,.4)',
            color: '#000000',
            align: 'right',
            padding: {
                top: 1,
                bottom: 1,
            },
            fixedWidth: 150
        }
        this.scoreBoard = this.add.text(1000, 25, score, scoreConfig );

        this.scoreUp = this.time.addEvent({
            delay: 1000,
            callback: this.scoreAdd,
            callbackScope: this,
            loop: true
        })

        this.timeUp = this.time.addEvent({
            delay: 1000,
            callback: this.timeAdd,
            callbackScope: this,
            loop: true
        })

        this.speedUp = this.time.addEvent({
            delay: 10,
            callback: this.speedIncrease,
            callbackScope: this,
            loop: true
        })

        this.bgUp = this.time.addEvent({
            delay: 10000,
            callback: this.bgSpeedIncrease,
            callbackScope: this,
            loop: true
        })


        crab = this.physics.add.sprite(50, centerY + 175, 'player').setOrigin(0.5);
        crab.setCollideWorldBounds(true);
        crab.setMaxVelocity(0, 200);
        crab.dead = false;

        this.obstacleGroup = this.add.group({
            runChildUpdate: true
        });
        this.addObstacle(); 

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        this.gameOver = false;
    } 
    
    
    update(){
        if (!crab.dead && this.gameOver == false){
            if(cursors.left.isDown){
                crab.body.velocity.y -= playerVelocity;
            } else if(cursors.right.isDown){
                crab.body.velocity.y += playerVelocity;
            }

            this.scoreBoard.text = score;
            this.physics.world.collide(crab, this.obstacleGroup, this.crabCollision, null, this);
            
            this.clouds.tilePositionX -= this.obstacleSpeed/104;
            this.beach.tilePositionX += this.bgSpeed;
        }else if(crab.dead == true && this.gameOver == true){
            this.cameras.main.fade(3000);
            this.sceneChange = this.time.delayedCall(3000, () => {
                this.scene.start("gameover");
            }, null, this);
        }

        if (Phaser.Input.Keyboard.JustDown(keyA)){
            this.scene.start("playScene");
        }
        
    }

    crabCollision(){
        crab.dead = true;
        crab.destroy();
        this.gameOver = true;
        this.obstacleSpeed -= this.obstacleSpeed;
    }

    addObstacle(){
        let obstacle = new Obstacle(this, this.obstacleSpeed);
        this.obstacleGroup.add(obstacle);
    } 

    timeAdd(){
        if(this.gameOver ==false){
        time += 1;
        }
    }
    scoreAdd(){
        if(this.gameOver == false){
        score += 1;
        }
    }

    speedIncrease(){
        if (this.gameOver == false){
            if(time % 10 == 0) {
                this.obstacleSpeed -=2;
            }
        }
    }

    bgSpeedIncrease(){
        if (this.gameOver == false){
            this.bgSpeed += 2;
        }
    }

}