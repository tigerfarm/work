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
// eof