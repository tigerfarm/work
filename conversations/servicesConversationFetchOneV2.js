var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
serviceSid = 'IS4ebcc2d46cda47958628e59af9e53e55'; // Default
//
uniqueName = 'SmsThread:2357b';
conversationSid = 'CHf9c45437d4bd4de2bc8ee2821db1c94b';
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

