// -----------------------------------------------------------------------------
'use strict';
const twilio = require('twilio');
const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const notify = client.notify.services(process.env.NOTIFY_SERVICE_SID);
//
const helpMessage = 'Help: Text "subscribe" to join. "authorize <phone#>" to accept a new subscriber. "unsubscribe" to leave the group. "who" to receive a group list.';
const subscribeSuccessMessage = "+ Subscribe: You are subscribed to this phone number's messages.";
const subscribeFailMessage = '- Subscription process failed, try again.';
const broadcastSuccessMessage = '+ Your message was broadcast to the group.';
const broadcastFailMessage = '- Your message failed to send, try again.';
const broadcastNotAuthorizedMessage = '- You are not part of the group.';
const startMessage = "+ Start: not implemented by this program, handled by Twilio by default.";
const stopMessage = "+ Stop: not implemented by this program, handled by Twilio by default.";
const authorizeSuccessMessage = '+ Authorized.';
const authorizeFailMessage = '- Failed to authorize.';
const authorizeSelfFailMessage = '- Failed to authorize. Cannot authorize yourself.';
const UnsubscribeMessage = '+ UnsubscribeMessage';
const UnsubscribeFailMessage = '- Failed to unsubscribe.';
const whoMessage = "Members: ";
// -----------------------------------------------------------------------------
console.log("+++ Start echo.");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const syncServiceSid = process.env.SYNC_SERVICE_SID;
const syncMap = process.env.SYNC_MAP_NAME;
// console.log("+ ACCOUNT_SID      :" + accountSid + ":");
// console.log("+ AUTH_TOKEN       :" + authToken + ":");
console.log("+ SYNC_SERVICE_SID :" + syncServiceSid + ":");
// console.log("+ SYNC_MAP_NAME    :" + syncMap + ":");

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
        let smsTextArray = this.body.split(' ');
        if (smsTextArray.length === 2) {
            this.word2 = smsTextArray[1].trim();
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
    }
}

class StartCommand extends Command {
    run(callback) {
        // console.log("++ callback: " + startMessage);
        callback(null, startMessage);
    }
}

class StopCommand extends Command {
    run(callback) {
        // console.log("++ callback: " + stopMessage);
        callback(null, stopMessage);
    }
}

class SubscribeCommand extends Command {
    // Add the person into the DB.
    // Broadcast that they have joined.
    // Need error checking for this.word2, that it is valid.
    run(callback) {
        // Create a new SMS Notify binding for this user's phone number
        let theData = {'name': this.word2, 'authorizedBy': 'new'};
        client.sync.services(syncServiceSid).syncMaps(this.toNumber).syncMapItems
                .create({key: this.fromNumber, data: theData})
                .then((sync_map_item) => {
                    console.log("+ Created, SID: " + sync_map_item.sid);
                    callback(null, subscribeSuccessMessage);
                }).catch(function (error) {
            callback(error, subscribeFailMessage);
        });
    }
}

class AuthorizeCommand extends Command {
    // Update the person into the DB to be authorized.
    // Need error checking that this.word2 is valid. And error handling
    run(callback) {
        if (this.fromNumber === this.word2) {
            callback(null, authorizeSelfFailMessage);
            return;
        }
client.sync.services(syncServiceSid).syncMaps(this.toNumber).syncMapItems(this.word2)
    .fetch()
    .then((syncMapItems) => {
        console.log("+ name: " + syncMapItems.data.name + ", authorizedBy: " + syncMapItems.data.authorizedBy);
        let theData = {'name': syncMapItems.data.name, 'authorizedBy': this.fromNumber};
        client.sync.services(syncServiceSid).syncMaps(this.toNumber).syncMapItems(this.word2)
            .update({key: this.word2, data: theData})
            .then((sync_map_item) => {
                console.log("+ Updated authorizedBy, to:" + this.fromNumber);
                callback(null, authorizeSuccessMessage);
            }).catch(function (error) {
            // console.log("- AuthorizeCommand, update: " + error);
            callback(error, authorizeFailMessage);
        });
    }).catch(function (error) {
        console.log("- AuthorizeCommand, retrieve:  " + error);
        callback(error, authorizeFailMessage);
});
    }
}

class UnsubscribeCommand extends Command {
    // Remove the person into the DB.
    // Broadcast that they have left the group.
    run(callback) {
        client.sync.services(syncServiceSid).syncMaps(this.toNumber).syncMapItems(this.fromNumber)
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
        // console.log("++ callback: " + stopMessage);
        callback(null, whoMessage);
    }
}

class BroadcastCommand extends Command {
    run(callback) {
        // Check if sender is in list of admins.
        let authorized = 1;
        if (authorized === 1) {
            return callback(null, broadcastNotAuthorizedMessage);
        }
        // Create a new SMS Notify binding for this user's phone number
        notify.notifications.create({
            tag: 'all',
            body: this.commandText
        }).then((response) => {
            console.log("++ response: " + response);
            callback(null, broadcastSuccessMessage);
        }).catch(err => {
            console.log(err);
            // console.log("++ callback: " + broadcastFailMessage);
            callback(err, broadcastFailMessage);
        });
    }
}

// -----------------------------------------------------------------------------
// Handle incoming SMS commands
//
//------------------
// For testing:
// https://about-time-1235.twil.io/groupsms?To=+16503791233&From=16508661234&body=okay
var event = {Body: "authorize +12223331234", From: "+16508661234", To: process.env.PHONE_NUMBER_1};
function callback(aValue, theText) {
    console.log("++ function callback: " + theText);
}
// exports.handler = (context, event, callback) => {
//------------------
{
    let smsText = event.Body || '';
    let smsTextArray = smsText.split(' ');
    let cmd = smsText.trim().split(' ')[0].toLowerCase();
    let cmd2 = '';
    let echoSms = "+ cmd: " + cmd + ", From: " + event.From + ", To: " + event.From;
    if (smsTextArray.length === 2) {
        cmd2 = smsTextArray[1].trim();
        echoSms += ", second: " + cmd2;
    }
    console.log(echoSms);
    let cmdInstance;
    // let cmdInstance = new BroadcastCommand(event);
    switch (cmd) {
        case 'help':
            cmdInstance = new HelpCommand(event);
            break;
        case 'subscribe':
            cmdInstance = new SubscribeCommand(event);      // create
            break;
        case 'authorize':
            cmdInstance = new AuthorizeCommand(event);      // retrieve and update
            break;
        case 'unsubscribe':
            cmdInstance = new UnsubscribeCommand(event);    // delete
            break;
        case 'who':
            cmdInstance = new WhoCommand(event);            // retrieve a list
            break;
        case 'start':
            cmdInstance = new StartCommand(event);
            break;
        case 'stop':
            cmdInstance = new StopCommand(event);
            break;
        default:
            cmdInstance = new BroadcastCommand(event);      // retrieve a list
    }
    cmdInstance.run((err, message) => {
        let twiml = new twilio.twiml.MessagingResponse();
        if (err) {
            // console.log(err);
            console.log("- cmdInstance.run error: " + err.status + ":" + err.message);
            if (err.message.indexOf("already exists")>0) {
                message = 'You are already subscribed.';            
            } else if (err.status === 404) {
                message = 'There was a problem with your request, value not found: ' + cmdInstance.word2;
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

