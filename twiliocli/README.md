# Getting Started with Twilio CLI

#### Pre-release software warning

This software is in pre-release status and not currently supported. However, soon to be supported.

--------------------------------------------------------------------------------
### Install

Requirement: [Node.js](https://nodejs.org/) >= 8.0

Install the CLI globally:
````
$ npm install -g twilio-cli`
````

#### Create environment variables using the Recommended Method

Use your current account or subaccount SID.
The CLI will use the key-named environment variables.

Click [here](https://twil.io/get-api-key) to use the Twilio Console to create an API key and secret text string.
- Friendly Name: Twilio CLI.
- Key Type: Standard.

Create environment variables:
- `TWILIO_ACCOUNT_SID` = your Account SID from [your console](https://www.twilio.com/console)
- `TWILIO_API_KEY` = your Twilio CLI API Key SID, starts with "SK".
- `TWILIO_API_SECRET` = the secret text string for the API Key.

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
PN1..............................Z  +16505557890   (650) 555-7890
PN2..............................W  +16505552357   (650) 555-32357
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

$ twilio api:core:conferences:list --properties=friendlyName,dateCreated,status --date-created=2019-05-31
Friendly Name  Date Created                                               Status     
support        Fri May 31 2019 12:08:37 GMT-0700 (Pacific Daylight Time)  in-progress
sales          Fri May 31 2019 11:49:56 GMT-0700 (Pacific Daylight Time)  completed  
support        Fri May 31 2019 11:45:59 GMT-0700 (Pacific Daylight Time)  completed

````
--------------------------------------------------------------------------------

Cheers...
