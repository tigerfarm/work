# Twilio Notify Android Quickstart Implementation Steps

Following, are the steps I used to set up required configurations and run the sample Twilio notification app on my phone.
This allows notifications to be sent from my computer, and received on the phone that is running the notification app.

Once all requirements are configured and the Notify App compiled,
I ran the Notify App on my phone.
In the app, I register a user identity. The identity is used on the server side to create a Twilio Notify Binding.
````
User Notify App >> Twilio Function: register binding >> Twilio creates a Notify Binding.

Laptop program to send a notification >> Twilio >> Google >> Twilio Notify phone app
Requires a mapping from Twilio to the phone app, through Google.
Create a Google project FCM phone app token.
The Google token, is stored by Twilio to address the phone app.
````
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
{
  "project_info": {
    "project_number": "5...",
    "firebase_url": "https://tignotify.firebaseio.com",
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

In the Notify app source code, enter the Twilio Function Register binding URL.
````
Example: https://about-time-2357.twil.io/register-binding
Don't include, "/register-binding".

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
Twilio Notify Quickstart (Send notification)
````
exports.handler = function(context, event, callback) {
 // Create a reference to the user notification service
 const client = context.getTwilioClient();
 const service = client.notify.services(
   context.TWILIO_NOTIFICATION_SERVICE_SID
 );
 const notification = {
   identity:event.identity,
   body:event.body
 };
 console.log(notification);
 // Send a notification
 return service.notifications.create(notification).then((message) => {
   console.log('Notification Message',message);
   callback(null, "Message sent to: " + event.identity + ", " + event.body);
 }).catch((error) => {
   console.log(error);
   callback(error,null);
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
