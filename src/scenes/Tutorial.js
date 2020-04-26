class Tutorial extends Phaser.Scene{
    constructor(){
        super("tutorialScene");
    }

    preload(){
        this.load.image('tutorial', './assets/tutorialscreen.png');
    }

    create(){
        this.tutorial = this.add.tileSprite(0,0,1200,600, 'tutorial').setOrigin(0,0);
        this.sceneChange = this.time.delayedCall(4000, () => {
            this.scene.start("playScene");
        }, null, this);
    }
}