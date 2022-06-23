console.log("++ Create an Chat participant for a conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = "CHe5581f6e4299402aa77ef237a44c3c40";
participantIdentity = 'daveg1';
console.log("+ Conversation SID: " + conversationSid + " Participant Identity: " + participantIdentity);
client.conversations.conversations(conversationSid)
        .participants
        .create({
            messagingBinding: {
                // projectedAddress: process.env.MASTER_PHONE_NUMBER_1 // Twilio phone number.
                projectedAddress: "+12093308682"
            },
            identity: participantIdentity,
            attributes: JSON.stringify({name: participantIdentity})
        })
        .then(participant => console.log(
                    "+ Created participant, SID: " + participant.sid
                    ))
        .catch(function (err) {
            console.error("- " + err);
        });
