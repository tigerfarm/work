// Documentation:
// https://www.twilio.com/docs/taskrouter/api/task
//
const ACCOUNT_SID = process.env.TR_ACCOUNT_SID;
const ACCOUNT_AUTH_TOKEN = process.env.TR_AUTH_TOKEN;
const trClient = require('twilio')(ACCOUNT_SID, ACCOUNT_AUTH_TOKEN);
const WORKSPACE_SID = process.env.WORKSPACE_SID;

taskSid = "WTa3ee1296c9f4bf072a9ed615371d5200";
console.log('If task status is "wrapping", changed to: "completed". Task SID: ' + taskSid);
trClient.taskrouter.v1.workspaces(WORKSPACE_SID)
        .tasks(taskSid)
        .fetch()
        .then(task => {
            assignmentStatus = task.assignmentStatus;
            console.log("++ "
                    + "SID: " + task.sid
                    + " assignmentStatus: " + assignmentStatus
                    + " taskQueueFriendlyName: " + task.taskQueueFriendlyName
                    );
            if (assignmentStatus === "wrapping") {
                console.log("++ Set task to completed.");
                taskSetCompleted(task.sid);
            }
        });

function taskSetCompleted(taskSid) {
    trClient.taskrouter.v1.workspaces(WORKSPACE_SID)
            .tasks(taskSid)
            .update({
                assignmentStatus: 'completed',
                reason: 'Status was "wrapping", changed to: "completed".'
            })
            .then(task => console.log("+++ Task set to status: " + task.assignmentStatus));
}
// eof