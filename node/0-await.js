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

// -----------------------------------------------------------------------------
console.log("++ Concurrency header test.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

const sendSMS = async () => {
    try {
        return await client.messages
                .create({
                    body: 'Concurrency header test',
                    from: process.env.MASTER_PHONE_NUMBER_1,
                    to: process.env.MY_PHONE_NUMBER,
                    statusCallback: 
                })
                .then(message => {
                    console.log("+ SID: " + process.env.MASTER_ACCOUNT_SID
                            + ", Concurrency header: " + client.httpClient.lastResponse.header['twilio-concurrent-requests']
                            );
                });
    } catch (e) {
        return e;
    }
};

sendSMS().then(res => console.log(res));
