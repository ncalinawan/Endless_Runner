class Title extends Phaser.Scene{
    constructor(){
        super("titleScene");
    }

    preload(){
        this.load.image('title_screen', './assets/title_screen.png');
        this.load.audio('beachsound', './assets/beachSounds.wav');
        //"Ambience, Seaside Waves, Close, A.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org
        this.load.atlas('waves', './assets/title(1).png', './assets/waves.json');
        
    }

    create(){
        this.title = this.add.tileSprite(0,0,1200,600,'title').setOrigin(0,0);
        this.title = this.add.tileSprite(0,0,1200,600,'title_screen').setOrigin(0,0);
        
        //animation is still rough i'll  go fix it soon 
        //create animations using the json + png files and then have phaser generate frames for you -----------------------------
        this.anims.create({ 
            key: 'ocean', 
            frames: this.anims.generateFrameNames('waves', {
                prefix: 'title',
                start: 1,
                end: 6
            }),
            frameRate: 3, 
            repeat: -1
        });

        //you can type this command to check your frame names so everything loads in properly 
        console.log(this.anims.generateFrameNames('waves'));
        
        //you can add in the atlas sprite + play the animation in one go 
        this.add.sprite(600, 250, 'waves', 'title1').play('ocean');
        
        //-----------------------------------------------------------------------------------------------------------------------
        
        bgm = this.sound.add('beachsound', {
            mute: false,
            volume: 0.07,
            rate: 1,
            loop: true
        }); 
        bgm.play();
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
        
    }

    update(){

        if (Phaser.Input.Keyboard.JustDown(keyA)){
            this.scene.start("playScene");
           bgm.stop();
        }
        
        if (Phaser.Input.Keyboard.JustDown(keyT)){
            this.scene.start("tutorialScene");
           
            
        }
    }
}
