console.log("++ Create an SMS participant for a Conversation.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

conversationSid = process.env.CONVERSATION_SID;
participantIdentity = 'sms6a';
console.log("+ Conversation SID: " + conversationSid
        + " Participant Identity: " + participantIdentity
        );
client.conversations.conversations(conversationSid)
        .participants
        .create({
            // identity: participantIdentity,
            // - Error: Participants on SMS, WhatsApp or other non-chat channels cannot have Identities
            'messagingBinding.address': process.env.CONVERSATION_PHONE_NUMBER_1,
            'messagingBinding.proxyAddress': process.env.CONVERSATION_PROXY_PHONE_NUMBER_1
        })
        .then(participant => console.log(
                    "+ Created participant, SID: " + participant.sid
                    ))
        .catch(function (err) {
            console.error("- " + err);
        });

// https://www.twilio.com/docs/conversations/api/conversation-participant-resource

