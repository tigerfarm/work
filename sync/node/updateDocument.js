// https://www.twilio.com/docs/sync/api/documents
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const syncServiceSid = process.env.SYNC_SERVICE_SID;
//
const syncDocumentUniqueName = process.env.SYNC_MAP_NAME;
const syncDataCounterValue = 6;
let theData = {'counter': syncDataCounterValue};
console.log("++ Update Sync Service:Document:data: " + syncServiceSid + ":" + syncDocumentUniqueName + ":" + JSON.stringify(theData));
client.sync.services(syncServiceSid).documents(syncDocumentUniqueName)
    .update({data: theData})
    .then((sync_item) => {
        console.log("+ Updated counter: " + sync_item.uniqueName + " counter = " + syncDataCounterValue);
    }).catch(function (error) {
        console.log("- " + error);
        // callback("- " + error);
    });
