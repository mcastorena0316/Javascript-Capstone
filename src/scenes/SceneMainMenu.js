import Phaser from 'phaser';


class SceneMainMenu extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneMainMenu' });
  }

  create() {
    this.scene.start('SceneMain');
  }
}

export default SceneMainMenu;