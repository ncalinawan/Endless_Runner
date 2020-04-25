class Obstacle extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, velocity){
        super(scene, game.config.width + playerWidth, Phaser.Math.Between(350, 590), 'Trash');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setVelocityX(velocity);
        this.setImmovable();
        this.newObstacle = true;

        this.scene = scene;
        this.velocity = velocity;
    }

    update() {
        super.update();

        if(this.newObstacle && this.x < centerX){
            this.newObstacle = false;

            this.scene.addObstacle(this.parent, this.velocity);
        }

        if(this.x < -this.width){
            this.destroy();
        }
    }
}