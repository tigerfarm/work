console.log("++ Create an SMS participant for a Conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = "CHe5581f6e4299402aa77ef237a44c3c40";

// participantIdentitySms = process.env.MY_PHONE_NUMBER;
participantIdentitySms = "+16508661366";
console.log("+ Conversation SID: " + conversationSid + " Participant Identity: " + participantIdentitySms );
client.conversations.conversations(conversationSid)
        .participants
        .create({
            'messagingBinding.address': participantIdentitySms,
            'messagingBinding.proxyAddress': "+12093308682" // Frontline conversation
        })
        .then(participant => console.log(
                    "+ Created participant, SID: " + participant.sid
                    ))
        .catch(function (err) {
            console.error("- " + err);
        });
