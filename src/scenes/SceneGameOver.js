import Phaser from 'phaser';
import { postData, getData } from '../apiData';


class SceneGameOver extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneGameOver' });
  }

  preload() {
    this.load.image('sprImg', 'assets/catsad2.png');
    this.load.image('BtnPlay', 'assets/BtnPlay.png');
    this.load.image('BtnPlayHover', 'assets/BtnPlayHover.png');
    this.load.image('BtnPlayDown', 'assets/BtnPlayDown.png');
  }

  create() {
    this.add.image(this.game.config.width * 0.5, 270, 'sprImg').setScale(0.35);

    this.title = this.add.text(this.game.config.width * 0.2, 80, 'GAME OVER', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });

    this.score = this.add.text(this.game.config.width * 0.3, 380, `Your Score is: ${localStorage.getItem('score')}`, {
      fontFamily: 'monospace',
      fontSize: 20,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });

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

    this.btnText = this.add.text(this.game.config.width * 0.42, this.game.config.height * 0.83, 'Restart', {
      fontSize: 25,
      fontFamily: 'Arial',
      color: '#ffffff',
      align: 'center',
    });

    this.btnSubmitText = this.add.text(this.game.config.width * 0.42, this.game.config.height * 0.73, 'Submit', {
      fontSize: 25,
      fontFamily: 'Arial',
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

    const inputName = document.createElement('div');
    inputName.innerHTML = '<input type ="text" id= "nameInput" placeholder= "Enter your name"></input>';

    this.add.dom(240, 430, inputName);

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