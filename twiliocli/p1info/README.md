# Use Twilio CLI to Manage Twilio Function Services

--------------------------------------------------------------------------------
### Create, Run and Test, and Deploy Twilio Functions and Assets

You can create, run and test Functions locally using the Twilio CLI.

#### Create a Project on Your Development Computer

The following is based on the
[General Usage lab](https://www.twilio.com/docs/labs/serverless-toolkit/general-usage).

Change to a working directory and create (init) a new project, under that directory.
````
$ cd /Users/.../Projects/work/twiliocli
$ twilio serverless:init p1
✔ Creating project directory
✔ Creating project directories and files
✔ Downloading .gitignore file
✔ Installing dependencies
...
│   Success!
│   Created p1 at /Users/.../Projects/work/twiliocli
│   Inside that directory, you can run the following command:                  │
│   npm start                                                                  │
│     Serves all functions in the ./functions subdirectory and assets in the   │
│     ./assets directory                                                       │
│   Get started by running:                                                    │
│   cd p1                                                                      │
│   npm start                                                                  │

$ ls p1
assets			functions		node_modules		package-lock.json	package.json
````

#### Run and Test the Project

List the functions that were created by default.
List the hello world function that was created.
The hello world function, will return 'Hello World!' Say TwiML.
````
$ cd /Users/.../Projects/work/twiliocli/p1
$ ls functions/
hello-world.js		private-message.js	sms

$ cat functions/hello-world.js 
exports.handler = function(context, event, callback) {
  const twiml = new Twilio.twiml.VoiceResponse();
  twiml.say('Hello World!');
  callback(null, twiml);
};
````

To run the hello world function locally,
start the local NodeJS Twilio CLI webserver.
````
$ cd /Users/.../Projects/work/twiliocli/p1
$ npm start
--- or ---
$ twilio serverless:start

> p1@0.0.0 start /Users/dthurston/Projects/work/twiliocli/p1
> twilio-run
...
┌────────────────────────────────────────────────────────────────────┐
│                                                                    │
│   Twilio functions available:                                      │
│   ├── /hello-world | http://localhost:3000/hello-world             │
│   ├── /private-message | http://localhost:3000/private-message     │
│   └── [protected] /sms/reply | http://localhost:3000/sms/reply     │
│                                                                    │
│   Twilio assets available:                                         │
│   ├── /index.html | http://localhost:3000/index.html               │
│   ├── [private] /message.js | Runtime.getAssets()['/message.js']   │
│   └── /style.css | http://localhost:3000/style.css                 │
│                                                                    │
└────────────────────────────────────────────────────────────────────┘
````
Use a browser to run the [hello world function](http://localhost:3000/hello-world).
Browser response:
````
<Response>
<Say>Hello World!</Say>
</Response>
````
Page source TwiML of the hello world function output:
````
<?xml version="1.0" encoding="UTF-8"?><Response><Say>Hello World!</Say></Response>
````

#### Deploy the Project

To deploy to your Twilio account, use the following command.
The Twilio account is base on your Twilio CLI environment Twilio account SID.
````
$ twilio serverless:deploy

Deploying functions & assets to the Twilio Runtime
...
````
Check from the Twilio Console [Functions/Service](https://www.twilio.com/console/functions/overview/services),
````
Unique Name     Friendly Name   SID                                 Date Created		
p1              p1              ZS7e3ea7f1875d690c3cafec2a7312a60f  2021-03-03T18:24:51Z
````
Run the p1 project hello world function from your browser.
From the [Functions/Service](https://www.twilio.com/console/functions/overview/services) link,
Click p1.
Under Functions, copy the public URL for /hello-world.
Run the URL from your browser, for example:

https://p1-2357-dev.twil.io/hello-world (this isn't actual, just reference for syntax)

Browser response, same as running it locally:
````
<Response>
<Say>Hello World!</Say>
</Response>
````

--------------------------------------------------------------------------------
### Environment Variables

Here is how to set environment variable locally and once deployed.
+ Locally, add your environment variables into the ".env" file in the project's root directory.
+ Once deployed, the ".env" file environment variables will be created in the project service's Environment Variables.

Note, in the UI, by default the project service's Environment Variables are not editable in the UI.
Run the following to make them editable.
````
curl -X POST https://serverless.twilio.com/v1/Services/ZS7...f \
--data-urlencode "UiEditable=True" \
-u $TWILIO_ACCOUNT_SID:$TWILIO_AUTH_TOKEN
````
Documentation [link](https://www.twilio.com/docs/runtime/functions-assets-api/api/service#update-a-service-resource).

#### For Multiple Environments (dev/staging/prod)

Environment,
https://www.twilio.com/docs/runtime/functions-assets-api/api/environment
Environments define the different domains your Functions and Assets are available under. You can only have one environment, or you can have many, e.g. a dev, stage and prod. You can deploy Builds to many environments.

Create an Environment resource
https://www.twilio.com/docs/runtime/functions-assets-api/api/environment#create-an-environment-resource

--------------------------------------------------------------------------------

Cheers...
