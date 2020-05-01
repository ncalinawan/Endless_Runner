class Gameover extends Phaser.Scene{
    constructor(){
        super("gameover");
    }

    preload(){
        this.load.image('gameover', './assets/game_over.png');
    }

    create(){
        this.cameras.main.fadeIn(3000);
        this.gameover = this.add.tileSprite(0,0,1200,600, 'gameover').setOrigin(0,0);
        
        if(localStorage.getItem('hiscore') != null) {
            let storedScore = parseInt(localStorage.getItem('hiscore'));
            if(score > storedScore) {
                localStorage.setItem('hiscore', score.toString());
                highScore = score;
                newHighScore = true;
            } else {
                highScore = parseInt(localStorage.getItem('hiscore'));
                newHighScore = false;
            }
        } else {
            highScore = score;
            localStorage.setItem('hiscore', highScore.toString());
            newHighScore = true;
        }

        let scoreConfig = {
            fontFamily: 'Comic Sans MS',
            fontSize: '28px',
            backgroundColor: 'rgba(255,255,255,.4)',
            color: '#185F6A',
            align: 'center',
            padding: {
                top: 1,
                bottom: 1,
            },
            fixedWidth: 150
        }

        this.add.text(325, 387, highScore, scoreConfig ); 
        this.add.text(275, 457, score, scoreConfig );
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update(){
        if (Phaser.Input.Keyboard.JustDown(keyA)){
            this.cameras.main.fade(3000);
            this.sceneChange = this.time.delayedCall(3000, () => {
                this.scene.start("playScene");
            }, null, this);
        }

        if (Phaser.Input.Keyboard.JustDown(keyF)){
            this.cameras.main.fade(3000);
            this.sceneChange = this.time.delayedCall(3000, () => {
                this.scene.start("titleScene");
            }, null, this);
        }

    }


}