class Title extends Phaser.Scene{
    constructor(){
        super("titleScene");
    }

    preload(){
        this.load.image('title', './assets/titlescreen.png');
        this.load.audio('beachsound', './assets/beachSounds.wav');
        //"Ambience, Seaside Waves, Close, A.wav" by InspectorJ (www.jshaw.co.uk) of Freesound.org
    }

    create(){
        this.title = this.add.tileSprite(0,0,1200,600,'title').setOrigin(0,0);
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