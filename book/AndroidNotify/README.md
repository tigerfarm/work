# Twilio Notify Android Quickstart

#### Clone the repository

````
cd /Users/user/Projects/
$ mkdir notify
$ cd notify/
$ git clone https://github.com/TwilioDevEd/notifications-quickstart-android
...
$ ls -l
notifications-quickstart-android
````

[Tutorial docs](https://www.twilio.com/docs/notify/quickstart/android)

Set up a Notify Service Instance. Example SID:
````
IS6b86eea51935a036f0ae440652761e8a
````

#### Configuring Android Push Notifications

Documentation [link](https://www.twilio.com/docs/notify/configure-android-push-notifications).

Create a Google Firebase [project](https://console.firebase.google.com/)
````
Name: tignotify
Disable:  Enable Google Analytics for this project
Click Create Project, Your new project is ready. Click Continue.
Get started by adding Firebase to your app ... Click Android icon.
Android package name: com.twilio.notify.quickstart
Click register app.
Download config file, click Download google-services.json. Download to the project's app directory.

$ pwd
/Users/user/Projects/android/notify/notifications-quickstart-android/app
$ cat google-services.json
...
````

#### Create a Functions.

Go to [here](https://www.twilio.com/console/functions/manage)
````
Select, Twilio Notify Quickstart.
Click Create. Enter the value of the Notify Service Instance SID, for example:
IS6b86eea51935a036f0ae440652761e8a
Click Create. 2 Functions are created:
+ Twilio Notify Quickstart (Register binding)
+ Twilio Notify Quickstart (Send notification)
Register binding:
https://about-time-2357.twil.io/register-binding
https://unnatural-seat-1873.twil.io/register-binding
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

--------------------------------------------------------------------------------

Cheers...
