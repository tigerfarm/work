# Autopilot Course Notes

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
#### Course uses the Twilio CLI.

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
UA2af95823253d39764a2c9fa6e8e754bc  CurrencyBot  Course bot 
$ twilio autopilot:tasks:create --assistant-sid UA2af95823253d39764a2c9fa6e8e754bc --unique-name convert_currencies
Task "convert_currencies" was created
````
I downloaded the sample CSV file, which is a text file of questions and requests.
````
$ twilio autopilot:samples:upload --assistant-sid UA2af95823253d39764a2c9fa6e8e754bc --file-name convert_currencies_samples_01.csv
? Select the Task you want to train with these Samples:  convert_currencies
Samples was uploaded in "convert_currencies"
$ twilio autopilot:export --assistant-sid UA2af95823253d39764a2c9fa6e8e754bc 
File exported in "CurrencyBot.json"
````
I download actions, and added them into the default file,  CurrencyBot.json.
````
$ twilio autopilot:update --schema CurrencyBot.json --unique-name UA2af95823253d39764a2c9fa6e8e754bc
Assistant "CurrencyBot" was updated
$ twilio autopilot:modelbuilds:create --assistant-sid UA2af95823253d39764a2c9fa6e8e754bc
ModelBuild status : enqueued
$ twilio autopilot:simulate --assistant-sid UA2af95823253d39764a2c9fa6e8e754bc --text "Convert some currencies"
Channel response
... "text" : "What currency would you like to convert from?"
$ twilio autopilot:simulate --assistant-sid UA2af95823253d39764a2c9fa6e8e754bc --text "USD"
Channel response
... "text" : "What currency would you like to convert to?"
$ twilio autopilot:simulate --assistant-sid UA2af95823253d39764a2c9fa6e8e754bc --text "CAD"
Channel response
... "text" : "The current conversion rate from USD to CAD is 1.32."
````
Sent to the Function:
+ Memory: {"twilio":{"custom.cli":{},"collected_data":{"convert_currencies":{"answers":{"cur_from":{"confirm_attempts":0,"answer":"USD","filled":true,"type":"Twilio.CURRENCY","confirmed":false,"validate_attempts":1,"attempts":1},"cur_to":{"answer":"CAD","type":"Twilio.CURRENCY","filled":true,"attempts":1,"validate_attempts":1,"confirm_attempts":0,"confirmed":false,"media":null}},"date_completed":"2020-02-20T00:07:46Z","date_started":"2020-02-20T00:07:01Z","status":"complete"}}}}
+ URL to get the currency:
https://api.ratesapi.io/api/latest?symbols=CAD&base=USD

+ Memory: {"twilio":{"collected_data":{"convert_currencies":{"answers":{"cur_from":{"answer":"USD"},"cur_to":{"answer":"CAD"}}}}}}

--------------------------------------------------------------------------------
Cheers...
