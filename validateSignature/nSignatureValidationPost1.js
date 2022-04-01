// Docs: https://www.twilio.com/docs/usage/security#validating-requests

const client = require('twilio');
const authToken = process.env.AUTH_TOKEN; // Your account Auth Token
// The Twilio request URL
const url = 'https://tigerfarmpress.com/cgi/echo1.php';
//
// The post variables in Twilio's request
// Note, the order of the parameters does not change the outcome.
const params = {
 AccountSid: 'AC1...d',
 MessageSid: 'SMbe794ce78f6b9fdf853d2acb76c080db',
 SmsMessageSid: 'SMbe794ce78f6b9fdf853d2acb76c080db',
 SmsSid: 'SMbe794ce78f6b9fdf853d2acb76c080db',
 SmsStatus: 'received',
 To: '+16505552222',
 ToCity: 'SAN BRUNO',
 ToState: 'CA',
 ToCountry: 'US',
 ToZip: '94030',
 From: '+16505551199',
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
