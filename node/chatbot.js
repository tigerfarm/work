// -----------------------------------------------------------------------------
// To do:
//  Add option: console.log("+ join <channel> [<description>]");
//  Token expire notice and refresh.

var clientId = process.argv[2] || "";
if (clientId === "") {
    console.log("- User identity required.");
    console.log("+ Syntax: chatbot <identity> [debug]");
    process.exit();
}
console.log("+++ Chat program is starting up.");

// $ npm install twilio
const Twilio = new require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
// $ npm install --save twilio-chat
const Chat = require('twilio-chat');

var thePromptPrefix = "";
var thePrompt = "Enter >";
var thisChatClient;
var chatChannelName = "";
var chatChannelDescription = "";
let thisChannel = "";
let totalMessages = 0;  // This count of read channel messages. Needs work to initialize and maintain the count.

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
function addChatMessage(message) {
    console.log(message);
}
function setButtons(message) {
    // console.log("++ " + message);
}
function doPrompt() {
    console.log(thePromptPrefix + thePrompt);
}

// -----------------------------------------------------------------------------
function generateToken(clientid) {
    addChatMessage("+ Generate token, Client ID: " + clientid);
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
    addChatMessage("++ Token generated.");
    debugMessage("Token: " + token.toJwt());
    return token.toJwt();
}

// -----------------------------------------------------------------------------
function createChatClient() {
    if (clientId === "") {
        addChatMessage("- Required: user identity for creating a chat object.");
        process.exit();
    }
    addChatMessage("+ Creating Chat Client.");
    // -------------------------------
    Chat.Client.create(token).then(chatClient => {
        thisChatClient = chatClient;
        debugMessage("Chat client created: thisChatClient: " + thisChatClient);
        addChatMessage("++ Chat client created for the user: " + clientId);
        thisChatClient.getSubscribedChannels();
        addChatMessage("+ You can now use the chat features.");
        addChatMessage("+ Ready for command. " + thePrompt);
    });
}
// -----------------------------------------------------------------------------
function joinChatChannel(chatChannelName) {
    debugMessage("Function: joinChatChannel()");
    if (thisChatClient === "") {
        addChatMessage("Required: create a Chat Client.");
        return;
    }
    if (chatChannelName === "") {
        addChatMessage("Required: Channel name.");
        return;
    }
    addChatMessage("+ Join the channel: " + chatChannelName);
    thisChatClient.getChannelByUniqueName(chatChannelName)
            .then(function (channel) {
                thisChannel = channel;
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
                    addChatMessage("Channel created : " + chatChannelName + " " + chatChannelDescription + " : " + channel);
                    thisChannel = channel;
                    joinChannel();
                }).catch(function (channel) {
                    addChatMessage('-- Failed to create the channel: ' + channel);
                });
            });
}

function joinChannel() {
    debugMessage('Join the channel: ' + thisChannel.uniqueName);
    thisChannel.join().then(function (channel) {
        debugMessage('Joined channel as ' + clientId);
        addChatMessage('++ You have joined the channel: ' + thisChannel.friendlyName);
        addChatMessage("++ You can start chatting.");
        doPrompt();
    }).catch(function (err) {
        // - Join failed: myChannel3, t: Member already exists
        if (err.message === "Member already exists") {
            // - Join failed: t: Member already exists
            addChatMessage("++ You already exist in the channel.");
            setButtons("join");
        } else {
            debugMessage("- Join failed: " + thisChannel.uniqueName + ' :' + err.message + ":");
            addChatMessage("- Join failed: " + err.message);
        }
        doPrompt();
    });
    // Set channel event listener: messages sent to the channel
    thisChannel.on('messageAdded', function (message) {
        onMessageAdded(message);
    });
}

function onMessageAdded(message) {
    // Other message properties: message.sid, message.friendlyName
    if (message.author === clientId) {
        addChatMessage("> " + message.channel.uniqueName + " : " + message.author + " : " + message.body);
    } else {
        addChatMessage("< " + message.channel.uniqueName + " : " + message.author + " : " + message.body);
    }
    incCount();
    doPrompt();
}

// -----------------------------------------------------------------------------
function listChannels() {
    if (thisChatClient === "") {
        addChatMessage("Required: Chat Client.");
        return;
    }
    addChatMessage("+ ------------------------");
    addChatMessage("+ List of public channels (++ uniqueName: friendlyName: createdBy):");
    thisChatClient.getPublicChannelDescriptors().then(function (paginator) {
        for (i = 0; i < paginator.items.length; i++) {
            const channel = paginator.items[i];
            let listString = '++ ' + channel.uniqueName + ": " + channel.friendlyName + ": " + channel.createdBy;
            if (channel.uniqueName === chatChannelName) {
                listString += " *";
            }
            addChatMessage(listString);
        }
        addChatMessage("+ End of list.");
        doPrompt();
    });
}

function deleteChannel(chatChannelName) {
    addChatMessage('+ Delete channel: ' + chatChannelName);
    debugMessage("Function: deleteChannel()");
    if (thisChatClient === "") {
        addChatMessage("Required: Chat Client.");
        return;
    }
    if (chatChannelName === "") {
        addChatMessage("Required: Channel name.");
        return;
    }
    thisChatClient.getChannelByUniqueName(chatChannelName)
            .then(function (channel) {
                thisChannel = channel;
                debugMessage("Channel exists: " + chatChannelName + " : " + thisChannel);
                thisChannel.delete().then(function (channel) {
                    addChatMessage('++ Channel deleted: ' + chatChannelName);
                }).catch(function (err) {
                    if (thisChannel.createdBy !== clientId) {
                        addChatMessage("- Can only be deleted by the creator: " + thisChannel.createdBy);
                    } else {
                        debugMessage("- Delete failed: " + thisChannel.uniqueName + ', ' + err);
                        addChatMessage("- Delete failed: " + err);
                    }
                });
            })
            .catch(function () {
                addChatMessage("- Channel doesn't exist, cannot delete it: " + chatChannelName);
            });
}

// -----------------------------------------------------------------------------
function listMembers() {
    debugMessage("+ listMembers()");
    if (thisChannel === "") {
        addChatMessage("Required: join a channel.");
        doPrompt();
        return;
    }
    var members = thisChannel.getMembers();
    addChatMessage("+ -----------------------");
    addChatMessage("+ Members of channel: " + thisChannel.uniqueName);
    members.then(function (currentMembers) {
        var i = 1;
        currentMembers.forEach(function (member) {
            if (member.lastConsumedMessageIndex !== null) {
                addChatMessage("++ " + member.identity + ", Last Consumed Message Index = " + member.lastConsumedMessageIndex);
            } else {
                addChatMessage("++ " + member.identity);
            }
            if (currentMembers.length === i++) {
                doPrompt();
            }
        });
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
    if (thisChannel === "") {
        addChatMessage("Required: joined a channel.");
        doPrompt();
    } else {
        commandLength = 'send'.length + 1;
        if (theCommand.length > commandLength) {
            thisChannel.sendMessage(theCommand.substring(commandLength));
        } else {
            if (sendMode === 0) {
                console.log("+ You are now in send mode.");
                thePromptPrefix = "+ Send, ";
                sendMode = 1;
            } else {
                console.log("+ Returned to command mode.");
                thePromptPrefix = "+ Command, ";
                sendMode = 0;
            }
            doPrompt();
        }
    }
}

// -----------------------------------------------------------------------------
var sendMode = 0;
token = generateToken(clientId);
createChatClient();
var standard_input = process.stdin;
standard_input.setEncoding('utf-8');
standard_input.on('data', function (data) {
    theCommand = data.substring(0, data.length - 1);
    if (sendMode === 1) {
        doSend("send " + theCommand);
    } else if (theCommand.startsWith('send')) {
        doSend(theCommand);
    } else if (theCommand === 'list') {
        listChannels();
    } else if (theCommand === 'members') {
        listMembers();
    } else if (theCommand.startsWith('join')) {
        commandLength = 'join'.length + 1;
        if (theCommand.length > commandLength) {
            joinChatChannel(theCommand.substring(commandLength));
        } else {
            console.log("+ Add a channel name: join <channel>");
        }
    } else if (theCommand.startsWith('delete')) {
        commandLength = 'delete'.length + 1;
        if (theCommand.length > commandLength) {
            deleteChannel(theCommand.substring(commandLength));
        } else {
            console.log("+ To delete channel, add the channel name: delete <channel>");
        }
    } else if (theCommand === 'debug') {
        if (debugState === 0) {
            debugState = 1;
        } else {
            debugState = 0;
        }
        if (debugState === 0) {
            console.log("+ Debug off.");
        } else {
            console.log("+ Debug on.");
        }
        doPrompt();
    } else if (theCommand === 'help') {
        console.log("-----------------------");
        console.log("Commands: ");
        console.log("+ list");
        console.log("++ list public channels.\n");
        console.log("+ join <channel>\n");
        // To do, add option: console.log("+ join <channel> [<description>]");
        console.log("+ members");
        console.log("++ list channel members.\n");
        console.log("+ send <message>\n");
        console.log("+ delete <channel>\n");
        console.log("+ exit\n");
        console.log("+ debug");
        console.log("++ Toggle debug state on and off.\n");
        console.log("+ help\n");
        doPrompt();
    } else if (theCommand === 'exit') {
        console.log("+++ Exit.");
        process.exit();
    } else {
        if (theCommand !== "") {
            console.log('- Invaid command: ' + theCommand);
        }
        doPrompt();
    }
});

// -----------------------------------------------------------------------------
// eof