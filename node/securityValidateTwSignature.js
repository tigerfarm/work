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
// ++ To => +16508668225
// ++ ToZip => 94030
// ++ NumSegments => 1
// ++ MessageSid => SM5b6f34ffe3a4015a838430dfc96ba84f
// ++ AccountSid => AC1b32414e8ab41e56e6393bcbba7d5a9d
// ++ From => +16508661199
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
const url = 'https://tigerfarmpress.com/cgi/echo1.php';
//
// The post variables in Twilio's request
// Note, the order of the parameters does not change the outcome.
const params = {
 AccountSid: 'AC1b32414e8ab41e56e6393bcbba7d5a9d',
 MessageSid: 'SMbe794ce78f6b9fdf853d2acb76c080db',
 SmsMessageSid: 'SMbe794ce78f6b9fdf853d2acb76c080db',
 SmsSid: 'SMbe794ce78f6b9fdf853d2acb76c080db',
 SmsStatus: 'received',
 To: '+16505552222',
 ToCity: 'SAN BRUNO',
 ToState: 'CA',
 ToCountry: 'US',
 ToZip: '94030',
 From: '+16505551111',
 FromCity: 'SAN BRUNO',
 FromState: 'CA',
 FromCountry: 'US',
 FromZip: '94030',
 Body: 'hello 5',
 NumMedia: '0',
 NumSegments: '1',
 ApiVersion: '2010-04-01'
};
// The X-Twilio-Signature header attached to the request
const twilioSignature = 'Nz8c/Cm4u+9Zv6RBjugsXVZVVyQ=';
console.log(client.validateRequest(authToken, twilioSignature, url, params));
