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

## Samples

nGenerateSignature.js, Generate Twilio validation signatures.

jSignatureValidationPost.java, includes code to automatically
convert the Twilio POST body RAW data string into validation data.

## Notes

Signature Validation documentation [notes](https://www.twilio.com/docs/usage/security#notes).

The parameter for signature validation:
1. Twilio account auth token: the account auth token used by the Twilio account that makes an HTTP request to your server.
2. URL: the original URL that the Twilio service used to make the HTTP request.
3. Signature: The signature header value from the received HTTP request that is being validated.
4. POST parameters: raw POST parameter string.
Note, the raw GET parameter string did not work from my test because the parameter order was different than the original request.
````
GET request, the parameters are in the HTTP request string. Example:
console.log(client.validateRequest(authToken, twilioSignature, url, {}));

The GET parameters need to be in the same order as originally received, as originally sent (HTTP GET request) by Twilio. 

In an HTTP POST request, the parameters separate from the HTTP request string.
const params = {
 "ToCountry":"CA","ToState":"Alberta",...
};
console.log(client.validateRequest(authToken, twilioSignature, url, params));
````
When testing, for example and inbound received SMS, confirm by doing the following:
+ Send an SMS message your to Twilio phone number.
+ Twilio account auth token: The account auth token related to the Twilio phone number.
+ URL: the original URL based on the configuration of the Twilio phone number.
+ Signature: from your server logs.
+ POST parameters: raw POST parameter string, also from the logs or from the Twilio logs.

Attribute name value pairs:
+ Values are URL decoded.
+ Keep the attribute even if the value is empty, for example: ...&zip=&... >> ..., "zip": "", ...
+ Do not include the userid and password in the URL, if they are being used. For example:
Use: "https://example.com/myapp", not: "https://userid:passwd@example.com/myapp"
+ Parameter sorting is not required.

#### Content-Type: application-json

If the Content-Type is application-json, don't use the JSON body to fill in the validator's param for POST parameters.
+ The query parameter bodySHA256 will be included in the request.
+ Its value is calculated as the hexadecimal representation of the SHA-256 hash of the request body

--------------------------------------------------------------------------------
Cheers