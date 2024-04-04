console.log("++ Create a chat participant into a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// particpant: Group MMS
serviceSid = process.env.CONVERSATIONS_SERVICE_SID;         // Default service
conversationSid = "CHab8e3e59734f48d0abfadbd80fbfa37e";
participantSid = 'MBee1e65a5777c46779e29cb48fd5a1643';      // MBee1e65a5777c46779e29cb48fd5a1643
//
participantAddress = '+16505551234';
// participantAddress = '+16505551366';
console.log("+ Conversation SID: " + conversationSid
        + " Participant Address: " + participantAddress
        );
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants(participantSid)
        .update({
            // The following doesn't work. 
            // The workaround is to remove the participant and re-create the participant.
            messagingBinding: JSON.stringify({address: participantAddress})
        })
        .then(participant => console.log(
                    "+ Updated participant, SID: " + participant.sid
                    ))
        .catch(function (err) {
                console.error("- Error: " + err);
                exit();
        });

// https://www.twilio.com/docs/conversations/api/conversation-participant-resource

