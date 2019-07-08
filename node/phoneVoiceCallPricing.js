console.log("++ Start.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);

console.log("+ Number : " + process.env.PHONE_NUMBER1
        + ", other Number: " + process.env.PHONE_NUMBER_UK);

client.pricing.voice.numbers(process.env.PHONE_NUMBER1)
        .fetch({originationNumber: process.env.PHONE_NUMBER_UK})
        .then(number => console.log(
                    "+ Voice, From number: " + process.env.PHONE_NUMBER_UK
                    + ", To: " + process.env.PHONE_NUMBER1
                    + " : " + JSON.stringify( number.outboundCallPrices )
                    ));

client.pricing.voice.numbers(process.env.PHONE_NUMBER_UK)
        .fetch({originationNumber: process.env.PHONE_NUMBER1})
        .then(number => console.log(
                    "+ Voice, From number: " + process.env.PHONE_NUMBER1
                    + ", To: " + process.env.PHONE_NUMBER_UK
                    + " : " + JSON.stringify( number.outboundCallPrices )
                    ));

// eof