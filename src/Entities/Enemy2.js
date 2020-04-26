import Phaser from 'phaser';
import Entity from './Entity';
import EnemyLaser from './EnemyLaser';


class SpiderGun extends Entity {
  constructor(scene, x, y) {
    super(scene, x, y, 'spryEnemy2', 'SpiderGun');
    this.body.velocity.y = Phaser.Math.Between(50, 100);
    this.shootTimer = this.scene.time.addEvent({
      delay: 1000,
      callback() {
        const laser = new EnemyLaser(
          this.scene,
          this.x,
          this.y,
        );
        laser.setScale(this.scaleX);
        this.scene.enemyLasers.add(laser);
      },
      callbackScope: this,
      loop: true,
    });
    this.play('spryEnemy2');
  }

  onDestroy() {
    if (this.shootTimer !== undefined) {
      if (this.shootTimer) {
        this.shootTimer.remove(false);
      }
    }
  }
}

export default SpiderGun;