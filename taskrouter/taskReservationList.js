// Documentation:
// https://www.twilio.com/docs/taskrouter/api/task
//
console.log("+++ List tasks.");
const ACCOUNT_SID = process.env.TR_ACCOUNT_SID;
const ACCOUNT_AUTH_TOKEN = process.env.TR_AUTH_TOKEN;
const trClient = require('twilio')(ACCOUNT_SID, ACCOUNT_AUTH_TOKEN);
const WORKSPACE_SID = process.env.WORKSPACE_SID;

theTask = "WTabf254763c385663458f7e6f178d8aa5";
console.log("+ Task: " + theTask);
trClient.taskrouter.v1.workspaces(WORKSPACE_SID)
        .tasks(theTask)
        .reservations
        .list({limit: 20})
        .then(reservation => {
            reservation.forEach(r => {
                console.log("++"
                        + " SID:" + r.sid
                        + " reservationStatus:" + r.reservationStatus
                        + " workerName:" + r.workerName
                        );
            });
            console.log("+++ Completed...");
        });

// eof