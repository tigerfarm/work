console.log("++ Create an WhatsApp participant for a Conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;         // Conversation service: Testing
// serviceSid = 'IS186702e405b74452a449d67b9265669f';       // Frontline
serviceSid = 'IS5c86b7d0d6e44133acb09734274f94f6';      // Testing
//
// conversationSid = process.env.CONVERSATION_SID;             // Conversation service/conversation: Testing/Group Messaging
conversationSid = "CH252ce7f0b14e45ee89a12156ce6652a4";  // Conversation service/conversation: Testing/WhatsApp c1

// participantIdentitySms = process.env.MY_PHONE_NUMBER;
participantIdentitySms = "whatsapp:+16505558893";
conversationProxyAddress = "whatsapp:+14155238886";     // Twilio WhatsApp sandbox id
console.log("+ Conversation SID: " + conversationSid );
console.log("+ participantIdentitySms: " + participantIdentitySms );
console.log("+ conversationProxyAddress: " + conversationProxyAddress );    // Twilio address
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
