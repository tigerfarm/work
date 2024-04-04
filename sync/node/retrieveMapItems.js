// https://www.twilio.com/docs/sync/api/maps
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const client = require('twilio')(accountSid, authToken);
const syncServiceSid = process.env.SYNC_SERVICE_SID;
const syncMapName = process.env.SYNC_MAP_NAME;
const syncMapItem = 'counterg';
//
console.log("++ Retrieve Sync Service:Map:Item: " + syncServiceSid + ":" + syncMapName + ":" + syncMapItem);
//
client.sync.services(syncServiceSid).syncMaps(syncMapName).syncMapItems
        .each(syncMapItems => {
            if (syncMapItems.data.counter) {
                console.log("+ Key: " + syncMapItems.key + " data.counter " + syncMapItems.data.counter);
            } else {
                console.log("+ Key: " + syncMapItems.key + " JSON: " + JSON.stringify(syncMapItems.data));
            }
        });

