# Twilio Function to Post a Slack Message

Log into Slack web portal.
Create a new app. 
Add to a workspace or generate a webhook URL, apply to administrator.
Waited a couple days and got the app approved (said it was for internal testing and troubleshooting a customer setup issue).
Once approved you can just generate a webhook URL for the app.

#### Create Twilio Functions.

+ One Function for the Notify app to register a user identity (Notify binding) that is used to send notifications.
+ One to make a Twilio Notify API request to send a notification to the user running the Notify app.

To create the Functions in the Twilio Console, click [here](https://www.twilio.com/console/functions/manage).
````
Select, Twilio Blank.
Click Create.
````
The code:
````
const got = require('got');
exports.handler = function(context, event, callback) {
  Let theText = event.Body;
  const requestBody = {
    text: theText
  };
  got.post('https://hooks.slack.com/services/T...S/B...r', {
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(requestBody)
  })
    .catch(err => {
      callback(err);
    });
};
````

--------------------------------------------------------------------------------

Cheers...
