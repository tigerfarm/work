console.log("++ Create a chat participant into a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = "CHab8e3e59734f48d0abfadbd80fbfa37e";
participantSid = 'MBee1e65a5777c46779e29cb48fd5a1643';
participantIdentity = 'sms2me';
console.log("+ Conversation SID: " + conversationSid
        + " Participant Identity: " + participantIdentity
        );
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants(participantSid)
        .update(
            // Cannot add an identity to an SMS participant.
            //, identity: participantIdentity
            // Instead, use the attributes string to store the identity as a name.
            attributes: JSON.stringify({name: participantIdentity})
        })
        .then(participant => console.log(
                    "+ Updated participant, SID: " + participant.sid
                    ))
        .catch(function (err) {
            if (err.toString().indexOf('Participant already exists') > 0) {
                console.log("+ Participant already exists.");
            } else if (err) {
                console.error("- Error: " + err);
                exit();
            }
        });

// https://www.twilio.com/docs/conversations/api/conversation-participant-resource
