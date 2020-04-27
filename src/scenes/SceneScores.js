import Phaser from 'phaser';


class SceneScores extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneScores' });
  }

  //   preload() {

  //   }

  create() {
    this.title = this.add.text(this.game.config.width * 0.2, 100, 'HIGH SCORES', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });
  }
}

export default SceneScores;