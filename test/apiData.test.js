import { getData } from '../src/apiData';
import postData from './mocks/MockPostData';

import '@babel/polyfill';

test('Simulate a method post with data:user and score , to our API', () => {
  const scorePosted = postData('Melissa', 50);
  scorePosted.then(result => {
    expect(result).toBe('Everything is correct');
  }).catch(() => 'Something didnt work');
});

test('Verify that we are recieving data from our API', () => {
  const score = getData();
  score.then(result => {
    expect(result[0].user).toBe('melissa');
  }).catch(() => 'Something didnt work');
});
