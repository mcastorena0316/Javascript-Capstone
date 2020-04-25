import Phaser from 'phaser';
import Player from '../Entities/Player';

class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMain' });
  }


  preload() {
    this.load.image('cokecan', 'assets/benito.png');
    this.load.spritesheet('sprPlayer', 'assets/benito.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
  }

  create() {
    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer',
    );

    this.player.setScale(2);

    this.anims.create({
      key: 'left',
      frames: this.anims.generateFrameNumbers('sprPlayer', { start: 12, end: 15 }),
      frameRate: 10,
      repeat: -1,
    });

    this.anims.create({
      key: 'up',
      frames: this.anims.generateFrameNumbers('sprPlayer', { start: 8, end: 11 }),
      frameRate: 10,
      repeat: -1,
    });


    this.keySpace = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
  }

  update() {
    this.player.update();
    const cursors = this.input.keyboard.createCursorKeys();

    if (cursors.up.isDown) {
      this.player.moveUp();
      this.player.anims.play('up', true);
    } else if (cursors.down.isDown) {
      this.player.moveDown();
      this.player.anims.play('up', true);
    }

    if (cursors.left.isDown) {
      this.player.moveLeft();
      this.player.anims.play('left', true);
      this.player.flipX = false;
    } else if (cursors.right.isDown) {
      this.player.moveRight();
      this.player.anims.play('left', true);
      this.player.flipX = true;
    } else {

    }
  }
}

export default SceneMain;
