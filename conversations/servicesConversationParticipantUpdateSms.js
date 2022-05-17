console.log("++ Create a chat participant into a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// particpant: Group MMS
serviceSid = process.env.CONVERSATIONS_SERVICE_SID;         // Default service
conversationSid = "CHab8e3e59734f48d0abfadbd80fbfa37e";
participantSid = 'MBa383f1c4b8ac49d08ce22f2252fe88c9';      // MBee1e65a5777c46779e29cb48fd5a1643 MBa383f1c4b8ac49d08ce22f2252fe88c9
//
participantAddress = '+16508661366';
console.log("+ Conversation SID: " + conversationSid
        + " Participant Address: " + participantAddress
        );
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants(participantSid)
        .update({
            // Doesn't work
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

