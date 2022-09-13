# Twilio Frontline Quickstart Implementation Steps

Following, are the steps I used to implement and demo Frontline server application.

Links:
+ [Quickstart page](https://www.twilio.com/docs/frontline/nodejs-demo-quickstart)
+ Documentation, [Handle Incoming Conversations](https://www.twilio.com/docs/frontline/handle-incoming-conversations)
+ Documentation, [Okta for Frontline](https://www.twilio.com/docs/frontline/sso/okta), How to Configure Okta as a Frontline Identity Provider
+ [My Okta account](https://dev-29758280.okta.com/) for managing apps such as Frontline, and Okta users.
+ [Documentation](https://www.twilio.com/docs/frontline)
+ Twilio Console [Admin Center](https://www.twilio.com/console/admin)
+ [Frontline Integration Service Example](https://github.com/twilio/frontline-demo-service).
+ [Test Frontline login](https://frontline.twilio.com/login)

Frontline implementation setup components:
+ Added an organization using Twilio Console, Project: [Admin Center](https://www.twilio.com/console/admin).
+ My Okta account is configured for the Frontline app.
    It uses the Realm SID (starts with JB) from the Twilio Console: Frontline/Manage/SSO/Log in
+ Okta account settings are configured in Twilio Console: Frontline/Manage/SSO/Log in
+ I can log into the Frontline app on my Android phone.
+ I setup a localhost Frontline server side application to server customer data to the Frontline app, through Ngrok.
+ I can view customer data in the Frontline app: Customer name, SMS phone number, and avatar graphic.
+ I can start a new conversation and exchange messages.

Profiles that are created and managed:
+ From the Twilio Console, Frontline user profiles: Frontline/Manage/Users.
+ Customer profiles in the demo application: .../frontlinedemo/src/providers/customers.js.
+ Okta SSO user profiles for authentication in the Frontline app.

### Getting Started

I went to the Twilio Console Frontline Overview product page.
It said that I needed a Frontline Conversations service, which it created,
and listed on the bottom of the page:
````
    Frontline’s Conversation service information
    Conversations service name: Frontline Service
    Conversations service SID: IS1...f
````
I installed the Twilio Frontline app on my Android phone.
When it started, it prompted me for my company name.
Since I had not created the Company name, it said not found for anything I entered.
+ Company name will be created in the Twilio Console: Frontline/Manage/SSO/Log in.

Next, I started going through the quickstart.
Frontline/Getting started/Node.js Quickstart.

As recommeneded in the quickstart,
+ I set my Conversations Default Service to: Frontline Service, and clicked Save.
+ In the Conversations Default Messaging Service:
````
++ Sender Pool: I added a Twilio phone number in the pool.
++ Integration: Autocreate a Conversation, is selected.
````

#### Configure Okta for Frontline SSO

Next, I decided to set up [Okta](https://www.twilio.com/docs/frontline/sso/okta) for Frontline SSO.

During the configuration steps, I setup a Twilio 
[Organization](https://www.twilio.com/console/organization).
Organizations are managed using [Admin Center](https://www.twilio.com/console/admin).
````
After creating an organization,
+ Twilio internal application note, I now get the following message, "This account is managed by the Owl Press Organization."
+ Get the Raleam ID which is required for Okta configurations:
https://www.twilio.com/console/frontline/sso
Releam ID: JB3...9
Company name: owlpress

Now back to the Okta configurations and use the JB id.
https://www.twilio.com/docs/frontline/sso/okta#3-configure-your-application
Go through the Okta steps.

Note, "email" and "roles" are case sensitive, use lowercase.
https://www.twilio.com/docs/frontline/sso/okta#4-configure-claims
I had used "Email" and "Roles".
That Okta configuration mistake caused an 70252 error on my Frontline app.
Once changed to lowercase, all was good.

Note, 70002 is for an Okta user not set with the "Agent" value.

+ Eventually,
++ Copy values from Okta 
https://www.twilio.com/docs/frontline/sso/okta#5-copy-application-details
++ to the Twilio SSO page: Configure single sign-on, Twilio Console: Frontline/Manage/SSO/Log in
https://www.twilio.com/console/frontline/sso
Once all entered, click Save.
````
Okta and Frontline SSO is now setup.

#### Back to the Frontline App

Now, I can log into the Frontline App following, the following.
https://www.twilio.com/docs/frontline/nodejs-demo-quickstart#log-in-to-the-app

Need the company name value to log in.
https://www.twilio.com/console/frontline/sso
Company name: owlpress

Then use the Okta username/password.

Back to the tutorial:

https://www.twilio.com/docs/frontline/nodejs-demo-quickstart#configure-the-twilio-frontline-integration-service

#### Create an Application to Feed the Frontline App with Customer Data

https://www.twilio.com/docs/frontline/nodejs-demo-quickstart#populate-the-my-customers-list

I download the sample application, 
[Frontline Integration Service Example](https://github.com/twilio/frontline-demo-service).
Unzipped it into a work directory: /.../Projects/frontline/frontlinedemo.

Ran the following.
````
$ npm install -g yarn
added 1 package, and audited 2 packages in 933ms
...
$ yarn
yarn install v1.22.11
...
✨  Done in 2.23s.

$ cp .env.example .env
$ vi .env
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
TWILIO_SSO_REALM_SID=JBxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
#
# Variables for chat configuration
TWILIO_SMS_NUMBER=+xxxxxxxxxxx
TWILIO_WHATSAPP_NUMBER=whatsapp:+xxxxxxxxxxx
#
# default 5000
PORT=8000
````

--------------------------------------------------------------------------------
### Customer list.

In the [tutorial](https://www.twilio.com/docs/frontline/nodejs-demo-quickstart#populate-the-my-customers-list),
I added a customer profile info.

Information added into: .../frontlinedemo/src/providers/customers.js
````
const customers = [
    {
        customer_id: 1,
        display_name: 'Coleridge',
        channels: [
            {type: 'sms', value: '+16505551111'}
        ],
        worker: 'stacy@example.com',
        avatar: 'https://abouttime-2357.twil.io/Coleridge.jpg'
    },
    {
        customer_id: 2,
        display_name: 'Percy Byshee Shelley',
        channels: [
            {type: 'sms', value: '+16505552222'}
        ],
        worker: 'dave@example.com',
        avatar: 'https://abouttime-2357.twil.io/Shelley.jpg'
    },
    {
        customer_id: 3,
        display_name: 'John Keats',
        channels: [
            {type: 'sms', value: '+16505559999'}
        ],
        worker: 'dave@example.com',
        avatar: 'https://abouttime-2357.twil.io/Keats.jpg'
    },
    {
        customer_id: 33,
        display_name: 'Lord Byron',
        channels: [
            {type: 'sms', value: '+16505553333'}
        ],
        worker: 'dave@example.com',
        avatar: 'https://abouttime-2357.twil.io/avatarMine1.jpg'
    }
];
````

--------------------------------------------------------------------------------
### Ngrok

I started Ngrok.
````
$ ngrok http 8000
````
I set Twilio Console Frontline/Manage/Callbacks/CRM Callback URL,
to the Ngrok URL.
````
https://14d2-107-210-221-195.ngrok.io/callbacks/crm
````

When first testing the application,
1) I changed: .../scr/create-app.js
````
    // app.use(express.urlencoded());
    // The following, fixes an issue with the above.
    app.use(express.urlencoded({ extended: true }));
````
2) When first testing, I got rid of the customer list filter: .../src/providers/customers.js
````
const getCustomersList = async (worker, pageSize, anchor) => {
    // const workerCustomers = customers.filter(customer => customer.worker === worker);
    const workerCustomers = customers;
...
};
````
Later, when I realized that the attribute, customers.worker, is the Frontline app logged in user id;
I changed the customers.worker attribute to match my logged in identity.

Start the application.
````
$ cd ~/Projects/frontline/frontlinedemo/
$ yarn run start
...
Application started at 8000
````

### Start a Conversation from the Frontline App

[Demo step](https://www.twilio.com/docs/frontline/nodejs-demo-quickstart#start-your-first-outgoing-conversation).

I set Twilio Console Frontline/Manage/Callbacks/Outgoing Conversations Callback URL,
to the Ngrok URL.
````
https://14d2-107-210-221-195.ngrok.io/callbacks/outgoing-conversation
````

The only issue was that I got a warning message. When I ignored it, I could send and receive messages.
````
Unable to create a new conversation.
Another worker is already engaged in conversation with this customer over SMS.
````
The warning could have been because the logged in worker was, status = unavailable.

--------------------------------------------------------------------------------
### Customer Server Side Application Notes.

````
$ yarn run start
...
$ node src/index.js
+++ Start Frontline Application web server.
Application started at 8000
Process token info
Getting Customers list
Process token info
Getting Customer details:  3
Process token info
outgoingConversationCallbackHandler
Getting Proxy Address
Got proxy address!
Process token info
outgoingConversationCallbackHandler
Getting Proxy Address
Got proxy address!
Process token info
Getting Customer details:  3
````
$ npm start
> tfpfrontline@0.10.0 start
> node src/index.js
+++ Start Frontline CRM Application web server.
+ Set callbacks directory routes/index.js.
+ Get environment variables.
+ config.twilio.sso_realm_sid: JB3a...9
+ config.twilio.account_sid: ACa...3
+ config.twilio.sms_number: +12...2
+ config.twilio.whatsapp_number: whatsapp:+1415...6
Application started at 8000

Log messages added into: .../src/routes/callbacks/crm.js
````
const handleGetCustomerDetailsByCustomerIdCallback = async (req, res) => {
    console.log('+ Getting Customers details: handleGetCustomerDetailsByCustomerIdCallback');
    const body = req.body;
    const workerIdentity = req.body.Worker;
    const customerId = body.CustomerId;
    console.log('+ Getting Customer details, customerId: ', customerId);
    const customerDetails = await getCustomerById(customerId);
    console.log('+ customerDetails: ', customerDetails);
    // Respond with Contact object
    res.send({
        objects: {
            customer: {
                customer_id: customerDetails.customer_id,
                display_name: customerDetails.display_name,
                channels: customerDetails.channels,
                links: customerDetails.links,
                avatar: customerDetails.avatar,
                details: customerDetails.details
            }
        }
    });
};
````

--------------------------------------------------------------------------------
### Testing Frontline App API Requests

[Get Customer Details By Customer Id](https://www.twilio.com/docs/frontline/my-customers#getcustomerdetailsbycustomerid)

Note, the following will fail because a x-twilio-signature header is required.

Request example:
````
curl -X POST 'http://localhost:8000/callbacks/crm?location=GetCustomerDetailsByCustomerId' \
   --data-urlencode "Worker=john@example.com" \
   --data-urlencode "CustomerId=1"
````
JSON response example:
````
{
 "objects": {
   "customer": {
     "display_name": "Bobby S.",
     "customer_id": "1",
     "channels": [{ type: "sms", "value":"+123456789" }]
   }
 }
}
````

[Get Customer list](https://www.twilio.com/docs/frontline/my-customers#getcustomerslist)

Request example:
````
curl -X POST 'http://localhost:8000/callbacks/crm?location=GetCustomersList' \
   --data-urlencode "Worker=john@example.com" \
   --data-urlencode "PageSize=30"
````
JSON response example:
````
{
 "objects": {
   "customers": [{ "display_name": "Bobby S.", "customer_id": "1" }]
 }
}
````

803 bytes sent from Frontline app.
A token is 746 bytes.
````
         1         2         3         4         5         6         7         8         9       100         1         2         3         4         5         6         7         8         9       200         1         2         3         4         5         6         7         8         9       300         1         2         3         4         5         6         7         8         9       400         1         2         3         4         5         6         7         8         9       500         1         2         3         4         5         6         7         8         9       600         1         2         3         4         5         6         7         8         9       700         1         2         3         4         5         6         7         8         9       800
12345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890123
PageSize=30&Worker=t23456789@g23456789&Token=eyJ6aXAiOiJERUYiLCJjdHkiOiJ0d2lsaW8tZnBhO3Y9MSIsImVuYyI6IkEyNTZHQ00iLCJhbGciOiJkaXIiLCJ0d3IiOiJ1czEiLCJraWQiOiJTQVNfUzNfX19LTVNfdjEifQ..fKSs5e7wXgd0LawT.B4bRCnCdP74paTz5P1Qn4gZiqwtQ4WilEb8HCKK3zSMt1oo7r1E7-PbMlIYrIWDC-tfRFHN9cKas_PbMMvOgSupzSWc2k0K_WGPQ1el6pjFNaumKNfag3Cm-JeI2Vf-So57B4qrJbEQkqj5wlreHtFAPBtSj1j-2H0VVkJwzFp6yn0F2_aZMxYYK-MWsI7M5a6elJZbY-Pu1QbyQsmtR__UjkfZhhpcpFG60LuabPCjoZVRr8DcuF98uAP6MAJpcgHs2NEddpIDWqqfcl-zwNjcNqLpTf-8aLMDHog2j225VFnHvsiNRsLgsSwdK7vSsRkUl0Q_3ID866iNvyCZ4CnPPnsa3c1rXEOgshixxBA77ENQH34OkU4CKKOZupv2R7QQZ3qMZJbr-yE-eFswpFiWQkjBZ0oeiiT8xiphMgiyybQWitFFLR0RwSdUECvrgXExqD7v3QpXrYKqQA7TPtss7FGcMbFXXNdEEKnNuGFzbqx-6fAWEvFsulyx6JSNsU9Kz1a2PjKRsM5ooZmdJKKagGeJVqWq_6iRx8CJO6yNpR30FikNzUGBNng.MspHaXIi3lGuuehPHvRPfw
````

--------------------------------------------------------------------------------
### Frontline User Profiles

From the Twilio Console,
+ Get the list of users: Frontline/Manage/Users
+ Click a user to modify their information.

Or, your the API, [user resource](https://www.twilio.com/docs/frontline/api/user-resource).

--------------------------------------------------------------------------------
### Handle Incomming Conversations

To [Handle Incoming Conversations](https://www.twilio.com/docs/frontline/handle-incoming-conversations),
you can let Twilio Conversations create new conversations for you automatically.

What is missing from a newly created conversation is a Twilio Frontline user/worker.
You will need to add a Frontline worker with routing, and update the CRM customer information.

The onConversationAdd webhook will be called before creating a conversation.
There are three options to handle the routing of incoming conversations: 
+ Do not route, a Conversation will be created but it won't be routed.
+ Custom routing, and 
+ Pool routing.

--------------------------------------------------------------------------------
### Frontline with WhatsApp Notes

From the Twilio Console: Develop/Frontline/Manage/Callbacks: Templates Callback URL
I added in the URL, for example: https://example.com/callbacks/templates,
and now I see that when I click the icon in my Frontline app conversation(Enter message field), 
I get the list of Templates, which matches the templates in template.js.

Here is the template.js I'm using that feeds me the templates:
https://github.com/twilio/frontline-demo-service/blob/main/src/routes/callbacks/templates.js

I guess I could add the Sandbox templates, yes? 
And use those for sending template message that are not within a 24 hour session window? 
I’ll need to wait 24 hours before I test because I’ve already exchanged free form messages.

Twilio WhatsApp Sandbox templates, from the Twilio Console "learn" option:
````
Your {{1}} code is {{2}}
//  Example: Your Twilio code is 1238432
Your appointment is coming up on {{1}} at {{2}}
//  Example: Your appointment is coming up on July 21 at 3PM
Your {{1}} order of {{2}} has shipped and should be delivered on {{3}}. Details: {{4}}
//  Example: Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019. Details: http://www.yummycupcakes.com/
````

Learn how to configure message templates with Frontline’s built-in support for WhatsApp templated messages.
https://www.twilio.com/docs/frontline/templated-messages
The Frontline app has built-in support for templated messages.
Note: To make a template visible in the WhatsApp channel, when there is no active 24 hour session, 
you need to add whatsAppApproved: true flag on each approved template.

I setup my Frontline system to use the Twilio WhatsApp Sandbox.
Results of my testing:
+ I can use a program(I use curl) to send template messages to my WhatsApp user.
+ In my WhatsApp user app, I can receive and read messages from my program.
+ In my WhatsApp user app, I can send messages to my Frontline user.
+ In my Frontline app, I can receive and read messages from my WhatsApp user.
+ In my Frontline app, I can reply to the received messages from my WhatsApp user.
+ In my WhatsApp user app, I can receive and read messages from my Frontline user.

I need to test:
+ Add the Sandbox templates listed above, into: templates.js.
+ In the Frontline app, sending a first message based on templates in: templates.js.

Note,
Frontline doesn’t automatically recognize templates that are approved at the account level, 
you need to serve a template in the integration service via the 
templates callback URL and indicate that it’s whatsAppApproved: true.

--------------------------------------------------------------------------------
### Suggested Tutorial Updates:

[Quickstart page](https://www.twilio.com/docs/frontline/nodejs-demo-quickstart)

1) Highlight the link between the customer attribute worker in customers.js,
and the Frontline login identity, which matches the worker attribute.
I totally missed this and my server side application failed to return any customer data.
I did figure it out, but took a while.
Sample from customers.js:
````
   {
        customer_id: 3,
        display_name: ‘John Keats’,
        channels: [
            {type: ‘sms’, value: ‘+16505559999’}
        ],
        worker: ‘dave@example.com’,
        avatar: ‘https://abouttime-2357.twil.io/Keats.jpg’
    },
````
2) Include the specifications for the backend customer application.
I wanted to write a simple application using hardcoded text,
but quickly realized I would have to reverse engineer the application.
My long term plan is to write API calls to Google Contacts so that I can
use Frontline as my SMS app to communicate with people when I’m traveling.
All I will need is Frontline and a WiFi connection to do SMS with people.

API basics would be enough:
+ API requests: HTTP request structure sent from the Frontline app to the backend. 
    For example, the worker identity that is used to select customers from the customers.js database.
+ API response: Data structures returned from the backend to the Frontline app.

3) Clarify the attributes for the SSO service on the Frontline SSO setup page,
How to Configure Okta as a Frontline Identity Provider,
[Step 4. Configure Claims](https://www.twilio.com/docs/frontline/sso/okta#4-configure-claims).
Now that I’m writing this, it should have been obvious that the attributes would be case sensitive.
But I missed this when working through it.

I was using Okta:
+ “email” and “roles” are case sensitive, use lowercase.
+ I made the mistake of using first letter upper case, “Email” and “Roles”,
    which caused an 70252 error on my Frontline app.

4) Clarify the URLs of sample application serving customer data.
In the step, [Populate the My Customers List](https://www.twilio.com/docs/frontline/nodejs-demo-quickstart#populate-the-my-customers-list)
Suggest adding the complete URL in text, as the graphic is really small and I missed this.
And, I missed reading the paragraph text that explains the URLs.
+ Complete URLsample : https://5d70b0c7.ngrok.io/callbacks/crm 

--------------------------------------------------------------------------------

Cheers...
