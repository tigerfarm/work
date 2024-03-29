console.log("++ Create an SMS participant for a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
// conversationSid = "CHeedba31ca8114e099294549b22fe3336";

participantIdentity = 'sms2me';
console.log("+ Conversation SID: " + conversationSid
        + " Participant Identity: " + participantIdentity
        );
client.conversations.conversations(conversationSid)
        .participants
        .create({
            // identity: participantIdentity,
            // - Error: Participants on SMS, WhatsApp or other non-chat channels cannot have Identities
            // 'messagingBinding.address': process.env.CONVERSATION_PHONE_NUMBER_1,
            'messagingBinding.address': process.env.MY_PHONE_NUMBER,
            'messagingBinding.proxyAddress': process.env.CONVERSATION_PROXY_PHONE_NUMBER_1
        })
        .then(participant => console.log(
                    "+ Created participant, SID: " + participant.sid
                    ))
        .catch(function (err) {
            console.error("- " + err);
        });

// https://www.twilio.com/docs/conversations/api/conversation-participant-resource

