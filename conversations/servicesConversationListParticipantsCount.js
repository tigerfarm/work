console.log("++ List the number of participants in Conversations Service.");
// https://www.twilio.com/docs/conversations/api/service-conversation-resource
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
serviceSid = 'IS5c86b7d0d6e44133acb09734274f94f6'; // Testing
console.log("+ Conversations for a Twilio Conversations service SID: " + serviceSid);
console.log("+ Conversation SID                    Number of participants");
client.conversations.services(serviceSid).conversations.list({limit: 200})
        .then(conversations => conversations.forEach(c => {
                // For each of the conversation, list the Number of participants.
                client.conversations.services(serviceSid).conversations(c.sid)
                        .participants.list()
                        .then(participants => {
                            console.log("+ " + c.sid + "  " + participants.length);
                        });
            }));
            