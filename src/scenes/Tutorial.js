class Tutorial extends Phaser.Scene{
    constructor(){
        super("tutorialScene");
    }

    create(){
        this.tutorial = this.add.tileSprite(0,0,1200,600, 'tutorial').setOrigin(0,0);
        this.screenChange = this.time.delayedCall(4000, () => {
            this.tutorial2 = this.add.tileSprite(0,0,1200,600, 'tutorial2').setOrigin(0,0);
        }, null, this);

        this.bgmChange = this.time.delayedCall(10000, () => {
            bgm.stop();
        }, null, this);

        this.sceneChange = this.time.delayedCall(10000, () => {
            this.scene.start("playScene");
        }, null, this);
    }
}
