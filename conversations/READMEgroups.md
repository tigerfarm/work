----------------------------------------------------------------------------------
# Conversations Group Messaging Notes

You can build a group texting application using the Twilio Conversations API. 
This documentation covers how to manage a conversation that has a group of participants
for group SMS texting using Twilio Conversations.

Documentation and sample code links:
+ [Conversations quickstart](https://www.twilio.com/docs/conversations/quickstart):
Create SMS and chat participants and exchange messages between the participants.
The sample programs are server side(command line) programs.
+ [Conversations resource API](https://www.twilio.com/docs/conversations/api/conversation-resource):
    Conversation management: Create, fetch, update, and delete a conversation.
+ [Participants](https://www.twilio.com/docs/conversations/api/conversation-participant-resource).
    Add and manage SMS and chat participants in a conversation.
+ If a message is sent to your group messaging Twilio phone number,
    each of the conversation's participants will receive the message.
+ [Create messages](https://www.twilio.com/docs/conversations/api/conversation-message-resource):
Use a program to create/add messages into the conversations, which are then sent to each of the participants.

### Scenario steps:
````
Create a conversation.
Add sms participant#1 into the conversation, using parameters:
    Moble phone number(messagingBinding.address)
    + Twilio phone number(messagingBinding.proxyAddress)
    + conversation SID
Add sms participant#2 into the conversation, using parameters:
    Moble phone number(messagingBinding.address)
    + Twilio phone number(messagingBinding.proxyAddress) Note: can be a different Twilio phone number.
    + conversation SID
Add chat participant#3 into the same conversation.
    Chat identity + conversation SID
When Participant#1 sends an SMS to the conversation Twilio phone number(messagingBinding.proxyAddress).
      Participant#2 will receive SMS messages from the Twilio phone number(messagingBinding.proxyAddress).
      Participant#3 will receive a chat message on their Conversations chat client, identified as #1's Moble phone number. 
When Participant#2 sends an SMS to your conversation Twilio phone number,
      Participant#1 will receive SMS messages.
      Participant#3 will receive a chat message on their Conversations chat client, identified as #2's Moble phone number. 
When Participant#3 uses your Conversations chat client to send a message to the conversation,
      Participant#1 will receive SMS messages.
      Participant#2 will receive SMS messages.
````
Message routing:
````
Participant#1 >> SMS >> Twilio >> Conversations service + conversation >> message to the other participants
Participant#2 >> SMS >> Twilio >> Conversations service + conversation >> message to the other participants
Participant#3 >> Chat >> Twilio >> Conversations service + conversation >> message to the other participants
````

#### Program steps to create a test group of participants.

The programs used in the following, can be found on this [GitHub responsitory](./).
````
$ export CONVERSATIONS_SERVICE_SID=IS5c86b7d0d6e44133acb09734274f94f6
$ echo $CONVERSATIONS_SERVICE_SID
IS5c86b7d0d6e44133acb09734274f94f6

$ node servicesConversationCreate.js
++ Create a conversation.
+ Messaging Service SID: IS5c86b7d0d6e44133acb09734274f94f6, Friendly and unique Name: Group Messaging
+ Conversation SID: CH1b50448d6e5641d2929207cfd3c4dcde Group Messaging

$ export CONVERSATION_SID=CH1b50448d6e5641d2929207cfd3c4dcde
$ echo $CONVERSATIONS_SERVICE_SID
IS5c86b7d0d6e44133acb09734274f94f6

$ node servicesConversationParticipantCreateChat.js
++ Create an Chat participant for a conversation.
+ Conversations service SID: IS5c86b7d0d6e44133acb09734274f94f6
+ Conversation SID: CH1b50448d6e5641d2929207cfd3c4dcde
+ Participant Identity: daveg1
+ Created participant, SID: MBa34fcc12c7264fbebdf0fa5a1e55e837

$ node servicesConversationParticipantCreateSms.js
++ Create an SMS participant for a Conversation.
+ Conversation SID: CH1b50448d6e5641d2929207cfd3c4dcde
+ participantIdentitySms: +16505552222
+ conversationProxyAddress: +12095558688
+ Created participant, SID: MBbb2b92a325684eb4ad6b6503cea355d1

$ node servicesConversationParticipantCreateSms.js
++ Create an SMS participant for a Conversation.
+ Conversation SID: CH1b50448d6e5641d2929207cfd3c4dcde
+ participantIdentitySms: +16505558893
+ conversationProxyAddress: +12095558688
+ Created participant, SID: MB935888a50136442990f010cb5cec9db7

$ node servicesConversationParticipantsList.js
++ List Participants for a Conversation.
+ Conversations service SID: IS5c86b7d0d6e44133acb09734274f94f6
+ Conversation SID: CH1b50448d6e5641d2929207cfd3c4dcde
+ Participant SID: MB935888a50136442990f010cb5cec9db7 Messaging: sms:  +16505558893:  +12095558688
+ Participant SID: MBbb2b92a325684eb4ad6b6503cea355d1 Messaging: sms:  +16505552222:  +12095558688
+ Participant SID: MBa34fcc12c7264fbebdf0fa5a1e55e837 identity, Chat: daveg1
````

### Case where there is more than 2 participants in a Conversation and at least 1 is an SMS participant.

The issue, is that the SMS participant does not know who sent/created the new conversation message.
The following shows a method to add the from-conversation-user-identity into the message.

````
Add a Twilio Function that will add the from-participant's identity into the message.
This way, the SMS participants will know who sent the message.
The Twilio Function would be set as the conversation's Pre-Event URL where onMessageAdd is checked.
Then, when a message is added into the coversation,
the Twilio Function will add the from-participant's identity into the message,
then the message will be sent the other participants with the from-participant's identity in the message.
````

Scenario sequence:
````
SMS participant(+16505551111) sends a message to the conversation twilio phone number: "Hello".
Twilio SMS service receives the message: "Hello".
The Twilio Convesations backend receives the message.
The Twilio Function adds the from-participant's identity into the message: "From: +16505551111, Hello".
The enhanced message is sent by the Twilio Conversations backend to participants of the conversation.
The enhanced message received by participants: "From: +16505551111, Hello".
````

Sample Twilio Function to add the from-participant's identity into the message.
````
// Sample test URL:
//  https://abouttime-2357.twil.io/conversationMsgModify?ClientIdentity=+16505551111&Body=Hello1
// Documentation:
//  https://www.twilio.com/docs/chat/webhook-events#using-pre-event-webhooks-to-modify-or-reject-changes
// Sample Conversations GET request from a chat participant:
//  + GET URL : .../conversation?ClientIdentity=dave&RetryCount=0&EventType=onMessageAdd&Attributes=%7B%7D&Author=dave&ChatServiceSid=IS5c86b7d0d6e44133acb09734274f94f6&ParticipantSid=MB0dc5ab0098d44e57bf7441eb9ac53cb8&Body=yes&AccountSid=ACa...3&Source=SDK&ConversationSid=CH1b50448d6e5641d2929207cfd3c4dcde
// Sample Conversations GET request from an SMS participant:
//  + GET URL : https://tfpecho.herokuapp.com/pre?RetryCount=0&EventType=onMessageAdd&Attributes=%7B%7D&Author=%2B16505551111&ChatServiceSid=IS5c86b7d0d6e44133acb09734274f94f6&ParticipantSid=MB935888a50136442990f010cb5cec9db7&Body=you+got+it!&AccountSid=ACa...3&Source=SMS&ConversationSid=CH1b50448d6e5641d2929207cfd3c4dcde
exports.handler = function (context, event, callback) {
    // event.ClientIdentity is from a chat participant.
    let participantIdentity = event.ClientIdentity || null;
    if (participantIdentity === null) {
        // event.Author is from an SMS participant.
        participantIdentity = event.Author || null;
        if (participantIdentity === null) {
           console.log("-- Required parameter: ClientIdentity or Author which is the author of the message.");
           callback(null, "-- Required parameter: ClientIdentity or Author which is the author of the message.");
        return;
        }
    }
    let messageText = event.Body || null;
    if (messageText === null) {
        console.log("-- Required parameter: Body.");
        callback(null, "-- Required parameter: Body.");
        return;
    }
    console.log("+ Conversation message from: " + participantIdentity + ", Msg: \"" + messageText + "\"");
    let modifiedMessage = "From: " + participantIdentity + ", " + messageText
    console.log( "+ Modified Message: \"" + modifiedMessage + "\"");
    return callback(null, { "body": modifiedMessage });
}
````

----------------------------------------------------------------------------------
Cheers
