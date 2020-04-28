import Phaser from 'phaser';


class SceneAbout extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneAbout' });
  }

  preload() {
    this.load.image('Btnbackhover', 'assets/btnBack.png');
    this.load.image('Btnback', 'assets/btnBackHover.png');
    this.load.image('aboutTitle', 'assets/about.png');
  }

  create() {
    this.title = this.add.image(this.game.config.width * 0.5, 120, 'aboutTitle');

    this.BtnBack = this.add.sprite(
      this.game.config.width * 0.9,
      this.game.config.height * 0.08,
      'Btnback',
    );

    this.BtnBack.setInteractive();

    this.BtnBack.on('pointerover', () => {
      this.BtnBack.setTexture('Btnbackhover');
      // this.sfx.btnOver.play(); // play the button over sound
    }, this);

    this.BtnBack.on('pointerup', () => {
      // this.btnBack.setTexture('BtnPlay');
      this.scene.start('SceneMainMenu');
    });

    this.BtnBack.on('pointerout', () => {
      this.BtnBack.setTexture('Btnback');
    });
  }
}

export default SceneAbout;