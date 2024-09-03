# Signature Validation Samples

Signature Validation [documentation](https://www.twilio.com/docs/usage/security#validating-requests).

Types requests: GET and POST HTTP requests, and JSON response data.

Program language prefixes:
+ Python : Python
+ c : C#
+ j : Java
+ n : Node.js
+ php : PHP
+ ruby : Ruby

## Program Samples

[nGenerateSignature.js](nGenerateSignature.js): Generate Twilio validation signatures.

[jSignatureValidationPost.java](jSignatureValidationPost.java), 
includes code to automatically convert the Twilio POST body RAW data string into validation data.

To run the Java program:
````
$ javac -cp twilio-8.18.0-jar-with-dependencies.jar jSignatureValidationPost.java
...
$ java -cp .:twilio-8.18.0-jar-with-dependencies.jar jSignatureValidationPost
params.put("ToCountry", "US");  // US
params.put("ToState", "CA");  // CA
params.put("SmsMessageSid", "SM3558804311501f712c1b4772546a80e0");  // SM3558804311501f712c1b4772546a80e0
params.put("NumMedia", "0");  // 0
params.put("ToCity", "SAN BRUNO");  // SAN+BRUNO
params.put("FromZip", "");  // 
params.put("SmsSid", "SM3558804311501f712c1b4772546a80e0");  // SM3558804311501f712c1b4772546a80e0
params.put("FromState", "CA");  // CA
params.put("SmsStatus", "received");  // received
params.put("FromCity", "");  // 
params.put("Body", "you got it! 3");  // you+got+it%21+3
params.put("FromCountry", "US");  // US
params.put("To", "+16505552222");  // %2B16505552222
params.put("ToZip", "94030");  // 94030
params.put("NumSegments", "1");  // 1
params.put("ReferralNumMedia", "0");  // 0
params.put("MessageSid", "SM3558804311501f712c1b4772546a80e0");  // SM3558804311501f712c1b4772546a80e0
params.put("AccountSid", "ACa...3");  // ACa...3
params.put("From", "+16505551111");  // %2B16505551111
params.put("ApiVersion", "2010-04-01");  // 2010-04-01
+ url :       https://tfpecho.herokuapp.com/inbound
+ signature : 123zg41LpXvfsjaiV+fT+vFlsAB=
+ params:     {ApiVersion=2010-04-01, SmsSid=SM3558804311501f712c1b4772546a80e0, SmsStatus=received, SmsMessageSid=SM3558804311501f712c1b4772546a80e0, NumSegments=1, ToState=CA, From=+16505551111, MessageSid=SM3558804311501f712c1b4772546a80e0, AccountSid=ACa...3, ToCity=SAN BRUNO, FromCountry=US, ToZip=94030, FromCity=, ReferralNumMedia=0, To=+16505552222, FromZip=, ToCountry=US, Body=you got it! 3, NumMedia=0, FromState=CA}
+ Signature validation is: true
````

## Notes

Signature Validation documentation [notes](https://www.twilio.com/docs/usage/security#notes).

Parameters for signature validation:
1. Twilio account auth token: the account auth token used by the Twilio account that makes an HTTP request to your server.
2. URL: the original URL that the Twilio service used to make the HTTP request.
3. Signature: The signature header value from the received HTTP request that is being validated.
4. POST parameters: raw POST parameter string.
Note, the raw GET parameter string did not work from my test because 
the parameter order was different than the original request.
````
GET request, the parameters are in the HTTP request string. Example:
console.log(client.validateRequest(authToken, twilioSignature, url, {}));

The GET parameters need to be in the same order as originally received, as originally sent (HTTP GET request) by Twilio. 

In an HTTP POST request:
+ original parameter name-value pair order is not required,
+ the parameters separate from the HTTP request string.

const params = {
 "ToCountry":"CA","ToState":"Alberta",...
};
console.log(client.validateRequest(authToken, twilioSignature, url, params));
````
When testing, for example an inbound received SMS, confirm by doing the following:
+ Send an SMS message your to Twilio phone number.
+ Twilio account auth token: The account auth token related to the Twilio phone number.
+ URL: the original URL based on the configuration of the Twilio phone number.
+ Signature: from your server logs.
+ POST parameters: raw POST parameter string, also from the logs or from the Twilio logs.

Attribute name value pairs:
+ Values are URL decoded. Use: "+16505552222" instead of "%2B16505552222".
+ Keep the attribute even if the value is empty, for example: ...&zip=&... >> ..., "zip": "", ...
+ Do not include the userid and password in the URL, if they are being used. For example:
Use: "https://example.com/myapp", not: "https://userid:passwd@example.com/myapp"
+ Parameter sorting is not required.

#### Userid and Password Authentication And Signature Validation

Both work together:
+ Basic authentication (http://userid:password@domain/...), and 
+ Request signature validation.

When doing the request validation, remove "userid:password@" from the validation URL.
See "Note" below as to why the userid and password are not used in the signature.

Example request URL with authentication:
````
http://user1:apassword@example.com/abc
````
However, for the request validation URL, use the following:
````
http://example.com/abc
````

[Note](https://developer.mozilla.org/en-US/docs/Web/HTTP/Authentication),
if the server doesn't ask for it, the username and password are not sent by the client.
+ Client makes the HTTP request: http://user1:apassword@example.com/abc
+ Client sends: http://example.com/abc
+ Server responds with: 401 (Unauthorized) response status.
+ Client sends user1:apassword, in an Authorization header such as: Authorization: Basic Skwosa829fSDLkjSile

Authorization: <type> <credentials>

#### Content-Type: application-json

If the Content-Type is application-json,
don't use the JSON body to fill in the validator's param for POST parameters.
+ The query parameter bodySHA256 will be included in the Twilio HTTP request.
+ Its value is calculated as the hexadecimal representation of the SHA-256 hash of the request body.

In a Studio flow widget, Content Type is application/JSON

Example HTTP GET URL when Content-Type is application-json:
````
http://example.com/studio?bodySHA256=12345fd62d0edbf5034ee40ec14c210d230f87642535e25461e123465c545057
````
Studio flow information:
````
// Studio flow widget, 
//  Request method: POST
//  Content Type: application/JSON
//  Body is null
//  Note, when using application/JSON, extra paramaters are not an option.
//  My sample URL https://abouttime-2357.twil.io/echoRequestTest?ext=abc1
// Flow logs show, HTTP Request:
//  Request URL: https://abouttime-2357.twil.io/echoRequestTest?ext=abc1
//     Request Method: POST
//     Response Status Code: 200
//     Response Content Type: text/plain
// When the request is made a GET parameter is added, a SHA hash for the body value:
//  bodySHA256: "44136...aaff8a"
````

--------------------------------------------------------------------------------
Cheers