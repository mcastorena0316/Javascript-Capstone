import init from './mocks/gameMock';

test('Function init should create a object called name', () => {
  init();
  expect(typeof init()).toBe('object');
});
