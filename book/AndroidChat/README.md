# Twilio Chat Android Quickstart Implementation Steps

Following, are the steps I used to set up required configurations and run the sample Twilio Chat app on my phone.
This allows notifications to be sent from my computer, and received on the phone that is running the notification app.

Once all requirements are configured and the Chat App compiled,
I ran the App on my phone.
In the app, for notifications, I register a user identity. The identity is used on the server side to create a Twilio Notify Binding.
````
User Chat App >> Twilio Function: register binding >> Twilio creates a Notify Binding.

Laptop program to send a notification >> Twilio >> Google >> Twilio Notify phone app
Requires a mapping from Twilio to the phone app, through Google.
Create a Google project FCM phone app token.
The Google token, is stored by Twilio to address the phone app.
````
#### Clone the Twilio Notify App repository

The project code home page:

https://github.com/tigerfarm/work/tree/master/book/AndroidNotify

````
cd /Users/<user>/Projects/Android
$ mkdir chat
$ cd chat/
$ git clone https://github.com/twilio/twilio-chat-demo-android.git
...
$ ls
twilio-chat-demo-android
````

#### Create a Chat Service

Create a Notify Service Instance: [Twilio Console link](https://www.twilio.com/console/notify/services) 
([Tutorial docs](https://www.twilio.com/docs/notify/quickstart/android)). Example SID:
````
IS6b86eea51935a036f0ae440652761e8a
````

#### Create a Google App Mapping to the Notify App

Configuring Android Push Notifications
documentation [link](https://www.twilio.com/docs/notify/configure-android-push-notifications).

Create a Google Firebase [project](https://console.firebase.google.com/)
that will will map to the Notify App.
````
Name: tignotify
Disable:  Enable Google Analytics for this project.
Click Create Project, Your new project is ready. Click Continue.
Get started by adding Firebase to your app ... Click Android icon.
Use the Android package name that is used in the cloned app: "com.twilio.notify.quickstart".
Click register app.
Download config file, click Download google-services.json.
Download to the Notify app project's app directory.
````

List the google-services.json.
````
$ pwd
/Users/<user>/Projects/android/notify/notifications-quickstart-android/app
$ cat google-services.json
...
````

#### Add the Google FCM token into the Twilio Notify Push Credentials

Get the [Google project](https://console.firebase.google.com/)
tignotify's Settings/Cloud messaging key/Server key Token.

Add the key value into a newly [created/added Push Credential](https://www.twilio.com/console/notify/credentials/create):
````
Friendly Name: tignotify
Type: FCM
FCM Secret: AAA...oTx (Server key Token)
Click Save.
````
In the tignotify Notify Service Instance, select FCM CREDENTIAL SID: tignotify. Click Save.

#### Create Twilio Functions.

+ One Function for the Notify app to register a user identity (Notify binding) that is used to send notifications.
+ One to make a Twilio Notify API request to send a notification to the user running the Notify app.

To create the Functions in the Twilio Console, click [here](https://www.twilio.com/console/functions/manage).
````
Select, Twilio Notify Quickstart.
Click Create. Enter the value of the Notify Service Instance SID, for example:
IS6b86eea51935a036f0ae440652761e8a
Click Create. 2 Functions are created:
+ Twilio Notify Quickstart (Register binding)
+ Twilio Notify Quickstart (Send notification)
Example Register binding URL:
https://about-time-2357.twil.io/register-binding
````

In the Chat app source code, enter the Twilio Function Register binding URL.
````
org.gradle.jvmargs=-Xmx4096m
android.useAndroidX=true
android.enableJetifier=true
ACCESS_TOKEN_SERVICE_URL=https://about-time-2357.twil.io/androidchat
````

Run the app.

When the app is running, enter Notify Binding identity and tap Register Binding.
The app will make a call to the Twilio Binding Function which creates a Notify Binding for the identity.

Can use the following Node program to list the binding, [listBindings.js](listBindings.js)
````
$ node listBindings.js
+++ List bindings.
+ List, IS6b86eea51935a036f0ae440652761e8a: SID bindingType:identity<address>)
+ BS11...74 fcm:davea<fa...7V>
$
````
Or, use a curl command.
````
curl -X GET 'https://notify.twilio.com/v1/Services/IS6b86eea51935a036f0ae440652761e8a/Bindings?PageSize=20' \
-u $MASTER_ACCOUNT_SID:$MASTER_AUTH_TOKEN
````

#### Send a notification:

Use the send notification Function to send a notification to the app user.

https://about-time-2357.twil.io/send-notification?identity=user1&body=Hello

Or, use the following Node program to send a notification, [sendNotification.js](sendNotification.js)

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

Cheers...
