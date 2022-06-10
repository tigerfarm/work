# Twilio Notify Web Quickstart Implementation Steps

The following was inital test steps.
See the [link](https://github.com/tigerfarm/notifyweb) for the completed project.

--------------------------------------------------------------------------------
Following, are the steps I used to set up required configurations and run the sample Twilio notification app on my phone.
This allows notifications to be sent from my computer, and received on the phone that is running the notification app.

#### Clone the Twilio Notify App repository

There are 2 components.

Web application to push notifications to identities.
````
cd /Users/<user>/Projects/
$ mkdir notifyweb
$ cd notifyweb
$ git clone git clone https://github.com/TwilioDevEd/sdk-starter-node.git
...
$ ls
notifications-quickstart-webpush
````

Client side to receive notifications.
````
cd /Users/<user>/Projects/
$ mkdir notifyweb
$ cd notifyweb
$ git clone git clone https://github.com/TwilioDevEd/notify-quickstart-webpush.git
...
$ ls
notifications-quickstart-webpush
````

#### Create a Notify Service

Create a Notify Service Instance: [Twilio Console link](https://www.twilio.com/console/notify/services) 
([Tutorial docs](https://www.twilio.com/docs/notify/quickstart/firebase-web)). 
Example SID:
````
IS6b86eea51935a036f0ae440652761e8a
````
Note, I used the same Notify service as when I implemented the Android Notify app to receive notifications.

#### Create a Google App Mapping to the Notify App

Configuring Android Push Notifications
documentation [link](https://www.twilio.com/docs/notify/configure-android-push-notifications).

Create a Google Firebase [project](https://console.firebase.google.com/)
that will will map to the Notify web application. I used my personal Google account.
````
Click Add project
Project Name: tignotifyweb
Disable:  Enable Google Analytics for this project.
Click Create Project, Your new project is ready. Click Continue.
Get started by adding Firebase to your app ... Click web icon ("</>").
Register app, app nickname: tignotifyweb.
Click register app.
````
Firebase Step (2) Add Firebase SDK sample code snippet:
````
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AI...",
  authDomain: "tignotifyweb.firebaseapp.com",
  projectId: "tignotifyweb",
  storageBucket: "tignotifyweb.appspot.com",
  messagingSenderId: "70...",
  appId: "1:70...6:web:de03..."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
````
Note, if using Node.
````
$ npm install firebase
````
Click, Continue to Console.
````
Under "Firebase", beside Project Overview, click the settings icon and select: Project Settings.
Note, the above sample code, is listed here under the "General" settings.
The code has your Web API Key(as above, apiKey: "AI..._vr...").
````
#### Add the Google FCM token into the Twilio Notify Push Credentials

This is, [Step 3 - Upload your API Key to Twilio](https://www.twilio.com/docs/conversations/javascript/push-notifications-web#step-3-upload-your-api-key-to-twilio)
in the [Push Notifications on Web](https://www.twilio.com/docs/conversations/javascript/push-notifications-web)
documentation.

Get the [Google project](https://console.firebase.google.com/)
tignotifyweb's Project Settings/Cloud messaging, key/Server key Token.

Add the key value into a newly [created/added Push Credential](https://www.twilio.com/console/notify/credentials/create):
````
Friendly Name: tignotifyweb
Type: FCM
FCM Secret: AI..._vr... (the value of the attribute apiKey, from Firebase Project Settings/General)
Click Save.
````
In the tignotify Notify Service Instance, select FCM CREDENTIAL SID: tignotifyweb. Click Save.

#### Create the web application to receive Notifications

[Step 4 - Pass the API Credential Sid in your Access Token](https://www.twilio.com/docs/conversations/javascript/push-notifications-web#step-4-pass-the-api-credential-sid-in-your-access-token)
in the [Push Notifications on Web](https://www.twilio.com/docs/conversations/javascript/push-notifications-web)
documentation.

[Step 5 - Initialize Firebase in your web app](https://www.twilio.com/docs/conversations/javascript/push-notifications-web#step-5-initialize-firebase-in-your-web-app)

[Step 6 - Request push permissions from the user and get your FCM token](https://www.twilio.com/docs/conversations/javascript/push-notifications-web#step-5-initialize-firebase-in-your-web-app)

[Step 7 - Pass the FCM token to the Conversations JS SDK and register an event listener for new push arrival](https://www.twilio.com/docs/conversations/javascript/push-notifications-web#step-5-initialize-firebase-in-your-web-app)

#### Send a notification:

When sending, include:
+ The Notify service SID, which has the FCM CREDENTIAL SID (FCM Credential information: SID, type: FCM, and FCM SECRET)
+ The app user's identity, which matches to the binding, which as the identity + the device id.
+ The notification message to send.

The above information stored with Twilio, is the link between:
+ Your sending program,
+ To the Google(FCM) network. Or Apple(APN) networks if the app in on an iOS device.
+ To app on the specific device.

Use the send notification Function to send a notification to the app user.
````
https://about-time-2357.twil.io/send-notification?identity=user1&body=Hello
```
Or, use the following Node program to send a notification, [sendNotification.js](sendNotification.js)

Sample run:
````
$ node sendNotification.js 
+++ Start sending notifications to an identity.
+ Sent: NT3f22872f3635ed14e3c4295cca45ac21
````
Or, use a curl command.
````
curl -X POST https://notify.twilio.com/v1/Services/IS6b86eea51935a036f0ae440652761e8a/Notifications \
    -d 'Identity=davea' \
    -d 'Body=Hello 13' \
    -u $MASTER_ACCOUNT_SID:$MASTER_AUTH_TOKEN
````

````
curl -X POST https://notify.twilio.com/v1/Services/IS6b86eea51935a036f0ae440652761e8a/Notifications \
    -d 'Identity=davea' \
    -d 'Body=Hello 14' \
    -d 'Title=Dave here' \
    -u $MASTER_ACCOUNT_SID:$MASTER_AUTH_TOKEN
````

The notification will be received on the phone that is running the notification app.

--------------------------------------------------------------------------------
#### The following Firebase steps failed

The steps are based on the Twilio Conversations
[documentation](https://www.twilio.com/docs/conversations/javascript/push-notifications-web).

Create a Google Firebase [project](https://console.firebase.google.com/)
that will will map to the Notify web application. I used my personal Google account.
````
Click Add project
Project Name: tignotifyweb
Disable:  Enable Google Analytics for this project.
Click Create Project, Your new project is ready. Click Continue.
Get started by adding Firebase to your app ... Click web icon ("</>").
Register app, app nickname: tignotifyweb.
Click register app.
````
Firebase Step (2) Add Firebase SDK sample code snippet:
````
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AI...",
  authDomain: "tignotifyweb.firebaseapp.com",
  projectId: "tignotifyweb",
  storageBucket: "tignotifyweb.appspot.com",
  messagingSenderId: "70...",
  appId: "1:70...6:web:de03..."
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
````
Note, if using Node.
````
$ npm install firebase
````
Click, Continue to Console.
````
Under "Firebase", beside Project Overview, click the settings icon and select: Project Settings.
Note, the above sample code, is listed here under the "General" settings.
The code has your Web API Key(as above, apiKey: "AI..._vr...").

--------------------------------------------------------------------------------

Cheers...
