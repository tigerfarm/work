console.log("++ Create an SMS participant for a Conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
// https://www.twilio.com/docs/conversations/quickstart?code-sample=code-add-a-conversation-participant-sms
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;         // Conversation service: Testing
// serviceSid = 'IS186702e405b74452a449d67b9265669f';       // Frontline
// conversationSid = process.env.CONVERSATION_SID;             // Conversation service/conversation: Testing/Group Messaging
conversationSid = "CHe02e49468eb64f8aaa92a845f10ece78";  // Conversation service/conversation: Testing/abc

participantIdentitySms = process.env.MY_PHONE_NUMBER;
// participantIdentitySms = "+16505558893";
conversationProxyAddress = "+12093308688";
console.log("+ Conversation SID: " + conversationSid );
console.log("+ participantIdentitySms: " + participantIdentitySms );
console.log("+ conversationProxyAddress: " + conversationProxyAddress );
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants
        .create({
            // Participants using SMS, WhatsApp or other non-chat channels, cannot have an Identity
            'messagingBinding.address': participantIdentitySms,
            'messagingBinding.proxyAddress': conversationProxyAddress
        })
        .then(participant => console.log(
                    "+ Created participant, SID: " + participant.sid
                    ))
        .catch(function (err) {
            console.error("- " + err);
        });
