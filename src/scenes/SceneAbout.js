import Phaser from 'phaser';


class SceneAbout extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneAbout' });
  }

  preload() {
    this.load.image('Btnback', 'assets/btnBack.png');
    this.load.image('Btnbackhover', 'assets/btnBackHover.png');
    this.load.image('aboutTitle', 'assets/about.png');
    this.load.image('keys', 'assets/keys.png');
    this.load.image('spaceBar', 'assets/spaceBar.png');
  }

  create() {
    this.title = this.add.image(this.game.config.width * 0.5, 105, 'aboutTitle');
    this.keys = this.add.image(230, 340, 'keys');
    this.spacebar = this.add.image(230, 466, 'spaceBar');

    const settings = {
      fontFamily: 'Roboto Mono',
      fontSize: 20,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
      wordWrap: {
        width: this.game.config.width * 0.90,
        useAdvancedWrap: true,
      },
    };

    this.aboutText1 = this.add.text(this.game.config.width * 0.08, this.game.config.height * 0.25,
      'Cat Gun is a cat-lovers shooter game where you need to help Benito The Cat,  defeat some of his biggest enemies', settings);

    this.aboutText2 = this.add.text(this.game.config.width * 0.20, this.game.config.height * 0.42,
      'Enter to battle using the', settings);

    this.aboutText3 = this.add.text(this.game.config.width * 0.08, this.game.config.height * 0.6,
      'arrow keys for mobility and if you see a bad guy, use', settings);

    this.aboutText4 = this.add.text(this.game.config.width * 0.33, this.game.config.height * 0.79,
      'to shoot it!', settings);

    this.aboutText5 = this.add.text(this.game.config.width * 0.08, this.game.config.height * 0.86,
      'You have 7 lives, use them wisely, and have fun.', settings);


    this.BtnBack = this.add.sprite(
      this.game.config.width * 0.9,
      this.game.config.height * 0.08,
      'Btnback',
    );

    this.BtnBack.setInteractive();

    this.BtnBack.on('pointerover', () => {
      this.BtnBack.setTexture('Btnbackhover');
    }, this);

    this.BtnBack.on('pointerup', () => {
      this.scene.start('SceneMainMenu');
    });

    this.BtnBack.on('pointerout', () => {
      this.BtnBack.setTexture('Btnback');
    });
  }
}

export default SceneAbout;