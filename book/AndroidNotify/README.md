# Twilio Notify Android Quickstart Implementation Steps

Following, are the steps I used to set up required configurations and run the sample Twilio notification app on my phone.
This allows notifications to be sent from my computer, and received on the phone that is running the notification app.

--------------------------------------------------------------------------------
### Components and Configurations

Android Notify app is configured using:
````
Firebase project: tignotify
````
From the project, I downloaded the file: google-services.json,
which is included in the Android app, app directory (see below).
````
...
"project_number": "57...1"
...
"api_key": [
        {
          "current_key": "AIza...LdQ"
        }
      ],
...
````
Android Notify app,
+ Calls the Twilio Classic Function: /register-binding
    Which uses Notify service: IS6b86eea51935a036f0ae440652761e8a
+ Bindings will be registered to that Notify service.

Twilio Console Notify credentials configurations,
````
Name: tignotify
SID: CR974006399e509f2f1fe0d9930f1b121f
FCM Secret: AAAA...VoTx (from the Firebase project)
````
Twilio Console Twilio Notify service,
````
Name: Android Notify app
SID: IS6b86eea51935a036f0ae440652761e8a
FCM CREDENTIAL SID: tignotify
MESSAGING SERVICE SID: Default Twilio SMS message
````

I ran the Notify App on my phone.
In the app, I register a user identity: davea.
````
$ node listBindings.js 
+++ List bindings for a Notify service.
+ Notify service SID: IS6b86eea51935a036f0ae440652761e8a
+ The listing:
++ Binding-SID bindingType(fcm,apn):identity<address>)
++ BS9f6046e01845afd2407271b47d8637ff fcm:davea<faR...s7V>

$ node sendNotification.js
+++ Start sending notifications to an identity.
+ Notify service SID: IS6b86eea51935a036f0ae440652761e8a to theIdentity: davea
+ Sent: NT3ed9c8e73cb6fc41c7ce979adc02b8a5
````
The notification shows on my phone.

Then, I can view the log in the Twilio Console:
````
Develop/Notify/Services click Android Notify app.
Click left menu item: Logs.
2022-10-19 00:30:08.91 UTC faR...s7V  fcm  davea  BS9f6046e01845afd2407271b47d8637ff  SENT	
````

--------------------------------------------------------------------------------
#### Clone the Twilio Notify App repository

````
cd /Users/<user>/Projects/
$ mkdir notify
$ cd notify/
$ git clone https://github.com/TwilioDevEd/notifications-quickstart-android
...
$ ls
notifications-quickstart-android
````

#### Create a Notify Service

Create a Notify Service Instance: [Twilio Console link](https://www.twilio.com/console/notify/services) 
([Tutorial docs](https://www.twilio.com/docs/notify/quickstart/android)). Example SID:
````
Name: p1Android
SID: IS6b86eea51935a036f0ae440652761e8a
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
{
  "project_info": {
    "project_number": "57...1",
    "project_id": "tignotify",
...
````

#### Add the Google FCM token into the Twilio Notify Push Credentials

Get the [Google project](https://console.firebase.google.com/)
tignotify's Settings/Cloud messaging key/Server key Token.

Add the key value into a newly [created/added Push Credential](https://www.twilio.com/console/notify/credentials/create):
````
Friendly Name: tignotify
Type: FCM
FCM Secret: AAA...VoTx (Server key Token)
Click Save.
````
In the tignotify Notify Service Instance, select FCM CREDENTIAL SID: tignotify. Click Save.

#### Create Twilio Notify Create Binding Function

Twilio Function to receive an HTTP requset and create a Notify binding.

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

Note, the Send notification function is not used in this project.

In the Notify app source code, enter the Twilio Function Register binding URL.
````
Example: https://about-time-2357.twil.io/register-binding
Don't include, "/register-binding".

File:
notifications-quickstart-android/app/src/main/java/com/twilio/notify/quickstart/notifyapi/TwilioFunctionsAPI.java

public class TwilioFunctionsAPI {
    // The URL below should be the domain for your Twilio Functions, without the trailing slash:
    // Example: https://sturdy-concrete-1234.twil.io
    public final static String BASE_SERVER_URL = "https://about-time-2357.twil.io";
    ...
````

Twilio Notify Quickstart (Register binding)
````
exports.handler = function(context, event, callback) {
    const twilioClient = context.getTwilioClient();
    const service = twilioClient.notify.services(
       context.TWILIO_NOTIFICATION_SERVICE_SID
   );
   const binding = {
       'identity':event.identity,
       'bindingType':event.BindingType,
       'address':event.Address
   }
   service.bindings.create(binding).then((binding) => {
       console.log("Address:" + event.Address + ":");
       console.log(binding);
       // Send a JSON response indicating success
       callback(null, {message: 'Binding created!'});
   }).catch((error) => {
       console.log(error);
       callback(error, {
       error: error,
       message: 'Failed to create binding: ' + error,
     });
 });
};
````

#### Use the app to register the device.

Using the app:
+ Run the app on the Android device.
+ The app have a link to the above Twilio Function: Twilio Notify Quickstart (Register binding)
+ Enter Notify Binding identity and tap Register Binding.
The app will make a call to the register binding Twilio Function which creates a Notify Binding for the identity.
+ FCM binding: Indentity + device ID
+ Run the below listBindings.js program to see the binding.

Managing Notify bindings resource:
https://www.twilio.com/docs/notify/api/binding-resource

Can use the following Node program to list the binding, [listBindings.js](listBindings.js)
````
$ node listBindings.js
+++ List bindings for a Notify service.
+ Notify service SID: IS6b86eea51935a036f0ae440652761e8a
+ The listing:
++ Binding-SID bindingType(fcm,apn):identity<address>)
++ BSae07a764e8d5e78111f2f8362c291c9b fcm:davea<fa...7V>
$
````
+ FCM binding: Indentity(davea) + device ID(fa...7V)

Or, use a curl command to the binding.
````
curl -X GET 'https://notify.twilio.com/v1/Services/IS6b86eea51935a036f0ae440652761e8a/Bindings?PageSize=20' \
-u $MASTER_ACCOUNT_SID:$MASTER_AUTH_TOKEN
````

Fetch a single bindings information:
````
$ node fetchBinding.js 
+++ Fetch a binding.
+ Notify SID:        IS6b86eea51935a036f0ae440652761e8a
+ Fetch Binding SID: BSae07a764e8d5e78111f2f8362c291c9b
++ Type:        fcm
++ Identity:    davea
++ Addres:     <fa...7V>
````

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

Cheers...
