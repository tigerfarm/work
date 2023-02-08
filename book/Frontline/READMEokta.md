# Twilio Frontline and Okta

This is only just started. I need to document Frontline and Okta better.

Links:
+ [Quickstart page](https://www.twilio.com/docs/frontline/nodejs-demo-quickstart)
+ Documentation, [Handle Incoming Conversations](https://www.twilio.com/docs/frontline/handle-incoming-conversations)
+ Documentation, [Okta for Frontline](https://www.twilio.com/docs/frontline/sso/okta), How to Configure Okta as a Frontline Identity Provider
+ [My Okta account](https://dev-29758280.okta.com/) for managing apps such as Frontline, and Okta users.
+ [Documentation](https://www.twilio.com/docs/frontline)
+ Twilio Console [Admin Center](https://www.twilio.com/console/admin)
+ [Frontline Integration Service Example](https://github.com/twilio/frontline-demo-service).
+ [Test Frontline login](https://frontline.twilio.com/login)

--------------------------------------------------------------------------------
Frontline implementation setup components:
+ Added an organization using Twilio Console, Project: [Admin Center](https://www.twilio.com/console/admin).
+ My Okta account is configured for the Frontline app.
    It uses the Realm SID (starts with JB SID) from Twilio Console: Frontline/Manage/SSO/Log in. 
        The JB SID is created when "Create" is clicked in Frontline/Overview.
+ Okta account settings are configured in Twilio Console: Frontline/Manage/SSO/Log in
+ I can log into the Frontline app on my Android phone.
+ I setup a localhost Frontline server side application to server customer data to the Frontline app, through Ngrok.
+ I can view customer data in the Frontline app: Customer name, SMS phone number, and avatar graphic.
+ I can start a new conversation and exchange messages.

Profiles that are created and managed:
+ From the Twilio Console, Frontline user profiles: Frontline/Manage/Users.
+ Customer profiles in the demo application: .../frontlinedemo/src/providers/customers.js.
+ Okta SSO user profiles for authentication in the Frontline app.

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
