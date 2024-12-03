// -----------------------------------------------------------------------------
console.log("+++ Start:");
console.log("++ Read a CSV file of toll free phone number into JSON attribute-value pairs.");
console.log("++ Make a Twilio API request to get the PN SID of each phone number.");
// API request documentation: https://www.twilio.com/docs/phone-numbers/api/incomingphonenumber-resource
//
// -----------------------------------------------------------------------------
var fs = require("fs");
//
// npm install csv-parser
const csv = require('csv-parser');
//
// -----------------------------------------------------------------------------
// Client object for making Twilio API requests.
const twilio = require("twilio");
const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
//
// -----------------------------------------------------------------------------
// 
const results = [];
var i;
var iR = 0;
//
// The first row of the CSV file is the attribute names:
// Phone_Number
// Business_Name
//
async function apiRequest(iRow, theRow) {
    await client.incomingPhoneNumbers
            .list({
                phoneNumber: theRow.Phone_Number
            })
            .then((theRequest) => {
                iString = iR + 1;
                console.log('+ Row# ' + iRow
                        + ": " + theRow.Business_Name
                        + ": " + theRow.Phone_Number
                        );
                console.log("++ theRequest SID: " + theRequest[0].sid + " for " + theRow.Phone_Number);
            }).catch(function (err) {
        console.error("- Error, "
                + ", Phone_Number: " + theRow.Phone_Number
                + ", code: " + err.code + " " + err.message
                );
        console.log("--- Exit.");
    });
    console.log("++ end apiRequest.");
}
// -----------------------------------------------------------------------------
fs.createReadStream('0fileReadCsvPhoneNumbers.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // Process each CSV row.
            // console.log("+ results " + JSON.stringify(results[0]));
            console.log("+ results.length :" + results.length);
            for (i = 0; i < results.length; i++) {
                iRow = i + 1;
                console.log('++ "' + iRow
                        + ": " + results[i].Business_Name
                        + ": " + results[i].Phone_Number
                        );
                apiRequest(iRow, results[i]);
            }
            console.log("+++ Exit: fileRead.");
        });
// -----------------------------------------------------------------------------
// eof
