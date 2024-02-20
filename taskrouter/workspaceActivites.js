// Documentation:
// https://www.twilio.com/docs/taskrouter/api/workspace
// https://www.twilio.com/docs/taskrouter/api/activity
//
console.log("+++ Start...");
const ACCOUNT_SID = process.env.TR_ACCOUNT_SID;
const ACCOUNT_AUTH_TOKEN = process.env.TR_AUTH_TOKEN;
const trClient = require('twilio')(ACCOUNT_SID, ACCOUNT_AUTH_TOKEN);
const WORKSPACE_SID = process.env.WORKSPACE_SID;
var arrayActivities = [];
var theFriendlyName = "";
// var theList = "";        // Used in webserver.js.
trClient.taskrouter.v1.workspaces(WORKSPACE_SID)
        .fetch()
        .then(workspace => {
            theFriendlyName = workspace.friendlyName;
            console.log("+ Workspace friendlyName: " + theFriendlyName);
            // theList = theFriendlyName + ":workspacefriendlyname";
            trClient.taskrouter.v1
                    .workspaces(WORKSPACE_SID).activities.list()
                    .then((activities) => {
                        console.log("++ Load workspace activies.");
                        activities.forEach((activity) => {
                            console.log("+ SID: " + activity.sid + " : " + activity.friendlyName);
                            arrayActivities.push([activity.sid, activity.friendlyName]);
                            // theList = theList + ":" + activity.sid + ":" + activity.friendlyName;
                        });
                        // Following is the value used in webserver.js.
                        // console.log(theList);
                        console.log("+++ Completed...");
                    });
        });
// eof