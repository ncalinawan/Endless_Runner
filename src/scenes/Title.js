class Title extends Phaser.Scene{
    constructor(){
        super("titleScene");
    }

    preload(){
        this.load.image('title', './assets/titlescreen.png');
    }

    create(){
        this.title = this.add.tileSprite(0,0,1200,600,'title').setOrigin(0,0);
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.T);
    }

    update(){

        if (Phaser.Input.Keyboard.JustDown(keyA)){
            this.scene.start("playScene");
        }
        
        if (Phaser.Input.Keyboard.JustDown(keyT)){
            this.scene.start("tutorialScene");
        }
    }
}