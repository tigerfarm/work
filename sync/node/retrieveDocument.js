// https://www.twilio.com/docs/sync/api/documents
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const syncServiceSid = process.env.SYNC_SERVICE_SID;
//
const syncDocumentUniqueName = "x";
console.log("++ Retrieve Sync Service:Document: " + syncServiceSid + ":" + syncDocumentUniqueName);
//
client.sync.services(syncServiceSid).documents(syncDocumentUniqueName)
        .fetch().then(theData => {
    console.log("+ Document: " + theData.uniqueName + ", JSON data: " + JSON.stringify(theData.data));
}).catch(function (error) {
    console.log("- " + error);
    // callback("- " + error);
});
