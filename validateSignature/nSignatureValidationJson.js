// Docs: https://www.twilio.com/docs/usage/security#validating-requests

const client = require('twilio');
const authToken = process.env.MAIN_AUTH_TOKEN; // Your account Auth Token
//
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
// 
const url = 'https://abouttime-2357.twil.io/echoRequestTest?ext=abc1&bodySHA256=44136...aaff8a';
//
// The POST variables in Twilio's request. Empty when validating a GET request or when application/JSON is used.
const params = {};
// The X-Twilio-Signature header attached to the request
const twilioSignature = 'Eu1pSHL50VfF+ERSOJSDrNodDc4=';
console.log(client.validateRequest(authToken, twilioSignature, url, params));
