console.log("++ Create a text message with media attached, for a Conversation.");
//
// Note, at this time, April, 2023, can only send media with a text message.
//  If sending media and text, the text is dropped.
//
// I have not added the code to attach media.
// Documentation:
//  https://www.twilio.com/docs/conversations/api/conversation-message-resource
// Curl to add media resource:
//  curl --data-binary @0graphic2s.jpg -H "Content-Type: image/jpeg" https://mcs.us1.twilio.com/v1/Services/IS5c86b7d0d6e44133acb09734274f94f6/Media -u $MAIN_ACCOUNT_SID:$MAIN_AUTH_TOKEN
//  {"sid":"ME506c2de527d7005ed0bcb465b8464dd7","service_sid":"IS5c86b7d0d6e44133acb09734274f94f6", ... }
// Another media resource:
//  {"sid":"MEa8c53136b1efba640279eeef9eb7a75d", ...
//  
// curl --location --request POST 'https://conversations.twilio.com/v1/Conversations/CH20...3d/Messages' \
// --header 'Authorization: Basic QA...MQ==' \
// --header 'Content-Type: application/x-www-form-urlencoded' \
// --data-urlencode 'Author=authorme' \
// --data-urlencode 'Body=Text message' \
// --data-urlencode 'MediaSid=ME8c...9c'
//  
// media object[]: An array of objects that describe the Message's media, 
// Each object contains these fields: 
//      content_type with the MIME type of the media, 
//      filename with the name of the media, 
//      sid with the SID of the Media resource, and 
//      size with the media object's file size in bytes. 
// If the Message has no media, this value is null.
//
var client = require('../../node_modules/twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);

serviceSid = process.env.CONVERSATIONS_SERVICE_SID;
conversationSid = process.env.CONVERSATION_SID;
// serviceSid = 'IS186702e405b74452a449d67b9265669f';  // Frontline
// conversationSid = "CH183bde74b2314d2faef9a1c757b8f028";
console.log("+ Conversations service SID: " + serviceSid);
console.log("+ Conversation SID: " + conversationSid);
//
participantIdentity = 'daveg1';
messageText = 'msg1a';
console.log("+ Participant Identity: " + participantIdentity
        + " messageText: " + messageText
        );
client.conversations.services(serviceSid).conversations(conversationSid)
        .messages
        .create({author: participantIdentity, body: messageText})
        .then(message => console.log(
                    "+ Created message, SID: " + message.sid
                    ))
        .catch(function (err) {
            console.error("- " + err);
            exit();
        });

// eof
