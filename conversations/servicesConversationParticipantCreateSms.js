console.log("++ Create an SMS participant for a Conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// conversationSid = process.env.CONVERSATION_SID;
conversationSid = "CHeedba31ca8114e099294549b22fe3336";

console.log("+ Conversation SID: " + conversationSid + " Participant Identity: " + participantIdentity );
client.conversations.services(serviceSid).conversations(conversationSid)
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
