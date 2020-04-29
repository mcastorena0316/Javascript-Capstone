import Phaser from 'phaser';
import Player from '../Entities/Player';
import DogGun from '../Entities/Enemy0';
import HumanChaser from '../Entities/Enemy1';
import SpiderGun from '../Entities/Enemy2';

class SceneMain extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMain' });
  }


  preload() {
    this.load.image('sprBg0', 'assets/bg1.jpg');
    this.load.image('sprBg1', 'assets/bg3.jpg');
    this.load.image('sprLaserPlayer', 'assets/sprLaserPlayer.png');
    this.load.image('sprLaserEnemy0', 'assets/sprLaserEnemy0.png');
    this.load.image('sprLifes', 'assets/lifes.png');
    this.load.spritesheet('sprPlayer', 'assets/benito.png', {
      frameWidth: 32,
      frameHeight: 32,
    });
    this.load.spritesheet('sprEnemy0', 'assets/dog4.png', {
      frameWidth: 50,
      frameHeight: 67.5,

    });
    this.load.spritesheet('sprEnemy1', 'assets/human.png', {
      frameWidth: 50,
      frameHeight: 50,
    });
    this.load.spritesheet('sprEnemy2', 'assets/cobras.png', {
      frameWidth: 48,
      frameHeight: 48,
    });
    this.load.spritesheet('sprExplosion', 'assets/explosion.png', {
      frameWidth: 111,
      frameHeight: 109,
    });
    this.load.audio('loseLife', 'assets/benitohit2.wav');
    this.load.audio('sndExplode0', 'assets/sndExplode0.wav');
    this.load.audio('sndExplode1', 'assets/sndExplode1.ogg');
    this.load.audio('gameMusic', 'assets/gameMusic1.mp3');
    this.load.audio('sndLaser', 'assets/sndLaser.wav');
    this.load.audio('humanVoice', 'assets/humanvoice.wav');
  }

  create() {
    this.gamemusic = this.sound.add('gameMusic', { volume: 0.5 });
    this.gamemusic.play();
    this.add.image(240, 320, 'sprBg0');

    this.player = new Player(
      this,
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprPlayer',
    );

    this.lifes = this.add.image(20, 20, 'sprLifes').setScale(1.6);
    this.title2 = this.add.text(40, 15, `X ${this.player.getData('health')}`, {
      fontFamily: 'monospace',
      fontSize: 20,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.yourScore = this.add.text(40, 600, 'Score: 0', {
      fontFamily: 'monospace',
      fontSize: 20,
      fontStyle: 'bold',
      color: '#ffffff',
    });

    this.player.setScale(2);

    this.anims.create({
      key: 'sprEnemy0',
      frames: this.anims.generateFrameNumbers('sprEnemy0', { start: 3, end: 5 }),
      frameRate: 8,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy1',
      frames: this.anims.generateFrameNumbers('sprEnemy1', { start: 12, end: 15 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprEnemy2',
      frames: this.anims.generateFrameNumbers('sprEnemy2', { start: 0, end: 2 }),
      frameRate: 6,
      repeat: -1,
    });

    this.anims.create({
      key: 'sprExplosion',
      frames: this.anims.generateFrameNumbers('sprExplosion', { start: 0, end: 8 }),
      frameRate: 10,
      repeat: 0,
    });

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

    this.sfx = {
      explosions: [
        this.sound.add('sndExplode0', { volume: 0.3 }),
        this.sound.add('sndExplode1', { volume: 0.4 }),
      ],
      attacked: this.sound.add('loseLife', { volume: 2 }),
      laser: this.sound.add('sndLaser'),
      human: this.sound.add('humanVoice', { volume: 0.5 }),
    };


    this.enemies = this.add.group();
    this.enemyLasers = this.add.group();
    this.playerLasers = this.add.group();

    this.time.addEvent({
      delay: 1000,
      callback() {
        let enemy = null;

        if (Phaser.Math.Between(0, 10) >= 3) {
          enemy = new DogGun(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        } else if (Phaser.Math.Between(0, 10) >= 5) {
          if (this.getEnemiesByType('HumanChaser').length < 5) {
            enemy = new HumanChaser(
              this,
              Phaser.Math.Between(0, this.game.config.width),
              0,
            );
          }
        } else {
          enemy = new SpiderGun(
            this,
            Phaser.Math.Between(0, this.game.config.width),
            0,
          );
        }

        if (enemy !== null) {
          enemy.setScale(Phaser.Math.Between(10, 13) * 0.1);
          this.enemies.add(enemy);
        }
      },
      callbackScope: this,
      loop: true,
    });

    this.physics.add.collider(this.playerLasers, this.enemies, (playerLaser, enemy) => {
      if (enemy) {
        if (enemy.onDestroy !== undefined) {
          enemy.onDestroy();
        }
        enemy.explode(true);
        enemy.body = null;
        playerLaser.destroy();
        this.player.updateScore(enemy);
        this.yourScore.setText(`Score: ${this.player.getData('score')}`);
      }
    });

    this.physics.add.overlap(this.player, this.enemies, (player, enemy) => {
      if (!player.getData('isDead')
          && !enemy.getData('isDead')) {
        if (player.getData('health') > 0) {
          enemy.explode(true);
          player.updateLifes();
          this.title2.setText(`X ${this.player.getData('health')}`);
        } else {
          player.explode(false);
          player.onDestroy();
          enemy.explode(true);
          player.updateScoretoLocal(this.player.getData('score'));
          this.gamemusic.destroy();
        }
      }
    });

    this.physics.add.overlap(this.player, this.enemyLasers, (player, laser) => {
      if (!player.getData('isDead')
          && !laser.getData('isDead')) {
        if (player.getData('health') > 0) {
          player.updateLifes();
          laser.destroy();
          this.title2.setText(`X ${this.player.getData('health')}`);
        } else {
          player.explode(false);
          player.onDestroy();
          laser.destroy();
          player.updateScoretoLocal(this.player.getData('score'));
          this.gamemusic.destroy();
        }
      }
    });
  }

  getEnemiesByType(type) {
    const arr = [];
    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      if (enemy.getData('type') === type) {
        arr.push(enemy);
      }
    }
    return arr;
  }


  update() {
    if (!this.player.getData('isDead')) {
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
      }

      if (cursors.space.isDown) {
        this.player.setData('isShooting', true);
        this.player.anims.play('up', true);
      } else {
        this.player.setData('timerShootTick', this.player.getData('timerShootDelay') - 1);
        this.player.setData('isShooting', false);
      }
    }

    for (let i = 0; i < this.enemies.getChildren().length; i += 1) {
      const enemy = this.enemies.getChildren()[i];
      enemy.update();
      if (enemy.x < -enemy.displayWidth
        || enemy.x > this.game.config.width + enemy.displayWidth
        || enemy.y < -enemy.displayHeight * 4
        || enemy.y > this.game.config.height + enemy.displayHeight) {
        if (enemy) {
          if (enemy.onDestroy !== undefined) {
            enemy.onDestroy();
          }
          enemy.destroy();
        }
      }
    }

    for (let i = 0; i < this.enemyLasers.getChildren().length; i += 1) {
      const laser = this.enemyLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }


    for (let i = 0; i < this.playerLasers.getChildren().length; i += 1) {
      const laser = this.playerLasers.getChildren()[i];
      laser.update();

      if (laser.x < -laser.displayWidth
        || laser.x > this.game.config.width + laser.displayWidth
        || laser.y < -laser.displayHeight * 4
        || laser.y > this.game.config.height + laser.displayHeight) {
        if (laser) {
          laser.destroy();
        }
      }
    }
  }
}
export default SceneMain;
