# Demo IdP

Demo Identity Provider for Flex SSO integration challenge.


## Install

Simply clone this repository and install dependencies:

```
cd demo-idp
npm install
```


## Startup

Start the Identity Provider server and follow instructions the script returns:

```
npm start
```

Then head over to [flex.twilio.com](https://flex.twilio.com) and enter your runtime domain (you can find it in your console [here](https://www.twilio.com/console/runtime)).

You will be taken to the IdP server you just started, here you can simply provide any user details (remember, this is a demo IdP, so no authentication is really performed), select your Flex user role and hit Sign In.

TaskRouter Worker will be automatically created and you will be logged in as the user you have specified.