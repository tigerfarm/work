// Docs: https://www.twilio.com/docs/usage/security#validating-requests

const client = require('twilio');
const authToken = process.env.MAIN_AUTH_TOKEN; // Your account Auth Token
// The Twilio request URL
// const url = 'https://example.com/echo?f1=abc&f2=def';
const url = 'https://tfpecho.herokuapp.com/show?body=rbody';
//
// The POST variables in Twilio's request. Empty when validating a GET request.
const params = {};
// The X-Twilio-Signature header attached to the request
// "x-twilio-signature":"no4Jp+AcSMjZGbZYI8POwaJoP2A="
const twilioSignature = 'no4Jp+AcSMjZGbZYI8POwaJoP2A=';
console.log(client.validateRequest(authToken, twilioSignature, url, params));
