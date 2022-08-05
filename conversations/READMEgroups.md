----------------------------------------------------------------------------------
# Conversations Group Messaging Notes

You can build a group texting application using the Twilio Conversations API. 
The documentation covers how to manage a conversation that has a group of participants
for group texting using Twilio Conversations.

[Conversations quickstart](https://www.twilio.com/docs/conversations/quickstart)
to create SMS and chat participants and exchange messages between the participants.
The sample programs are server side(command line) programs.

+ Create a conversation object using the 
[Conversations resource API](https://www.twilio.com/docs/conversations/api/conversation-resource):
Create, fetch, update, and delete a conversation.
+ Add and manage SMS and chat participants in a conversation.
[Participants](https://www.twilio.com/docs/conversations/api/conversation-participant-resource).
+ If a message is sent to your Twilio phone number that you are using for group messaging,
each of the conversation's participants will receive the message.
+ Or, use a program to [create messages](https://www.twilio.com/docs/conversations/api/conversation-message-resource)
into the conversations, then each of the participants would receive the messages.

Scenario steps:
````
Add sms participant#1 into a conversation:
    Moble phone number(messagingBinding.address)
    + Twilio phone number(messagingBinding.proxyAddress)
    + conversation SID
Add sms participant#2 into a conversation.
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

### When there is more than 2 participants in a Conversation and at least 1 is an SMS participant

Add a Twilio Function to add the from-participant's identity into the message.
This way, the SMS participant will know who sent the message.
The Twilio Function would be set as the conversation's Pre-Event URL
where onMessageAdd is checked.
Then, when a message is added into the coversation,
the message will be sent the other participants with the from-participant's identity in the message.

For example,
````
Message added: "Hello"
Message received by participants: "From: +16505551111, Hello"
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
    // Cevent.lientIdentity is from a chat participant.
    // event.Author is from an SMS participant.
    let participantIdentity = event.ClientIdentity || null;
    if (participantIdentity === null) {
        participantIdentity = event.Author || null;
        if (participantIdentity === null) {
           console.log("-- Required parameter: ClientIdentity which is the author of the message.");
           callback(null, "-- Required parameter: ClientIdentity which is the author of the message.");
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

### Using the Same Mobile Phone Number in Multiple Conversations

When having one person (one person's SMS phone number) in multiple conversations,
use multiple Twilio phone numbers.
Each Twilio phone number is mapped to a separate conversation.
````
Unique combination:
 Person's SMS phone number + Twilio phone number >> matched to a conversation
For example:
 Person's SMS phone number +16505551111 + Twilio phone number #1
   >> matched to conversation #1
 Person's SMS phone number +16505551111 + Twilio phone number #2
   >> matched to conversation #2
 Person's SMS phone number +16505552222 + Twilio phone number #1 
   >> matched to conversation #1 
 Person's SMS phone number +16505553333 + Twilio phone number #1 
   >> matched to conversation #2
````
You just need to have the "Person's SMS phone number + Twilio phone number" unique, 
and matched to any one conversation.

Note, the number of Twilio phone numbers required, is the maximum number of active conversations per participant. 
If you have a maximum of 5 conversations at one time (for one person's phone number), 
the cost would be $5/month for 5 Twilio phone numbers.
* The number of phone numbers required, is the maximum number of active questions per user.

----------------------------------------------------------------------------------
Cheers
