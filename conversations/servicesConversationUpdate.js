console.log("++ Update a conversation's attribute values.");
// https://www.twilio.com/docs/conversations/api/conversation-resource
// 
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// serviceSid = 'IS5c86b7d0d6e44133acb09734274f94f6'; // Testing
serviceSid = 'IS186702e405b74452a449d67b9265669f';  // Frontline
//
conversationSid = 'CH3b5ec959d0684954a9dffc40c1f9d0f4';
console.log("+ Update the conversation sid: " + conversationSid);

// Original:   MG634319110a48b2e82f1a08247cd8f0ba
// Test value: MG9abb26060f3b4b8ff952eb775544789a
// {"messagingServiceSid": "MG634319110a48b2e82f1a08247cd8f0ba"}
// {friendlyName: 'new1 ch1'}
// 
// {state: 'inactive'}    // active inactive closed
// Note, both active and inactive conversations are displayed in Frontline. Closed conversations are not displayed.
// Once the "state" is set to "closed", it cannot be changed back to "active".

// When using the Default service SID: 
//    client.conversations.v1.conversations(conversationSid)
// When specifying the service SID:
client.conversations.services(serviceSid).conversations(conversationSid)
        .update(
                {state: 'inactive'}    // active inactive closed
        ).then(conversation => console.log(
            "+ After update, attribute values: "
            + "\n++ state: " + conversation.state
            + "\n++ messagingServiceSid: " + conversation.messagingServiceSid
            + "\n++ friendlyName: " + conversation.friendlyName
            ));
