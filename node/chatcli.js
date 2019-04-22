// -----------------------------------------------------------------------------
// Docmentation links:
//  https://www.twilio.com/docs/chat/access-token-lifecycle
//  
// To do:
//  Add option: join <channel> [<description>]
//  Auto token refresh using tokenAboutToExpire.
//
var clientId = process.argv[2] || "";
if (clientId !== "") {
    console.log("+ User identity: " + clientId);
}
console.log("+++ Chat program is starting up.");

// $ npm install --save twilio-chat
const Chat = require('twilio-chat');
//
var request = require('request');

var firstInit = "";
var initJoinChannel = "";
var theTokenUrl = "";
var thisChatClient = "";
var thisChatChannelName = "";
var chatChannelDescription = "";
let thisChannel = "";
let totalMessages = 0;  // This count of read channel messages. Needs work to initialize and maintain the count.

// token = generateToken(clientId);
// createChatClient(token);

// -----------------------------------------------------------------------------
let debugState = 0;    // 0 off
var debugOnOff = process.argv[3] || "";
if (debugOnOff === "debug") {
    debugState = 1;    // 1 on
    debugMessage("+ Debug on.");
}
function debugMessage(message) {
    if (debugState !== 0) {
        console.log("?- " + message);
    }
}

var thePromptPrefix = "+ Command, ";
var thePrompt = "Enter > ";
function doPrompt() {
    // No line feed after the prompt.
    process.stdout.write(thePromptPrefix + thePrompt);
}

function sayMessage(message) {
    console.log(message);
}

// -----------------------------------------------------------------------------
function generateToken(clientid) {
    // Optional, if want to use environment variables.
    sayMessage("+ Generate token, Client ID: " + clientid);
    const AccessToken = require('twilio').jwt.AccessToken;
    const token = new AccessToken(
            process.env.ACCOUNT_SID,
            process.env.CHAT_API_KEY,
            process.env.CHAT_API_KEY_SECRET
            );
    const chatGrant = new AccessToken.ChatGrant({
        serviceSid: process.env.CHAT_SERVICE_SID
    });
    token.addGrant(chatGrant);
    token.identity = clientid;
    sayMessage("++ Token generated.");
    debugMessage("Token: " + token.toJwt());
    return token.toJwt();
}

function getTokenSetClient(clientid) {
    if (firstInit === "") {
        firstInit = "initialized";
        sayMessage("+ Ready for commands such as: help, init, or local.");
        doPrompt();
        return;
    }
    if (clientId === "") {
        sayMessage("- Required: user identity for creating a chat object.");
        doPrompt();
        return;
    }
    if (theTokenUrl === "") {
        sayMessage("- Required: the token URL.");
        doPrompt();
        return;
    }
    var newTokenUrl = theTokenUrl + "?clientid=" + clientid;
    request(newTokenUrl, function (error, response, newToken) {
        if (error) {
            sayMessage('- error:', error);
        }
        var theStatus = response && response.statusCode;
        debugMessage('statusCode: ' + theStatus);
        if (theStatus === 404) {
            sayMessage('- Error, invalid token URL: ' + newTokenUrl);
            doPrompt();
            return;
        }
        debugMessage('token: ' + newToken);
        sayMessage("+ New token retrieved.");
        createChatClientObject(newToken);
    });
}

// -----------------------------------------------------------------------------
function createChatClientObject(token) {
    if (clientId === "") {
        sayMessage("- Required: user identity for creating a chat object.");
        doPrompt();
        return;
    }
    if (token === "") {
        sayMessage("- Required: chat access token.");
        doPrompt();
        return;
    }
    sayMessage("+ Creating Chat Client.");
    // -------------------------------
    Chat.Client.create(token).then(chatClient => {
        thisChatClient = chatClient;
        debugMessage("Chat client created: thisChatClient: " + thisChatClient);
        sayMessage("++ Chat client created for the user: " + clientId);
        thisChatClient.getSubscribedChannels();
        doPrompt();
    });
}
// -----------------------------------------------------------------------------
function joinChatChannel(chatChannelName) {
    debugMessage("Function: joinChatChannel()");
    if (thisChatClient === "") {
        sayMessage("Required: create a Chat Client.");
        doPrompt();
        return;
    }
    if (chatChannelName === "") {
        sayMessage("Required: Channel name.");
        doPrompt();
        return;
    }
    sayMessage("+ Join the channel: " + chatChannelName);
    thisChatClient.getChannelByUniqueName(chatChannelName)
            .then(function (channel) {
                thisChannel = channel;
                thisChatChannelName = chatChannelName;
                debugMessage("Channel exists: " + chatChannelName + " : " + thisChannel);
                joinChannel();
                debugMessage("+ Channel Attributes: "
                        // + channel.getAttributes()
                        + " SID: " + channel.sid
                        + " name: " + channel.friendlyName
                        );
            })
            .catch(function () {
                debugMessage("Channel doesn't exist, created the channel.");
                chatChannelDescription = "";
                if (chatChannelDescription === "") {
                    chatChannelDescription = chatChannelName;
                }
                thisChatClient.createChannel({
                    uniqueName: chatChannelName,
                    friendlyName: chatChannelDescription
                }).then(function (channel) {
                    sayMessage("++ Channel created : " + chatChannelName + " " + chatChannelDescription);
                    thisChannel = channel;
                    thisChatChannelName = chatChannelName;
                    joinChannel();
                }).catch(function (channel) {
                    sayMessage('-- Failed to create the channel: ' + channel);
                });
            });
}

function joinChannel() {
    debugMessage('Join the channel: ' + thisChannel.uniqueName);
    thisChannel.join().then(function (channel) {
        debugMessage('Joined channel as ' + clientId);
        sayMessage('++ You have joined the channel: ' + thisChannel.friendlyName);
        sayMessage("++ You can start chatting.");
        doPrompt();
    }).catch(function (err) {
        // - Join failed: myChannel3, t: Member already exists
        if (err.message === "Member already exists") {
            // - Join failed: t: Member already exists
            sayMessage("++ You already exist in the channel.");
        } else {
            debugMessage("- Join failed: " + thisChannel.uniqueName + ' :' + err.message + ":");
            sayMessage("- Join failed: " + err.message);
        }
        doPrompt();
    });
    if (initJoinChannel === "") {
        // Only set this once, else can cause issues when re-joining or joining other channels.
        initJoinChannel = "joined";
        sayMessage("+ Set channel event listeners: messageAdded and tokenAboutToExpire.");
        //
        thisChannel.on('messageAdded', function (message) {
            onMessageAdded(message);
        });
        //
        thisChannel.on('tokenAboutToExpire', function () {
            updatedToken = generateToken(clientId);
            getToken(function (updatedToken) {
                thisChannel.updateToken(updatedToken);
            });
        });
    }
}

function onMessageAdded(message) {
    // Other message properties: message.sid, message.friendlyName
    if (message.author === clientId) {
        debugMessage("> " + message.channel.uniqueName + " : " + message.author + " : " + message.body);
    } else {
        sayMessage("< " + message.channel.uniqueName + " : " + message.author + " : " + message.body);
    }
    incCount();
    doPrompt();
}

function getToken() {
    debugMessage("+ getToken()");
    generateToken(clientId);
    return token;
}


// -----------------------------------------------------------------------------
function listMembers() {
    debugMessage("+ listMembers()");
    if (thisChannel === "") {
        sayMessage("Required: join a channel.");
        doPrompt();
        return;
    }
    var members = thisChannel.getMembers();
    sayMessage("+ -----------------------");
    sayMessage("+ Members of channel: " + thisChannel.uniqueName);
    members.then(function (currentMembers) {
        var i = 1;
        currentMembers.forEach(function (member) {
            if (member.lastConsumedMessageIndex !== null) {
                sayMessage("++ " + member.identity + ", Last Consumed Message Index = " + member.lastConsumedMessageIndex);
            } else {
                sayMessage("++ " + member.identity);
            }
            if (currentMembers.length === i++) {
                doPrompt();
            }
        });
    });
}

// -----------------------------------------------------------------------------
function listChannels() {
    if (thisChatClient === "") {
        sayMessage("Required: Chat Client.");
        doPrompt();
        return;
    }
    sayMessage("+ ------------------------");
    sayMessage("+ List of public channels (++ uniqueName: friendlyName: createdBy):");
    thisChatClient.getPublicChannelDescriptors().then(function (paginator) {
        for (i = 0; i < paginator.items.length; i++) {
            const channel = paginator.items[i];
            let listString = '++ ' + channel.uniqueName + ": " + channel.friendlyName + ": " + channel.createdBy;
            if (channel.uniqueName === thisChatChannelName) {
                listString += " *";
            }
            sayMessage(listString);
        }
        sayMessage("+ End of list.");
        doPrompt();
    });
}

function deleteChannel(chatChannelName) {
    debugMessage("Function: deleteChannel()");
    if (thisChatClient === "") {
        sayMessage("Required: Chat Client.");
        doPrompt();
        return;
    }
    if (chatChannelName === "") {
        sayMessage("Required: Channel name.");
        doPrompt();
        return;
    }
    sayMessage('+ Delete channel: ' + chatChannelName);
    thisChatClient.getChannelByUniqueName(chatChannelName).then(function (channel) {
        thisChannel = channel;
        debugMessage("Channel exists: " + chatChannelName + " : " + thisChannel);
        thisChannel.delete().then(function (channel) {
            sayMessage('++ Channel deleted: ' + chatChannelName);
            if (chatChannelName === thisChatChannelName) {
                thisChatChannelName = "";
            }
            doPrompt();
        }).catch(function (err) {
            if (thisChannel.createdBy !== clientId) {
                sayMessage("- Can only be deleted by the creator: " + thisChannel.createdBy);
            } else {
                debugMessage("- Delete failed: " + thisChannel.uniqueName + ', ' + err);
                sayMessage("- Delete failed: " + err);
            }
            doPrompt();
        });
    }).catch(function () {
        sayMessage("- Channel doesn't exist, cannot delete it: " + chatChannelName);
        doPrompt();
    });
}

// -----------------------------------------------------------------------------
function incCount() {
    totalMessages++;
    debugMessage('+ Increment Total Messages:' + totalMessages);
    thisChannel.getMessages().then(function (messages) {
        thisChannel.updateLastConsumedMessageIndex(totalMessages);
    });
}

function doCountZero() {
    debugMessage("+ Called: doCountZero(): thisChannel.setNoMessagesConsumed();");
    thisChannel.setNoMessagesConsumed();
}

// -----------------------------------------------------------------------------
function doSend(theCommand) {
    if (thisChatChannelName === "") {
        sayMessage("Required: joined a channel.");
        doPrompt();
    } else {
        commandLength = 'send'.length + 1;
        if (theCommand.length > commandLength) {
            thisChannel.sendMessage(theCommand.substring(commandLength));
        } else {
            if (sendMode === 0) {
                sayMessage("+ You are now in send mode.");
                thePromptPrefix = "+ Send, ";
                sendMode = 1;
            } else {
                sayMessage("+ Returned to command mode.");
                thePromptPrefix = "+ Command, ";
                sendMode = 0;
            }
            doPrompt();
        }
    }
}

function doShow() {
    sayMessage("+ Show:");
    if (clientId) {
        sayMessage("++ User identity: " + clientId);
    } else {
        sayMessage("++ User identity is required.");
    }
    if (theTokenUrl === "") {
        sayMessage("++ Token URL is required.");
    } else {
        sayMessage("++ Token URL: " + theTokenUrl);
    }
    if (thisChatClient === "") {
        sayMessage("++ Chat Client not created.");
    } else {
        sayMessage("++ Chat Client created.");
    }
    if (thisChatChannelName) {
        sayMessage("++ Joined to channel: " + thisChatChannelName);
    } else {
        sayMessage("++ Not joined to any channel.");
    }
    if (debugState === 0) {
        sayMessage("++ Debug: off");
    } else {
        sayMessage("++ Debug: on");
    }
}

function doHelp() {
    sayMessage("-----------------------");
    sayMessage("Commands:\n");
    sayMessage("+ show");
    sayMessage("++ Show chat client attributes.\n");
    sayMessage("+ user <identity>\n");
    sayMessage("+ url <identity>");
    sayMessage("++ Set the token URL.\n");
    sayMessage("+ init");
    sayMessage("++ Get a token using the token URL, and initialize chat client.\n");
    sayMessage("+ local");
    sayMessage("++ Get a token using the local environment variables, and initialize chat client.\n");
    sayMessage("+ list");
    sayMessage("++ list public channels.\n");
    sayMessage("+ join <channel>\n");
    // To do, add option: sayMessage("+ join <channel> [<description>]");
    sayMessage("+ members");
    sayMessage("++ list channel members.\n");
    sayMessage("+ send");
    sayMessage("++ Toggle send mode: assume, send messages.");
    sayMessage("++ Enter blank line to exit send mode.");
    sayMessage("+ send <message>\n");
    sayMessage("+ delete <channel>\n");
    sayMessage("+ debug");
    sayMessage("++ Toggle debug on and off.\n");
    sayMessage("+ help\n");
    sayMessage("+ exit\n");
}

// -----------------------------------------------------------------------------
if (clientId !== "") {
    getTokenSetClient(clientId);
} else {
    sayMessage("+ Ready for command, such as: help.");
    doPrompt();
}
var sendMode = 0;
var standard_input = process.stdin;
standard_input.setEncoding('utf-8');
standard_input.on('data', function (data) {
    theCommand = data.substring(0, data.length - 1).trim();
    if (sendMode === 1) {
        doSend("send " + theCommand);
    } else if (theCommand.startsWith('send')) {
        doSend(theCommand);
    } else if (theCommand === 'list') {
        listChannels();
    } else if (theCommand === 'members') {
        listMembers();
    } else if (theCommand.startsWith('join')) {
        // join abc my new channel
        commandLength = 'join'.length + 1;
        if (theCommand.length > commandLength) {
            joinChatChannel(theCommand.substring(commandLength).trim());
        } else {
            sayMessage("+ Syntax: join <channel>");
        }
    } else if (theCommand.startsWith('delete')) {
        commandLength = 'delete'.length + 1;
        if (theCommand.length > commandLength) {
            deleteChannel(theCommand.substring(commandLength).trim());
        } else {
            sayMessage("+ Syntax: delete <channel>");
            doPrompt();
        }
    } else if (theCommand === 'show') {
        doShow();
        doPrompt();
    } else if (theCommand.startsWith('url')) {
        commandLength = 'url'.length + 1;
        if (theCommand.length > commandLength) {
            theTokenUrl = theCommand.substring(commandLength).trim();
        } else {
            sayMessage("+ Syntax: delete <channel>");
        }
        doPrompt();
    } else if (theCommand === 'init') {
        getTokenSetClient(clientId);
    } else if (theCommand === 'local') {
        token = generateToken(clientId);
        createChatClientObject(token);
    } else if (theCommand.startsWith('user')) {
        commandLength = 'user'.length + 1;
        if (theCommand.length > commandLength) {
            clientId = theCommand.substring(commandLength).trim();
        } else {
            sayMessage("+ Syntax: user <identity>");
        }
        doPrompt();
    } else if (theCommand === 'debug') {
        if (debugState === 0) {
            debugState = 1;
        } else {
            debugState = 0;
        }
        if (debugState === 0) {
            sayMessage("+ Debug off.");
        } else {
            sayMessage("+ Debug on.");
        }
        doPrompt();
    } else if (theCommand === 'help') {
        doHelp();
        doPrompt();
    } else if (theCommand === 'exit') {
        console.log("+++ Exit.");
        process.exit();
    } else {
        if (theCommand !== "") {
            sayMessage('- Invaid command: ' + theCommand);
        }
        doPrompt();
    }
});

// -----------------------------------------------------------------------------
// eof