console.log("++ Create a chat participant into a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// conversationSid = process.env.CONVERSATION_SID;
// conversationSid = "CH3b5ec959d0684954a9dffc40c1f9d0f4";
// participantSid = 'MBb656cd2788fb41439b8f9ac3aaa83574';
//
// Frontline particpant: SMS
serviceSid = 'IS186702e405b74452a449d67b9265669f';
conversationSid = "CH3b5ec959d0684954a9dffc40c1f9d0f4";
participantSid = 'MB83baecb5b3464c00874c83c90e926165';
//
console.log("+ Conversations service SID: " + serviceSid);
console.log("+ Conversation SID: " + conversationSid);
console.log("+ Participant SID: " + participantSid
        );
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants(participantSid)
        .remove().then(message => console.log(
            "++ Removed."
            ))
        .catch(function (err) {
            console.error("- " + err);
            exit();
        });

// https://www.twilio.com/docs/conversations/api/conversation-participant-resource
