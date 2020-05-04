class Gameover extends Phaser.Scene{
    constructor(){
        super("gameover");
    }

    create(){
        this.cameras.main.fadeIn(3000);
        this.gameover = this.add.tileSprite(0,0,1200,600, 'gameover').setOrigin(0,0);
        
        //sparkle animation || big thanks to my roommate for helping me animate :^D
        this.anims.create({                      
            key: 'sparkle', 
            frames: this.anims.generateFrameNames('sparkle', {
                prefix: 'sparkle_',
                start: 1,
                end: 2
                }),
                frameRate: 5, 
                repeat: -1
            });
        
        this.add.sprite(600, 250, 'sparkles', 'sparkle_1').play('sparkle');
        
        //highscore tracker by the legendary Nathan Altice :)
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

        bgm = this.sound.add('game_over', {
            mute: false,
            volume: 0.07,
            rate: 1,
            loop: true
        }); 
        bgm.play();

        this.add.text(325, 387, highScore, scoreConfig ); 
        this.add.text(275, 457, score, scoreConfig );
        keyA = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.A);
        keyF = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);
    }

    update(){
        //play again
        if (Phaser.Input.Keyboard.JustDown(keyA)){
            this.cameras.main.fade(3000);
            this.sceneChange = this.time.delayedCall(3000, () => {
                this.scene.start("playScene");
            }, null, this);
            bgm.stop();
        }

        //back to title screen
        if (Phaser.Input.Keyboard.JustDown(keyF)){
            this.cameras.main.fade(3000);
            this.sceneChange = this.time.delayedCall(3000, () => {
                this.scene.start("titleScene");
            }, null, this);
            bgm.stop();
        }

    }


}
