// -----------------------------------------------------------------------------
// Generate Twilio validation signatures.
//
'use strict';
var crypto = require('crypto');
//
// -----------------------------------------------------------------------------
function toFormUrlEncodedParam(paramName, paramValue) {
    if (paramValue instanceof Array) {
        return paramValue
                .map(val => toFormUrlEncodedParam(paramName, val))
                .reduce((acc, val) => acc + val, '');
    }
    return paramName + paramValue;
}
function getExpectedTwilioSignature(authToken, url, params) {
    if (url.indexOf('bodySHA256') !== -1 && params === null) {
        params = {};
    }
    var data = Object.keys(params)
            .sort()
            .reduce((acc, key) => acc + toFormUrlEncodedParam(key, params[key]), url);
    return crypto
            .createHmac('sha1', authToken)
            .update(Buffer.from(data, 'utf-8'))
            .digest('base64');
}
// -----------------------------------------------------------------------------
// Use a validate auth token. Or use a dummy value such as: '12345';
const authToken = process.env.MAIN_AUTH_TOKEN; // Your account Auth Token
// var authToken = '12345';
//
// The Twilio request URL
// const url = 'https://example.com/show?f1=hello there&f2=Dave';   // false
const url = 'https://example.com/show?f1=hello+there&f2=Dave';      // true
//
// The post variables in Twilio's request. Empty for a GET request.
const params = {
};
console.log("-----------------------------------------------");
console.log("+++ Generate and validate an HTTP GET type signature.\n");
//
console.log("+ Twilio signature validate parameters:");
console.log("+ authToken: " + authToken);
console.log("+ url:       " + url);
console.log("+ params:    Empty array for a GET request.");
//
console.log("-----------------------------------------------");
console.log("+ Twilio signature is generated:");
const twilioSignature = getExpectedTwilioSignature(authToken, url, params);
console.log("++ Twilio signature: " + twilioSignature);
//
console.log("-----------------------------------------------");
console.log("+ Validate the generated Twilio signature:");
const client = require('twilio');
console.log("++ Twilio signature test: " + client.validateRequest(authToken, twilioSignature, url, params));
console.log("-----------------------------------------------");
