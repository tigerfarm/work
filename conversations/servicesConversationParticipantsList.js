console.log("++ List Participants for a Conversation.");
// https://www.twilio.com/docs/conversations/api/service-participant-resource
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// conversationSid = process.env.CONVERSATION_SID;
serviceSid = "IS186702e405b74452a449d67b9265669f";
conversationSid = "CH0269d9f270744259977cff1ae19d5a5f";

console.log("+ Conversation SID: " + conversationSid);
client.conversations.services(serviceSid).conversations(conversationSid)
        .participants
        .list({limit: 20})
        .then(participants => participants.forEach(p => {
                if (p.identity !== null) {
                    console.log("+ Participant SID: " + p.sid + " identity, Chat: " + p.identity);
                } else {
                    console.log("+ Participant SID: " + p.sid + " identity, SMS:  " + JSON.parse(p.attributes).name);
                    // console.log("+ Participant SID: " + p.sid + " identity, SMS:  " + p.attributes);
                }
            })
        );
