console.log("++ Fetch, then update a conversation's data.");
// https://www.twilio.com/docs/conversations/api/conversation-resource
// 
// Note, both active and inactive conversations are displayed in Frontline. Closed conversations are not displayed.
//
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
serviceSid = 'IS186702e405b74452a449d67b9265669f';  // Frontline
conversationSid = 'CH3b5ec959d0684954a9dffc40c1f9d0f4';
//
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
            if (conversation.uniqueName !== null) {
                console.log("+ Fetch using unique name: " + conversation.uniqueName);
                client.conversations.services(serviceSid).conversations(conversation.uniqueName)
                        .fetch()
                        .then(c => {
                            console.log(
                                    "++ Conversation SID: " + c.sid
                                    + "\n++ friendlyName:    " + c.friendlyName
                                    + "\n++ uniqueName:      " + c.uniqueName
                                    + "\n++ state:           " + c.state
                                    );
                        });
            }
            console.log("+ Update using the conversation sid: " + conversationSid);
            client.conversations.v1.conversations(conversationSid)
                    .update({state: 'closed'})    // active inactive closed
                    .then(conversation => console.log(
                                "++ state:           " + conversation.state
                                ));
        });

