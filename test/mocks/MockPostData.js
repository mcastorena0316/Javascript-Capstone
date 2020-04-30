
async function postData(inputName, scoring) {
  const apiKey = '0L4QTVGS6HGPT7OMcNjp';
  const fetchingURL = `https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/${apiKey}/scores`;

  const data = {
    user: inputName,
    score: scoring,
  };
  try {
    const response = await fetch(fetchingURL, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    if (response.ok) {
      const jsonResponse = await response.json();
      return 'Everything is working';
    }
    throw new Error('Request Failed!');
  } catch (error) {
    return 'There is a mistake';
  }
}
export default postData;
