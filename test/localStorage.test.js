import setScoreToStore from '../src/localStorage';

const score = 50;

test('set localStorage with player score', () => {
  setScoreToStore(score);
  expect(localStorage.getItem('score')).toBe('50');
});