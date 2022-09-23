console.log("++ Create a conversation and a chat participant.");
var client = require('../../node_modules/twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

// serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
// serviceSid = 'IS186702e405b74452a449d67b9265669f'; // Frontline
serviceSid = 'IS4ebcc2d46cda47958628e59af9e53e55'; // web application SID

conversationFriendlyName = 'c6';
participantIdentity = 'lots101';
for (var i = 12; i < 102; i++) {
    conversationFriendlyName = "c" + i;
    console.log("+ Messaging Service SID: " + serviceSid
            + ", Friendly Name: " + conversationFriendlyName
            + ", Participant Identity: " + participantIdentity
            );

    client.conversations.services(serviceSid).conversations
            .create({
                messagingServiceSid: process.env.MESSAGING_SERVICE_SID,
                friendlyName: conversationFriendlyName,
                uniqueName: conversationFriendlyName
            })
            .then(conversation => {
                console.log(
                        "+ Conversation SID: " + conversation.sid
                        + " " + conversation.friendlyName
                        );
                client.conversations.services(serviceSid).conversations(conversation.sid)
                        .participants
                        .create({
                            identity: participantIdentity,
                            attributes: JSON.stringify({name: participantIdentity})
                        })
                        .then(participant => console.log(
                                    "+ Created participant, SID: " + participant.sid
                                    ))
                        .catch(function (err) {
                            console.error("- " + err);
                        });
            });
}
