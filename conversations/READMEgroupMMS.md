----------------------------------------------------------------------------------
# Group MMS Conversations Notes

Group Texting in Conversations
https://www.twilio.com/docs/conversations/group-texting
Scenario 1: Set up a group message with one Chat participant and two SMS participants
Step 1: Create the Conversation
Step 2: Add the real estate agent which is a chat participant for the conversation
Uses a Messaging Binding Projected Address, a Twilio phone number.
Step 3: Add the first homebuyer that is a regular SMS conversation participant.
Uses a Messaging Binding Address that is the person's mobile phone number.
Step 4: Send a 1:1 message. The chat participant creates the conversation message.
Step 5: Add the second homebuyer to the group text
Uses a Messaging Binding Address that is the person's mobile phone number.
Step 6: Send another message. The chat participant creates another conversation message.

## Type of Twilio Conversations Participants

10 max in a group MMS conversations.

### Participant types for regular conversations, a non-Group MMS conversations
````
++ Create one chat participant for the conversation.
// https://www.twilio.com/docs/conversations/api/conversation-participant-resource?code-sample=code-create-conversation-participant-chat&code-language=Node.js&code-sdk-version=4.x
//    "identity": "davehere",
//    "messaging_binding": null,

++ Create up to 9 SMS participants for a Conversation.
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
