// This does cause a verifaction call and asks for verification code.
// At this time, I don't know where the verification code comes from,
// and since it's a Twilio Voice API, I have not continued working on it.
//
console.log("++ Verify a callerid.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
//
theToName = "My mobile number";
theTo = process.env.MY_PHONE_NUMBER;
// 
thestatusCallbackUrl = "https://tfpbooks.herokuapp.com/echo";
//
console.log("+ "
        + ", theToName: " + theToName
        + ", theTo: " + theTo
        + ", StatusCallback: " + thestatusCallbackUrl
        );
async function createValidationRequest() {
    const validationRequest = await client.validationRequests.create({
        friendlyName: theToName,
        phoneNumber: theTo,
        statusCallback: thestatusCallbackUrl
    // }).then((message) => console.log("+ Okay"))
    //        .catch(function (err) {
    //            console.error("- Error: " + err.message + ", code: " + err.code);
    //            console.log("--- Exit.");
    //        });
            });
    console.log(validationRequest.accountSid);
}

createValidationRequest();

