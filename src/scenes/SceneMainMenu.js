import Phaser from 'phaser';


class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMainMenu' });
  }

  preload() {
    this.load.image('logo', 'assets/logo2.png');
    this.load.image('cover', 'assets/coverkitty.png');
    this.load.image('BtnPlay', 'assets/BtnPlay.png');
    this.load.image('BtnPlayHover', 'assets/BtnPlayHover.png');
    this.load.image('BtnPlayDown', 'assets/BtnPlayDown.png');
  }

  create() {
    this.add.image(this.game.config.width * 0.5, 95, 'logo').setScale(0.8);
    this.add.image(240, 320, 'cover').setScale(0.25);

    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.75,
      'BtnPlay',
    );

    this.btnPlay2 = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.83,
      'BtnPlay',
    );

    this.btnPlay3 = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.91,
      'BtnPlay',
    );

    this.btnPlay.setScale(0.75);
    this.btnPlay2.setScale(0.75);
    this.btnPlay3.setScale(0.75);
    this.btnPlay.setInteractive();
    this.btnPlay2.setInteractive();
    this.btnPlay3.setInteractive();


    const pointOver = (button) => {
      button.on('pointerover', () => {
        button.setTexture('BtnPlayHover');
        // this.sfx.btnOver.play(); // play the button over sound
      }, this);
    };

    const pointOut = (button) => {
      button.on('pointerout', () => {
        button.setTexture('BtnPlay');
      });
    };

    const pointDown = (button) => {
      button.on('pointerdown', () => {
        button.setTexture('BtnPlayDown');
        // this.sfx.btnDown.play();
      }, this);
    };

    const pointUp = (button) => {
      button.on('pointerup', () => {
        button.setTexture('BtnPlay');
      }, this);
    };

    const goToScene = (button, scene) => {
      button.on('pointerup', () => {
        button.setTexture('BtnPlay');
        this.scene.start(scene);
      }, this);
    };

    pointOver(this.btnPlay);
    pointOver(this.btnPlay2);
    pointOver(this.btnPlay3);
    pointOut(this.btnPlay);
    pointOut(this.btnPlay2);
    pointOut(this.btnPlay3);
    pointDown(this.btnPlay);
    pointDown(this.btnPlay2);
    pointDown(this.btnPlay3);
    pointUp(this.btnPlay);
    pointUp(this.btnPlay2);
    pointUp(this.btnPlay3);
    goToScene(this.btnPlay, 'SceneMain');
    goToScene(this.btnPlay2, 'SceneAbout');
    goToScene(this.btnPlay3, 'SceneScores');


    this.title = this.add.text(this.game.config.width * 0.43, this.game.config.height * 0.73, 'PLAY', {
      fontFamily: 'roboto',
      fontSize: 25,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });

    this.title2 = this.add.text(this.game.config.width * 0.41, this.game.config.height * 0.81, 'ABOUT', {
      fontFamily: 'roboto',
      fontSize: 25,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });

    this.title3 = this.add.text(this.game.config.width * 0.41, this.game.config.height * 0.89, 'SCORES', {
      fontFamily: 'roboto',
      fontSize: 25,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
  }
}


export default SceneMainMenu;