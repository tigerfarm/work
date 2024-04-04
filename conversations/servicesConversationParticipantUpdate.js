console.log("++ Update a conversation participant with a name or display_name.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// particpant: Group MMS
// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;         // Default service
// conversationSid = "CHab8e3e59734f48d0abfadbd80fbfa37e";
// participantSid = 'MBee1e65a5777c46779e29cb48fd5a1643';      // MBee1e65a5777c46779e29cb48fd5a1643
//
// serviceSid = 'IS5c86b7d0d6e44133acb09734274f94f6';      // Testing
serviceSid = 'IS186702e405b74452a449d67b9265669f';          // Frontline
conversationSid = "CH5ae2655888904021a43f0d69d6cf9917";
participantSid = 'MB53fe661617064348ab7d9ae69172efa9';
//
participantIdentity = 'For chat notifications';
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
            attributes: JSON.stringify({display_name: participantIdentity}) // name or display_name(for servicesConversationListParticipantsList.js)
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
