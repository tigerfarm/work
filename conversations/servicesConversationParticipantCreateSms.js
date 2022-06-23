console.log("++ Create an SMS participant for a Conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
serviceSid = 'IS186702e405b74452a449d67b9265669f'; // Frontline
// conversationSid = process.env.CONVERSATION_SID;
conversationSid = "CH8077af8acacf4abf8d71f49b6476914f";

participantIdentitySms = process.env.MY_PHONE_NUMBER;
// participantIdentitySms = "+16505551111";
console.log("+ Conversation SID: " + conversationSid + " Participant Identity: " + participantIdentitySms );
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants
        .create({
            // identity: participantIdentity,
            // - Error: Participants on SMS, WhatsApp or other non-chat channels cannot have Identities
            // 'messagingBinding.address': process.env.CONVERSATION_PHONE_NUMBER_1,
            'messagingBinding.address': participantIdentitySms,
            // 'messagingBinding.proxyAddress': process.env.CONVERSATION_PROXY_PHONE_NUMBER_1
            'messagingBinding.proxyAddress': "+16505552222" // Frontline conversation
        })
        .then(participant => console.log(
                    "+ Created participant, SID: " + participant.sid
                    ))
        .catch(function (err) {
            console.error("- " + err);
        });
