import Phaser from 'phaser';


class SceneAbout extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneAbout' });
  }

  //   preload() {

  //   }

  create() {
    this.title = this.add.text(this.game.config.width * 0.2, 100, 'ABOUT', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
  }
}

export default SceneAbout;