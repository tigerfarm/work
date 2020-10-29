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

#### Create Twilio Functions.

+ One Function for the Notify app to register a user identity (Notify binding) that is used to send notifications.
+ One to make a Twilio Notify API request to send a notification to the user running the Notify app.

To create the Functions in the Twilio Console, click [here](https://www.twilio.com/console/functions/manage).
````
Select, Twilio Blank.
Click Create.
````
For the code, use this [here](https://github.com/tigerfarm/work/blob/master/functions/ChatTokenGenerator.js).

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
Use the Android package name that is used in the cloned app: "com.twilio.chat.demo".
Click register app.
Download config file, click Download google-services.json.
Download to the Chat app project's app directory.
````

List the google-services.json.
````
$ pwd
/Users/<user>/Projects/android/chat/twilio-chat-demo-android/chat-demo-android/.
$ cat google-services.json
...
````

## Building

### Add google-services.json

[Generate google-services.json](https://developers.google.com/mobile/add) file and place it under `chat-demo-android/`.
At the link, I created a new project, xyzChat, using: com.twilio.chat.demo.
I used the Config Android option to generate the google-services.json.
In the download JSON file, I needed to copy the section "com.twilio.chat.demo" to create section "com.twilio.chat.demo.debug".
````
      "client_info": {
        "mobilesdk_app_id": "1:5...4:android:d...d",
        "android_client_info": {
          "package_name": "com.twilio.chat.demo"
        }
      },
      "client_info": {
        "mobilesdk_app_id": "1:5...4:android:d...d",
        "android_client_info": {
          "package_name": "com.twilio.chat.demo.debug"
        }
      },
````

In the Chat app source code, enter the Twilio Function Register binding URL.
Set the value of ACCESS_TOKEN_SERVICE_URL in chat-demo-android/gradle.properties file to point to a valid Access-Token server.
For example:
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
