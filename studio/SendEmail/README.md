# Use Twilio Studio to Send Email Messages

In the following steps Twilio SendGrid is used to send the email messages.

## Implementation Steps

+ Click [here](https://sendgrid.com) to create a SendGrid account.
+ Create an API Key from the SendGrid dashboard menu: Settings/API Keys.
    Note, create a new one verses using the default one. It was required when I did my testing.
+ Add the SendGrid SDK module into the Twilio Function NPM modules.
    Click [here](https://www.twilio.com/console/functions/configure) for the Twilio Console link.
    I added module, Name: @sendgrid/mail, version: 6.4.0.
+ Also, in the Twilio Functions [manage page], (https://www.twilio.com/console/functions/configure),
    add your , Key: SENDGRID_API_KEY, Value: your SendGrid API Key that you created above.
+ Create a Twilio Function that uses the SendGrid SDK to send email messages.
    Click [here](https://github.com/tigerfarm/work/blob/master/functions/emailUsingSendGridSdk.js)
    for the Twilio Function source code.
    
+ Create a Studio flow. The following sample is to forward an SMS messages and an email message.

--------------------------------------------------------------------------------
Studio flow screen print:

Click [here](Studio-SendEmail.json) 
    for the Studio flow JSON that can be used to create your flow.

<img src="Studio-SendEmail.jpg" width="400"/>

--------------------------------------------------------------------------------
++ Send Email Messages from Command Line

Following are side notes regarding the sending of email messages from command line.

Then you can follow the video, How to Send Email with Node.js and Twilio SendGrid:
https://www.youtube.com/watch?v=s2bzUzHeSVw

++++ Mail Send

API endpoint to send email over SendGrid’s Web API v2:
https://sendgrid.com/docs/API_Reference/Web_API/mail.html

Overview of the steps:
+ Create a SendGrid account, and create an API Key from the menu item under Settings/API Keys.
+ Create a SendGrid work directory, and change into the directory.
+ Run the following commands to prep the directory for using the SendGrid API library.
$ npm init --yes
$ npm install @sendgrid/mail
+ Create a sample program in the directory. Following is mine based on the video. I set environment variables.

Note, my from email address is a GMail address, and the to email address is my Twilio email address.
````
console.log("++ Send email message.");
theMsg = "Hello from SendGrid 1";
console.log("+ SENDGRID_API_KEY: " + process.env.SENDGRID_API_KEY
        + ", from: " + process.env.EMAIL_TF
        + ", to: " + process.env.EMAIL_DT
        + ", MSG: " + theMsg);
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    from: process.env.EMAIL_TF,
    to:   process.env.EMAIL_DT,
    subject: "Using SendGrid",
    text: theMsg
    };
sgMail.send(msg);
console.log("+ Sent.");
````
Then I ran the above, and the email was sent.

SendGrid API reference with more options when sending email messages, such as adding attachments.
https://sendgrid.com/docs/api-reference/

--------------------------------------------------------------------------------

Cheers...
