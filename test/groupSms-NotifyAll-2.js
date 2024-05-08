// -----------------------------------------------------------------------------
'use strict';
const twilio = require('twilio');
const client = twilio(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
const notify = client.notify.services(process.env.NOTIFY_SERVICE_SID);
// Broadcast allowed from these numbers:
const adminNumbers = "+16508661234";
//
const helpMessage = 'Help: Text "subscribe" to receive messages, "stop" to stop getting messages, and "start" to receive them again.';
const startMessage = "+ Start: You are subscribed to this phone number's messages.";
const stopMessage = "+ Stop: You are unsubscribed from this phone number's messages.";
const subscribeSuccessMessage = "+ Subscribe: You are subscribed to this phone number's messages.";
const subscribeFailMessage = '- Subscription process failed, try again.';
const broadcastNotAuthorizedMessage = '- Your phone number is not authorized to broadcast on this phone number.';
const broadcastSuccessMessage = '+ Your message was broadcast to the group.';
const broadcastFailMessage = '- Your message failed to send, try again.';
// -----------------------------------------------------------------------------
console.log("+++ Start echo.");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const syncServiceSid = process.env.SYNC_SERVICE_SID;
const syncMap = process.env.SYNC_MAP_NAME;
console.log("+ ACCOUNT_SID      :" + accountSid + ":");
console.log("+ AUTH_TOKEN       :" + authToken + ":");
console.log("+ SYNC_SERVICE_SID :" + syncServiceSid + ":");
console.log("+ SYNC_MAP_NAME    :" + syncMap + ":");

// -----------------------------------------------------------------------------
class Command {
    // Create a new instance with necessary arguments from the incoming SMS
    constructor(event) {
        this.fromNumber = event.From.trim();
        this.body = event.Body || '';
        this.event = event;
        if (this.fromNumber.indexOf('+') !== 0) {
            // If missing "+country code", fix it
            this.fromNumber = `+1${this.fromNumber}`;
        }
        console.log("+ this.fromNumber: " + this.fromNumber);
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
        // console.log("++ callback: " + 'Command not implemented.');
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
        console.log("++ callback: " + stopMessage);
        // callback(null, stopMessage);
    }
}

class SubscribeCommand extends Command {
    run(callback) {
        // Create a new SMS Notify binding for this user's phone number
        notify.bindings.create({
            identity: this.fromNumber,
            bindingType: 'sms',
            address: this.fromNumber
        }).then((response) => {
            // console.log("++ callback: " + subscribeSuccessMessage);
            callback(null, subscribeSuccessMessage);
        }).catch(err => {
            // console.log("++ callback: " + subscribeFailMessage);
            callback(err, subscribeFailMessage);
        });
    }
}

class BroadcastCommand extends Command {
    run(callback) {
        // Check if sender is in list of admins.
        if (adminNumbers.indexOf(this.fromNumber) < 0) {
            return callback(null, broadcastNotAuthorizedMessage);
        }
        // Create a new SMS Notify binding for this user's phone number
        notify.notifications.create({
            tag: 'all',
            body: this.commandText
        }).then((response) => {
            // console.log("++ callback: " + broadcastSuccessMessage);
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
var event = {Body: "start hello there", From: "+16508661234", To: process.env.PHONE_NUMBER_1};
function callback(aValue,theText) {
    console.log("+ theText: " + theText);
}
// exports.handler = (context, event, callback) => {
//------------------
{
    let cmd = event.Body || '';                 // Get SMS text body
    cmd = cmd.trim().split(' ')[0].toLowerCase();
    console.log("+ cmd: " + cmd + ", from: " + event.From);
    // Default to help command
    let cmdInstance = new HelpCommand(event);
    // Choose other commands as appropriate
    switch (cmd) {
        case 'subscribe':
            cmdInstance = new SubscribeCommand(event);
            break;
        case 'broadcast':
            cmdInstance = new BroadcastCommand(event);
            break;
        case 'start':
            cmdInstance = new StartCommand(event);
            break;
        case 'stop':
            cmdInstance = new StopCommand(event);
            break;
    }
    cmdInstance.run((err, message) => {
        console.log("+ cmdInstance, message :" + message + ":");
        let twiml = new twilio.twiml.MessagingResponse();
        if (err) {
            console.log(err);
            message = 'There was a problem with your request. Try again!';
        }
        twiml.message(message);
        console.log("++ callback: " + broadcastFailMessage);
        callback(null, twiml);
    });
}

// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
console.log("+++ Exit.");
