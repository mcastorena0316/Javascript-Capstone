import init from './mocks/gameMock';

test('Function init should create a object called name', () => {
  expect(typeof init()).toBe('object');
});
