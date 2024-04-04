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
// var authToken = process.env.MASTER_AUTH_TOKEN
var authToken = '12345';
//
// The Twilio request URL
// const url = 'https://example.com/show?Attributes=%7B%7D&EventType=onMessageAdded&DateCreated=2021-08-12T23:54:50.674Z&Index=28&MessageSid=IM0e30471ca07642c98e69588f6c45872b&AccountSid=ACa...3&Source=SDK&ClientIdentity=dave2&RetryCount=0&Author=dave2&ParticipantSid=MB54907865d0eb407c8208e228dd6a4216&Body=okay+today&ConversationSid=CHc97669141a784c92a74c296c84850d25';
// const url = 'https://example.com/show?f1=hello there';
const url = 'https://example.com/show?f1=hello+there';
//
// The post variables in Twilio's request. Empty for a GET request.
const params = {
    // "ToCountry":"CA",
    // "ToState":"Alberta"
};
console.log(getExpectedTwilioSignature(authToken, url, params));
