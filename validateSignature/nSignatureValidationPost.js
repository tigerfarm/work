// Docs: https://www.twilio.com/docs/usage/security#validating-requests

const client = require('twilio');
const authToken = process.env.MAIN_AUTH_TOKEN; // Your account Auth Token
// The Twilio request URL
const url = 'https://example.com/echo';
//
// The post variables in Twilio's request
// Note, the order of the parameters does not change the outcome.
const params = {
 "ToCountry":"CA","ToState":"Alberta","SmsMessageSid":"SM4f41cf3fb2068287f7a8ec0e006af5f8","NumMedia":"0","ToCity":"","FromZip":"94030","SmsSid":"SM4f41cf3fb2068287f7a8ec0e006af5f8","FromState":"CA","SmsStatus":"received","FromCity":"SAN BRUNO","Body":"okay1","FromCountry":"US","To":"+15875552222","ToZip":"","AddOns":"{\"status\":\"successful\",\"message\":null,\"code\":null,\"results\":{}}","NumSegments":"1","MessageSid":"SM4f41cf3fb2068287f7a8ec0e006af5f8","AccountSid":"AC1...d","From":"+16505558188","ApiVersion":"2010-04-01"
};
// The X-Twilio-Signature header attached to the request
// "x-twilio-signature":"lhPWa1tr2uXDFmMvdg9LQOAvsmM="
const twilioSignature = 'lhPWa1tr2uXDFmMvdg9LQOAvsmM=';
console.log(client.validateRequest(authToken, twilioSignature, url, params));
