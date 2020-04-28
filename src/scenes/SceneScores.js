import Phaser from 'phaser';
import { getData } from '../apiData';

class SceneScores extends Phaser.Scene {
  constructor() {
    super({ key: 'SceneScores' });
  }

  preload() {

  }

  create() {
    this.title = this.add.text(this.game.config.width * 0.2, 100, 'HIGH SCORES', {
      fontFamily: 'monospace',
      fontSize: 48,
      fontStyle: 'bold',
      color: '#ffffff',
      align: 'center',
    });

    const sortData = (x) => {
      const newArray = x;
      newArray.sort((x, y) => y.score - x.score).slice(0, 10);
    };

    const displayData = (array) => {
      const table = document.createElement('table');
      table.innerHTML = `<thead>
                        <tr>
                        <th> # </th>
                        <th> Name </th>
                        <th> Score </th>
                        </tr>
                        </thead>
                        <tbody id='table-body'></tbody>`;
      table.className = 'table-scores';

      this.add.dom(220, 180, table);

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

    const waitForData = () => {
      getData()
        .then(x => {
          sortData(x);
          displayData(x);
        })
        .catch(() => 'Something didnt work');
    };


    waitForData();
  }
}

export default SceneScores;