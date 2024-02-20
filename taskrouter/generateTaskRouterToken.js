// Documentation:
// https://www.twilio.com/docs/taskrouter/js-sdk-v1/workspace
//
console.log("+++ Start...");
// const ACCOUNT_SID = process.env.TR_ACCOUNT_SID;
// const ACCOUNT_AUTH_TOKEN = process.env.TR_AUTH_TOKEN;
// const WORKSPACE_SID = process.env.WORKSPACE_SID;

// -------------------------------------------------------
const taskrouter = require('twilio').jwt.taskrouter;
const util = taskrouter.util;

// To set up environmental variables, see http://twil.io/secure
const ACCOUNT_SID = process.env.TR_ACCOUNT_SID;
const ACCOUNT_AUTH_TOKEN = process.env.TR_AUTH_TOKEN;
const WORKSPACE_SID = process.env.WORKSPACE_SID;
console.log("+ ACCOUNT_SID   :" + ACCOUNT_SID + ":");
console.log("+ ACCOUNT_AUTH_TOKEN    :" + ACCOUNT_AUTH_TOKEN + ":");
console.log("+ WORKSPACE_SID :" + WORKSPACE_SID + ":");

const TASKROUTER_BASE_URL = 'https://taskrouter.twilio.com';
const version = 'v1';

// Helper function to create Policy
const Policy = taskrouter.TaskRouterCapability.Policy;
function buildWorkspacePolicy(options) {
    options = options || {};
    const resources = options.resources || [];
    const urlComponents = [
        TASKROUTER_BASE_URL,
        version,
        'Workspaces',
        WORKSPACE_SID
    ];
    console.log("+ urlComponents " + urlComponents.concat(resources).join('/') + " " + options.method);
    return new Policy({
        url: urlComponents.concat(resources).join('/'),
        method: options.method || 'GET',
        allow: true
    });
}
const workspacePolicies = [
    // Workspace Policy
    buildWorkspacePolicy(),
    // Workspace subresources fetch Policy
    buildWorkspacePolicy({resources: ['**']}),
    // Workspace resources update Policy
    buildWorkspacePolicy({resources: ['**'], method: 'POST'}),
    // Workspace resources delete Policy
    buildWorkspacePolicy({resources: ['**'], method: 'DELETE'}),
];
// Event Bridge Policies
const eventBridgePolicies = util.defaultEventBridgePolicies(
        ACCOUNT_SID,
        WORKSPACE_SID
        );

const capability = new taskrouter.WorkerCapability({
    accountSid: ACCOUNT_SID,
    authToken: ACCOUNT_AUTH_TOKEN,
    workspaceSid: WORKSPACE_SID,
    workerSid: "WKb9302b30213ee6a76c10cf8b4cf94612"
});
eventBridgePolicies.concat(workspacePolicies).forEach(policy => {
    capability.addPolicy(policy);
});

const token = capability.toJwt();
console.log("+ token: " + token);

// eof