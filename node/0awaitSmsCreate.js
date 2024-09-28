// Asynchronous Programming: https://eloquentjavascript.net/11_async.html
// Overview: https://www.youtube.com/watch?v=8aGhZQkoFbQ

// -----------------------------------------------------------------------------
console.log("++ Concurrency header test.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

const sendSMS = async () => {
    try {
        return await client.messages
                .create({
                    body: 'Concurrency header test',
                    from: process.env.MAIN_PHONE_NUMBER_1,
                    to: process.env.MY_PHONE_NUMBER 
                })
                .then(message => {
                    console.log("+ SID: " + process.env.MAIN_ACCOUNT_SID
                            + ", Concurrency header: " + client.httpClient.lastResponse.header['twilio-concurrent-requests']
                            );
                });
    } catch (e) {
        return e;
    }
};

sendSMS().then(res => console.log(res));
