console.log("++ Create an Chat participant for a conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = "CHab8e3e59734f48d0abfadbd80fbfa37e";

// No participant Identity.
console.log("+ Conversation SID: " + conversationSid);
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants
        .create({
            messagingBinding: {
                address: process.env.MY_PHONE_NUMBER
            }
        })
        .then(participant => console.log(
                    "+ Created participant, SID: " + participant.sid
                    ))
        .catch(function (err) {
            console.error("- " + err);
        });
