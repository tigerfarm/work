console.log("++ Create an SMS participant for a Conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
// 
// https://www.twilio.com/docs/conversations/api/conversation-participant-resource?code-sample=code-create-conversation-participant-sms&code-language=Node.js&code-sdk-version=4.x
//    "identity": null,
//    "messaging_binding": {
//      "type": "sms",
//      "address": "+15558675310"
//      "proxy_address": "+15017122661"
//    },
// 

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;         // Conversation service: Testing
serviceSid = 'IS186702e405b74452a449d67b9265669f';       // Frontline
// conversationSid = process.env.CONVERSATION_SID;             // Conversation service/conversation: Testing/Group Messaging
conversationSid = "CHaa8df2fcdcde42f4ba401249bd19b889";

// participantIdentitySms = process.env.MY_PHONE_NUMBER;
participantIdentitySms = "+16505558893";
conversationProxyAddress = "+18665552222";
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
