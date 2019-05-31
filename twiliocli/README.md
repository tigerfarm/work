# Getting Started with Twilio CLI

#### Pre-release software warning

This software is in pre-release status and not currently supported.

--------------------------------------------------------------------------------
### Install

Requirement: [Node.js](https://nodejs.org/) >= 8.0

Install the CLI globally: `npm install -g twilio-cli`

Create environment variables to use your current account or subaccount.

##### OPTION 1 (recommended)

Click [here](https://twil.io/get-api-key) to use the Twilio Console to create an API key and secret text string.
- Friendly Name: Twilio cli.
- Key Type: Standard.

Create environment variables:
- `TWILIO_ACCOUNT_SID` = your Account SID from [your console](https://www.twilio.com/console)
- `TWILIO_API_KEY` = your Twilio cli API Key SID, starts with "SK".
- `TWILIO_API_SECRET` = the secret text string for the API Key.

##### OPTION 2
Create environment variables:
- `TWILIO_ACCOUNT_SID` = your Account SID from [your console](https://www.twilio.com/console)
- `TWILIO_AUTH_TOKEN` = your Auth Token from [your console](https://www.twilio.com/console) (click view to see the value).

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
$ twilio api:lookups:v1:phone-numbers:fetch --phone-number=+16508668188 --properties=nationalFormat
National Format
(650) 866-8188
````

On _any_ command, you can add `-o json` to change the output format to JSON.
````
$ twilio api:lookups:v1:phone-numbers:fetch --phone-number=+16508668188 -o json
[
  {
    "callerName": null,
    "countryCode": "US",
    "phoneNumber": "+16508668188",
    "nationalFormat": "(650) 866-8188",
    "carrier": null,
    "addOns": null,
    "url": "https://lookups.twilio.com/v1/PhoneNumbers/+16508668188"
  }
]
$ twilio api:lookups:v1:phone-numbers:fetch --phone-number=+16508668188 --properties=countryCode,nationalFormat,
Country Code  National Format
US            (650) 866-8188 
````

#### API Core

````
$ twilio api:core --help
...
COMMANDS
...
  api:core:available-phone-numbers  Country codes with available phone numbers
...
  api:core:conferences              Voice call conferences
...
  api:core:incoming-phone-numbers   Incoming phone numbers on a Twilio account/project
...

$ twilio api:core:incoming-phone-numbers -help
COMMANDS
  api:core:incoming-phone-numbers:create            Purchase a phone-number for the account.
  api:core:incoming-phone-numbers:fetch             Fetch an incoming-phone-number belonging to the account used to make the request.
  api:core:incoming-phone-numbers:list              Retrieve a list of incoming-phone-numbers belonging to the account used to make the request.
  api:core:incoming-phone-numbers:remove            Delete a phone-numbers belonging to the account used to make the request.
  api:core:incoming-phone-numbers:update            Update an incoming-phone-number instance.
...
````
Note, when using the list command, don't include "api:core:".
````
$ twilio incoming-phone-number:list
SID                                 Phone Number   Friendly Name 
PNc4ca4a9571766997308d1b04490a3409  +16508668225   (650) 866-8225
PN4fd260f72cde1f16ed96a9580373b171  +15878063883   (587) 806-3883
...
````
When using the fetch command, do include "api:core:".
````
$ twilio api:core:incoming-phone-numbers:fetch --sid=PNc4ca4a9571766997308d1b04490a3409
SID                                 Phone Number  Friendly Name 
PNc4ca4a9571766997308d1b04490a3409  +16508668225  (650) 866-8225

$ twilio api:core:incoming-phone-numbers:fetch --sid=PNc4ca4a9571766997308d1b04490a3409 --properties=friendlyName,dateCreated,capabilities
Friendly Name   Date Created                                               Capabilities   
(650) 866-8225  Mon Nov 20 2017 11:04:46 GMT-0800 (Pacific Standard Time)  [object Object]

$ twilio api:core:incoming-phone-numbers:fetch --sid=PNc4ca4a9571766997308d1b04490a3409 -o json
[
  {
    "accountSid": "AC1b32414e8ab41e56e6393bcbba7d5a9d",
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
    "friendlyName": "(650) 866-8225",
    "identitySid": null,
    "phoneNumber": "+16508668225",
    "origin": "twilio",
    "sid": "PNc4ca4a9571766997308d1b04490a3409",
    "smsApplicationSid": "",
    "smsFallbackMethod": "POST",
    "smsFallbackUrl": "",
    "smsMethod": "POST",
    "smsUrl": "https://handler.twilio.com/twiml/EHa2f79c32e49738b846e45b68b4dfefa8",
    "statusCallback": "",
    "statusCallbackMethod": "POST",
    "trunkSid": null,
    "uri": "/2010-04-01/Accounts/AC1b32414e8ab41e56e6393bcbba7d5a9d/IncomingPhoneNumbers/PNc4ca4a9571766997308d1b04490a3409.json",
    "voiceApplicationSid": "",
    "voiceCallerIdLookup": false,
    "voiceFallbackMethod": "POST",
    "voiceFallbackUrl": "",
    "voiceMethod": "POST",
    "voiceUrl": "https://webhooks.twilio.com/v1/Accounts/AC1b32414e8ab41e56e6393bcbba7d5a9d/Flows/FW685ed8c3e7107384ae761fda6eebf81a",
    "emergencyStatus": "Inactive",
    "emergencyAddressSid": null
  }
]
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
  --date-created=date-created                       The 'YYYY-MM-DD' value of the resources to read
  --date-updated=date-updated                       The 'YYYY-MM-DD' value of the resources to read
  --friendly-name=friendly-name                     The string that identifies the Conference resources to read
  --properties=properties                           [default: sid,friendlyName,status] The properties you would like to display (JSON output always shows all properties).
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
````
--------------------------------------------------------------------------------

Cheers...
