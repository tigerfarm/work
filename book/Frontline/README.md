# Twilio Frontline Quickstart Implementation Steps

Following, are the steps I used to implement and test Frontline.

[Documentation](https://www.twilio.com/docs/frontline)

[Quickstart page](https://www.twilio.com/docs/frontline/nodejs-demo-quickstart)

Frontline implementation setup components:
+ My Okta account is configured for Frontline.
+ The Okta account settings are configured into the Frontline Twilio Console settings.
+ I can log into the Frontline app on my Android phone.
+ I setup a localhost Frontline server side application to server customer data to the Frontline app, through Ngrok.
+ I can view customer data in the Frontline app: Customer name, SMS phone number, and avatar graphic.

### Getting Started

To get started, I went to the Twilio Console Frontline Overview product page.
It said that I needed a Frontline Conversations service, which it created,
and listed on the bottom of the page:
````
    Frontline’s Conversation service information
    Conversations service name: Frontline Service
    Conversations service SID: IS1...f
````
I installed the Twilio Frontline app on my Android phone.
When it started, it prompted me for my company name.
+ I entered my company name: TigerFarmPress. It said, Company name not found.

Since, I got an error message on the app, I started going through the quickstart.
Frontline/Getting started/Node.js Quickstart.

As recommeneded in the quickstart,
+ I set my Conversations Default Service to: Frontline Service, and clicked Save.
+ In the Conversations Default Messaging Service:
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

Note, "email" and "roles" is case sensitive, use lowercase.
https://www.twilio.com/docs/frontline/sso/okta#4-configure-claims
I had used "Email" and "Roles".
That Okta configuration mistake caused an 70252 error on my Frontline app.
Once changed to lowercase, all was good.

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
In the [tutorial](https://www.twilio.com/docs/frontline/nodejs-demo-quickstart#populate-the-my-customers-list),
I added a customer profile into: .../src/providers/customers.js

I started Ngrok.
````
$ ngrok http http://localhost:8000
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
2) I got rid of the customer list filter: .../src/providers/customers.js
````
const getCustomersList = async (worker, pageSize, anchor) => {
    // const workerCustomers = customers.filter(customer => customer.worker === worker);
    const workerCustomers = customers;
...
};
````
Then, I realized that the attribute, customers.worker, is the Frontline app logged in user id.
So, I changed the customers.worker attribute to match my logged in identity.

Start the application.
````
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
### Customer list.

Information added into: .../src/providers/customers.js
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

Cheers...
