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
