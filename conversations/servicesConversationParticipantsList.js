console.log("++ List Participants for a Conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
serviceSid = 'IS186702e405b74452a449d67b9265669f'; // Frontline
// conversationSid = process.env.CONVERSATION_SID;
conversationSid = "CH0269d9f270744259977cff1ae19d5a5f";

console.log("+ Conversation SID: " + conversationSid);
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants
        .list({limit: 20})
        .then(participants => participants.forEach(p => {
                if (p.identity !== null) {
                    console.log("+ Participant SID: " + p.sid + " identity, Chat: " + p.identity);
                } else {
                    // console.log("+ Participant SID: " + p.sid + " identity, SMS:  " + JSON.parse(p.attributes).name);
                    // {"avatar":"https://someassets-1403.twil.io/Keats.jpg","customer_id":"3","display_name":"John Keats"}
                    // console.log("+ Participant SID: " + p.sid + " Messaging, SMS:  " + JSON.parse(p.attributes).display_name);
                    theName = "";
                    if (JSON.parse(p.attributes).display_name !== undefined) {
                        theName = "  " +  JSON.parse(p.attributes).display_name;
                    }
                    console.log("+ Participant SID: " + p.sid 
                            + " Messaging: " + p.messagingBinding.type 
                            + ":  " +  p.messagingBinding.address
                            + ":  " +  p.messagingBinding.proxy_address
                            + theName
                            );
                    // console.log("+ Participant SID: " + p.sid + " attributes:  " + p.attributes);
                }
            })
        );
