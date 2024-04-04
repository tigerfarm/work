console.log("++ Create a text message for a Conversation.");
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

// Create a media object which has a SID that begins with ME.
// $ curl --data-binary @mediaSample.jpg -H "Content-Type: image/jpeg" https://mcs.us1.twilio.com/v1/Services/IS4ebcc2d46cda47958628e59af9e53e55/Media -u $MAIN_ACCOUNT_SID:$MAIN_AUTH_TOKEN
mediaURL = "";
if (mediaURL !== "") {
    console.log('Upload media to Twilio from URL ${mediaURL}');
    // const mediaObj = await uploadMedia(conversation.chatServiceSid, mediaURL);
    mediaSID = mediaObj.sid;
}

conversationSid = process.env.CONVERSATION_SID;
var participantIdentity = 'stacy';
var messageText = 'Message text when sending media.';
var mediaSID = "ME55d986b9d92260a2f9a7894bdbd051bf";
console.log("+ Conversation SID: " + conversationSid
        + ", Participant Identity: " + participantIdentity
        + ", messageText: " + messageText
        );
client.conversations.conversations(conversationSid)
        .messages
        .create({
            author: participantIdentity,
            body: messageText
            , mediaSid: mediaSID
        })
        .then(message => console.log(
                    "+ Created message, SID: " + message.sid
                    ));

// https://www.twilio.com/docs/conversations/api/conversation-message-resource?code-sample=code-create-a-conversation-message&code-language=Node.js&code-sdk-version=3.x
// author: The channel specific identifier of the message's author. Defaults to system.
// body: The content of the message, can be up to 1,600 characters long.
