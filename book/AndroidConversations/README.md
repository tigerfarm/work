----------------------------------------------------------------------------------
# Conversations Quickstart App for Android Notes

The app is a lightweight Android application for [Twilio Conversations](https://www.twilio.com/docs/conversations).

Twilio Conversations quickstart [link](https://www.twilio.com/docs/conversations/quickstart).

Conversations Android Quickstart 
[documentation link](https://www.twilio.com/docs/conversations/android/exploring-conversations-android-quickstart),
[GitHub link](https://github.com/TwilioDevEd/conversations-quickstart-android) with a brief Readme file.

## Configuring and getting started

You'll need to have a [Twilio account](https://www.twilio.com/console).

You'll need a Conversations Service SID(starts with IS).
Twilio Console [link](https://www.twilio.com/console/conversations/services) to create a Conversations service. 

----------------------------------------------------------------------------------
#### Issues

2 issues to work through:
+ Update a participant's identity
+ Get webhook to work, when a message is added

----------------------------------------------------------------------------------
## Using the  Conversations API

Documentation [API Overview link](https://www.twilio.com/docs/conversations/api)

A Conversation has the following resources:
[Conversation](https://www.twilio.com/docs/conversations/api/conversation-resource),
[Participants](https://www.twilio.com/docs/conversations/api/conversation-participant-resource),
[Messages](https://www.twilio.com/docs/conversations/api/conversation-message-resource), and 
[Conversation Webhooks](https://www.twilio.com/docs/conversations/api/conversation-scoped-webhook-resource)

To get started, I create a sample Node.JS program to manage each of the resources.
For example, a program for each: create, fetch one, list all, update one, and delete one.

----------------------------------------------------------------------------------
## Generate a Conversations Access Token

You can generate a token in a few ways:
* Using the [twilio-cli](https://www.twilio.com/docs/twilio-cli/quickstart) and 
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

`test_access_token` is the placeholder in the `strings.xml` resource for the manually generated access token.

Location of the strings.xml file:
````
/.../conversations-quickstart-android-main/app/src/main/res/values/strings.xml
````
Sample:
````
<resources>
    <string name="app_name">Dave\'s Conversations Quickstart</string>
    <string name="error_retrieving_access_token">Error retrieving access token from the server.</string>
    <string name="send">Send1</string>
    <string name="chat_token_url">https://YOUR_DOMAIN_HERE.twil.io/chat-token</string>
    <string name="write_message">Dave: Write Message</string>
    <string name="test_access_token">eyJhbGciOi...pogFA8</string>
</resources>
````
Token is used in the program: MainActivity.java.
````
/.../conversations-quickstart-android-main/app/src/main/java/com/twilio/conversationsquickstart/MainActivity.java

// Token Method 1 - supplied from strings.xml as the test_access_token
quickstartConversationsManager.initializeWithAccessToken(this, getString(R.string.test_access_token));
````

----------------------------------------------------------------------------------
Cheers
