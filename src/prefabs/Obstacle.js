class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity){

        super(scene, game.config.width + crabWidth, Phaser.Math.Between(crabHeight/2, game.config.height - crabHeight/2), 'Trash');
    }
}