
import 'jest-canvas-mock';
import Player from '../src/Entities/Player';
import Entity from '../src/Entities/Entity';

jest.mock('../src/Entities/Entity');

beforeEach(() => {
  Entity.mockClear(); 
});


test('check if Player called the class Entity', () => {
  const player = new Player('SceneMain', 240, 320, 'sprPlayer');
  expect(Entity).toHaveBeenCalledTimes(1);
});
