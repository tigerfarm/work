console.log("++ Send SMS message.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
theMsg = "Hello 3";
console.log("+ api_key: " + process.env.AUTHY_API_KEY
        + ", phone_number: " + process.env.AUTHY_PHONE_NUMBER1
        + ", country_code: " + process.env.AUTHY_PHONE_COUNTRYCODE);

this._request("post", "/protected/json/phones/verification/start", {
            "api_key": process.env.AUTHY_API_KEY,
            "phone_number": process.env.AUTHY_PHONE_NUMBER1,
            "via": "via",
            "country_code": process.env.AUTHY_PHONE_COUNTRYCODE,
            "code_length": 4
        },
        callback()
    );
    
console.log("+ Sent.");
