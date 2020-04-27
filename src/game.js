import Phaser from 'phaser';

import SceneMainMenu from './scenes/SceneMainMenu';
import SceneMain from './scenes/SceneMain';
import SceneAbout from './scenes/SceneAbout';
import SceneGameOver from './scenes/SceneGameOver';
import SceneScores from './scenes/SceneScores';

const gameConfig = {
  type: Phaser.WEBGL,
  parent: 'divId',
  dom: {
    createContainer: true,
  },
  width: 480,
  height: 640,
  backgroundColor: 'black',
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
    },
  },
  scene: [SceneMainMenu, SceneAbout, SceneScores,
    SceneMain,
    SceneGameOver],
  pixelArt: true,
  roundPixels: true,
};

// eslint-disable-next-line no-new
// eslint-disable-next-line no-unused-vars
const game = new Phaser.Game(gameConfig);