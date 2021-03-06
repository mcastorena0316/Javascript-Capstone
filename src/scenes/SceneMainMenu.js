// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
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
    this.load.image('BtnMusic', 'assets/BtnMusic.png');
    this.load.image('BtnMusicOff', 'assets/BtnMusicOff.png');
    this.load.audio('SongIntro', 'assets/introson.ogg');
    this.load.audio('sndBtnOver', 'assets/sndBtnOver.wav');
    this.load.audio('sndBtnDown', 'assets/sndBtnDown.wav');
  }

  create() {
    this.add.image(this.game.config.width * 0.5, 95, 'logo').setScale(0.8);
    this.add.image(240, 305, 'cover').setScale(0.25);
    this.music = this.sound.add('SongIntro', { volume: 0.9 });
    this.music.play();


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


    this.btnPlay = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.75,
      'BtnPlay',
    );

    this.playTitle = this.add.text(this.game.config.width * 0.44, this.game.config.height * 0.725, 'PLAY', {
      fontFamily: 'Righteous',
      fontSize: 25,
      fontStyle: 'bold',
      color: '#68593ff5',
      align: 'center',
    });

    this.aboutTitle = this.add.text(this.game.config.width * 0.41, this.game.config.height * 0.805, 'ABOUT', {
      fontFamily: 'Righteous',
      fontSize: 25,
      fontStyle: 'bold',
      color: '#68593ff5',
      align: 'center',
    });

    this.scoreTitle = this.add.text(this.game.config.width * 0.40, this.game.config.height * 0.885, 'SCORES', {
      fontFamily: 'Righteous',
      fontSize: 25,
      fontStyle: 'bold',
      color: '#68593ff5',
      align: 'center',
    });

    this.btnMusic = this.add.sprite(
      this.game.config.width * 0.9,
      this.game.config.height * 0.08,
      'BtnMusic',
    );

    this.btnPlay.setScale(0.75);
    this.btnPlay2.setScale(0.75);
    this.btnPlay3.setScale(0.75);
    this.btnPlay.setInteractive();
    this.btnPlay2.setInteractive();
    this.btnPlay3.setInteractive();
    this.btnMusic.setInteractive();


    const pointOver = (button) => {
      button.on('pointerover', () => {
        button.setTexture('BtnPlayHover');
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
        this.music.destroy();
      }, this);
    };

    let isplaying = true;

    this.btnMusic.on('pointerup', () => {
      if (isplaying) {
        this.btnMusic.setTexture('BtnMusicOff');
        this.music.destroy();
        isplaying = false;
      } else {
        this.music = this.sound.add('SongIntro', { volume: 0.9 });
        this.music.play();
        this.btnMusic.setTexture('BtnMusic');
        isplaying = true;
      }
    }, this);

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
  }
}


export default SceneMainMenu;