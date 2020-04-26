import Phaser from 'phaser';


class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMainMenu' });
  }

  preload() {
    this.load.image('sprBtnPlay', 'assets/sprBtnPlay.png');
    this.load.image('sprBtnPlayHover', 'assets/sprBtnPlayHover.png');
    this.load.image('sprBtnPlayDown', 'assets/sprBtnPlayDown.png');
  }

  create() {
    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.5,
      'sprBtnPlay',
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

    this.title = this.add.text(this.game.config.width * 0.5, 128, 'BATTLE OF KITTIES', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
    this.title.setOrigin(0.5);
  }
}

export default SceneMainMenu;