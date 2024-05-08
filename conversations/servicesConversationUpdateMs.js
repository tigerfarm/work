console.log("++ Update a conversation's attribute values.");
// https://www.twilio.com/docs/conversations/api/conversation-resource
// 
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
serviceSid = 'IS5c86b7d0d6e44133acb09734274f94f6'; // Testing
conversationSid = 'CH1509b3a92b8c4c7bbcf8d11ff9857fb1';
console.log("+ Update the conversation sid: " + conversationSid);
// Original:   MG634319110a48b2e82f1a08247cd8f0ba
// Test value: MG9abb26060f3b4b8ff952eb775544789a

// When using the Default service SID:
//    client.conversations.v1.conversations(conversationSid)
// When specifying the service SID:
client.conversations.services(serviceSid).conversations(conversationSid)
        .update(
                {"messagingServiceSid": "MG634319110a48b2e82f1a08247cd8f0ba"}
        ).then(conversation => console.log(
            "++ messagingServiceSid: " + conversation.messagingServiceSid
            + " friendlyName: " + conversation.friendlyName
            ));


