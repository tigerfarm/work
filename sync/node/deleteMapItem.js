// https://www.twilio.com/docs/sync/api/maps
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const syncServiceSid = process.env.SYNC_SERVICE_SID;
const syncMapName = process.env.SYNC_MAP_NAME;
const syncMapItem = '+16508667777';
//
console.log("++ Delete Sync Service:Map:Item: " + syncServiceSid + ":" + syncMapName + ":" + syncMapItem);
//
client.sync.services(syncServiceSid).syncMaps(syncMapName).syncMapItems(syncMapItem)
    .remove()
    .then((sync_map) => {
        console.log("+ Deleted.");
    }).catch(function (error) {
        console.log("- " + error);
        // callback("- " + error);
    });
