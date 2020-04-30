const setScoreToStore = (score) => {
  localStorage.setItem('score', JSON.stringify(score));
};
export default setScoreToStore;