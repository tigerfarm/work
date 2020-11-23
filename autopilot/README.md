# Autopilot Course Notes

My sample, CurrencyBot, is in my Labs subaccount.

To take this course please log on to https://www.twiliotraining.com/users/sign_in

Direct to the course,
https://www.twiliotraining.com/enrollments/41559901

Another way to get started, Quickstart,
https://www.twilio.com/docs/autopilot/quickstart/node

Blog, Build a Currency Conversion SMS chatbot using Twilio Autopilot, Exchangerates API, and PHP
https://www.twilio.com/blog/build-currency-conversion-sms-chatbot-twilio-autopilot-exchangerates-api-php

Using the SMS channel
https://www.twilio.com/docs/autopilot/channels/sms

--------------------------------------------------------------------------------
#### The Course uses the Twilio CLI.

https://www.twilio.com/docs/autopilot/twilio-autopilot-cli

+ My Twilio CLI notes, click here
https://github.com/tigerfarm/work/tree/master/twiliocli

Which includes the update command:
````
$ npm update -g twilio-cli
````
Install the Autopilot plugin and list my current Autopilot bots.
````
$ twilio plugins:install @dabblelab/plugin-autopilot

$ twilio autopilot:list
SID                                 Unique Name  Friendly Name
UA050392de93a177e5ad8ac7b870262661  v1           v1           
UAf58eaf2f0f480bea86b7765ff9864e70  p1           p1
````

--------------------------------------------------------------------------------
## Autopilot Concepts

Tasks represent user's intentions.
+ Tasks, bind to a list of Actions that should be executed to fulfill that intention.
+ Actions are executable, such as, say a response.

Person asks a question.
Question is matched to a task.
Task's actions are executed.

Action documentation list,
https://www.twilio.com/docs/autopilot/actions
+ say - say something back to the user
+ play - play recorded audio to the user (only supported on voice channel)
+ show - display image (only applicable for devices with screens)
+ collect - gather some data by asking questions and collecting user's answers
+ listen - listen for further user input and keep the dialogue alive, if there is no listen action, the dialogue will end
+ remember - store a key-value pair in bot's Memory
+ redirect - redirect to a Task or URL and execute the returned Actions
+ handoff - end the Autopilot session and hand user over to a human agent

### Matching a question to a task

Field is a part of Sample that you expect to carry specific details about user's intent.
+ Sample with a tag: "I would like to convert from {from_currency}".
+ Would match with, "I want to convert from Euro".
Example field types:
+ NUMBER, PHONE_NUMBER, YES_NO, DATE, TIME, EMAIL, COUNTRY, CURRENCY, LANGUAGE
https://www.twilio.com/docs/autopilot/built-in-field-types

A model performs bot's intent recognition and field extraction on user input.
+ Build a new Model what tasks or training Sample is added or changed.

In exercise 1, Create a help task,
+ The user should have build the model and tested, "I'm lost."
+ I did, and it was more clear for me.

Foreign currency exchange rates api with currency conversion,
http://ratesapi.io/
````
$ twilio autopilot:list
SID                                 Unique Name  Friendly Name
UA6552e542c0524f037c9360368335c195  CurrencyBot  Course bot 
$ twilio autopilot:tasks:create --assistant-sid UA6552e542c0524f037c9360368335c195 --unique-name convert_currencies
Task "convert_currencies" was created
````
I downloaded the sample CSV file, which is a text file of questions and requests.
````
$ twilio autopilot:samples:upload --assistant-sid UA6552e542c0524f037c9360368335c195 --file-name convert_currencies_samples_01.csv
? Select the Task you want to train with these Samples:  convert_currencies
Samples was uploaded in "convert_currencies"
$ twilio autopilot:export --assistant-sid UA6552e542c0524f037c9360368335c195 
File exported in "CurrencyBot.json"
````
I download actions, and added them into the default file,  CurrencyBot.json.
````
$ twilio autopilot:update --schema CurrencyBot.json --unique-name UA6552e542c0524f037c9360368335c195
Assistant "CurrencyBot" was updated
$ twilio autopilot:modelbuilds:create --assistant-sid UA6552e542c0524f037c9360368335c195
ModelBuild status : enqueued
$ twilio autopilot:simulate --assistant-sid UA6552e542c0524f037c9360368335c195 --text "Convert some currencies"
Channel response
... "text" : "What currency would you like to convert from?"
$ twilio autopilot:simulate --assistant-sid UA6552e542c0524f037c9360368335c195 --text "USD"
Channel response
... "text" : "What currency would you like to convert to?"
$ twilio autopilot:simulate --assistant-sid UA6552e542c0524f037c9360368335c195 --text "CAD"
Channel response
... "text" : "The current conversion rate from USD to CAD is 1.32."
````
Sent to the Function:
+ Memory: {"twilio":{"custom.cli":{},"collected_data":{"convert_currencies":{"answers":{"cur_from":{"confirm_attempts":0,"answer":"USD","filled":true,"type":"Twilio.CURRENCY","confirmed":false,"validate_attempts":1,"attempts":1},"cur_to":{"answer":"CAD","type":"Twilio.CURRENCY","filled":true,"attempts":1,"validate_attempts":1,"confirm_attempts":0,"confirmed":false,"media":null}},"date_completed":"2020-02-20T00:07:46Z","date_started":"2020-02-20T00:07:01Z","status":"complete"}}}}
+ URL to get the currency:
https://api.ratesapi.io/api/latest?symbols=CAD&base=USD

+ Memory: {"twilio":{"collected_data":{"convert_currencies":{"answers":{"cur_from":{"answer":"USD"},"cur_to":{"answer":"CAD"}}}}}}

To add the Twilio Function, requires Dependencies: got, 6.7.1.
https://www.twilio.com/console/functions/configure

Original: https://tangerine-toad-5117.twil.io/currency
My Lab subaccount: https://pistachio-lobster-5847.twil.io/currency

Currency codes
https://en.wikipedia.org/wiki/ISO_4217#Active_codes

"What currency would you like to convert from? For example: USD, CAD, GBP, JPY, AUD."

--------------------------------------------------------------------------------
## Using Autopilot Memory Name-Value pairs

Autopilot Say action documentation [link](https://www.twilio.com/docs/autopilot/actions/say).

Action to collect Name-Value pairs using questions.
````
                "actions": [
                    {
                        "collect": {
                            "name": "convert_currencies",
                            "questions": [
                                {
                                    "question": "What currency would you like to convert from?",
                                    "name": "cur_from",
                                    "type": "Twilio.CURRENCY"
                                },
                                {
                                    "question": "What currency would you like to convert to?",
                                    "name": "cur_to",
                                    "type": "Twilio.CURRENCY"
                                }
                            ],
                            "on_complete": {
                                "redirect": {
                                    "method": "POST",
                                    "uri": "https://tangerine-toad-5117.twil.io/currency"
                                }
                            }
                        }
                    }
                ]
````
Twilio Function for the above "redirect".
````
const got = require('got');
exports.handler = function (context, event, callback) {
    console.log("+ Memory: " + event.Memory );
    // + Memory: {"twilio":{"chat":
    // {"ChannelSid":"CH0607e9cd21374d0cab8484ee5fc650ea","AssistantName":"","Attributes":{},"ServiceSid":"IS36b7df8c2ba5484c9189b7eb647f259d","Index":39,"From":"user","MessageSid":"IM950f22ca27dd43d68c9a5d89bdce2205"},
    // "collected_data":{
    // "convert_currencies":{
    // "answers":{
    // "cur_from":{"confirm_attempts":0,"answer":"cn","filled":true,"type":"Twilio.CURRENCY","confirmed":false,"validate_attempts":1,"attempts":1},
    // "cur_to":{"answer":"us","type":"Twilio.CURRENCY","filled":true,"at...
  const answers = JSON.parse(event.Memory).twilio.collected_data.convert_currencies.answers;
  const cur_from = answers.cur_from.answer.toUpperCase();
  const cur_to = answers.cur_to.answer.toUpperCase();
  got(`https://api.ratesapi.io/api/latest?symbols=${cur_to}&base=${cur_from}`,
    { json: true }).then(response => {
      const rate = response.body.rates[cur_to];
      callback(null, {
        "actions": [
          { say: `The current conversion rate from ${cur_from} to ${cur_to} is ${rate.toFixed(2)}.` }
        ]
      });
    }).catch(error => {
      callback(null, {
        "actions": [
          { say: `Sorry, a problem occurred: ${error.response.body.error}` }
        ]
      });
    });
};
````

------------------------
Ask a question and say back the answer.
````
{
	"actions": [
		{
			"collect": {
				"name": "get_name",
				"questions": [
					{
						"question": "What's your name?",
						"name": "the_name",
						"type": "Twilio.FIRST_NAME"
					}
				],
				"on_complete": {
					"redirect": {
						"method": "GET",
						"uri": "https://unnatural-seat-1873.twil.io/autopilotsayname"
					}
				}
			}
		}
	]
}
````
Twilio Function for the above "redirect".
````
exports.handler = function(context, event, callback) {
    let theJson = JSON.stringify(event);
    console.log("+ JSON: " + theJson);
    const answer = event.CurrentInput;
    console.log("+ answer: " + answer );
    let AutopilotJSONresponse = { "actions": [ { say: "Autopilot Say the name: " + answer } ] };
    callback(null, AutopilotJSONresponse);
};
````

Basic say Twilio Function.
````
exports.handler = function(context, event, callback) {
  let AutopilotJSONresponse = { "actions": [ { say: "From Say Function. v2" } ] };
  callback(null, AutopilotJSONresponse);
  // callback(null, { "actions": [{ say: 'From Say Function. v1' }] });
};
````

--------------------------------------------------------------------------------
#### Dynamic Say and Question. And nested redirect.
````
Sample I just wrote and tested an Autopilot task with an a Twilio Function. Suggestion, implement the sample as is, then modify it after testing.

Autopilot Task:
{
 "actions": [
  {
      "say": "Ask question."
  },
  {
      "redirect": {
    "method": "GET",
    "uri": "https://unnatural-seat-1873.twil.io/askq"
      }
  }
 ]
}
Function that returns Question JSON. My sample is static, however, your code can dynamically create the question. I also have a dynamic "on_complete" section which works.
exports.handler = function(context, event, callback) {
  // { "actions": [ { say: "From Say Function." } ] };
  let AutopilotJSONresponse = {
 "actions": [
  {
      "collect": {
    "name": "get_name",
    "questions": [
        {
      "question": "What's your name?",
      "name": "the_name",
      "type": "Twilio.FIRST_NAME"
        }
    ],
    "on_complete": {
        "redirect": {
      "method": "GET",
      "uri": "https://about-time-2347.twil.io/autopilotsayname"
        }
    }
      }
  }
 ]
}
  // ----------------------------------------
  callback(null, AutopilotJSONresponse);
};

Twilio Function, autopilotsayname:
exports.handler = function(context, event, callback) {
  let AutopilotJSONresponse = { "actions": [ { say: "From Say Function." } ] };
  callback(null, AutopilotJSONresponse);
};
````

--------------------------------------------------------------------------------
Cheers...
