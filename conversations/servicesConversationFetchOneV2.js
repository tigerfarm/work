var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// serviceSid = 'IS4ebcc2d46cda47958628e59af9e53e55'; // Default
serviceSid = 'IS186702e405b74452a449d67b9265669f';  // Frontline
//
uniqueName = 'SmsThread:2357b';
conversationSid = 'CHca3d0dd0168041d0984bc9bbda3ebd85';
//
// channel = await client.getConversationByUniqueName(this.incident.id.toString());
client.getConversationByUniqueName(uniqueName);

const theConversations = async () => {
    try {
        return await client.getConversationByUniqueName(uniqueName);
    } catch (e) {
        return e;
    }
};

console.log(
        "++ Conversation SID: " + conversation.sid
        + "\n++ friendlyName:    " + conversation.friendlyName
        + "\n++ uniqueName:      " + conversation.uniqueName
        + "\n++ state:           " + conversation.state
        );

