// Manage Sync map data.
// Documentation: https://www.twilio.com/docs/sync/maps

exports.handler = function (context, event, callback) {
    let theMapName = "cmap";
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

// Sync - create a map item
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

// Sync - Retrieve a map item
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

// Sync - update map item
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

// Sync - delete map item
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
