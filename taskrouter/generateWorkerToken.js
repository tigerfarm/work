// Documentation:
// https://www.twilio.com/docs/taskrouter/js-sdk-v1/workspace/worker
//
console.log("+++ Start...");
// -------------------------------------------------------
const taskrouter = require('twilio').jwt.taskrouter;
const util = taskrouter.util;

// To set up environmental variables, see http://twil.io/secure
const ACCOUNT_SID = process.env.TR_ACCOUNT_SID;
const ACCOUNT_AUTH_TOKEN = process.env.TR_AUTH_TOKEN;
const WORKSPACE_SID = process.env.WORKSPACE_SID;
const WORKER_SID = 'WKb9302b30213ee6a76c10cf8b4cf94612';

console.log("+ ACCOUNT_SID   :" + ACCOUNT_SID + ":");
console.log("+ ACCOUNT_AUTH_TOKEN    :" + ACCOUNT_AUTH_TOKEN + ":");
console.log("+ WORKSPACE_SID :" + WORKSPACE_SID + ":");
console.log("+ WORKER_SID :" + WORKER_SID + ":");

const TASKROUTER_BASE_URL = 'https://taskrouter.twilio.com';
const version = 'v1';

// Helper function to create Policy
function buildWorkspacePolicy(options) {
    options = options || {};
    var resources = options.resources || [];
    var urlComponents = [TASKROUTER_BASE_URL, version, 'Workspaces', WORKSPACE_SID];
    return new taskrouter.TaskRouterCapability.Policy({
        url: urlComponents.concat(resources).join('/'),
        method: options.method || 'GET',
        allow: true
    });
}
// Event Bridge Policies
// Worker Policies
const workspacePolicies = [
    // Workspace fetch Policy
    buildWorkspacePolicy(),
    // Workspace subresources fetch Policy
    buildWorkspacePolicy({resources: ['**']}),
    // Workspace Activities Update Policy
    buildWorkspacePolicy({resources: ['Activities'], method: 'POST'}),
    // Workspace Activities Worker Reserations Policy
    buildWorkspacePolicy({resources: ['Workers', WORKER_SID, 'Reservations', '**'], method: 'POST'}),
    //
    // Should restrict the following,
    // however it allows the worker set themselves online and offline.
    buildWorkspacePolicy({resources: ['**'], method: 'POST'}),
];

const capability = new taskrouter.TaskRouterCapability({
    accountSid: ACCOUNT_SID,
    authToken: ACCOUNT_AUTH_TOKEN,
    workspaceSid: WORKSPACE_SID,
    channelId: WORKER_SID
});
const eventBridgePolicies = util.defaultEventBridgePolicies(ACCOUNT_SID, WORKER_SID);
const workerPolicies = util.defaultWorkerPolicies(version, WORKSPACE_SID, WORKER_SID);
eventBridgePolicies.concat(workerPolicies).concat(workspacePolicies).forEach(function (policy) {
    capability.addPolicy(policy);
});

const token = capability.toJwt();
console.log("+ token: " + token);

// eof