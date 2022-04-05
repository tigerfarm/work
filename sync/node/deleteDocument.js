// https://www.twilio.com/docs/sync/api/documents
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const syncServiceSid = process.env.SYNC_SERVICE_SID;
//
const syncDocumentUniqueName = process.env.SYNC_MAP_NAME;
console.log("++ Delete Sync Service:Document " + syncServiceSid + ":" + syncDocumentUniqueName);
//
client.sync.services(syncServiceSid).documents(syncDocumentUniqueName)
        .remove().then(theData => {
    console.log("+ Document deleted: " + syncDocumentUniqueName);
}).catch(function (error) {
    console.log("- " + error);
    // callback("- " + error);
});
