----------------------------------------------------------------------------------
# Twilio Conversations Notes

#### Configuring and getting started

You'll need to have a [Twilio account](https://www.twilio.com/console).

You'll need at least one Conversations service SID(starts with IS).
Twilio Console [link](https://www.twilio.com/console/conversations/services) to create a Conversations service. 

Conversations push notifications uses Twilio Notify under the hood, uses Notify logs.

##### Twilio Conversations JavaScript Web Application

See the repository: [tfpconversations](https://github.com/tigerfarm/tfpconversations).
It uses the
[JavaScript docs](http://media.twiliocdn.com/sdk/js/conversations/releases/1.2.1/docs/Conversation.html).

## Command line programs, Using the Conversations API

Documentation [API Overview link](https://www.twilio.com/docs/conversations/api)

A Conversation has the following resources:
[Services](https://www.twilio.com/docs/conversations/api/service-resource)
[Conversation](https://www.twilio.com/docs/conversations/api/conversation-resource),
[Participants](https://www.twilio.com/docs/conversations/api/conversation-participant-resource),
[Messages](https://www.twilio.com/docs/conversations/api/conversation-message-resource), and 
[Conversation Webhooks](https://www.twilio.com/docs/conversations/api/conversation-scoped-webhook-resource)

##### Note, the Conversation, Participants, and Messages Resource sample programs use the Default Conversations Service SID

For example, if you want to list conversations you can use the 
[documentation sample](https://www.twilio.com/docs/conversations/api/conversation-resource?code-sample=code-read-multiple-conversation-resources&code-language=Node.js&code-sdk-version=3.x)
to list the conversations in the default Conversations service.
Click [here](https://github.com/tigerfarm/work/blob/master/book/AndroidConversations/servicesConversation.js)
for a program that will list the conversations in the choosen Conversations service.

To get started, I create a sample Node.JS program to manage each of the resources.
For example, a program for each: create, fetch one, list all, update one, and delete one.

Note, to exchange messages with the Conversations command line program created based on the documentation,
create access tokens using the [Default Conversation Service SID](https://www.twilio.com/console/conversations/configuration/defaults),
not any other Conversations service SID.
This is because the documentation Conversation, Participants, and Messages command line programs only work with the Default Conversation Service SID.

--------------------------------------------------------------------------------
## Conversations with a Studio flow Bot

[Documentation](https://www.twilio.com/docs/conversations/connect-to-studio)

In the Studio flow,
+ Set your Trigger Incoming Conversation option to link to your Send & Wait for Reply widget.
+ If initiating from a Studio REST API request,
set your Trigger REST API option to link to your Send & Wait for Reply widget.

### Setup

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

$ twilio api:conversations:v1:conversations:participants:list --conversation-sid=CHeae275b5ee0145ea9ffadd40ac0ec377
SID                                 Messaging Binding                                                     
MB662ecab5f9b94b25ae1025d32ca02c1e  {"proxy_address":"+16505558221","type":"sms","address":"+16505552222"}
````

### Test

Send a text to the ProxyAddress you specified in your MessagingBinding using the phone number you used as the Address.
````
Send an SMS from +16505552222 to +16505558221: hello.
````

Intiate an outbound conversation.
````
curl -X POST 'https://studio.twilio.com/v2/Flows/FWd1aa3231073181f8c812d4a77411767f/Executions' -d "From=16505558221" -d "To=16505552222" \
-u $MASTER_ACCOUNT_SID:$MASTER_AUTH_TOKEN
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

----------------------------------------------------------------------------------
## Use the Twilio CLI to Generate Conversations Access Tokens

You can generate a token in a few ways:
* Using a [command line](https://www.twilio.com/docs/conversations/create-tokens) and 
[twilio token plugin](https://github.com/twilio-labs/plugin-token) (Recommended)
* Using [Twilio Runtime Function](https://www.twilio.com/docs/runtime/functions)

For the twilio-cli option, run the following command and enter the resulting token into the strings.xml placeholder:
 ````
twilio token:chat --identity <The test username> --chat-service-sid <ISXXX...>

twilio token:chat --identity dave --chat-service-sid IS973ddbf230364f8dab02c6418779a602
````
Note: You need to generate an access token with a ChatGrant for a Conversations user to use the Twilio Conversations Client SDK.
Manually generated tokens expire after a timeout period. So you will need to replace the token.
To use this in production software, you would typically create a token endpoint in your back end application
that uses your existing user authentication strategy.

Following is the token display using the [JWT.io](https://jwt.io/) website.
Note, this token expires in one hour .
````
{
  "jti": "ACa...3-1623781947",
  "grants": {
    "identity": "dave1",
    "chat": {
      "service_sid": "IS97...02"
    }
  },
  "iat": 1623781947,
  "exp": 1623785547,
  "iss": "ACa...3",
  "sub": "ACa...3"
}
````

----------------------------------------------------------------------------------
## Android Quickstart App

The general Twilio Conversations quickstart [link](https://www.twilio.com/docs/conversations/quickstart).

The Android quickstart app is a lightweight Android app developed using 
[Twilio Conversations](https://www.twilio.com/docs/conversations).

Conversations Android Quickstart 
[GitHub link](https://github.com/TwilioDevEd/conversations-quickstart-android) with a brief Readme file, and
the [documentation link](https://www.twilio.com/docs/conversations/android/exploring-conversations-android-quickstart).

#### Implementing a Hard Coded Token

`test_access_token` is the placeholder in the `strings.xml` resource for the manually generated access token.

Location of the strings.xml file:
````
/.../conversations-quickstart-android-main/app/src/main/res/values/strings.xml
````
Sample:
````
<resources>
    <string name="app_name">Dave\'s Conversations App</string>
    <string name="error_retrieving_access_token">Error retrieving access token from the server.</string>
    <string name="send">Send1</string>
    <string name="chat_token_url">https://YOUR_DOMAIN_HERE.twil.io/chat-token</string>
    <string name="write_message">Dave: Write Message</string>
    <string name="test_access_token">eyJhbGciOi...pogFA8</string>
</resources>
````

#### Program: MainActivity.java.

App identity is hard coded.
Token string is used here.
Note, the hard coded identity needs to match the identity in the token.
````
/.../conversations-quickstart-android-main/app/src/main/java/com/twilio/conversationsquickstart/MainActivity.java

private String identity = "dave1";

// Token Method 1 - supplied from strings.xml as the test_access_token
quickstartConversationsManager.initializeWithAccessToken(this, getString(R.string.test_access_token));
````

#### Program file, QuickstartConversationsManager.java,

The Conversation name is hard coded.
````
private final static String DEFAULT_CONVERSATION_NAME = "general";
````
----------------------------------------------------------------------------------
### Issues

Issues I worked through:
+ Get the webhook to work, when a message is added.
+ Android Studio updates: add an emulator for Android 11.
  Adding an emulator is straight forward. And my new phone was recognized immediately by Studio.
+ Get the access token to work. It can be used in the Android sample app,
  and is use in the repository: [tfpconversations](https://github.com/tigerfarm/tfpconversations)

The Conversations webhook details:
+ The [Default Conversation Service SID](https://www.twilio.com/console/conversations/configuration/defaults)
    when using API calls such as my command line programs.
+ SDK calls will trigger webhooks from services other than the Default Conversation Service SID.
    I haven't tested this, but I got it for a reliable source.

The Android Studio sample app requires a hard coded token for testing.
Since I was using the Twilio CLI to generate tokens, I needed to add the Twilio token plugin.
I thought that was only recommended, but it turns out to required.

Based on my work to solve the token issue, I suggested a 
[documentation](https://www.twilio.com/docs/conversations/error-handling-diagnostics#android-logging-java)
change from:
````
ConversationsClient.setLogLevel(android.util.Log.DEBUG);
````
To:
````
ConversationsClient.setLogLevel(ConversationsClient.LogLevel.DEBUG);
````
This allowed me to view the debug messages that statement the authorization problem
because the token was generated incorrectly.
Once I added the Twilio token plugin to my Twilio CLI, the token generated fine.

Following is where I added the line into the program: QuickstartConversationsManager.java.
````
...
    void initializeWithAccessToken(final Context context, final String token) {
        Log.e(MainActivity.TAG, "+ initializeWithAccessToken(..., " + token + ")");
        ConversationsClient.setLogLevel(ConversationsClient.LogLevel.DEBUG);
        ConversationsClient.Properties props = ConversationsClient.Properties.newBuilder().createProperties();
        ConversationsClient.create(context, token, props, mConversationsClientCallback);
    }
...
````

----------------------------------------------------------------------------------
Cheers
