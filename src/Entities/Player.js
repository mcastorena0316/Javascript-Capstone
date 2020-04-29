import Phaser from 'phaser';
import Entity from './Entity';
import PlayerLaser from './PlayerLaser';
import setScoreToStore from '../localStorage';

class Player extends Entity {
  constructor(scene, x, y, key) {
    super(scene, x, y, key, 'Player', 7);
    this.setData('speed', 200);
    this.setData('score', 0);
    this.setData('isShooting', false);
    this.setData('timerShootDelay', 10);
    this.setData('timerShootTick', this.getData('timerShootDelay') - 1);
  }

  moveUp() {
    this.body.velocity.y = -this.getData('speed');
  }

  moveDown() {
    this.body.velocity.y = this.getData('speed');
  }

  moveLeft() {
    this.body.velocity.x = -this.getData('speed');
  }

  moveRight() {
    this.body.velocity.x = this.getData('speed');
  }

  updateLifes() {
    this.setData('health', this.getData('health') - 1);
    this.scene.sfx.attacked.play();
  }

  updateScore(enemy) {
    if (enemy.getData('type') === 'HumanChaser') {
      this.setData('score', this.getData('score') + 15);
    } else if (enemy.getData('type') === 'DogGun') {
      this.setData('score', this.getData('score') + 10);
    } else {
      this.setData('score', this.getData('score') + 5);
    }
  }

  updateScoretoLocal() {
    setScoreToStore(this.getData('score'));
  }


  update() {
    this.body.setVelocity(0, 0);

    this.x = Phaser.Math.Clamp(this.x, 0, this.scene.game.config.width);
    this.y = Phaser.Math.Clamp(this.y, 0, this.scene.game.config.height);

    if (this.getData('isShooting')) {
      if (this.getData('timerShootTick') < this.getData('timerShootDelay')) {
        this.setData('timerShootTick', this.getData('timerShootTick') + 1);
        const laser = new PlayerLaser(this.scene, this.x, this.y);
        laser.setScale(1.5);
        this.scene.playerLasers.add(laser);
        this.scene.sfx.laser.play({
          volume: 0.8,
        });
        this.setData('timerShootTick', 0);
      }
    }
  }

  onDestroy() {
    this.scene.time.addEvent({
      delay: 1000,
      callback() {
        this.scene.scene.start('SceneGameOver');
      },
      callbackScope: this,
      loop: false,
    });
  }
}

export default Player;
