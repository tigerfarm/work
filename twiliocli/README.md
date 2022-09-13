# Getting Started with Twilio Go Library

Twilio CLI [overview](https://www.twilio.com/cli),
[quickstart](https://www.twilio.com/docs/twilio-cli/quickstart),
[examples](https://www.twilio.com/docs/twilio-cli/examples),
[general-usage](https://www.twilio.com/docs/twilio-cli/general-usage).

Twilio CLI project repository: https://github.com/twilio/twilio-cli.

Twilio CLI project repository issues: https://github.com/twilio/twilio-cli/issues

Adam's Twilio CLI repository:
https://github.com/adamchasetaylor/twilio-cli-keys

----------------------------------------------------------------------------------
### Install

Requirement: [Node.js](https://nodejs.org/) >= 8.0

Install the CLI globally:
````
$ npm install --save -g twilio-cli
````

For future reference, to update the CLI:
````
$ npm update -g twilio-cli
````

If "npm" becomes missing, reinstall or update node.
````
$ npm -version
-bash: /opt/homebrew/bin/npm: No such file or directory
$ brew reinstall node
...
$ npm -version
7.20.3
````

Brew commands:
````
$ brew update
$ brew install node
$ brew upgrade node
$ brew reinstall node
````
Note, "reinstall" will bring back npm, when it disappears.

#### Create environment variables using the Recommended Method

Use your current account or subaccount SID.
The CLI will use the key-named environment variables. Run the Twilio command:
````
$ twilio
````
- Friendly Name: Twilio CLI.
- Key Type: Standard.

Click [here](https://twil.io/get-api-key) to use the Twilio Console to create an API key and secret text string.

Create environment variables:
- `TWILIO_ACCOUNT_SID` = your Account SID from [your console](https://www.twilio.com/console)
- `TWILIO_API_KEY` = your Twilio CLI API Key SID, starts with "SK".
- `TWILIO_API_SECRET` = the secret text string for the API Key.

----------------------------------------------------------------------------------
### Setting Up Multiple Profiles

Steps to add a subaccount profile.
````
$ twilio login AC5...1
...
[? The Account SID for your Twilio Account or Subaccount: AC5...1
[? Your Twilio Auth Token for your Twilio Account or Subaccount: [hidden]
[? Shorthand identifier for your profile: Writers
[? Account credentials are currently stored in environment variables and will take precedence 
over the "Writers" profile when connecting to Twilio, unless the "Writers" profile is explicitly specified. 
Continue setting up "Writers" profile? Yes
Created API Key SK6...9 and stored the secret in your keychain.
See: https://www.twilio.com/console/runtime/api-keys/SK6...9
twilio-cli configuration saved to "/Users/.../.twilio-cli/config.json"
Saved Writers.
$
````
The subaccount profile is now created.

Once the subaccount profile is created, you can view the newly created API key, 
from the Twilio Console: Account/Keys & Credentials/API keys & tokens.

In this example:
````
Twilio-cli for dave on F...R
SID: SK6...9
````
View the new profile.
````
$ cat /Users/.../.twilio-cli/config.json
{"email":{},"prompts":{},"projects":[{"id":"Writers","accountSid":"AC5...1"}],"activeProject":null}
$
$ twilio profiles:list
ID       Account SID                         Active
[env]    ACa...3                             true  
Writers  AC5...1                             false
$ twilio profiles:use Writers
set "Writers" as active profile
twilio-cli configuration saved to "/Users/.../.twilio-cli/config.json"
$ cat /Users/dave/.twilio-cli/config.json
{"email":{},"prompts":{},"projects":[{"id":"Writers","accountSid":"AC5...1"}],"activeProject":"Writers"}
$ twilio profiles:list
ID       Account SID                         Active
[env]    ACa...3                             true  
Writers  AC5...1                             false
$ 
````
The [env] profile will override the selected active profile.
To use the config.json profiles, remove the environment variable TWILIO_ACCOUNT_SID.
Here is how I remove it on my MacBook:
````
$ echo $TWILIO_ACCOUNT_SID
AC123...89
$ export TWILIO_ACCOUNT_SID=
$ echo $TWILIO_ACCOUNT_SID

$ twilio profiles:list
ID       Account SID                         Active
Writers  AC5...1                             true
machine  AC1...d                             false 
$ twilio profiles:use machine
set "machine" as active profile
twilio-cli configuration saved to "/Users/.../.twilio-cli/config.json"
$ twilio profiles:list
ID       Account SID                         Active
Writers  AC5...1                             false
machine  AC1...d                             true 
````
----------------------------------------------------------------------------------
### Send Messages

#### Send an SMS message.
````
$ twilio api:core:messages:create --help
Send a message from the account used to make the request
...
--account-sid=account-sid
--from=from
--to=to
--body=body

$ twilio api:core:messages:create --account-sid=$TWILIO_ACCOUNT_SID --from=+16505551111 --to=+16505552222 --body="Hello there."
SID                                 From          To            Status  Direction     Date Sent
SMd76001367dc84262b1e16183660e6ba4  +16505551111  +16505552222  queued  outbound-api           

$ twilio api:core:messages:create --from=+16505551111 --to=+16505552222 --body="Hello there."
SID                                 From          To            Status  Direction     Date Sent
SMd76001367dc84262b1e16183660e6ba4  +16505551111  +16505552222  queued  outbound-api           

````

#### Send an email message.

You will need a [SendGrid](https://sendgrid.com/) account. Use your SendGrid account email address as the from email address of the sender.

Click [here, Sending Email with Twilio SendGrid](https://www.twilio.com/docs/twilio-cli/general-usage#sending-email-with-twilio-sendgrid),
for documentation on sending an email.
````
$ twilio email:send --help
sends emails to single or multiple recipients using Twilio SendGrid
...
  --from=from                      Email address of the sender.
  --subject=subject                The subject line for an email.
  --text=text                      Text to send within the email body.
  --to=to
$ twilio email:send --from=me@example.com --to=you@example.com --subject="Subject this" --text="Hello there."
? Would you like to send an attachment? No
Your email containing the message "Hello there." sent from me@example.com to you@example.com with the subject line "Subject this" has been sent
````

### Navigating Help

Run the following commands to get help.
````
$ twilio
...
USAGE
  $ twilio [COMMAND]

COMMANDS
  api                    advanced access to all of the Twilio APIs
  autocomplete           display autocomplete installation instructions
  feedback               provide feedback to the CLI team
  help                   display help for twilio
  incoming-phone-number  show what Twilio phone numbers you have configured
  plugins                list installed plugins
  project                manage credentials for Twilio project

$ twilio api
...
COMMANDS
...
  api:lookups       resources under lookups.twilio.com
...

$ twilio api:lookups --help
...
COMMANDS
  api:lookups:v1  version 1 of the API

$ twilio api:lookups:v1 --help
...  api:lookups:v1:phone-numbers  Detailed information on phone numbers
$ twilio api:lookups:v1:phone-numbers --help
...  api:lookups:v1:phone-numbers:fetch  fetch a PhoneNumbers resource

$ twilio api:lookups:v1:phone-numbers:fetch --help
...
OPTIONS
  -l, --cli-log-level=(debug|info|warn|error|none)  [default: info] Level of logging messages.
  -o, --cli-output-format=(columns|json|tsv)        [default: columns] Format of command output.
  -p, --project=project                             Shorthand identifier for your Twilio project.
  --add-ons=add-ons                                 The unique_name of an Add-on you would like to invoke
  --add-ons-data=add-ons-data                       Data specific to the add-on you would like to invoke
  --country-code=country-code                       The ISO country code of the phone number
  --phone-number=phone-number                       (required) The phone number to fetch in E.164 format
  --properties=properties                           [default: callerName,countryCode,carrier] The properties you would like to display (JSON output always shows all properties).
  --type=type                                       The type of information to return
````

##### Using Lookups

Confirm a phone number.
````
$ twilio api:lookups:v1:phone-numbers:fetch --phone-number=+16505551234 --properties=nationalFormat
National Format
(650) 555-1234
````

On _any_ command, you can add `-o json` to change the output format to JSON.
````
$ twilio api:lookups:v1:phone-numbers:fetch --phone-number=+16505551234 -o json
[
  {
    "callerName": null,
    "countryCode": "US",
    "phoneNumber": "+16505551234",
    "nationalFormat": "(650) 555-1234",
    "carrier": null,
    "addOns": null,
    "url": "https://lookups.twilio.com/v1/PhoneNumbers/+16505551234"
  }
]
````
Once you have the JSON attribute names, you can use them in the "--properties" tag.
````
$ twilio api:lookups:v1:phone-numbers:fetch --phone-number=+16505551234 --properties=countryCode,nationalFormat,
Country Code  National Format
US            (650) 555-1234 
````

#### API Core

````
$ twilio api:core --help
... COMMANDS ...
  api:core:available-phone-numbers  Country codes with available phone numbers
...
  api:core:conferences              Voice call conferences
...
  api:core:incoming-phone-numbers   Incoming phone numbers on a Twilio account/project
...

$ twilio api:core:incoming-phone-numbers --help
COMMANDS
  api:core:incoming-phone-numbers:create            Purchase a phone-number for the account.
  api:core:incoming-phone-numbers:fetch             Fetch an incoming-phone-number belonging to the account used to make the request.
  api:core:incoming-phone-numbers:list              Retrieve a list of incoming-phone-numbers belonging to the account used to make the request.
  api:core:incoming-phone-numbers:remove            Delete a phone-numbers belonging to the account used to make the request.
  api:core:incoming-phone-numbers:update            Update an incoming-phone-number instance.
...
````
List command,
````
$ twilio api:core:incoming-phone-numbers:list
SID                                 Phone Number   Friendly Name 
PN1..............................Z  +16505557890   (650) 555-7890
PN2..............................W  +16505552357   (650) 555-2357
...
````
List only phone numbers that begin with "+1650".
````
$ twilio api:core:incoming-phone-numbers:list --phone-number="+1650"
````
A default listing, is for at most 50 phone numbers. 
````
$ twilio api:core:incoming-phone-numbers:list --no-limit
...
````
When using the fetch command, do include "api:core:".
````
$ twilio api:core:incoming-phone-numbers:fetch --sid=PN1...Z
SID                                 Phone Number  Friendly Name 
PN1..............................Z  +16505557890  (650) 555-7890

$ twilio api:core:incoming-phone-numbers:fetch --sid=PN1...Z --properties=friendlyName,dateCreated,capabilities
Friendly Name   Date Created                                               Capabilities   
(650) 555-7890  Mon Nov 20 2017 11:04:46 GMT-0800 (Pacific Standard Time)  [object Object]

$ twilio api:core:incoming-phone-numbers:fetch --sid=PN1...Z -o json
[
  {
    "accountSid": "AC1...Z",
    "addressSid": null,
    "addressRequirements": "none",
    "apiVersion": "2010-04-01",
    "beta": false,
    "capabilities": {
      "voice": true,
      "sms": true,
      "mms": true,
      "fax": true
    },
    "dateCreated": "2017-11-20T19:04:46.000Z",
    "dateUpdated": "2019-04-23T01:26:30.000Z",
    "friendlyName": "(650) 555-7890",
    "identitySid": null,
    "phoneNumber": "+16505557890",
    "origin": "twilio",
    "sid": "PN1...Z",
    "smsApplicationSid": "",
    "smsFallbackMethod": "POST",
    "smsFallbackUrl": "",
    "smsMethod": "POST",
    "smsUrl": "https://handler.twilio.com/twiml/EHa...8",
    "statusCallback": "",
    "statusCallbackMethod": "POST",
    "trunkSid": null,
    "uri": "/2010-04-01/Accounts/AC1...Z/IncomingPhoneNumbers/PN1...Z.json",
    "voiceApplicationSid": "",
    "voiceCallerIdLookup": false,
    "voiceFallbackMethod": "POST",
    "voiceFallbackUrl": "",
    "voiceMethod": "POST",
    "voiceUrl": "https://webhooks.twilio.com/v1/Accounts/AC1...Z/Flows/FW6...a",
    "emergencyStatus": "Inactive",
    "emergencyAddressSid": null
  }
]
````

Phone numbers available for purchase:
````
$ twilio api:core:available-phone-numbers:local:list --country-code US
Phone Number  Region  ISO Country  Address Requirements
+12097804046  CA      US           none                
+13236213646  CA      US           none                
+13239874629  CA      US           none  
...

$ twilio api:core:available-phone-numbers:local:list --country-code US --area-code 510
Phone Number  Region  ISO Country  Address Requirements
+15107613747  CA      US           none                
+15107613978  CA      US           none                
+15108005997  CA      US           none  
...

$ twilio api:core:available-phone-numbers:local:list --country-code US --in-region NY
Phone Number  Region  ISO Country  Address Requirements
+15185477074  NY      US           none                
+18452503736  NY      US           none                
+15188686191  NY      US           none                
+15188641018  NY      US           none                
+16072149237  NY      US           none
...
````

List Twilio phone numbers with selected properties:
````
$ twilio api:core:incoming-phone-numbers:list --properties=sid,phoneNumber,friendlyName,voiceUrl
...
````
List all properties for a specific Twilio phone number:
````
$ twilio api:core:incoming-phone-numbers:fetch --sid=PN1...Z -o json
````
Set the voice URL property to empty, which disables voice calls.
````
$ twilio api:core:incoming-phone-numbers:update   --sid PN1...Z   --voice-url ""
````

#### Conference calls
````
$ twilio api:core:conferences --help
... COMMANDS
  api:core:conferences:fetch         Fetch an instance of a conference
  api:core:conferences:list          Retrieve a list of conferences belonging to the account used to make the request
  api:core:conferences:participants  Conference participants
  api:core:conferences:recordings    Recordings of conferences
  api:core:conferences:update        update an Accounts resource

$ twilio api:core:conferences:list --help
... OPTIONS ...
  --friendly-name=friendly-name                     The string that identifies the Conference resources to read
  --status=(init|in-progress|completed)             The status of the resources to read

$ twilio api:core:conferences:list --status=in-progress
SID                                 Friendly Name  Status     
CF1d18648474636042929720608eccb578  support        in-progress

$ twilio api:core:conferences:update --help
... OPTIONS ...
  --sid=sid                                           (required) The unique string that identifies this resource
  --status=(completed)                                The new status of the resource
...

$ twilio api:core:conferences:update --sid=CF1d18648474636042929720608eccb578 --status=completed
SID                                 Friendly Name  Status   
CF1d18648474636042929720608eccb578  support        completed

$ twilio api:core:conferences:list --properties=friendlyName,dateCreated,status --date-created=2019-05-31
Friendly Name  Date Created                                               Status     
support        Fri May 31 2019 12:08:37 GMT-0700 (Pacific Daylight Time)  in-progress
sales          Fri May 31 2019 11:49:56 GMT-0700 (Pacific Daylight Time)  completed  
support        Fri May 31 2019 11:45:59 GMT-0700 (Pacific Daylight Time)  completed

````

----------------------------------------------------------------------------------
### Testing Twilo Programmable Chat

##### List Chat services.
````
$ twilio api:chat:v2:services
Top level scope for all chat resources
USAGE
  $ twilio api:chat:v2:services:COMMAND
COMMANDS
  api:chat:v2:services:bindings  Push notification subscription for users
  api:chat:v2:services:channels  Channels represent chat rooms
  api:chat:v2:services:create    create a Services resource
  api:chat:v2:services:fetch     fetch a Services resource
  api:chat:v2:services:list      list multiple Services resources
  api:chat:v2:services:remove    remove a Services resource
  api:chat:v2:services:roles     Roles determining user or member permissions
  api:chat:v2:services:update    update a Services resource
  api:chat:v2:services:users     Unique chat users within a chat service

$ twilio api:chat:v2:services:list
SID                                 Friendly Name                                           Date Created                 
ISb0f6d2b83ec44f91885008ef51eb7d6b  autopilot_simulator_UA96376fff94c83ea0349a3f97651f4f77  Aug 19 2021 17:11:41 GMT-0700
IS4ebcc2d46cda47958628e59af9e53e55  Default Conversations Service                           Jul 23 2020 10:03:03 GMT-0700
IS973ddbf230364f8dab02c6418779a602  chatService1                                            Jul 30 2018 16:58:17 GMT-0700
IS186702e405b74452a449d67b9265669f  Frontline Service                                       Jul 13 2021 18:14:52 GMT-0700
````
##### List channels for a service.
````
$ twilio api:chat:v2:services:channels
Channels represent chat rooms
USAGE
  $ twilio api:chat:v2:services:channels:COMMAND
COMMANDS
  api:chat:v2:services:channels:create    create a Channels resource
  api:chat:v2:services:channels:fetch     fetch a Channels resource
  api:chat:v2:services:channels:invites   Pending invitations to users to become channel members
  api:chat:v2:services:channels:list      list multiple Channels resources
  api:chat:v2:services:channels:members   Users joined to specific channels
  api:chat:v2:services:channels:messages  Individual chat messages
  api:chat:v2:services:channels:remove    remove a Channels resource
  api:chat:v2:services:channels:update    update a Channels resource
  api:chat:v2:services:channels:webhooks  Webhooks for specific channels

$ twilio api:chat:v2:services:channels:list --service-sid IS4ebcc2d46cda47958628e59af9e53e55
SID                                 Unique Name  Friendly Name     
CHb8fabd3cf43948ddaaaa6f34162f972f  chatc1a      chatc1a           
CH0d499dee76f04d5b97ee6bf27e72a3cd  tfpecho      tfpecho           
CH36ac5fb4a42e4f92a63155b4524fd8fb  null         Hello Conversation
CH56053c069586435795bf7c14417cead9  null         ReadyP1           
CHc97669141a784c92a74c296c84850d25  abc          abc               
CHeedba31ca8114e099294549b22fe3336  c1a          c1a  
````
##### List members in a channel.
````
$ twilio api:chat:v2:services:channels:members
Users joined to specific channels
USAGE
  $ twilio api:chat:v2:services:channels:members:COMMAND
COMMANDS
  api:chat:v2:services:channels:members:create  create a Members resource
  api:chat:v2:services:channels:members:fetch   fetch a Members resource
  api:chat:v2:services:channels:members:list    list multiple Members resources
  api:chat:v2:services:channels:members:remove  remove a Members resource
  api:chat:v2:services:channels:members:update  update a Members resource

$ twilio api:chat:v2:services:channels:members:list --service-sid IS4ebcc2d46cda47958628e59af9e53e55 --channel-sid CHc97669141a784c92a74c296c84850d25
SID                                 Identity  Date Created                 
MB07e08f36c62b4500ade72c3a82c96f2f  dave      Aug 12 2021 14:21:11 GMT-0700
MB54907865d0eb407c8208e228dd6a4216  dave2     Aug 12 2021 13:12:48 GMT-0700

$ twilio api:chat:v2:services:channels:members:fetch --service-sid IS4ebcc2d46cda47958628e59af9e53e55 --channel-sid CHc97669141a784c92a74c296c84850d25 --sid MB07e08f36c62b4500ade72c3a82c96f2f
SID                                 Identity  Date Created                 
MB07e08f36c62b4500ade72c3a82c96f2f  dave      Aug 12 2021 14:21:11 GMT-0700
````

----------------------------------------------------------------------------------
### Testing Twilo Conversations

````
$ twilio api:conversations:v1:conversations --help
TODO: Resource-level docs

USAGE
  $ twilio api:conversations:v1:conversations:COMMAND

COMMANDS
  api:conversations:v1:conversations:create        [PREVIEW] create a Conversations resource
  api:conversations:v1:conversations:fetch         [PREVIEW] fetch a Conversations resource
  api:conversations:v1:conversations:list          [PREVIEW] list multiple Conversations resources
  api:conversations:v1:conversations:messages      TODO: Resource-level docs
  api:conversations:v1:conversations:participants  TODO: Resource-level docs
  api:conversations:v1:conversations:remove        [PREVIEW] remove a Conversations resource
  api:conversations:v1:conversations:update        [PREVIEW] update a Conversations resource
  api:conversations:v1:conversations:webhooks      TODO: Resource-level docs
````

A Messaging Service SID is required to create Conversation.
````
$ twilio api:messaging:v1:services:list
SID                                 Friendly Name                     Date Created                 
MG507...........................04  Send to echo program              Aug 17 2018 17:15:05 GMT-0700
...
$ twilio api:conversations:v1:conversations:create --friendly-name="Hello Conversation" --messaging-service-sid=$MESSAGING_SERVICE_SID
SID                                 Friendly Name       Date Created                 
CHc1312b8f953047e18dfee082ee4f1722  Hello Conversation  Aug 22 2019 17:56:12 GMT-0700

$ twilio api:conversations:v1:conversations:list
SID                                 Friendly Name       Date Created                 
CHc1312b8f953047e18dfee082ee4f1722  Hello Conversation  Aug 22 2019 17:56:12 GMT-0700

$ twilio api:conversations:v1:conversations:participants --help
COMMANDS
  api:conversations:v1:conversations:participants:create  [PREVIEW] create a Participants resource
  api:conversations:v1:conversations:participants:fetch   [PREVIEW] fetch a Participants resource
  api:conversations:v1:conversations:participants:list    [PREVIEW] list multiple Participants resources
  api:conversations:v1:conversations:participants:remove  [PREVIEW] remove a Participants resource
  api:conversations:v1:conversations:participants:update  [PREVIEW] update a Participants resource

$ twilio api:conversations:v1:conversations:participants:create --help
OPTIONS
  --conversation-sid=conversation-sid                                The unique id of the [Conversation](https://www.twilio.com/docs/conversations/api/conversation-resource).
  --identity=identity                                                Chat User identity string.
  --messaging-binding.address=messaging-binding.address              The participant's mobile device phone number.
  --messaging-binding.proxy-address=messaging-binding.proxy-address  Your Twilio phone number that the participant is in contact with.

$ twilio api:conversations:v1:conversations:participants:create --conversation-sid=CHc1312b8f953047e18dfee082ee4f1722 --messaging-binding.proxy-address=$PHONE_NUMBER5 --messaging-binding.address=$MY_PHONE_NUMBER
SID                                 Messaging Binding
MB1523ab07d8ac48d0a5d64527f5bca729  [object Object]
````
Get a Chat user token, which has an identity, in this example, "david".
````
$ twilio api:conversations:v1:conversations:participants:create --conversation-sid=CHc1312b8f953047e18dfee082ee4f1722 --identity=david
SID                                 Messaging Binding
MB337ea915c8e14ab2ba1b275ffb2a7afb
````
Add a participant using 2 Twilio phone numbers.
````
$ twilio api:conversations:v1:conversations:participants:create --conversation-sid=CHc1312b8f953047e18dfee082ee4f1722 --messaging-binding.proxy-address=$PHONE_NUMBER4 --messaging-binding.address=$PHONE_NUMBER3
SID                                 Messaging Binding
MBd9467123ba6c4d54aed550f94925fa00  [object Object]

$ twilio api:conversations:v1:conversations:participants:list --conversation-sid=CHc1312b8f953047e18dfee082ee4f1722
SID                                 Messaging Binding
MB1523ab07d8ac48d0a5d64527f5bca729  [object Object]  
MB337ea915c8e14ab2ba1b275ffb2a7afb                   
MBd9467123ba6c4d54aed550f94925fa00  [object Object]
````

Information from the (quickstart)[https://www.twilio.com/docs/conversations/quickstart]
````
"messagingBindingAddress" => "Your Personal Mobile Number",
"messagingBindingProxyAddress" => "Your purchased Twilio Phone Number"
````

For your chat-service-sid, use the unique Chat service SID starting with "ISXXX..." that you copied after creating your Conversation.

Need to run the following to enable Conversations with a chat user.
````
$ twilio api:conversations:v1:conversations:list
SID                                 Chat Service SID                    Friendly Name       Date Created                 
CHc1312b8f953047e18dfee082ee4f1722  IS4feb8a8608fb4743a35f57687ae3a85a  Hello Conversation  Aug 22 2019 17:56:12 GMT-0700

$ twilio api:conversations:v1:conversations:participants:create --conversation-sid=CHc1312b8f953047e18dfee082ee4f1722 --identity=stacy
SID                                 Messaging Binding
MB337ea915c8e14ab2ba1b275ffb2a7afb


twilio api:conversations:v1:conversations:participants:remove --conversation-sid=CHc1312b8f953047e18dfee082ee4f1722 --identity=stacy

$ twilio api:conversations:v1:conversations:participants:fetch --conversation-sid=CHc1312b8f953047e18dfee082ee4f1722 --sid=MB1c323adb37444ed9961d52baa049ac4b -o json
[
  {
    "accountSid": "AC1b32414e8ab41e56e6393bcbba7d5a9d",
    "conversationSid": "CHc1312b8f953047e18dfee082ee4f1722",
    "dateCreated": "2019-08-23T22:50:56.000Z",
    "dateUpdated": "2019-08-23T22:50:56.000Z",
    "identity": "david",
    "messagingBinding": null,
    "sid": "MB1c323adb37444ed9961d52baa049ac4b",
    "url": "https://conversations.twilio.com/v1/Conversations/CHc1312b8f953047e18dfee082ee4f1722/Participants/MB1c323adb37444ed9961d52baa049ac4b"
  }
]

````
Use the above Chat Service SID(IS4feb8a8608fb4743a35f57687ae3a85a),
with the participants identity (david), to join the Conversation.

A Chat service was created in my account, Chat Service SID; IS4feb8a8608fb4743a35f57687ae3a85a.

Sample Conversations Chat web application:
https://codesandbox.io/s/github/TwilioDevEd/demo-chat-app

Side note regarding WhatsApp
````
twilio api:conversations:v1:conversations:participants:create -p zod \
    --conversation-sid CH2...0 \
    --messaging-binding.address whatsapp:+15125551111 \
    --messaging-binding.proxy-address "whatsapp:+15125552222"
````

Testing...
````
twilio api:conversations:v1:conversations:participants:list --conversation-sid=CHc1312b8f953047e18dfee082ee4f1722 
SID                                 Messaging Binding                                                    
MBd9467123ba6c4d54aed550f94925fa00  {"proxyAddress":"+16508668225","type":"sms","address":"+16508668232"}

twilio api:conversations:v1:conversations:list
SID                                 Chat Service SID                    Friendly Name       Date Created                 
CHc1312b8f953047e18dfee082ee4f1722  IS4feb8a8608fb4743a35f57687ae3a85a  Hello Conversation  Aug 22 2019 17:56:12 GMT-0700

twilio api:conversations:v1:conversations:remove --sid=CHc1312b8f953047e18dfee082ee4f1722
The resource was deleted successfully
````
----------------------------------------------------------------------------------

Testing 2
````
twilio api:conversations:v1:conversations:create --friendly-name="Hello Conversation" --messaging-service-sid=$MESSAGING_SERVICE_SID
SID                                 Chat Service SID                    Friendly Name       Date Created                 
CH9bf6c8b0012547eb9a0e6c127388a812  IS4feb8a8608fb4743a35f57687ae3a85a  Hello Conversation  Aug 23 2019 16:54:25 GMT-0700

twilio api:conversations:v1:conversations:participants:create --conversation-sid=CH9bf6c8b0012547eb9a0e6c127388a812 --messaging-binding.proxy-address=$PHONE_NUMBER4 --messaging-binding.address=$MY_PHONE_NUMBER
SID                                 Messaging Binding                                                    
MB3c0e35cb4a074a8d91eac8db02c473ec  {"proxyAddress":"+16508668225","type":"sms","address":"+16504837603"}

twilio api:conversations:v1:conversations:remove --sid=CH9bf6c8b0012547eb9a0e6c127388a812
The resource was deleted successfully

````

----------------------------------------------------------------------------------
### BulkExport using Twilio CLI

We have a new API for pulling logs, BulkExport API. Custom BulkExport Jobs allow you to create exports for any date range.
BulkExport API overview, 
https://www.twilio.com/docs/usage/bulkexport
+ The API provides an efficient mechanism for retrieving all of your activity logs from the Twilio platform on an ongoing basis, or for one-off downloads.
+ Using BulkExport, you can provide daily dumps of the previous day's Messages, eliminating the need to iterate through the Message list resource one page at a time to download your Message records.

[Export Custom Job Resource](https://www.twilio.com/docs/usage/bulkexport/export-custom-job),
Custom Jobs allow you to create exports for any date range. If the date range spans multiple days, they will generate separate output days.
Note, if there are no message logs on a particular day, then no report file is generated for that day.

[Job Resource](https://www.twilio.com/docs/usage/bulkexport/job),
The Job resource allows you to view and delete the requests for exports of arbitrary date ranges, submitted through the ExportCustom Job.

[Day Resource](https://www.twilio.com/docs/usage/bulkexport/day),
The Day resource allows you to download the export file containing a single day's data for your account and the requested data type.

[File output format](https://www.twilio.com/docs/usage/bulkexport#bulkexport-file-format),
The messages file format is a sequence of JSON records, similar to the Message Resource.

Create a job.
````
twilio api:bulkexports:v1:exports:jobs:create \
    --resource-type Messages \
    --friendly-name ExportJuly27b \
    --start-day 2020-07-01 \
    --end-day 2020-07-27 \
    --email dthurston@twilio.com \
    --webhook-method GET \
    --webhook-url http://www.example.com/echo

Details  Email  End Day     Estimated Completion Time  Friendly Name  Job Queue Position  Job SID                             Resource Type  Start Day   Webhook Method  Webhook URL                             
null     null   2022-09-07  2022-09-10T00:13:27.977    ExportJobs     2                   JSe1134e3eb0586e268fa340af53673b53  Calls          2022-09-07  GET             https://example.com/ExportJob2
(The above is results from different create command)
````
List the recent jobs.
````
$ twilio api:bulkexports:v1:exports:jobs:list --resource-type Messages --properties=friendlyName,jobSid
Friendly Name  Job SID                           
ExportJuly27   JS1dca2e0dfb7815c1fea2362d9f61c16c
ExportJuly27   JS677d0986311ebb99cfa945425e1889c0
ExportJuly27b  JSed5cd7ba5451574475d4d4bb890aed4f

$ twilio api:bulkexports:v1:exports:jobs:list --resource-type Messages --properties=friendlyName,jobSid,details
Friendly Name  Job SID                             Details 
ExportJuly27   JS1dca2e0dfb7815c1fea2362d9f61c16c  {"0":{"status":"Running",...
...
Statuses: "Submitted", "Running", "CompletedEmptyRecords", "Completed".
````
Remove a job.
````
$ twilio api:bulkexports:v1:exports:jobs:remove --job-sid=JS677d0986311ebb99cfa945425e1889c0
````
Fetch a single job's information.
````
$ twilio api:bulkexports:v1:exports:jobs:fetch --job-sid=JSed5cd7ba5451574475d4d4bb890aed4f --properties=friendlyName,startDay,endDay,details
Friendly Name  Start Day   End Day     Details                                            
ExportJuly27   2020-07-01  2020-07-27  {"0":{"status":"Submitted","count":27,"days":null}}

$ twilio api:bulkexports:v1:exports:days:fetch --resource-type=Messages --day= --properties=days
[{"friendly_name":"ExportJuly27b","create_date":"2020-07-27","day":"2020-07-01","resource_type":null,"size":750},
{"friendly_name":"ExportJuly27b","create_date":"2020-07-27","day":"2020-07-02","resource_type":null,"size":945},
{"friendly_name":"ExportJuly27b","create_date":"2020-07-27","day":"2020-07-03","resource_type":null,"size":669},
{"friendly_name":"ExportJuly27b","create_date":"2020-07-27","day":"2020-07-10","resource_type":null,"size":997},
{"friendly_name":"ExportJuly27b","create_date":"2020-07-27","day":"2020-07-12","resource_type":null,"size":420},
{"friendly_name":"ExportJuly27b","create_date":"2020-07-27","day":"2020-07-13","resource_type":null,"size":454},
{"friendly_name":"ExportJuly27b","create_date":"2020-07-27","day":"2020-07-14","resource_type":null,"size":767},
{"friendly_name":"ExportJuly27b","create_date":"2020-07-27","day":"2020-07-15","resource_type":null,"size":1166},
{"friendly_name":"ExportJuly27b","create_date":"2020-07-27","day":"2020-07-16","resource_type":null,"size":825},
{"friendly_name":"ExportJuly27b","create_date":"2020-07-27","day":"2020-07-17","resource_type":null,"size":1146},
{"friendly_name":"ExportJuly27b","create_date":"2020-07-27","day":"2020-07-18","resource_type":null,"size":738},
{"friendly_name":"ExportJuly27b","create_date":"2020-07-27","day":"2020-07-19","resource_type":null,"size":1705},
{"friendly_name":"ExportJuly27b","create_date":"2020-07-27","day":"2020-07-21","resource_type":null,"size":554},
{"friendly_name":"ExportJuly27b","create_date":"2020-07-27","day":"2020-07-23","resource_type":null,"size":615},
{"friendly_name":"ExportJuly27b","create_date":"2020-07-27","day":"2020-07-24","resource_type":null,"size":449},
{"friendly_name":"ExportJuly27b","create_date":"2020-07-27","day":"2020-07-26","resource_type":null,"size":398}
]

$ twilio api:bulkexports:v1:exports:jobs:fetch --job-sid=JSed5cd7ba5451574475d4d4bb890aed4f --properties=friendlyName,startDay,endDay,details
Friendly Name  Start Day   End Day     Details                                            
ExportJuly27b  2020-07-01  2020-07-27  {"0":{"status":"Completed","count":27,"days":null}}
````

Get the completed report's URL for download.
````
$ twilio api:bulkexports:v1:exports:days:fetch --resource-type=Messages --day=2020-07-26 --properties=redirectTo
Redirect To
https://com-twilio-prod-exports.s3.amazonaws.com/daily/day%3D2020-07-26...
````
Download the file. It downloads as a GZIP file.
Gunzip the file.
List the file.
````
$ curl -X GET --output r.gz 'https://com-twilio-prod-exports.s3.amazonaws.com/daily/day%3D2020-07-26...'
$ gunzip r.gz
$ cat r
{"from":"+1908...","sid":"CA9a967435e82eb9b94f2a45aa829d3be3",..,"direction":"inbound"}
{"from":"+1908...","sid":"CAf54625b349558a2508a50a0051ad21a7",..,"direction":"inbound"}
{"from":"+1908...","sid":"CAfeb0fa76d75011fe3faa4acbeddb0ded",..,"direction":"inbound"}
````

### BulkExport using cURL

Following is complete steps using curl. I can create and download reports using curl.

Create a job.
````
curl -X POST https://bulkexports.twilio.com/v1/Exports/Messages/Jobs \
--data-urlencode "StartDay=2020-07-01" \
--data-urlencode "EndDay=2020-07-27" \
--data-urlencode "FriendlyName=ExportJuly27" \
--data-urlencode "Email=dave@example.com" \
--data-urlencode "WebhookMethod=GET" \
--data-urlencode "WebhookUrl=http://www.example.com/echo" \
-u TwilioAccountSID:TwilioAuthToken

{"start_day": "2020-07-01", 
"job_sid": "JS1dca2e0dfb7815c1fea2362d9f61c16c", 
"friendly_name": "ExportJuly27", 
"webhook_method": "GET", "details": null, 
"end_day": "2020-07-27", 
"webhook_url": "http://www.example.com/echo", 
"email": "dthurston@twilio.com", "resource_type": null}
````
Get a job's information.
````
curl -X GET 'https://bulkexports.twilio.com/v1/Exports/Jobs/JS1dca2e0dfb7815c1fea2362d9f61c16c' \
-u TwilioAccountSID:TwilioAuthToken

{
"job_sid": "JS1dca2e0dfb7815c1fea2362d9f61c16c", 
"start_day": "2020-07-01", 
"end_day": "2020-07-27", 
"url": "https://bulkexports.twilio.com/v1/Exports/Jobs/JS1dca2e0dfb7815c1fea2362d9f61c16c", 
"friendly_name": "ExportJuly27", "webhook_method": "GET", 
"webhook_url": "http://www.example.com/echo", 
"email": "dave@example.com", 
"resource_type": "Messages"
"details": [{"status": "Submitted", "count": 27, "days": null}], 
}

curl -X GET 'https://bulkexports.twilio.com/v1/Exports/Messages/Days?PageSize=20' \
-u TwilioAccountSID:TwilioAuthToken
{
"meta": {"page": 0, "page_size": 20, "first_page_url": "https://bulkexports.twilio.com/v1/Exports/Messages/Days?PageSize=20&Page=0", 
"previous_page_url": null, 
"url": "https://bulkexports.twilio.com/v1/Exports/Messages/Days?PageSize=20&Page=0", "next_page_url": null, "key": "days"
}, 
"days": []
}
````
Get a job's information that is processing a number of days.
````
curl -X GET 'https://bulkexports.twilio.com/v1/Exports/Messages/Days/' \
-u TwilioAccountSID:TwilioAuthToken

{"meta": {"page": 0, "page_size": 50, "
first_page_url": "https://bulkexports.twilio.com/v1/Exports/Messages/Days?PageSize=50&Page=0", 
"previous_page_url": null, "url": "https://bulkexports.twilio.com/v1/Exports/Messages/Days?PageSize=50&Page=0", 
"next_page_url": null, "key": "days"}, 
"days": [
{"friendly_name": "ExportJuly27b", "create_date": "2020-07-27", "day": "2020-07-01", "resource_type": null, "size": 750}, 
{"friendly_name": "ExportJuly27b", "create_date": "2020-07-27", "day": "2020-07-02", "resource_type": null, "size": 945}, 
{"friendly_name": "ExportJuly27b", "create_date": "2020-07-27", "day": "2020-07-03", "resource_type": null, "size": 669}, 
{"friendly_name": "ExportJuly27b", "create_date": "2020-07-27", "day": "2020-07-10", "resource_type": null, "size": 997}, 
{"friendly_name": "ExportJuly27b", "create_date": "2020-07-27", "day": "2020-07-12", "resource_type": null, "size": 420}, 
{"friendly_name": "ExportJuly27b", "create_date": "2020-07-27", "day": "2020-07-13", "resource_type": null, "size": 454}, 
{"friendly_name": "ExportJuly27b", "create_date": "2020-07-27", "day": "2020-07-14", "resource_type": null, "size": 767}, 
{"friendly_name": "ExportJuly27b", "create_date": "2020-07-27", "day": "2020-07-15", "resource_type": null, "size": 1166}, 
{"friendly_name": "ExportJuly27b", "create_date": "2020-07-27", "day": "2020-07-16", "resource_type": null, "size": 825}, 
{"friendly_name": "ExportJuly27b", "create_date": "2020-07-27", "day": "2020-07-17", "resource_type": null, "size": 1146}, 
{"friendly_name": "ExportJuly27b", "create_date": "2020-07-27", "day": "2020-07-18", "resource_type": null, "size": 738}, 
{"friendly_name": "ExportJuly27b", "create_date": "2020-07-27", "day": "2020-07-19", "resource_type": null, "size": 1705}, 
{"friendly_name": "ExportJuly27b", "create_date": "2020-07-27", "day": "2020-07-21", "resource_type": null, "size": 554}, 
{"friendly_name": "ExportJuly27b", "create_date": "2020-07-27", "day": "2020-07-23", "resource_type": null, "size": 615}, 
{"friendly_name": "ExportJuly27b", "create_date": "2020-07-27", "day": "2020-07-24", "resource_type": null, "size": 449}, 
{"friendly_name": "ExportJuly27b", "create_date": "2020-07-27", "day": "2020-07-26", "resource_type": null, "size": 398}
]}
````
Get information for a specific job report day.
````
curl -X GET 'https://bulkexports.twilio.com/v1/Exports/Messages/Days/2020-07-26' \
-u TwilioAccountSID:TwilioAuthToken

{"redirect_to": "https://...s3.amazonaws.com/daily/day%3D2020-07-26/type%3DMessages/account%3DACa...3/..."}
````

Use a browser to download the file using the above URL:
````
{
"status":"delivered",
"account_sid":"ACa...3",
"from":"+16505551111",
"to":"+16505552222",
"body":"+16505551111 : Hey there... do you want to try?",
"num_segments":1,
"date_sent":"2020-07-26T22:21:20Z","date_updated":"2020-07-26T22:21:20Z","price":"-0.00750",
"date_created":"2020-07-26T22:21:20Z","error_code":0,
"sid":"SM21f63b5f7629f4b69cd079b5c5225dcb","flags":65618,"messaging_service_sid":null,
"direction":"outbound-reply","start":"2020-07-26","num_media":0}
{
"status":"received",
"account_sid":"ACa...3",
"from":"+16505551111",
"to":"+16505552222",
"body":"Hey there... do you want to try?",
"num_segments":1,
"date_sent":"2020-07-26T22:21:20Z","date_updated":"2020-07-26T22:21:20Z","price":"-0.00750",
"date_created":"2020-07-26T22:21:20Z","error_code":0,
"sid":"SM4ff301c8b05cbfd0ff415473190fd6f1","flags":17,"messaging_service_sid":null,
"direction":"inbound","start":"2020-07-26","num_media":0}
````

----------------------------------------------------------------------------------
### Delete a Function from a Function Service

It takes preliminary steps to be able to delete a function. Following are the deletion steps with an example I went through.

1. Undeploy the build.

Given the Twilio Functions Service SID, get the environment SID which also gives the current build.
````
$ twilio api:serverless:v1:services:environments:list --service-sid ZSb2201277346da03f6ca1ea804ce3aaba
SID                                 Unique Name  Domain Name            Build SID                         
ZE962caae126f94f91c52b5beb3c5403a0  ui           mine-2357.twil.io  ZBbea269aac6dcf9332e57e3a0702659c0
````

Use create to delete the build.
````
$ twilio api:serverless:v1:services:environments:deployments:create --service-sid ZSb2201277346da03f6ca1ea804ce3aaba --environment-sid ZE962caae126f94f91c52b5beb3c5403a0
SID                                 Build SID  Date Created                 
ZDba15f7e0415c23cfb6baa40938db741f  null       Mar 29 2021 13:57:13 GMT-0700
````
Note, the Function Service is no longer deployed (Build SID = null).

2. Delete any builds that reference the function that haven't been reaped

Remove the build.
````
$ twilio api:serverless:v1:services:builds:remove --service-sid ZSb2201277346da03f6ca1ea804ce3aaba --sid ZBbea269aac6dcf9332e57e3a0702659c0
The resource was deleted successfully
````

3. Delete the Function Resource
````
$ twilio api:serverless:v1:services:functions:remove --service-sid ZSb2201277346da03f6ca1ea804ce3aaba --sid ZH1100b8ce0150592646eaf625cee01e5a
The resource was deleted successfully
````

--------------------------------------------------------------------------------
#### Tailing Twilio Functions Log Messages

To test the display of log messages, I enabled live logs in the Twilio Console and did a test by running my "/sayHello" function from a browser.
From the Twilio Console, I went to my Twilio Function service and click, Enable live logs.
Then, log messages were streamed to the lower part of the page.

Next, I used the Twilio CLI to tail the streaming log messages.

Twilio CLI help options shows the syntax requirements.
````
$ twilio serverless:logs --help
USAGE
 $ twilio serverless:logs
OPTIONS
 ...
 --environment=environment [default: dev] The environment to retrieve the logs for
 --function-sid=function-sid Specific Function SID to retrieve logs for
 --load-system-env Uses system environment variables as fallback for variables specified in your .env file. Needs to be used with --env explicitly specified.
 --service-sid=service-sid Specific Serverless Service SID to retrieve logs for
 --tail  Continuously stream the logs
````
I retrieved my service's environment value:
````
$ twilio api:serverless:v1:services:environments:list --service-sid ZSb2201277346da03f6ca1ea804ce3aaba
SID  Unique Name Domain Name Build SID 
ZE962caae126f94f91c52b5beb3c5403a0 ui  classics-8587.twil.io ZB41959c4e3784967e7b71ef14e112e9c5
````
I used the service's environment value in the command to tail my logs:
````
$ twilio serverless:logs --service-sid=ZSb2201277346da03f6ca1ea804ce3aaba --environment=ZE962caae126f94f91c52b5beb3c5403a0 --tail
[INFO][2021-04-26T23:06:29Z]: Hello there.
[INFO][2021-04-26T23:06:40Z]: Hello there.
[INFO][2021-04-26T23:06:47Z]: Hello there.
[INFO][2021-04-26T23:14:01Z]: Hello there.
[INFO][2021-04-26T23:21:53Z]: Hello there.
````
Each time I ran my "/sayHello" function, the log messages were listed.

----------------------------------------------------------------------------------
### Generate API Keys and secret strings

To [generate API Keys and secret strings](https://www.twilio.com/docs/iam/keys/api-key), use TWILIO_ACCOUNT_SID and TWILIO_AUTH_TOKEN for
[authentication](https://www.twilio.com/docs/twilio-cli/general-usage#want-to-use-environment-variables-instead-of-creating-a-profile)(Option 2).
````
export TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
export TWILIO_AUTH_TOKEN=yyyyyyyyyyyyyyyyyyyyyyyyyyyyyyy
````
The following creates an API Key and secret string.
````
$ twilio api:core:keys:create --friendly-name=p1 
SID            Friendly Name Date Created 
SK93...5b      p1            May 24 2021 09:25:21 GMT-0700
````

----------------------------------------------------------------------------------
### Generate Notify Credentials

Create an FCM [Notify credentials](https://www.twilio.com/docs/notify/api/credential-resource#create-a-credential-resource).
````
$ twilio api:notify:v1:credentials:create -l=debug --friendly-name=fcmcr1 --type=fcm --secret=AA...Tx
...
[DEBUG] -- BEGIN Twilio API Request --
[DEBUG] post https://notify.twilio.com/v1/Credentials
[DEBUG] Form data:
[DEBUG] FriendlyName=fcmcr1&Secret=AAAAhV84ojc%3AAPA91bEH4kKISZRc34Ba8sdwC6MZAwb5GngznbWuOVMYwbW4lLOrwP5-F73ijJ6XBF0AuLy5L7AlNXfR2CZVHUJqSZCvUgnVol0ZiiHPjEccd-VJ3xneWZq9Ey9vlt998EIhQHyIVoTx&Type=fcm
[DEBUG] Custom HTTP Headers:
[DEBUG] User-Agent: twilio-cli/3.3.1 @twilio/cli-core/6.3.1 (darwin arm64) twilio-api-client/6.3.1 api:notify:v1:credentials:create
[DEBUG] -- END Twilio API Request --
[DEBUG] response.statusCode: 201
[DEBUG] response.headers: {"date":"Fri, 10 Jun 2022 20:58:33 GMT","content-type":"application/json; charset=utf-8","content-length":"323","connection":"close","twilio-concurrent-requests":"1","twilio-request-id":"RQ7d807be1814aa50239d75efaf255d39b","twilio-request-duration":"0.052","access-control-allow-origin":"*","access-control-allow-headers":"Accept, Authorization, Content-Type, If-Match, If-Modified-Since, If-None-Match, If-Unmodified-Since","access-control-allow-methods":"GET, POST, DELETE, OPTIONS","access-control-expose-headers":"ETag","access-control-allow-credentials":"true","x-powered-by":"AT-5000","x-shenanigans":"none","x-home-region":"us1","x-api-domain":"notify.twilio.com","strict-transport-security":"max-age=31536000"}
SID                                 Friendly Name  Type
CR7f174d1f04b4498e8d6ae4f4a168f24d  fcmcr1         fcm
$
````

The following should work for an APN credential.
````
$ twilio api:notify:v1:credentials:create -l=debug --friendly-name=apncr1 --type=apn --sandbox --certificate='-----BEGIN CERTIFICATE-----MIIFnTCCBIWgAwIBAgIIAjy9H849+E8wDQYJKoZIhvcNAQEFBQAwgZYxCzAJBgNV.....A==-----END CERTIFICATE-----' --private-key='-----BEGIN RSA PRIVATE KEY-----MIIEpQIBAAKCAQEAuyf/lNrH9ck8DmNyo3fGgvCI1l9s+cmBY3WIz+cUDqmxiieR\n.-----END RSA PRIVATE KEY-----'
...
````

Some of the help output.
````
$ twilio api:notify:v1:credentials:create --help
[BETA] create a Credentials resource
USAGE
  $ twilio api:notify:v1:credentials:create
OPTIONS
REQUIRED FLAGS
  --type=(apn|fcm)  The Credential type. Can be: 'fcm' or 'apn'.
OPTIONAL FLAGS
  -l=(debug|info|warn|error|none)  [default: info] Level of logging messages.
  -o=(columns|json|tsv|none)       [default: columns] Format of command output.
  -p, --profile=profile            Shorthand identifier for your profile.
  --properties=properties          [default: sid,friendlyName,type] The properties you would like to display (JSON output always shows all properties).

  --friendly-name=friendly-name    A descriptive string that you create to describe the resource. It can be up to 64 characters long.

  --secret=secret                  [FCM only] The `Server key` of your project from Firebase console under Settings / Cloud messaging.

  --certificate=certificate        [APN only] The URL-encoded representation of the certificate. Strip everything outside of the headers, e.g. 
                                   `-----BEGIN CERTIFICATE-----MIIFnTCCBIWgAwIBAgIIAjy9H849+E8wDQYJKoZIhvcNAQEFBQAwgZYxCzAJBgNV.....A==-----END CERTIFICATE-----`

  --private-key=private-key        [APN only] The URL-encoded representation of the private key. Strip everything outside of the headers, e.g.
                                   `-----BEGIN RSA PRIVATE KEY-----MIIEpQIBAAKCAQEAuyf/lNrH9ck8DmNyo3fGgvCI1l9s+cmBY3WIz+cUDqmxiieR\n.-----END RSA PRIVATE KEY-----`

  --[no-]sandbox                   [APN only] Whether to send the credential to sandbox APNs. Can be `true` to send to sandbox APNs or `false` to send to production.
````

----------------------------------------------------------------------------------
### Autopilot

[Autopilot CLI Plugin](https://www.twilio.com/docs/autopilot/twilio-autopilot-cli),
a Community Project.

[Commands and Usage](https://www.twilio.com/docs/autopilot/twilio-autopilot-cli#commands-and-usage)

Install the plugin.
````
$ twilio plugins:install @dabblelab/plugin-autopilot
...
Installing plugin @dabblelab/plugin-autopilot... installed v1.0.5
$
````

List your account's autopilot bots.
````
$ twilio autopilot:list help
List all autopilot bots
...
$ twilio autopilot:list
SID                                 Unique Name  Friendly Name                                                  
UAf475242fee85b05307343b63eeee5d2d  CoffeeBot    Following the video https://www.youtube.com/watch?v=gOOrvhbJ9No
UA96376fff94c83ea0349a3f97651f4f77  p1           p1  
$
````

List tasks.
````
$ twilio autopilot:tasks:list help
List all tasks for a bot
USAGE
  $ twilio autopilot:tasks:list
OPTIONS
REQUIRED FLAGS
  -s, --assistant-sid=assistant-sid  bot sid
OPTIONAL FLAGS
  -p, --profile=profile    Shorthand identifier for your profile.
  --properties=properties  [default: sid, uniqueName, friendlyName] The Autopilot bot Task List
$

$ twilio autopilot:tasks:list -s p1
SID                                 Unique Name                         Friendly Name
UD941bd7a0e950260b2b893b20716fc283  now                                 null         
UD2cc4db2c7cd2d3a2016a25e7c6b6abcd  RedirectSayHelloRedirect            null         
UDa54f6a58f0bde8799194040b51e332b1  RememberDataSay                     null         
UD6f2ac026b2fc526539154216f41bb0a2  RememberDataSave                    null         
UDc22f2a1a4f71c675801a76dcc6b47403  CollectQuestionValidateYN           null         
UDd55cf16ce37dd95434b2cde82239d399  CollectQuestionValidateNum          null         
UD74ec9382d86e93f6ab233f68cd9f27b7  CollectQuestionSayThanks            null         
UD30cd3b45325973438fb2eb094d0ba45b  ControlLowConfidenceLevel           null         
UD0ea6b5b75a2f15ff21273b951b83a007  welcome                             null         
UD6b1e6609522e2e737fabe659e3f336b8  Fallback_task                       null         
UD1e76477ec5babebcd50aeb3a31f3858f  voice_handoff_voicecall             null         
UD8580826946155747a9bcfd6564caeb56  sayRedirectTofunction               null         
UD6c68a934ff062316e935b9738bed6c17  send_sms                            null         
UD3eba6e40314fa611141002ba0f48c3ed  yes_world                           null         
UD643f25ec8d1e3784da9016fb8d7d1d2c  helloThereAndListen                 null         
$
````

Export a bot.
````
$ twilio autopilot:export help
Export a bot schema

USAGE
  $ twilio autopilot:export

OPTIONS
OPTIONAL FLAGS
  -p, --profile=profile              Shorthand identifier for your profile.
  -s, --assistant-sid=assistant-sid  bot sid
  --unique-name=unique-name          bot unique name

$ twilio autopilot:export -s p1
Bot schema file exported to "p1.json"
$ cat p1.json | more
{
    "friendlyName" : "p1",
    "logQueries" : true,
    "uniqueName" : "p1",
    "defaults" : {
        "defaults" : {
            "assistant_initiation" : "task://welcome",
            "fallback" : "task://Fallback_task",
            "collect" : {
                "validate_on_failure" : "task://helloThereAndListen"
            }
        }
    },
    "styleSheet" : {
        ...
    },
    "fieldTypes" : [],
    "tasks" : [
        {
            "uniqueName" : "now",
            "actions" : {
                "actions" : [
                    {
                        "say" : "Received now. Now, back to you."
                    }
                ]
            },
            "fields" : [],
            "samples" : [
                {
                    "language" : "en-US",
                    "taggedText" : "now"
                }
            ]
        },
        ...
        {
            "uniqueName" : "helloThereAndListen",
            "actions" : {
                "actions" : [
                    { "say" : "Hello there." },
                    { "listen" : true }
                ]
            },
            "fields" : [],
            "samples" : [
                {
                    "language" : "en-US",
                    "taggedText" : "good day"
                },
                {
                    "language" : "en-US",
                    "taggedText" : "hello"
                }
            ]
        }
    ],
    "modelBuild" : {
        "uniqueName" : "p1_27-6-2022_4.50.56pm"
    }
}
````
----------------------------------------------------------------------------------
### Conversations with Studio flow as the Target

Create a Studio flow. I used a simplified version of the flow in the 
[documentation](https://www.twilio.com/docs/conversations/connect-to-studio#existing-conversations).

<img src="StudioConversationsFlow.jpg" width="300"/>

Create a new conversation.
````
$ twilio api:conversations:v1:conversations:create --friendly-name "Studio-Conversations"
SID                                 Chat Service SID                    Friendly Name         Date Created                 
CHeae275b5ee0145ea9ffadd40ac0ec377  IS186702e405b74452a449d67b9265669f  Studio-Conversations  Jul 08 2022 15:46:29 GMT-0700
````
Add an SMS participant into the conversation. +16505553333 is the Twilio phone number.
````
$ twilio api:conversations:v1:conversations:participants:create \
--conversation-sid CHeae275b5ee0145ea9ffadd40ac0ec377 \
--messaging-binding.address +16505551111 \
--messaging-binding.proxy-address +16505553333
SID                                 Messaging Binding                                                     
MBb5837899193940d4812840440d5bef5e  {"proxy_address":"+16505553333","type":"sms","address":"+16505551111"}
$ twilio api:conversations:v1:conversations:participants:list --conversation-sid=CHeae275b5ee0145ea9ffadd40ac0ec377
SID                                 Messaging Binding                                                     
MBb5837899193940d4812840440d5bef5e  {"proxy_address":"+16505553333","type":"sms","address":"+16505551111"}
````
Add a conversation webhook that forwards that conversations's inbound messages to the Studio flow.
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
````
Send a text using the conversation SMS participant's phone number:
+ To: +16505551111(address: person's mobile phone number.
+ From: +1650555333(proxy address: the conversation Twilio phone number.
````
Send an SMS from +16505553333 to +16505551111, text: "hello."
````
The Studio flow will respond with: "Hello Boss."

Make a Studio REST API request to initate the flow.
````
curl -X POST 'https://studio.twilio.com/v2/Flows/FWd1aa3231073181f8c812d4a77411767f/Executions' -d "From=+16505553333" -d "To=+16505551111" \
-u $MASTER_ACCOUNT_SID:$MASTER_AUTH_TOKEN
````
The Studio flow will send the message: "Hello Boss," to +16505551111.

----------------------------------------------------------------------------------

Cheers...
