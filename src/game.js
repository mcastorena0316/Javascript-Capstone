import Phaser from 'phaser';

import SceneMainMenu from './scenes/SceneMainMenu';
import SceneMain from './scenes/SceneMain';
import SceneGameOver from './scenes/SceneGameOver';

const gameConfig = {
  type: Phaser.WEBGL,
  width: 480,
  height: 640,
  backgroundColor: '#4488AA',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [SceneMainMenu,
    SceneMain,
    SceneGameOver],
  pixelArt: true,
  roundPixels: true,
};

// eslint-disable-next-line no-new
// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(gameConfig);