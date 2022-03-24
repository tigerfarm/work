// Asynchronous Programming: https://eloquentjavascript.net/11_async.html
// Overview: https://www.youtube.com/watch?v=8aGhZQkoFbQ


// -----------------------------------------------------------------------------
// From Collin
const { client } = require('../../client');

// option 1
const sendSMS = async () => {
  try {
    return await client.messages
    .create({ 
      body: 'test', 
      from: numbers.twlo_1, 
      to: numbers.personal
     })
     .then(message => {
      return {
          message,
          lastRequest: client.httpClient.lastRequest,
          lastResponse: client.httpClient.lastResponse
      }
  });

  } catch (e) {
    return e;
  }
}

// uncomment for option 1
// sendSMS().then(res => console.log(res));

// option 2 - IIFE
(async () => {
  try {
    return await client.messages
    .create({ 
      body: 'test', 
      from: numbers.twlo_1, 
      to: numbers.personal,
      statusCallback: `${await ngrokUrl}/sms-webhook`
     })
     .then(message => {
      return {
          message,
          lastRequest: client.httpClient.lastRequest,
          lastResponse: client.httpClient.lastResponse
      }
  });

  } catch (e) {
    return e;
  }
})().then(res => console.log(res));