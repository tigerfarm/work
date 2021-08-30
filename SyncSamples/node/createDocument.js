// https://www.twilio.com/docs/sync/api/documents
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const syncServiceSid = process.env.SYNC_SERVICE_SID;
//
const syncDataCounterValue = 4;
let theData = {'counter': syncDataCounterValue};
const syncDocumentUniqueName = "counter" + syncDataCounterValue;
// const syncDocumentUniqueName = process.env.SYNC_MAP_NAME;
//
console.log("++ Create Sync Service:Document:data: " + syncServiceSid + ":" + syncDocumentUniqueName + ":" + JSON.stringify(theData));
client.sync.services(syncServiceSid).documents
    .create({
        data: theData, 
        uniqueName: syncDocumentUniqueName
        , ttl: 60
        })
    .then((sync_item) => {
        console.log("+ Created counter: " + sync_item.uniqueName + " counter = " + syncDataCounterValue);
    }).catch(function (error) {
        console.log("- " + error);
        // callback("- " + error);
    });
