// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import Phaser from 'phaser';
import { postData, getData } from '../apiData';


class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  preload() {
    this.load.image('gameOverTitle', 'assets/gameover.png');
    this.load.image('sprImg', 'assets/catsad2.png');
    this.load.image('BtnPlay', 'assets/BtnPlay.png');
    this.load.image('BtnPlayHover', 'assets/BtnPlayHover.png');
    this.load.image('BtnPlayDown', 'assets/BtnPlayDown.png');
    this.load.audio('gameOverMusic', 'assets/musicGameOver.mp3');
  }

  create() {
    this.gameOver = this.sound.add('gameOverMusic', { volume: 0.6 });
    this.gameOver.play();
    this.add.image(this.game.config.width * 0.5, 240, 'sprImg').setScale(0.35);
    this.add.image(this.game.config.width * 0.52, 80, 'gameOverTitle').setScale(0.7);

    this.btnRestart = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.85,
      'BtnPlay',
    );

    this.btnSubmit = this.add.sprite(
      this.game.config.width * 0.5,
      this.game.config.height * 0.75,
      'BtnPlay',
    );


    this.submitTitle = this.add.text(this.game.config.width * 0.41, this.game.config.height * 0.725, 'SUBMIT', {
      fontFamily: 'Righteous',
      fontSize: 25,
      fontStyle: 'bold',
      color: '#68593ff5',
      align: 'center',
    });

    this.restartTitle = this.add.text(this.game.config.width * 0.39, this.game.config.height * 0.825, 'RESTART', {
      fontFamily: 'Righteous',
      fontSize: 25,
      fontStyle: 'bold',
      color: '#68593ff5',
      align: 'center',
    });

    const inputName = document.createElement('div');
    inputName.innerHTML = '<input type ="text" id= "nameInput" class="nameInput" placeholder= "Enter your name"></input>';

    this.add.dom(this.game.config.width * 0.78, 420, inputName);

    this.score = this.add.text(this.game.config.width * 0.3, 360, `Your Score is: ${localStorage.getItem('score')}`, {
      fontFamily: 'monospace',
      fontSize: 20,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });


    this.btnRestart.setInteractive();
    this.btnRestart.setScale(0.8);
    this.btnSubmit.setInteractive();
    this.btnSubmit.setScale(0.8);


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
        this.gameOver.destroy();
      }, this);
    };

    pointOver(this.btnRestart);
    pointOver(this.btnSubmit);
    pointOut(this.btnRestart);
    pointOut(this.btnSubmit);
    pointDown(this.btnRestart);
    pointDown(this.btnSubmit);
    pointUp(this.btnRestart);
    pointUp(this.btnSubmit);
    goToScene(this.btnRestart, 'SceneMain');
    goToScene(this.btnSubmit, 'SceneScores');


    this.btnSubmit.on('pointerup', () => {
      const inputName = document.getElementById('nameInput').value;
      postData(inputName);
    });

    this.btnSubmit.on('pointerup', () => {
      getData();
    });
  }
}

export default SceneGameOver;