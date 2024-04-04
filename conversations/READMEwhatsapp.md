----------------------------------------------------------------------------------
# Conversations WhatsApp Notes

[WhatsApp with Conversations](https://www.twilio.com/docs/conversations/use-twilio-sandbox-for-whatsapp)
Tutorial.

----------------------------------------------------------------------------------
## My Conversations WhatsApp Notes


Server side or command line programs to get started with Twilio Conversations, the quickstart:
[Twilio account](https://www.twilio.com/docs/conversations/quickstart).
Includes creating SMS and chat participants.
Use the same code to create a WhatsApp participant.

### Twilio Frontline with WhatsApp

Twilio [Frontline with WhatsApp](https://www.twilio.com/docs/frontline)
Leverage WhatsApp templates functionality to send configured templated messages to your customers.

From the Twilio Console:
````
Develop/Frontline/Manage/Callbacks: Templates Callback URL
````
I added in the URL, for example: https://example.com/callbacks/templates,
and now I see that when I click the icon in my Frontline app conversation, 
I get the list of Templates, which matches the templates in template.js.

I'm using the Twilio demo application. Here is my sample:
[template.js](https://github.com/twilio/frontline-demo-service/blob/main/src/routes/callbacks/templates.js)
that feeds my Frontline app the templates:

I setup my Frontline system to use the Twilio WhatsApp Sandbox.
Results of my testing:
+ I can use a program(I use curl) to send template messages to my WhatsApp user.
+ In my WhatsApp user app, I can receive and read messages from my program.
+ In my WhatsApp user app, I can send messages to my Frontline user.
+ In my Frontline app, I can receive and read messages from my WhatsApp user.
+ In my Frontline app, I can reply to the received messages from my WhatsApp user.
+ In my WhatsApp user app, I can receive and read messages from my Frontline user.

To use Twilio WhatsApp Sandbox templates:
+ Add the Sandbox template into .../routes/callbacks/templates.js.
+ Where required, add template parameters for the template. For example, I added a Sandbox template in the following:
[template.js](https://github.com/twilio/frontline-demo-service/blob/main/src/routes/callbacks/templates.js).
+ In the Frontline app, when selecting a WhatsApp conversation, if not within a 24 hour session, I'm prompted to select a template. For example: "Reach out to John". When I click the Reach-out prompt, I can see the Sandbox templated message with the parameters filled in. If I click it, it's sent to my WhatsApp user.
+ In my WhatsApp user app, I can receive and read the templated message from my Frontline user.

Note,
Frontline doesn’t automatically recognize templates that are approved at the account level, 
you need to serve a template in the integration service via the templates callback URL 
and indicate that it’s whatsAppApproved: true

----------------------------------------------------------------------------------
Cheers
