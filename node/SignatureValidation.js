// Docs: https://www.twilio.com/docs/usage/security#validating-requests

// Sample:
// +++ Echo HTTP request data.
// + URL: POST /cgi/echo1.php 
// ++ ToCountry => US
// ++ ToState => CA
// ++ SmsMessageSid => SM5b6f34ffe3a4015a838430dfc96ba84f
// ++ NumMedia => 0
// ++ ToCity => SAN BRUNO
// ++ FromZip => 94030
// ++ SmsSid => SM5b6f34ffe3a4015a838430dfc96ba84f
// ++ FromState => CA
// ++ SmsStatus => received
// ++ FromCity => SAN BRUNO
// ++ Body => hello 4
// ++ FromCountry => US
// ++ To => +16505551111
// ++ ToZip => 94030
// ++ NumSegments => 1
// ++ MessageSid => SM5b6f34ffe3a4015a838430dfc96ba84f
// ++ AccountSid => AC1...d
// ++ From => +16505552222
// ++ ApiVersion => 2010-04-01
// + End of list.
// +++ Echo HTTP headings.++ Connection => close
// ++ User-Agent => TwilioProxy/1.1
// ++ X-Twilio-Signature => Y2qkTMkpIFtB7g8Eqp1NE0TZ6Lg=
// ++ Host => tigerfarmpress.com
// ++ Content-Type => application/x-www-form-urlencoded
// ++ Content-Length => 413
// ++ Cache-Control => max-age=259200
// ++ Accept => */*

const client = require('twilio');
const authToken = process.env.AUTH_TOKEN; // Your account Auth Token
// The Twilio request URL
const url = 'https://tigerfarmpress.com/echo';
//
// The post variables in Twilio's request
// Note, the order of the parameters does not change the outcome.
const params = {
 "ToCountry":"CA","ToState":"Alberta","SmsMessageSid":"SM4f41cf3fb2068287f7a8ec0e006af5f8","NumMedia":"0","ToCity":"","FromZip":"94030","SmsSid":"SM4f41cf3fb2068287f7a8ec0e006af5f8","FromState":"CA","SmsStatus":"received","FromCity":"SAN BRUNO","Body":"okay1","FromCountry":"US","To":"+15875552222","ToZip":"","AddOns":"{\"status\":\"successful\",\"message\":null,\"code\":null,\"results\":{}}","NumSegments":"1","MessageSid":"SM4f41cf3fb2068287f7a8ec0e006af5f8","AccountSid":"AC1...d","From":"+16505558188","ApiVersion":"2010-04-01"
};
// The X-Twilio-Signature header attached to the request
// "x-twilio-signature":"lhPWa1tr2uXDFmMvdg9LQOAvsmM="
const twilioSignature = 'y...Q=';
console.log(client.validateRequest(authToken, twilioSignature, url, params));
