import Phaser from 'phaser';

const init = () => {
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
    scene: ['SceneMainMenu', 'SceneAbout', 'SceneScores',
      'SceneMain',
      'SceneGameOver'],
    pixelArt: true,
    roundPixels: true,
  };

  const game = new Phaser.Game(gameConfig);
  return game;
};

export default init;