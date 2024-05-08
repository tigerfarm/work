console.log("++ Create an Chat participant for a conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = "CHab8e3e59734f48d0abfadbd80fbfa37e";
const recipientPhoneNumber = process.env.MAIN_PHONE_NUMBER_1;
participantIdentity = 'dave2';
console.log("+ Conversation SID: " + conversationSid + " Participant Identity: " + participantIdentity);

(async () => {
    try {
        return await client.messages
                .create({
                    body: 'test1',
                    from: process.env.MAIN_PHONE_NUMBER_1,
                    to: process.env.MY_PHONE_NUMBER
                })
                .then(message => {
                    console.log("+ message: " + message + ": ");
                    return {
                        message,
                        lastRequest: client.httpClient.lastRequest,
                        lastResponse: client.httpClient.lastResponse
                    };
                });

    } catch (e) {
        return e;
    }
})().then(res => console.log(res));

