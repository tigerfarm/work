console.log("++ Create a chat participant into a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
serviceSid = 'IS186702e405b74452a449d67b9265669f'; // Frontline
conversationSid = "CH0269d9f270744259977cff1ae19d5a5f";
participantSid = 'MB8f088d01ae9d4f109005bfd0871be755';
console.log("+ Conversation SID: " + conversationSid
        + " Participant SID: " + participantSid
        );
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants(participantSid)
        .fetch()
        .then(p => {
            if (p.identity !== null) {
                console.log("+ Participant SID: " + p.sid + " identity, Chat: " + p.identity);
            } else {
                theName = "";
                if (JSON.parse(p.attributes).display_name !== undefined) {
                    theName = "  " + JSON.parse(p.attributes).display_name;
                }
                console.log("+ Participant SID: " + p.sid
                        + " Messaging: " + p.messagingBinding.type
                        + ":  " + p.messagingBinding.address
                        + ":  " + p.messagingBinding.proxy_address
                        + theName
                        );
            }

        })
        .catch(function (err) {
            console.error("- " + err);
            exit();
        });

// https://www.twilio.com/docs/conversations/api/conversation-participant-resource
