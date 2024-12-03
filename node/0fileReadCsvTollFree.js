// -----------------------------------------------------------------------------
console.log("+++ Start:");
console.log("++ Read a toll free data CSV file into JSON attribute-value pairs.");
console.log("++ Request Twilio toll free verifications.");
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
//
// The first row of the CSV file is the attribute names:
// Phone_Numbers
// Business_Name
// Business_Contact_First_Name
// Business_Contact_Last_Name
// Business_Contact_Email
// Business_Contact_Phone_Number
// Corporate_Website
// Business_Addr1
// Business_Addr2
// City
// State
// Zip
// Opt_In_Image_URLs
// Message_Content
// Additional_Supporting_Documentation
// Use_Case_Category
// Message_Volume
// Use_Case_Summary
// 
// Not used:
// Internal_Ticket_Number
// Opt_In_Workflow_Description
// ISVReseller
//
async function createTollfreeVerification() {
    const tollfreeVerification =
            await client.messaging.v1.tollfreeVerifications.create({
                tollfreePhoneNumberSid: results[i].Phone_Number_PN, // Phone number PN SID
                notificationEmail: "support@example.com", // Required.
                businessName: results[i].Business_Name,
                businessContactFirstName: results[i].Business_Contact_Last_Name,
                businessContactLastName: results[i].Business_Contact_First_Name,
                businessContactEmail: results[i].Business_Contact_Email,
                businessContactPhone: results[i].Business_Contact_Phone_Number, // Valid E.164 format phone number.
                businessStreetAddress: results[i].Business_Addr1,
                businessStreetAddress2: results[i].Business_Addr2, // optional
                businessCity: results[i].City,
                businessStateProvinceRegion: results[i].State,
                businessPostalCode: results[i].Zip,
                businessCountry: "US",
                businessWebsite: results[i].Corporate_Website,
                useCaseCategories: [results[i].Use_Case_Category], // See documentation list. It does not contain: mixed.
                useCaseSummary: results[i].Use_Case_Summary,
                productionMessageSample: results[i].Message_Content,
                messageVolume: results[i].Message_Volume,
                optInType: "VERBAL",
                optInImageUrls: [
                    results[i].Opt_In_Image_URLs
                ],
                additionalInformation: results[i].Opt_In_Workflow_Description
                        //
                        // externalReferenceId: results[i].Internal_Ticket_Number,  // optional
                        //
            }).then((createdRequest) => {
        console.log("+ createdRequest tollfreeVerification SID: " + createdRequest.sid + " for " + results[i].Business_Name);
    }).catch(function (err) {
        console.error("- Error: " + err.message + ", code: " + err.code);
        console.log("--- Exit.");
    });

    console.log("+ tollfreeVerification.sid: " + tollfreeVerification.sid);
}
// -----------------------------------------------------------------------------
fs.createReadStream('0fileReadCsv.csv')
        .pipe(csv())
        .on('data', (data) => results.push(data))
        .on('end', () => {
            // Process each CSV row.
            // console.log("+ results " + JSON.stringify(results[0]));
            console.log("+ results.length :" + results.length);
            for (i = 0; i < results.length; i++) {
                iString = i + 1;
                console.log('++ "' + iString + ": " + results[i].Business_Name
                        );
                // // Have to get the phone number PN SID from the attribute: Phone_Numbers
                // Phone_Number_PN = fn(results[i].Phone_Numbers);
                // // Request a toll free number verification:
                // createTollfreeVerification();
            }
            console.log("+++ Exit: fileRead.");
        });
// -----------------------------------------------------------------------------
// eof
