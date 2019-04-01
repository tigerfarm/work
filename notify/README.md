# NotifySamples

Samples Twilio Notify programs to create components and send notifications. 

## Program Files

|Program    | Description                                          |
|-----------|------------------------------------------------------|
|[setvars.sh](https://github.com/tigerfarm/NotifySamples/blob/master/setvars.sh) |Shell script set up environment variables.            |
|[echoVars.py](https://github.com/tigerfarm/NotifySamples/blob/master/echoVars.py)|Echo the environment variables to ensure they are set.|
| | |
|[send.py](https://github.com/tigerfarm/NotifySamples/blob/master/send.py)|For students: Send a notification |
|[binding.py](https://github.com/tigerfarm/NotifySamples/blob/master/binding.py)|For students: Create a Notify Binding |
|[show.py](https://github.com/tigerfarm/NotifySamples/blob/master/show.py)|For instructor: Show my environment variables except account SID and auth token |
|[listDeleteAllMsg.py](https://github.com/tigerfarm/NotifySamples/blob/master/listDeleteMsg.py)|Remove all SMS logs using your environment variable account SID |
|[listDeleteReceivedMsg.py](https://github.com/tigerfarm/NotifySamples/blob/master/listDeleteReceivedMsg.py)|Remove received SMS logs using your environment variable account SID |
| | |
|[listServices.py](https://github.com/tigerfarm/NotifySamples/blob/master/listServices.py)|List Notify services |
|[createBindings.py](https://github.com/tigerfarm/NotifySamples/blob/master/createBindings.py)|Binding maintenance programs|
|[listBindings.py](https://github.com/tigerfarm/NotifySamples/blob/master/listBindings.py)| |
|[deleteBindings.py](https://github.com/tigerfarm/NotifySamples/blob/master/deleteBindings.py)| |
| | |
|[sendToList1.py](https://github.com/tigerfarm/NotifySamples/blob/master/sendToList1.py)|Send notifications to one SMS phone number |
|[sendToList2.py](https://github.com/tigerfarm/NotifySamples/blob/master/sendToList2.py)|Send notifications to a list of 2 SMS phone number |
|[sendToPaul.py](https://github.com/tigerfarm/NotifySamples/blob/master/sendToPaul.py)|Send a notification to an identity SMS phone number |
|[sendToOne.py](https://github.com/tigerfarm/NotifySamples/blob/master/sendToOne.py)|Send a notification to the tag "one" |
|[sendToOther.py](https://github.com/tigerfarm/NotifySamples/blob/master/sendToOther.py)|Send a notification to the tag "other" |
| | |
|[echoVars.js](https://github.com/tigerfarm/NotifySamples/blob/master/echoVars.js)|Node.js samples
|[listServices.js](https://github.com/tigerfarm/NotifySamples/blob/master/listServices.js)
|[listBindings.js](https://github.com/tigerfarm/NotifySamples/blob/master/listBindings.js)
|[deleteBindings.js](https://github.com/tigerfarm/NotifySamples/blob/master/deleteBindings.js)
|[sendToList.js](https://github.com/tigerfarm/NotifySamples/blob/master/listServices.js)
| | |
|[sendSmsMsg.py](https://github.com/tigerfarm/NotifySamples/blob/master/sendSmsMsg.py)|Send an SMS message without using Notify

## Set Up Environment Variables

In a working directory, download and unzip the Notify lab files: NotifySamples-master.zip.

Edit setvars.sh.

    Replace your_account_SID and your_account_auth_token with your account values.
    Replace your_phone_number with your mobile phone number.
    Replace your_notify_service_sid with your Notify Service SID.
    Replace your_test_phone_number_* with your phone numbers available for testing.

Requirements, phone numbers must be in E.164 format, including the leading plus sign (“+”). Example: +12223331234.

Save edits.

Set the shell script to be executable and run the script to enable the environment variables.
````
$ chmod u+x setvars.sh
$ source setvars.sh
+++ Set variables.
+++ Start echo variables.
+ ACCOUNT_SID = your_account_SID
+ AUTH_TOKEN = your_account_auth_token
+ ACCOUNT_PHONE_NUMBER = your_account_phone_number
+ NOTIFY_SERVICE_SID = your_notify_service_sid

+ The following are required when creating bindings:
+ PHONE_NUMBER_1 = your_test_phone_number_1
+ PHONE_NUMBER_2 = your_test_phone_number_2
+ PHONE_NUMBER_3 = your_test_phone_number_3

+++ Exit.
````

Cheers...
