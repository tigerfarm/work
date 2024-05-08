// http://localhost:3000/frontlineNotify?messageText=abc
exports.handler = function(context, event, callback) {
  let messageText = event.messageText || null;
  if (messageText == null){
    console.log("- Required parameter: messageText.");
    callback(null, "- Required parameter: messageText.");
    process.exit(0);
  }
  console.log("+ Send/create Frontline conversation notify message, messageText: " + messageText);
  const twilioClient = context.getTwilioClient();
  twilioClient.conversations.v1.services(context.CONVERSATIONS_SERVICE_SID).conversations(context.CONVERSATION_SID)
        .messages
        .create({author: context.PARTICIPANT_IDENTITY, body: messageText})
        .then(message => {
          console.log("+ Created message, SID: " + message.sid);
          callback(null, "+ Created message, SID: " + message.sid);
        })
        .catch(function (err) {
            console.error("- Error: " + err);
            callback(null, "- Error: " + err);
            process.exit(0);
        });
};