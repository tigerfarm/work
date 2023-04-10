console.log("++ List Conversations.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// app.get('/joinConversation', function (req, res) {
// Can join a conversation using either the SID or unique name.
// localhost:8000/joinConversation?identity=dave3&conversationid=CH52652cb27e81490bbb5cc67c223b857a
// localhost:8000/joinConversation?identity=dave3&conversationid=abc
console.log("+ Join a participant into a conversation.");
if (req.query.identity) {
    if (req.query.conversationid) {
        participantIdentity = req.query.identity;
        conversationId = req.query.conversationid;
        sayMessage("+ Parameter identity: " + participantIdentity + ", conversationId: " + conversationId);
        //
        // Determine if the conversation exists.
        client.conversations.services(CONVERSATIONS_SERVICE_SID).conversations(conversationId)
                .fetch()
                .then(conversation => {
                    console.log(
                            "+ Conversation exits, SID: " + conversation.sid
                            + " " + conversation.uniqueName
                            + " " + conversation.friendlyName
                            );
                    addParticipantToConversation(res, conversationId, participantIdentity);
                })
                .catch(function (err) {
                    console.log("+ Conversation does NOT exist, create it.");
                    client.conversations.services(CONVERSATIONS_SERVICE_SID).conversations
                            .create({
                                messagingServiceSid: process.env.CONVERSATIONS_MESSAGING_SERVICE_SID,
                                uniqueName: conversationId,
                                friendlyName: conversationId
                            })
                            .then(conversation => {
                                console.log("++ Conversation created: " + conversation.sid);
                                addParticipantToConversation(res, conversationId, participantIdentity);
                            })
                            .catch(function (err) {
                                console.log("-- Conversation NOT created.");
                                res.send("-2");
                            });
                });
    } else {
        sayMessage("- Parameter required: conversationid.");
        res.status(400).send('HTTP Error 400. Parameter required: conversationid.');
    }
} else {
    sayMessage("- Parameter required: identity.");
    res.status(400).send('HTTP Error 400. Parameter required: identity.');
}
// });