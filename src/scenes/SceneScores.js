// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import Phaser from 'phaser';
import { getData } from '../apiData';
// eslint-disable-next-line import/no-unresolved, import/no-extraneous-dependencies
import '@babel/polyfill';

class SceneScores extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneScores' });
  }

  preload() {
    this.load.image('highScore', 'assets/highscore.png');
    this.load.image('Btnback', 'assets/btnBack.png');
    this.load.image('Btnbackhover', 'assets/btnBackHover.png');
  }

  create() {
    this.BtnBack = this.add.sprite(
      this.game.config.width * 0.9,
      this.game.config.height * 0.08,
      'Btnback',
    );

    this.BtnBack.setInteractive();
    this.highScore = this.add.image(this.game.config.width * 0.5, 120, 'highScore').setScale(0.7);


    this.BtnBack.on('pointerover', () => {
      this.BtnBack.setTexture('Btnbackhover');
    }, this);

    this.BtnBack.on('pointerup', () => {
      this.scene.start('SceneMainMenu');
    });

    this.BtnBack.on('pointerout', () => {
      this.BtnBack.setTexture('Btnback');
    });

    const displayData = (array) => {
      const table = document.createElement('table');
      table.innerHTML = `<thead>
                        <tr>
                        <th> <span> RANKING </span> </th>
                        <th> <span> NAME </span> </th>
                        <th> <span> SCORE </span> </th>
                        </tr>
                        </thead>
                        <tbody id='table-body'></tbody>`;
      table.className = 'table-scores';

      this.add.dom(140, 200, table);

      let listContent = '';

      array.forEach((ele, index) => {
        const listBody = document.getElementById('table-body');
        listContent += `<tr>
                      <th scope='row'>${index + 1} </th>
                      <td>${ele.user}</td>
                      <td>${ele.score}</td>                   
                      </tr>`;

        listBody.innerHTML = listContent;
      });
    };

    const sortData = (x) => {
      const newArray = x;
      const sliceArray = newArray.sort((x, y) => y.score - x.score).slice(0, 10);
      displayData(sliceArray);
    };


    const waitForData = () => {
      getData()
        .then(x => {
          sortData(x);
        })
        .catch(() => 'Something didnt work');
    };
    waitForData();
  }
}

export default SceneScores;