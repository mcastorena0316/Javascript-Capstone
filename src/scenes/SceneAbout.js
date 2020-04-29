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
    this.keys = this.add.image(230, 352, 'keys');
    this.keys = this.add.image(230, 468, 'spaceBar');


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

    const aboutText = document.createElement('div');
    aboutText.className = 'about';
    aboutText.innerHTML = `
    <p>Cat Gun is a cat-lovers shooter game where you need to help Benito The Cat,  defeat some of his biggest enemies. </p>
    <p>Enter to battle using the</p>
    <p class="arrows">arrow keys for mobility and if you see a bad guy, use</p>
    <p>to shoot it!.</p>
    <p>You have 7 lives, use them wisely, and have fun.</p>`;

    this.add.dom(237, 300, aboutText);
  }
}

export default SceneAbout;