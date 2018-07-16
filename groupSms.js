// -----------------------------------------------------------------------------
// New subscriber needs to receive a subscribed notice.
//
'use strict';
console.log("+ Group SMS");
const syncServiceSid = process.env.SYNC_SERVICE_SID;
console.log("+ SYNC_SERVICE_SID   :" + syncServiceSid + ":");
const notifyServiceSid = process.env.NOTIFY_SERVICE_SID;
console.log("+ NOTIFY_SERVICE_SID :" + notifyServiceSid + ":");
const authorizedDefault = process.env.AUTHORIZED_DEFAULT || "new";   // default to "new" which requires authorization.
console.log("+ AUTHORIZED_DEFAULT :" + authorizedDefault + ":");
//
const initSuccessMessage = '+ Group phone number initialized and you are subscribed as the admin.';
const initFailMessage = '- Group phone number already initialized.';
const helpMessage = 'Help: Text "subscribe name" to join. "authorize +PhoneNumber" to accept a new subscriber. "unsubscribe" to leave the group. "who" to receive a group list.';
const subscribeSuccessMessage = "+ You are subscribed to this Group's SMS messages.";
const subscribeFailMessage = '- Subscription process failed, try again.';
const subscribeFailMessageNameRequired = '- Subscription name required: "subscribe name".';
const authorizeSuccessMessage = '+ You have authorized: ';
const authorizeFailMessage = '- Failed to authorize.';
const authorizeFailMessageNotAuthorized = '- You are not authorized to authorize.';
const authorizeFailMessageAlreadyAuthorized ='- Already authorized.';
const authorizeFailMessageNameRequired = '- Authorize phone number required: "authorize phone-number".';
const UnsubscribeMessage = '+ You have been unsubscribed from this group phone number.';
const UnsubscribeFailMessage = '- Failed to unsubscribe.';
const whoMessage = "+ Members: ";
const whoSuccessMessage = '';
const whoFailMessage = '- You must be a member of the group to make this request.';
const whoFailMessageNotAuthorized = '- You are not authorized.';
const broadcastSuccessMessage = '+ Your message was broadcast to the group.';
const broadcastFailMessage = '- Your message failed to send, try again.';
const broadcastFailMessageNotAuthorized = '- You are not authorized to broadcast messages.';
const broadcastNotAuthorizedMessage = '- You are not part of the group.';
// -----------------------------------------------------------------------------
class Command {
    // Create an instance with arguments from the incoming SMS
    constructor(event) {
        this.toNumber = event.To.trim();
        this.fromNumber = event.From.trim();
        this.body = event.Body.trim() || '';
        this.event = event;
        if (this.fromNumber.indexOf('+') !== 0) {
            // If missing "+country code", fix it
            this.fromNumber = `+1${this.fromNumber}`;
        }
        // console.log("+ this.fromNumber: " + this.fromNumber);
        this.smsTextArray = this.body.split(' ');
        this.word1 = this.smsTextArray[0].trim();
        if (this.smsTextArray.length === 2) {
            this.word2 = this.smsTextArray[1].trim();
        }
    }
    // Get an array of arguments after the first word for a command
    get commandArguments() {
        return this.body.trim().split(' ').slice(1);
    }
    // Get the full text after the command with spaces reinserted
    get commandText() {
        return this.commandArguments.join(' ');
    }
    // Execute command async (to be overridden by subclasses)
    run(callback) {
        callback(null, 'Command not implemented.');
    }
}

class HelpCommand extends Command {
    run(callback) {
        // console.log("++ callback: " + helpMessage);
        callback(null, helpMessage);
                    
                    // ----------------
                    let whoInstance = new WhoCommand({Body: "who", From: process.env.PHONE_NUMBER_3, To: process.env.PHONE_NUMBER_1});
                    whoInstance.run((err, message) => {
                        // let twiml = new Twilio.twiml.MessagingResponse();
                        // if (err) {
                        //     console.log("- whoInstance.run, " + err.status + ":" + err.message);
                        //     message = 'There was a problem with your request.';
                        // }
                        console.log("+ cmdInstance.run: " + message);
                        // twiml.message(message);
                        // callback(null, twiml);
                    });
                    // ----------------
    }
}

class InitCommand extends Command {
    run(callback) {
        sync.syncMaps.create({ttl: 0, uniqueName: this.toNumber})
        .then((sync_map) => {
            console.log("+ Initialized, created group SMS phone number Map: " + this.toNumber);
            // Create a new SMS Notify binding for this user's phone number
            let theData = {'name': this.word2, 'authorized': 'admin'};
            sync.syncMaps(this.toNumber).syncMapItems
                .create({key: this.fromNumber, data: theData})
                .then((sync_map_item) => {
                    console.log("+ Subscribed: " + this.word2 + " " + this.fromNumber);
                    callback(null, initSuccessMessage);
                }).catch(function (error) {
                callback(error, subscribeFailMessage);
            });
        })
        .catch(function (error) {
            callback(error, initFailMessage);
        });
    }
}

class SubscribeCommand extends Command {
    // Add the person into the DB.
    // Broadcast that they have joined.
    // Need error checking for this.word2, that it is valid.
    run(callback) {
        // Create a new SMS Notify binding for this user's phone number
        if (this.smsTextArray.length !== 2) {
            callback(null, subscribeFailMessageNameRequired);
            return;
        }
        let theData = {'name': this.word2, 'authorized': authorizedDefault};
        sync.syncMaps(this.toNumber).syncMapItems
                .create({key: this.fromNumber, data: theData})
                .then((sync_map_item) => {
                    console.log("+ Subscribed, name: " + this.word2 + " " + this.fromNumber);
                    // callback(null, subscribeSuccessMessage);
        // ---------------------------------------------------------------------
        // Broadcast notice of new subscriber.
    let counter = 0;
    let sendList = [];
    sync.syncMaps(this.toNumber).syncMapItems.list()
    .then(
        syncMapItems => {
            syncMapItems.forEach((syncMapItem) => {
                console.log("+ Key: " + syncMapItem.key 
                + ", name: " + syncMapItem.data.name
                + ", authorized: " + syncMapItem.data.authorized
            );
            if (this.fromNumber !== syncMapItem.key && syncMapItem.data.authorized !== "new") {
                // Don't send to the sender.
                sendList[counter] = JSON.stringify({"binding_type": "sms", "address": syncMapItem.key});
                counter += 1;
            }
        });
        if (counter === 0) {
            console.log("+ New subscription notice not sent because there is no one yet to receive the notice.");
            return;
        }
        let theMessage = "Application notice, new unauthorized subscriber: " + this.word2;
        console.log("+ The message |" + theMessage + "| counter = " + counter + " sendList: " + sendList);
        notify.notifications.create({
            body: theMessage,
            toBinding: sendList
        }).then((response) => {
            console.log("+ Notify response.sid: " + response.sid);
            callback(null, subscribeSuccessMessage + ' Notice was of your new subscription was sent to the group.');
        }).catch(err => {
            // console.log(err);
            callback(err, broadcastFailMessage);
        });
    });
        // ---------------------------------------------------------------------
                        }).catch(function (error) {
            callback(error, subscribeFailMessage);
        });

    }
}

class AuthorizeCommand extends Command {
    run(callback) {
        
        if (this.smsTextArray.length !== 2) {
            callback(null, authorizeFailMessageNameRequired);
            return;
        }

sync.syncMaps(this.toNumber).syncMapItems(this.fromNumber)
    .fetch()
    .then((syncMapItems) => {

    let senderName = syncMapItems.data.name;
    let authorized = syncMapItems.data.authorized;
    console.log("+ Sender name: " + senderName + ", authorized: " + authorized);
    if (authorized === 'new') {
        callback(null, authorizeFailMessageNotAuthorized);
        return;
    }

sync.syncMaps(this.toNumber).syncMapItems(this.word2)
    .fetch()
    .then((syncMapItems) => {
        let personName = syncMapItems.data.name;
        let authorized = syncMapItems.data.authorized;
        console.log("+ name: " + personName + ", authorized: " + syncMapItems.data.authorized);
        if (authorized !== 'new') {
            callback(null, authorizeFailMessageAlreadyAuthorized);
            return;
        }

        let theData = {'name': personName, 'authorized': this.fromNumber};
        sync.syncMaps(this.toNumber).syncMapItems(this.word2)
            .update({key: this.word2, data: theData})
            .then((sync_map_item) => {
                console.log("+ Updated authorized, to: " + this.fromNumber);
                callback(null, authorizeSuccessMessage + personName);
            }).catch(function (error) {
            // console.log("- AuthorizeCommand, update: " + error);
            callback(error, authorizeFailMessage);
        });
        
    }).catch(function (error) {
        console.log("- AuthorizeCommand, retrieve parameter:  " + error);
        callback(error, authorizeFailMessage);
    });

}).catch(function (error) {
    console.log("- AuthorizeCommand, retrieve from-phone-number:  " + error);
    callback(error, authorizeFailMessage);
});

    } // run(callback)
}

class UnsubscribeCommand extends Command {
    // Remove the person into the DB.
    // Broadcast that they have left the group.
    run(callback) {
        sync.syncMaps(this.toNumber).syncMapItems(this.fromNumber)
            .remove()
            .then((sync_map) => {
                console.log("+ Deleted.");
                callback(null, UnsubscribeMessage);
            }).catch(function (error) {
            console.log("- " + error);
            callback(error, UnsubscribeFailMessage);
        }); 
    }
}

class WhoCommand extends Command {
    run(callback) {
    let returnMessage = '';
    
    // Check that the requester is in the group.
    // Need a proper error message returned to the requester.
    sync.syncMaps(this.toNumber).syncMapItems(this.fromNumber).fetch()
    .then((syncMapItems) => {

    let senderName = syncMapItems.data.name;
    let authorized = syncMapItems.data.authorized;
    console.log("+ Sender name: " + senderName + ", authorized: " + authorized);
    if (authorized === 'new') {
        callback(null, whoFailMessageNotAuthorized);
        return;
    }

    sync.syncMaps(this.toNumber).syncMapItems.list()
    .then(
        syncMapItems => {
            console.log("++ Load syncMapItems.");
            syncMapItems.forEach((syncMapItem) => {
                authorized = syncMapItem.data.authorized;
                console.log("+ Key: " + syncMapItem.key 
                + ", name: " + syncMapItem.data.name
                + ", authorized: " + authorized
            );
            if (returnMessage === '') {
                returnMessage = syncMapItem.data.name;
            } else {
                returnMessage += ", " + syncMapItem.data.name;
            }
            if (authorized === 'new') {
                returnMessage += '(new)';
            }
        });
        callback(null, whoMessage + returnMessage);
    });
    
    }).catch(function (error) {
        // console.log("- AuthorizeCommand, retrieve from-phone-number:  " + error);
        callback(error, whoFailMessage);
    });
    
    }
}

class BroadcastTheMessage extends Command {
    run(callback) {
    
    // Check that the requester is in the group.
    // Need a proper error message returned to the requester.
    sync.syncMaps(this.toNumber).syncMapItems(this.fromNumber).fetch()
    .then((syncMapItems) => {

    let senderName = syncMapItems.data.name;
    let authorized = syncMapItems.data.authorized;
    console.log("+ Sender name: " + senderName + ", authorized: " + authorized);
    if (authorized === 'new') {
        callback(null, broadcastFailMessageNotAuthorized);
        return;
    }
    
    let counter = 0;
    let sendList = [];
    sync.syncMaps(this.toNumber).syncMapItems.list()
    .then(
        syncMapItems => {
            syncMapItems.forEach((syncMapItem) => {
                console.log("+ Key: " + syncMapItem.key 
                + ", name: " + syncMapItem.data.name
                + ", authorized: " + syncMapItem.data.authorized
            );
            if (this.fromNumber !== syncMapItem.key && syncMapItem.data.authorized !== "new") {
                // Don't send to the sender.
                sendList[counter] = JSON.stringify({"binding_type": "sms", "address": syncMapItem.key});
                counter += 1;
            }
        });
        let theMessage = "From: " + senderName + ", " + this.body;
        console.log("+ The message |" + theMessage + "| counter = " + counter + " sendList: " + sendList);
        notify.notifications.create({
            body: theMessage,
            toBinding: sendList
        }).then((response) => {
            console.log("+ Notify response.sid: " + response.sid);
            callback(null, broadcastSuccessMessage);
        }).catch(err => {
            // console.log(err);
            callback(err, broadcastFailMessage);
        });
    });
    
    }).catch(function (error) {
        callback(error, broadcastFailMessage);
    });
    
    }
}

// -----------------------------------------------------------------------------
// Handle incoming SMS commands
//
//------------------
// For testing:
var event;
event = {Body: "help", From: process.env.PHONE_NUMBER_3, To: process.env.PHONE_NUMBER_1};
// event = {Body: "init David", From: process.env.PHONE_NUMBER_2, To: process.env.PHONE_NUMBER_1};
// event = {Body: "subscribe David3", From: "+16508663333", To: process.env.PHONE_NUMBER_1};
// event = {Body: "subscribe", From: "+16508668888", To: process.env.PHONE_NUMBER_1};
// event = {Body: "authorize " + process.env.PHONE_NUMBER_2, From: process.env.PHONE_NUMBER_2, To: process.env.PHONE_NUMBER_1};
// event = {Body: "authorize", From: process.env.PHONE_NUMBER_4, To: process.env.PHONE_NUMBER_1};
// event = {Body: "who", From: process.env.PHONE_NUMBER_3, To: process.env.PHONE_NUMBER_1};
// event = {Body: "who are you", From: process.env.PHONE_NUMBER_3, To: process.env.PHONE_NUMBER_1};
// event = {Body: "Hello to all!", From: process.env.PHONE_NUMBER_3, To: process.env.PHONE_NUMBER_1};
function callback(aValue, theText) {
    console.log("++ function callback: " + theText);
}
const Twilio = require('twilio');
const client = Twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const sync = client.sync.services(syncServiceSid);
const notify = client.notify.services(notifyServiceSid);
//------------------
// https://about-time-1235.twil.io/groupsms?To=+16503791233&From=16508661234&body=okay
// exports.handler = (context, event, callback) => {
//------------------
{
    let smsText = event.Body || '';
    let smsTextArray = smsText.split(' ');
    let cmd = smsText.trim().split(' ')[0].toLowerCase();
    let cmd2 = '';
    let cmdEcho = cmd;
    if (smsTextArray.length === 2) {
        cmd2 = smsTextArray[1].trim();
        cmdEcho += cmd + " " + cmd2;
    }
    let echoSms = "+ Text :" + smsText + ": cmd: " + cmdEcho + ", From: " + event.From + ", To: " + event.To;
    console.log(echoSms);
    let cmdInstance;
    // let cmdInstance = new BroadcastCommand(event);
    switch (cmd) {
        case 'subscribe':
        case 'start':
            cmdInstance = new SubscribeCommand(event);      // create
            break;
        case 'authorize':
            cmdInstance = new AuthorizeCommand(event);      // retrieve and update
            break;
        case 'unsubscribe':
        case 'stop':
            cmdInstance = new UnsubscribeCommand(event);    // delete
            break;
        case 'who':
            if (smsTextArray.length === 1) {
                cmdInstance = new WhoCommand(event);
            } else {
                cmdInstance = new BroadcastTheMessage(event);
            }
            break;
        case 'help':
            cmdInstance = new HelpCommand(event);
            break;
        case 'init':
            cmdInstance = new InitCommand(event);
            break;
        default:
            cmdInstance = new BroadcastTheMessage(event);   // Use Notify
    }
    cmdInstance.run((err, message) => {
        let twiml = new Twilio.twiml.MessagingResponse();
        if (err) {
            // console.log(err);
            console.log("- cmdInstance.run, " + cmdInstance.word1 + " error: " + err.status + ":" + err.message);
            if (err.status === 409 && cmdInstance.word1 === 'subscribe') {
                message = '- You are already subscribed.';
            } else if (err.status === 404 && cmdInstance.word1 === 'unsubscribe') {
                message = '- You are not subscribed.';
            } else if (err.status === 404) {
                message = 'There was a problem with your request, value not found: ' + cmdInstance.word2;
            } else if (err.status === 409 && cmdInstance.word1 === 'init') {
                message = initFailMessage;
            } else {
                message = 'There was a problem with your request.';
            }
        }
        console.log("+ cmdInstance.run: " + message);
        twiml.message(message);
        callback(null, twiml);
    });
}
// -----------------------------------------------------------------------------
