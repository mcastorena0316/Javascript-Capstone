import Phaser from 'phaser';

import { firstScene } from './scenes/GameScene';

const gameConfig = {
  width: 680,
  height: 400,
  scene: firstScene,
};

// eslint-disable-next-line no-new
new Phaser.Game(gameConfig);