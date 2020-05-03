class Play extends Phaser.Scene {
    constructor(){
        super("playScene");
    }

    preload(){
        //atlases
        this.load.atlas('crabwalk', './assets/crabwalk.png', './assets/crabwalk.json');
        this.load.atlas('party', './assets/time_for_party_crab.png', './assets/party_crab.json');

        //sound
        this.load.audio('bonk','./assets/bonk.wav');
        this.load.audio('beachMusic', './assets/beachMusic.wav');
        this.load.audio('beachRave', './assets/beachRave.wav');

        //image files
        this.load.image('player', './assets/mainCrab.png');
        this.load.image('beach', './assets/tile_background.png');
        this.load.image('clouds', './assets/clouds.png');
        this.load.image('seaweed', './assets/seaweed.png');
        this.load.image('trash', './assets/trash.png');
        this.load.image('shells', './assets/shells.png');
        this.load.image('sc1', './assets/sand_castle.png');
        this.load.image('sc2', './assets/sand_castle_2.png');
        this.load.image('partyhat', './assets/party_hat.png');
        this.load.spritesheet('rave', './assets/rave_scrolling.png', {frameWidth: 1200, frameHeight: 600, startFrame: 0, endFrame: 3});
        
    }

    create(){
        score = 0;
        time = 1;
        this.bgSpeed = 6;
        this.obstacleSpeed = -360;
        this.bgSpeedMax = 16;
        this.obstacleSpeedMax = -960;

        this.value = 1; //Score multiplier

        //count for party hats
        this.party = 0;
        this.partyMax = 2;
        this.ravePlaying = 0;
        
        cursors = this.input.keyboard.createCursorKeys();

        //tilesprites
        this.beach = this.add.tileSprite(0, 0, 1200, 600, 'beach').setOrigin(0,0);
        this.clouds = this.add.tileSprite(0, 0, 1200, 600, 'clouds').setOrigin(0,0);

        //audio ----------------------------------------------------------------------------------------------------------------------------
        bgm = this.sound.add('beachMusic', {
            mute: false,
            volume: 0.07,
            rate: 1,
            loop: true
        }); 
        bgm.play();
        
        raveMusic = this.sound.add('beachRave', {
            mute: false,
            volume: 0.07,
            rate: 1,
            loop: true
        }); 

        //animations ---------------------------------------------------------------------------------------------------------------------------
        this.anims.create({
            key: 'rave',
            frames: this.anims.generateFrameNumbers('rave', {start: 0, end: 3, first: 0}),
            frameRate: 2,
            repeat: 4
        });

        this.anims.create({ 
            key: 'walk', 
            frames: this.anims.generateFrameNames('crabwalk', {
                prefix: 'crab',
                start: 1,
                end: 2
            }),
            frameRate: 5, 
            repeat: -1
        });
        
        this.anims.create({ 
            key: 'party', 
            frames: this.anims.generateFrameNames('party', {
                prefix: 'party_crab',
                start: 1,
                end: 2
            }),
            frameRate: 5, 
            repeat: -1
        });

        //console.log(this.anims.generateFrameNames('party'));

        //score text
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

        //display how many party hats available
        this.partyCount = this.add.text(35, 25, this.party, scoreConfig );
        this.partyHat = this.add.image(95, 40, 'partyhat');

        //adds points every second
        this.scoreUp = this.time.addEvent({
            delay: 1000,
            callback: this.scoreAdd,
            callbackScope: this,
            loop: true
        })

        //tracks time
        this.timeUp = this.time.addEvent({
            delay: 1000,
            callback: this.timeAdd,
            callbackScope: this,
            loop: true
        })

        //speeds up obstacles
        this.speedUp = this.time.addEvent({
            delay: 10,
            callback: this.speedIncrease,
            callbackScope: this,
            loop: true
        })

        //speeds up background
        this.bgUp = this.time.addEvent({
            delay: 10000,
            callback: this.bgSpeedIncrease,
            callbackScope: this,
            loop: true
        })

        //after 30 seconds, player gains more speed control
        this.playerUp = this.time.addEvent({
            delay: 30000,
            callback: this.playerIncrease,
            callbackScope: this,
            loop: false
        })

        //gives party hat every 15 seconds
        this.partyTime = this.time.addEvent({
            delay: 15000,
            callback: this.partyUp,
            callbackScope: this,
            loop: true
        })


        //crabs
        crab = this.physics.add.sprite(50, centerY + 175, 'crabwalk','crab1').setScale(0.2).play('walk');
        crab.setCollideWorldBounds(true);
        crab.setMaxVelocity(0, 200);
        crab.setDepth(1);
        crab.dead = false;

        //obstacles
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
            
            //move up and down
            if(cursors.up.isDown){
                crab.body.velocity.y -= playerVelocity;
            } else if(cursors.down.isDown){
                crab.body.velocity.y += playerVelocity;
            }
            
            //updates text on screen
            this.scoreBoard.text = score;
            this.partyCount.text = "x " + this.party;
            
            //collisions
            this.physics.world.collide(crab, this.obstacleGroup, this.crabCollision, null, this);
            
            //setting up parallax
            this.clouds.tilePositionX -= this.obstacleSpeed/104;
            this.beach.tilePositionX += this.bgSpeed;
            console.log(this.value);

            //rave implementation
            if(Phaser.Input.Keyboard.JustDown(keyR)){
                if(this.party != 0){
                    this.party -= 1;
                    if(this.value < 2){
                        this.valueChange = this.time.delayedCall(10000, () => {
                            this.valueReset();
                        }, null, this);
                }
                    this.value = this.value * 2;
                    this.raveScreen();
                }
            }
        
            //gameover
        }else if(crab.dead == true && this.gameOver == true){
            bgm.stop();
            raveMusic.stop();
            this.cameras.main.fade(3000);
            this.sceneChange = this.time.delayedCall(3000, () => {
                this.scene.start("gameover");
            }, null, this);
        }

        //restarts game
        if (Phaser.Input.Keyboard.JustDown(keyA)){
            bgm.stop();
            raveMusic.stop();
            this.scene.start("playScene");
        }
        
    }

    crabCollision(){
        crab.dead = true;
        this.sound.play('bonk');
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
               if(this.obstacleSpeed >= this.obstacleSpeedMax){
                this.obstacleSpeed -=2;
                }
            }
 
        }
    }

    bgSpeedIncrease(){
        if (this.gameOver == false){
            if(this.bgSpeed <= this.bgSpeedMax){
            this.bgSpeed += 2;
            }
        }
    }

    playerIncrease(){
        if (this.gameOver == false){
            crab.setMaxVelocity(0,400);
        }
    }

    valueReset(){
        if (this.gameOver == false){
            this.value = 1;
        }
    }

    raveScreen(){
        if (this.ravePlaying == 0){
        let rave = this.add.sprite(0, 0, 'rave').setOrigin(0,0);
        rave.anims.play('rave');
       
        crab.destroy(); 
        crab = this.physics.add.sprite(crab.x, crab.y, 'party','party_crab1').setScale(0.2).play('party');
        crab.setCollideWorldBounds(true);
        crab.setMaxVelocity(0, 200);
        crab.setDepth(1);
        crab.dead = false;
        bgm.pause();
        
        if (this.ravePlaying == 0){
        raveMusic.play();
        this.ravePlaying = 1;
        }

        rave.on('animationcomplete', () =>{
            rave.destroy();
            crab.destroy();
            crab = this.physics.add.sprite(crab.x, crab.y, 'crabwalk','crab1').setScale(0.2).play('walk');
            crab.setCollideWorldBounds(true);
            crab.setMaxVelocity(0, 200);
            crab.setDepth(1);
            crab.dead = false;
            bgm.resume();
            this.ravePlaying = 0;
            raveMusic.stop();

        })
        }
    }

}
