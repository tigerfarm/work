console.log("++ Create a chat participant into a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = process.env.CONVERSATION_SID;
// conversationSid = "CHab8e3e59734f48d0abfadbd80fbfa37e";
participantSid = 'MB034000e766114d7f89d0f63f0e9c4b8e';      // MBee1e65a5777c46779e29cb48fd5a1643 MBa383f1c4b8ac49d08ce22f2252fe88c9
//
// Frontline particpant: SMS
// serviceSid = 'IS186702e405b74452a449d67b9265669f';
// conversationSid = "CH0269d9f270744259977cff1ae19d5a5f";
// participantSid = 'MB8f088d01ae9d4f109005bfd0871be755';
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