# Python Notes

--------------------------------------------------------------------------------
+++ Python version 3
````
$ python3 --version
Python 3.14.0

$ python3 -m venv my_env
$ source my_env/bin/activate
$ pip3 show twilio
Name: twilio
Version: 9.8.4
Summary: Twilio API client and TwiML generator
Home-page: https://github.com/twilio/twilio-python/
Author: Twilio
...
$
````
--------------------------------------------------------------------------------
Getting the Twilio signature from the header in Flask:
valid = validator(request.url, request.form.to_dict(), request.headers['X-Twilio-Signature'])


Install commands:
````
$ brew install python3
````
Install twilio module:
````
$ python3 -m venv my_env
$ source my_env/bin/activate
$ pip3 install twilio
````

--------------------------------------------------------------------------------

Twilio program samples:
https://github.com/twilio/twilio-python/blob/main/examples/basic_usage.py

String References:
https://docs.python.org/3/library/string.html#formatstrings
https://mkaz.blog/code/python-string-format-cookbook/

--------------------------------------------------------------------------------
Cheers...
