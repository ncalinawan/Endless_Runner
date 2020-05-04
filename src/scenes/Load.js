class Load extends Phaser.Scene{
    constructor(){
        super("load");
    }

    preload(){
          

         //atlases
         this.load.atlas('waves', './assets/waves.png', './assets/waves.json');
         this.load.atlas('crabwalk', './assets/crabwalk.png', './assets/crabwalk.json');
         this.load.atlas('party', './assets/time_for_party_crab.png', './assets/party_crab.json');
         this.load.atlas('load','./assets/loading.png','./assets/loading.json');
         this.load.atlas('sparkle','./assets/sparkles.png','./assets/sparkles.json');
        
         //image files
         this.load.image('loading', './assets/loading_screen.png');   
        
         this.load.image('title_screen', './assets/title_screen.png');
                
         this.load.image('tutorial', './assets/tutorialscreen.png');
         this.load.image('tutorial2', './assets/tutorialscreen2.png');
         
         this.load.image('beach', './assets/tile_background.png');
         this.load.image('clouds', './assets/clouds.png');
         this.load.image('seaweed', './assets/seaweed.png');
         this.load.image('trash', './assets/trash.png');
         this.load.image('shells', './assets/shells.png');
         this.load.image('sc1', './assets/sand_castle.png');
         this.load.image('sc2', './assets/sand_castle_2.png');
         this.load.image('partyhat', './assets/party_hat.png');
         this.load.spritesheet('rave', './assets/rave_scrolling.png', {frameWidth: 1200, frameHeight: 600, startFrame: 0, endFrame: 3});
         this.load.image('gameover', './assets/game_over.png');
 
         
         
         //sound
         //"Ambience, Seaside Waves, Close, A.wav" by InspectorJ (www.jshaw.co.uk) on freesound.org
         this.load.audio('beachsound', './assets/beachSounds.wav');

         //"Caveman Bonk" (www.myinstants.com/instant/caveman-bonk-91720/) on myinstants.com
         this.load.audio('bonk','./assets/bonk.wav');

         /*
         "Carnival Cavalcade – Sunshine filled Reggae with deep bass guitar and rasping sax that brings the street party directly to wherever you are" by David-Gwyn Jones
         (www.zapsplat.com/music/carnival-cavalcade-sunshine-filled-reggae-with-deep-bass-guitar-and-rasping-sax-that-brings-the-street-party-directly-to-wherever-you-are/) of zapsplat.com
         */
         this.load.audio('beachMusic', './assets/beachMusic.wav');

         //"instant rave" by supervans (www.freesound.org/people/supervanz/sounds/434166/) on freesound.org
         this.load.audio('beachRave', './assets/beachRave.wav');

         //"Ambience, busy restaurant USA" by Audio Hero (www.zapsplat.com/music/ambience-busy-restaurant-usa/) on zapsplat.com
         this.load.audio('game_over', './assets/restaurant_gameover.wav');
    }

    create(){
        this.load = this.add.image(0,0, 'loading').setOrigin(0,0);
        
        this.anims.create({ 
            key: 'load', 
            frames: this.anims.generateFrameNames('load', {
                prefix: 'loading_',
                start: 1,
                end: 2
            }),
            frameRate: 3, 
            repeat: -1
        });

        this.add.sprite(590, 300, 'load', 'loading_1').play('load');

        this.sceneChange = this.time.delayedCall(5000, () => {
            this.scene.start("titleScene");
        }, null, this);
    }
}
