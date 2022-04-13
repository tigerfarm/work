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
 Person's SMS phone number +16505551111 + Twilio phone number #1 >> matched to conversation #1 Person's SMS phone number +16505551111 + Twilio phone number #2 >> matched to conversation #2 Person's SMS phone number +16505552222 + Twilio phone number #1 >> matched to conversation #1 Person's SMS phone number +16505553333 + Twilio phone number #1 >> matched to conversation #2
````
You just need to have the "Person's SMS phone number + Twilio phone number" unique, 
and matched to any one conversation.

Note, the number of Twilio phone numbers required, is the maximum number of active conversations per participant. 
If you have a maximum of 5 conversations at one time (for one person's phone number), 
the cost would be $5/month for 5 Twilio phone numbers.
* The number of phone numbers required, is the maximum number of active questions per user.

### WhatsApp notes

Server side or command line programs to get started with Twilio Conversations, the quickstart:
[Twilio account](https://www.twilio.com/docs/conversations/quickstart).
Includes creating SMS and chat participants.
Use the same code to create a WhatsApp participant.

### Twilio Frontline with WhatsApp

Twilio [Frontline with WhatsApp](https://www.twilio.com/docs/frontline)
Leverage WhatsApp templates functionality to send configured templated messages to your customers.

From the Twilio Console:
````
Develop/Frontline/Manage/Callbacks: Templates Callback URL
````
I added in the URL, for example: https://example.com/callbacks/templates,
and now I see that when I click the icon in my Frontline app conversation, 
I get the list of Templates, which matches the templates in template.js.

I'm using the Twilio demo application. Here is my sample:
[template.js](https://github.com/twilio/frontline-demo-service/blob/main/src/routes/callbacks/templates.js)
that feeds my Frontline app the templates:

I setup my Frontline system to use the Twilio WhatsApp Sandbox.
Results of my testing:
+ I can use a program(I use curl) to send template messages to my WhatsApp user.
+ In my WhatsApp user app, I can receive and read messages from my program.
+ In my WhatsApp user app, I can send messages to my Frontline user.
+ In my Frontline app, I can receive and read messages from my WhatsApp user.
+ In my Frontline app, I can reply to the received messages from my WhatsApp user.
+ In my WhatsApp user app, I can receive and read messages from my Frontline user.

To use Twilio WhatsApp Sandbox templates:
+ Add the Sandbox template into .../routes/callbacks/templates.js.
+ Where required, add template parameters for the template. For example, I added a Sandbox template in the following:
[template.js](https://github.com/twilio/frontline-demo-service/blob/main/src/routes/callbacks/templates.js).
+ In the Frontline app, when selecting a WhatsApp conversation, if not within a 24 hour session, I'm prompted to select a template. For example: "Reach out to John". When I click the Reach-out prompt, I can see the Sandbox templated message with the parameters filled in. If I click it, it's sent to my WhatsApp user.
+ In my WhatsApp user app, I can receive and read the templated message from my Frontline user.

Note,
Frontline doesn’t automatically recognize templates that are approved at the account level, you need to serve a template in the integration service via the templates callback URL and indicate that it’s whatsAppApproved: true


----------------------------------------------------------------------------------
Cheers
