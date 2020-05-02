class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        this.load.image('player', './assets/mainCrab.png');
        this.load.image('beach', './assets/tile_background.png');
        this.load.image('clouds', './assets/clouds.png');
        this.load.image('seaweed', './assets/seaweed.png');
        this.load.image('trash', './assets/trash.png');
        this.load.image('shells', './assets/shells.png');
        this.load.image('sc1', './assets/sand_castle.png');
        this.load.image('sc2', './assets/sand_castle_2.png');
        this.load.image('partyhat', './assets/party_hat.png');
        this.load.spritesheet('rave', './assets/rave_scrolling.png', {frameWidth: 1200, frameHeight: 600, startFrame: 0, endFrame: 5});
        
    }

    create(){
        score = 0;
        time = 1;
        this.bgSpeed = 6;
        this.obstacleSpeed = -360;

        this.value = 1;

        this.party = 0;
        this.partyMax = 2;

        cursors = this.input.keyboard.createCursorKeys();

        this.beach = this.add.tileSprite(0, 0, 1200, 600, 'beach').setOrigin(0,0);
        this.clouds = this.add.tileSprite(0, 0, 1200, 600, 'clouds').setOrigin(0,0);
        
        this.anims.create({
            key: 'rave',
            frames: this.anims.generateFrameNumbers('rave', {start: 0, end: 5, first: 0}),
            frameRate: 3,
            repeat: 4
        });

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
        this.partyCount = this.add.text(35, 25, this.party, scoreConfig );

        this.partyHat = this.add.image(95, 40, 'partyhat');

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

        this.partyTime = this.time.addEvent({
            delay: 15000,
            callback: this.partyUp,
            callbackScope: this,
            loop: true
        })


        crab = this.physics.add.sprite(50, centerY + 175, 'player').setOrigin(0.5);
        crab.setCollideWorldBounds(true);
        crab.setMaxVelocity(0, 200);
        crab.setDepth(1);
        crab.dead = false;

        this.obstacleGroup = this.add.group({
            runChildUpdate: true
        });
        this.addObstacle(); 

        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyR = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.gameOver = false;
    } 
    
    
    update(){
        if (!crab.dead && this.gameOver == false){
            if(cursors.up.isDown){
                crab.body.velocity.y -= playerVelocity;
            } else if(cursors.down.isDown){
                crab.body.velocity.y += playerVelocity;
            }

            this.scoreBoard.text = score;
            this.partyCount.text = "x " + this.party;
            this.physics.world.collide(crab, this.obstacleGroup, this.crabCollision, null, this);
            
            this.clouds.tilePositionX -= this.obstacleSpeed/104;
            this.beach.tilePositionX += this.bgSpeed;
            console.log(this.value);
            if(Phaser.Input.Keyboard.JustDown(keyR)){
                if(this.party != 0){
                    this.party -= 1;
                    this.value = this.value * 2;
                    this.valueChange = this.time.delayedCall(10000, () => {
                        this.valueReset();
                    }, null, this);
                    this.raveScreen();
                }
            }

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
        score += this.value;
        }
    }

    partyUp(){
        if(this.gameOver == false){
            if(this.party != this.partyMax){
                this.party += 1;
            }
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

    valueReset(){
        if (this.gameOver == false){
            this.value = 1;
        }
    }

    raveScreen(){
        let rave = this.add.sprite(0, 0, 'rave').setOrigin(0,0);
        rave.anims.play('rave');
        rave.on('animationcomplete', () =>{
            rave.destroy();
        })
    }

}