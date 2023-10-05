console.log("++ Fetch, then update a conversation's data.");
// https://www.twilio.com/docs/conversations/api/conversation-resource
// 
// Note, both active and inactive conversations are displayed in Frontline. Closed conversations are not displayed.
//
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
serviceSid = 'IS5c86b7d0d6e44133acb09734274f94f6'; // Testing
// serviceSid = 'IS186702e405b74452a449d67b9265669f';  // Frontline
conversationSid = 'CH1509b3a92b8c4c7bbcf8d11ff9857fb1';
console.log("++ Conversation SID: " + conversationSid);

client.conversations.services(serviceSid).conversations(conversationSid)
        .fetch()
        .then(conversation => {
            console.log("+ Fetch using the conversation sid: " + conversationSid);
            console.log(
                    "++ Conversation SID: " + conversation.sid
                    + "\n++ friendlyName:    " + conversation.friendlyName
                    + "\n++ uniqueName:      " + conversation.uniqueName
                    + "\n++ state:           " + conversation.state
                    );
            console.log("+ Update using the conversation sid: " + conversationSid);
            client.conversations.v1.conversations(conversationSid)
                    .update({state: 'inactive'})    // active inactive closed
                    .then(conversation => console.log(
                                "++ state:           " + conversation.state
                                ));
        });

