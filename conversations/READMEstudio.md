
----------------------------------------------------------------------------------
# Twilio Conversations Configure to use a Studio Flow

--------------------------------------------------------------------------------
## Conversations with a Studio flow Bot

[Documentation](https://www.twilio.com/docs/conversations/connect-to-studio)

### Setup Getting Started Overview

Components:
+ In a new Studio flow, set your Trigger Incoming Conversation option 
    to link to your Send & Wait for Reply widget.
+ The proxy_address Twilio phone number is configured with NoSmsResponse(to not process).
    The reason is that the conversation will process the message.

#### Create and configure a conversation.

Note, cannot copy and paste the command from the
[Documentation link](https://www.twilio.com/docs/conversations/connect-to-studio#existing-conversations).

The following works.
````
$ twilio api:conversations:v1:conversations:create --friendly-name "Studio-Conversations"
SID                                 Chat Service SID                    Friendly Name         Date Created                 
CHeae275b5ee0145ea9ffadd40ac0ec377  IS186702e405b74452a449d67b9265669f  Studio-Conversations  Jul 08 2022 15:46:29 GMT-0700
````
Add a conversation webhook to forward inbound conversation messages to the Studio flow.
````
twilio api:conversations:v1:conversations:webhooks:create \
--target studio \
--conversation-sid CHeae275b5ee0145ea9ffadd40ac0ec377 \
--configuration.flow-sid FWd1aa3231073181f8c812d4a77411767f
SID                                 Target
WH351aaf74dc4b415e9b3feab9718c5cf8  studio

$ twilio api:conversations:v1:conversations:webhooks:list --conversation-sid=CHeae275b5ee0145ea9ffadd40ac0ec377
SID                                 Target
WH351aaf74dc4b415e9b3feab9718c5cf8  studio

$ twilio api:conversations:v1:conversations:webhooks:list --conversation-sid=CHeae275b5ee0145ea9ffadd40ac0ec377 -o json
[
  {
    "accountSid": "ACae0e356ccba96d16d8d4f6f9518684a3",
    "configuration": {
      "flow_sid": "FWd1aa3231073181f8c812d4a77411767f"
    },
    "conversationSid": "CHeae275b5ee0145ea9ffadd40ac0ec377",
    "dateCreated": "2022-07-08T22:50:39.000Z",
    "dateUpdated": "2022-07-08T22:50:39.000Z",
    "sid": "WH351aaf74dc4b415e9b3feab9718c5cf8",
    "target": "studio",
    "url": "https://conversations.twilio.com/v1/Conversations/CHeae275b5ee0145ea9ffadd40ac0ec377/Webhooks/WH351aaf74dc4b415e9b3feab9718c5cf8"
  }
]
````
Add an SMS participant into the conversation.
````
twilio api:conversations:v1:conversations:participants:create \
--conversation-sid CHeae275b5ee0145ea9ffadd40ac0ec377 \
--messaging-binding.address +16505552222 \
--messaging-binding.proxy-address +16505558221
SID                                 Messaging Binding                                                     
MBb5837899193940d4812840440d5bef5e  {"proxy_address":"+16505558221","type":"sms","address":"+16505552222"}

twilio api:conversations:v1:conversations:participants:list --conversation-sid=CHeae275b5ee0145ea9ffadd40ac0ec377
SID                                 Messaging Binding                                                     
MB662ecab5f9b94b25ae1025d32ca02c1e  {"proxy_address":"+16505558221","type":"sms","address":"+16505552222"}
````

### Test

Send a text to the ProxyAddress you specified in the above Messaging Binding 
using the phone number you used as the Address.
````
Send an SMS from +16505552222 to +16505558221: hello.
````

Intiate an outbound conversation.
````
curl -X POST 'https://studio.twilio.com/v2/Flows/FWd1aa3231073181f8c812d4a77411767f/Executions' -d "From=16505558221" -d "To=16505552222" \
-u $MAIN_ACCOUNT_SID:$MAIN_AUTH_TOKEN
````

### Notes

When using auto-create, it does not create the webhook to the Studio flow.
This is required to forward inbound messages to the Studio flow.
[Create documentation link](https://www.twilio.com/docs/conversations/conversations-webhooks?code-sample=code-create-new-scoped-webhook-configuration&code-language=PHP&code-sdk-version=6.x)
Use target: studio, instead of webhook.
 
Confirm that the conversation, CH49cf9fa0c0e44bfeab85c0af5e94915f, webhook is set to your Studio flow.
Following is a link to sample programs.
https://www.twilio.com/docs/conversations/conversations-webhooks?code-sample=code-retrieve-existing-global-webhook-configuration-for-a-conversation-service&code-language=curl&code-sdk-version=json

Following is my conversation, CHeae275b5ee0145ea9ffadd40ac0ec377, configured to my Studio flow: FWd1aa3231073181f8c812d4a77411767f.
````
$ twilio api:conversations:v1:conversations:webhooks:list --conversation-sid=CHeae275b5ee0145ea9ffadd40ac0ec377 -o json
[
{
  "accountSid": "ACae0e356ccba96d16d8d4f6f9518684a3",
  "configuration": {
    "flow_sid": "FWd1aa3231073181f8c812d4a77411767f"
  },
  "conversationSid": "CHeae275b5ee0145ea9ffadd40ac0ec377",
  "dateCreated": "2022-07-08T22:50:39.000Z",
  "dateUpdated": "2022-07-08T22:50:39.000Z",
  "sid": "WH351aaf74dc4b415e9b3feab9718c5cf8",
  "target": "studio",
  "url": "https://conversations.twilio.com/v1/Conversations/CHeae275b5ee0145ea9ffadd40ac0ec377/Webhooks/WH351aaf74dc4b415e9b3feab9718c5cf8"
}
]
````

### Other test

Create a chat participant and send a message from them.
````
twilio api:conversations:v1:conversations:participants:create \
--conversation-sid CHeae275b5ee0145ea9ffadd40ac0ec377 \
--identity "davec1"
SID                                 Messaging Binding
MB5dfa138758174c9eb0b6ece781c6b5b6  null

twilio api:conversations:v1:conversations:messages:create \
>     --conversation-sid CH477844eae3134807afd976b0337f4e6d \
>     --author davec1 \
>     --body "hello 1"
SID                                 Index  Author  Date Created                 
IM7ab7bffddd504877a35eb63c40fdd545  55     davec1  Oct 18 2023 15:14:05 GMT-0700
````
The message is received by the SMS particpiant.
The message is not processed by the Studio.

Delete the chat participant.
````
$ twilio api:conversations:v1:conversations:participants:remove \
>     --conversation-sid CH477844eae3134807afd976b0337f4e6d \
>     --sid MB5dfa138758174c9eb0b6ece781c6b5b6
The resource was deleted successfully
````

----------------------------------------------------------------------------------
Cheers
