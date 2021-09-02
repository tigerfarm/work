# Twilio Frontline Quickstart Implementation Steps

Following, are the steps I used to implement and test Frontline.

[Documentation](https://www.twilio.com/docs/frontline)

[Quickstart page](https://www.twilio.com/docs/frontline/nodejs-demo-quickstart)

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



--------------------------------------------------------------------------------

Cheers...
