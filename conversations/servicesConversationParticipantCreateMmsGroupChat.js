console.log("++ Create an Chat participant for a Group MMS conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// https://www.twilio.com/docs/conversations/group-texting?code-sample=code-add-a-chat-participant-real-estate-agent&code-language=Node.js&code-sdk-version=4.x
//    "identity": "davehere",
//    "messaging_binding": {
//      "type": "sms",
//      "projected_address": "+15017122661"     // A Twilio phone number to send messages to the Group MMS participants
//    },
// 
// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
serviceSid = "IS186702e405b74452a449d67b9265669f";          // Frontline
conversationSid = "CHe5581f6e4299402aa77ef237a44c3c40";

participantIdentity = 'daveg1';
console.log("+ Conversation SID: " + conversationSid + " Participant Identity: " + participantIdentity);
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants
        .create({
            messagingBinding: {
                projectedAddress: process.env.MAIN_PHONE_NUMBER_1 // Twilio phone number.
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
