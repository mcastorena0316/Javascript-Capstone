import Phaser from 'phaser';


class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMainMenu' });
  }

  preload() {
    this.load.image('logo', 'assets/logo2.png');
    this.load.image('cover', 'assets/coverkitty.png');
    this.load.image('BtnPlay', 'assets/BtnPlay.png');
    this.load.image('sprBtnPlayHover', 'assets/sprBtnPlayHover.png');
    this.load.image('sprBtnPlayDown', 'assets/sprBtnPlayDown.png');
  }

  create() {
    this.add.image(this.game.config.width * 0.5, 95, 'logo').setScale(0.8);
    this.add.image(240, 320, 'cover').setScale(0.25);
    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.8,
      'BtnPlay',
    );

    this.btnPlay.setInteractive();


    // styling of the button (TO CHANGE)
    // this.btnPlay.on('pointerover', function () {
    //   this.btnPlay.setTexture('sprBtnPlayHover'); // set the button texture to sprBtnPlayHover
    //   // this.sfx.btnOver.play(); // play the button over sound
    // }, this);

    // this.btnPlay.on("pointerout", function() {
    // this.setTexture("sprBtnPlay");
    // });

    // this.btnPlay.on("pointerdown", function() {
    // this.btnPlay.setTexture("sprBtnPlayDown");
    // // this.sfx.btnDown.play();
    //   }, this);

    // this.btnPlay.on("pointerup", function() {
    //   this.setTexture("sprBtnPlay");
    // }, this);

    this.btnPlay.on('pointerup', () => {
      this.btnPlay.setTexture('sprBtnPlay');
      this.scene.start('SceneMain');
    }, this);


  }
}

export default SceneMainMenu;