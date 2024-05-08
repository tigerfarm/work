// -----------------------------------------------------------------------------
// Twilio Functions using Sync Maps
// 
// Note, I'm using Twilio version: 3.19.2, Twilio Function Configuration page,
//  https://www.twilio.com/console/runtime/functions/configure
// 
// In the Twilio Function Configuration page, I created environment varialbes for use in the following Twilio Functions.
//  https://www.twilio.com/console/runtime/functions/configure
//      SYNC_SERVICE_SID    My Sync service SID.
//      SYNC_MAP_NAME       I used "amap" for the value for testing.
// 
// Sync documentation links:
// 
// Client side using the Twilio JavaScript SDK:
//  https://www.twilio.com/docs/sync/maps
// Servier side using the Twilio SDK:
//  https://www.twilio.com/docs/sync/api/maps
//  
// https://www.twilio.com/docs/runtime/client?code-sample=code-get-the-default-sync-service-instance-11&code-language=Node.js&code-sdk-version=default
// 

// -----------------------------------------------------------------------------
// Create a map.

exports.handler = function (context, event, callback) {
    let theMapName = event.mapname || context.SYNC_MAP_NAME;
    console.log("+ Create: " + theMapName + ", using SYNC_SERVICE_SID: " + context.SYNC_SERVICE_SID);
    let sync = Runtime.getSync({serviceName: context.SYNC_SERVICE_SID});
    sync.maps.create({
        ttl: 0,
        uniqueName: theMapName
    }).then((sync_map) => {
        console.log("+ Created, Map SID: " + sync_map.sid);
        callback(null, "+ Created: " + theMapName);
    });
};

// curl -X GET https://sync.twilio.com/v1/Services -u $ACCOUNT_SID:$AUTH_TOKEN
// curl -X GET https://sync.twilio.com/v1/Services/$SYNC_SERVICE_SID/Maps -u $ACCOUNT_SID:$AUTH_TOKEN

// -----------------------------------------------------------------------------
// Create a map item.

// https://about-time-2357.twil.io/scmi
// https://about-time-2357.twil.io/scmi?itemkey=counterc
// https://about-time-2357.twil.io/scmi?itemkey=counterf&itemdatacountervalue=15

exports.handler = function(context, event, callback) {
    let syncMapItemKey = event.itemkey || "countera";
    let syncMapItemDataCounterValue = parseInt(event.itemdatacountervalue) || 6;
    console.log("+ Create item"
        + ", SYNC_SERVICE_SID: " + context.SYNC_SERVICE_SID
        + ", SYNC_MAP_NAME: " + context.SYNC_MAP_NAME
        + ", Item key: " + syncMapItemKey
        + ", Data value: " + syncMapItemDataCounterValue
    );
    let theData = {"counter": syncMapItemDataCounterValue};
    let sync = Runtime.getSync({serviceName: context.SYNC_SERVICE_SID}).maps(context.SYNC_MAP_NAME);
    sync.syncMapItems.create({
        ttl: 0,
        key: syncMapItemKey,
        data: theData
    }).then(function(response){
        console.log("+ Created: " + response.key);
        callback(null,"+ Created: " + response.key + ", Data: " + JSON.stringify(theData));
    })
    .catch(function (error) {
        console.log("- " + error);
        callback(null, "- " + error);
    });
};

// -----------------------------------------------------------------------------
// Retrieve a map item.
//
// curl -X GET https://sync.twilio.com/v1/Services/$SYNC_SERVICE_SID/Maps/amap -u $ACCOUNT_SID:$AUTH_TOKEN
// curl -X GET https://sync.twilio.com/v1/Services/$SYNC_SERVICE_SID/Maps/amap/Items/countera -u $ACCOUNT_SID:$AUTH_TOKEN

// https://about-time-2357.twil.io/srmi?itemkey=counterf

exports.handler = function (context, event, callback) {
    let syncMapItemKey = event.itemkey || "countera";
    console.log("+ Retrieve map item" 
            + ", SYNC_SERVICE_SID: " + context.SYNC_SERVICE_SID
            + ", SYNC_MAP_NAME: " + context.SYNC_MAP_NAME
            + ", syncMapItemKey: " + syncMapItemKey
            );
    let sync = Runtime.getSync({serviceName: context.SYNC_SERVICE_SID}).maps(context.SYNC_MAP_NAME);
    sync.syncMapItems(syncMapItemKey).fetch()
            .then((syncMapItem) => {
                console.log("+ syncMapItem key: " + syncMapItem.key);
                console.log("+ syncMapItem data JSON: " + JSON.stringify(syncMapItem.data));
                if (syncMapItem.data.counter) {
                    console.log("+ data.counter " + syncMapItem.data.counter);
                }
                if (syncMapItem.data) {
                    callback(null, "Retrieved: " + syncMapItem.key + ", Data: " + JSON.stringify(syncMapItem.data));
                } else {
                    callback(null, "Retrieved: " + syncMapItem);
                }
            })
            .catch(function (error) {
                // - Error: The requested resource /Services/ISf...1/Maps/amap/Items/countera was not found
                console.log("- " + error);
                callback(null, "- " + error);
            });
};

// -----------------------------------------------------------------------------
// Update a map item.

// https://about-time-2357.twil.io/sumi
// https://about-time-2357.twil.io/sumi?itemkey=counterc
// https://about-time-2357.twil.io/sumi?itemkey=counterf&itemdatacountervalue=15

exports.handler = function(context, event, callback) {
    let syncMapItemKey = event.itemkey || "countera";
    let syncMapItemDataCounterValue = parseInt(event.itemdatacountervalue) || 6;
    console.log("+ Update item"
        + ", SYNC_SERVICE_SID: " + context.SYNC_SERVICE_SID
        + ", SYNC_MAP_NAME: " + context.SYNC_MAP_NAME
        + ", Item key: " + syncMapItemKey
        + ", Data value: " + syncMapItemDataCounterValue
    );
    let theData = {"counter": syncMapItemDataCounterValue};
    let sync = Runtime.getSync({serviceName: context.SYNC_SERVICE_SID}).syncMaps(context.SYNC_MAP_NAME);
    sync.syncMapItems(syncMapItemKey).update({
        ttl: 0,
        key: syncMapItemKey,
        data: theData
    }).then(function(response){
        console.log("+ Updated: " + response.key);
        callback(null,"+ Updated: " + response.key + ", Data: " + JSON.stringify(theData));
    })
    .catch(function (error) {
        console.log("- " + error);
        callback(null, "- " + error);
    });
};

// -----------------------------------------------------------------------------
// Delete a map item.
//
// https://about-time-2357.twil.io/sdmi?itemkey=counterf

exports.handler = function (context, event, callback) {
    let syncMapItemKey = event.itemkey || "countera";
    console.log("+ List map item" 
            + ", SYNC_SERVICE_SID: " + context.SYNC_SERVICE_SID
            + ", SYNC_MAP_NAME: " + context.SYNC_MAP_NAME
            + ", syncMapItemKey: " + syncMapItemKey
            );
    let sync = Runtime.getSync({serviceName: context.SYNC_SERVICE_SID}).maps(context.SYNC_MAP_NAME);
    sync.syncMapItems(syncMapItemKey).remove()
            .then((syncMapItem) => {
                console.log("+ Deleted syncMapItem, key: " + syncMapItemKey);
                callback(null, "+ Deleted syncMapItem, key: " + syncMapItemKey);
            })
            .catch(function (error) {
                console.log("- " + error);
                callback(null, "- " + error);
            });
};

// -----------------------------------------------------------------------------
