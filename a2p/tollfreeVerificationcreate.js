console.log("++ Submit a Toll-Free Verification Request.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
async function runFunction() {
    console.log("+ SID  friendlyName");
    const tollfreeVerification = await client.messaging.v1.tollfreeVerifications.create({
        additionalInformation:
                "see our privacy policy here www.johnscoffeeshop.com/privacypolicy",
        businessCity: "Anytown",
        businessContactEmail: "email@company.com",
        businessContactFirstName: "firstname",
        businessContactLastName: "lastname",
        businessContactPhone: "+1231231234",
        businessCountry: "US",
        businessName: "Owl, Inc.",
        businessPostalCode: "11111",
        businessStateProvinceRegion: "AA",
        businessStreetAddress: "123 Main Street",
        businessStreetAddress2: "Suite 101",
        businessWebsite: "http://www.company.com",
        externalReferenceId: "abc123xyz567",
        messageVolume: "10",
        notificationEmail: "support@company.com",
        optInImageUrls: [
            "https://zipwhiptestbusiness.com/images/image1.jpg",
            "https://zipwhiptestbusiness.com/images/image2.jpg",
        ],
        optInType: "VERBAL",
        productionMessageSample: "lorem ipsum",
        tollfreePhoneNumberSid: "PNaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa",
        useCaseCategories: ["TWO_FACTOR_AUTHENTICATION", "MARKETING"],
        useCaseSummary:
                "This number is used to send out promotional offers and coupons to the customers of John's Coffee Shop",
    });

    console.log(tollfreeVerification.sid);
}
runFunction().catch(function (err) {
    console.error("- Error code: "+ err.code + " message: " + err.message);
    console.log("--- Exit.");
});