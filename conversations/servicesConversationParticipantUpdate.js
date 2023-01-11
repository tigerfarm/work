console.log("++ Create a chat participant into a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// particpant: Group MMS
// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;         // Default service
// conversationSid = "CHab8e3e59734f48d0abfadbd80fbfa37e";
// participantSid = 'MBee1e65a5777c46779e29cb48fd5a1643';      // MBee1e65a5777c46779e29cb48fd5a1643
//
serviceSid = "IS5c86b7d0d6e44133acb09734274f94f6";          // testing
conversationSid = "CHe02e49468eb64f8aaa92a845f10ece78";     // abc
participantSid = 'MBf494fc53a1444dc983319d37fc70fe1b';      // Dave
//
participantIdentity = 'Dave here';
//
console.log("+ Conversation SID: " + conversationSid
        + " Participant Identity: " + participantIdentity
        );
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants(participantSid)
        .update({
            // Cannot add an identity attribute value to an SMS participant.
            //, identity: participantIdentity
            // Instead, use the attributes string to store the identity as a name.
            lastReadMessageIndex: 3,
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
