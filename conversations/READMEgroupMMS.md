----------------------------------------------------------------------------------
# Group MMS Conversations Notes

## Type of Twilio Conversations Participants

### Participant types for regular conversations, a non-Group MMS conversations
````
++ Create an Chat participant for a conversation.
// https://www.twilio.com/docs/conversations/api/conversation-participant-resource?code-sample=code-create-conversation-participant-chat&code-language=Node.js&code-sdk-version=4.x
//    "identity": "davehere",
//    "messaging_binding": null,

++ Create an SMS participant for a Conversation.
// https://www.twilio.com/docs/conversations/api/conversation-participant-resource?code-sample=code-create-conversation-participant-sms&code-language=Node.js&code-sdk-version=4.x
//    "identity": null,
//    "messaging_binding": {
//      "type": "sms",
//      "address": "+15558675310"
//      "proxy_address": "+15017122661"
//    },
// 
````

### Participant types for Group MMS conversations

````
++ Create an Chat participant for a Group MMS conversation.
+ Project address (Twilio phone number) is to give a conversation chat participant 
  a phone number for a Group MMS conversation.
// https://www.twilio.com/docs/conversations/group-texting?code-sample=code-add-a-chat-participant-real-estate-agent&code-language=Node.js&code-sdk-version=4.x
//    "identity": "davehere",
//    "messaging_binding": {
//      "type": "sms",
//      "projected_address": "+15017122661"     // A Twilio phone number to send messages to the Group MMS participants
//    },

++ Create an SMS participant for a Group SMS conversation.
// https://www.twilio.com/docs/conversations/group-texting?code-sample=code-add-an-sms-participant-homebuyer-1&code-language=Node.js&code-sdk-version=4.x
//    "identity": null,
//    "messaging_binding": {
//      "type": "sms",
//      "address": "+15017122661"
//    },
````

----------------------------------------------------------------------------------
Cheers
