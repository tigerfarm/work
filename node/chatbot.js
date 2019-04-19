// -----------------------------------------------------------------------------

var clientId = process.argv[2] || "";
if (clientId === "") {
    addChatMessage("- Username required.");
    process.exit();
}

console.log("+++ Chat program is starting up.");

var thisChatClient;
var chatChannelName = "";
var chatChannelDescription = "";
let thisChannel;
let totalMessages = 0;  // This count of read channel messages. Needs work to initialize and maintain the count.

// $ npm install twilio
const Twilio = new require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
// $ npm install --save twilio-chat
const Chat = require('twilio-chat');

// -----------------------------------------------------------------------------
function generateToken(clientid) {
    console.log("+ generateToken, Client ID: " + clientid);
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
    // console.log(token.toJwt());
    return token.toJwt();
}

// -----------------------------------------------------------------------------
function createChatClient() {
    if (clientId === "") {
        logger("Required: Username.");
        addChatMessage("Enter a Username to use when chatting.");
        // return;
        process.exit();
    }
    addChatMessage("++ Creating Chat Client, please wait.");
    logger("Refresh the token using client id: " + clientId);
    token = generateToken(clientId);
    logger("Token refreshed: " + token);
// -------------------------------
    Chat.Client.create(token).then(chatClient => {
        thisChatClient = chatClient;
        // logger("Chat client created: thisChatClient: " + thisChatClient);
        addChatMessage("+ Chat client created for the user: " + clientId);
        thisChatClient.getSubscribedChannels();
        addChatMessage("+ You can now use the chat features.");
        addChatMessage("+ Enter >");
    });
}
// -----------------------------------------------------------------------------
function joinChatChannel(chatChannelName) {
    logger("Function: joinChatChannel()");
    if (thisChatClient === "") {
        addChatMessage("First, create a Chat Client.");
        logger("Required: Chat Client.");
        return;
    }
    if (chatChannelName === "") {
        addChatMessage("Enter a Channel name.");
        logger("Required: Channel name.");
        return;
    }
    addChatMessage("++ Join the channel: " + chatChannelName);
    thisChatClient.getChannelByUniqueName(chatChannelName)
            .then(function (channel) {
                thisChannel = channel;
                logger("Channel exists: " + chatChannelName + " : " + thisChannel);
                joinChannel();
                logger("+ Channel Attributes: "
                        // + channel.getAttributes()
                        + " SID: " + channel.sid
                        + " name: " + channel.friendlyName
                        );
                //
            }).catch(function () {
        logger("Channel doesn't exist, created the channel.");
        chatChannelDescription = $("#channelDescription").val();
        if (chatChannelDescription === "") {
            chatChannelDescription = chatChannelName;
        }
        thisChatClient.createChannel({
            uniqueName: chatChannelName,
            friendlyName: chatChannelDescription
        }).then(function (channel) {
            logger("Channel created : " + chatChannelName + " " + chatChannelDescription + " : " + channel);
            thisChannel = channel;
            joinChannel();
        }).catch(function (channel) {
            logger('-- Failed to create the channel: ' + channel);
        });
    });
}

function joinChannel() {
    logger('Join the channel: ' + thisChannel.uniqueName);
    thisChannel.join().then(function (channel) {
        logger('Joined channel as ' + clientId);
        addChatMessage("+++ Channel joined. You can start chatting.");
    }).catch(function (err) {
        // - Join failed: myChannel3, t: Member already exists
        if (err.message === "Member already exists") {
            // - Join failed: t: Member already exists
            addChatMessage("++ You already exist in the channel.");
            setButtons("join");
        } else {
            logger("- Join failed: " + thisChannel.uniqueName + ' :' + err.message + ":");
            addChatMessage("- Join failed: " + err.message);
        }
    });
    // Set channel event listener: messages sent to the channel
    thisChannel.on('messageAdded', function (message) {
        onMessageAdded(message);
    });
    // });
}

function onMessageAdded(message) {
    // addChatMessage("> " + message.author + " : " + message.channel.uniqueName + " : " + message.body);
    // > IMb0a8a05c931e466a8408e6e61c8b2211 : david : undefined : abc : back2u
    // addChatMessage("> " + message.sid + " : " + message.author + " : " + message.friendlyName
    //         + " : " + message.channel.uniqueName + " : " + message.body);
    addChatMessage("> " + message.channel.uniqueName + " : " + message.author + " : " + message.body);
    incCount();
}

function listChannels() {
    if (thisChatClient === "") {
        addChatMessage("First, create a Chat Client.");
        logger("Required: Chat Client.");
        return;
    }
    addChatMessage("+ List of public channels (+ uniqueName: friendlyName):");
    thisChatClient.getPublicChannelDescriptors().then(function (paginator) {
        for (i = 0; i < paginator.items.length; i++) {
            const channel = paginator.items[i];
            let listString = '++ ' + channel.uniqueName + ": " + channel.friendlyName + ": " + channel.createdBy;
            if (channel.uniqueName === chatChannelName) {
                listString += " *";
            }
            addChatMessage(listString);
        }
        addChatMessage("+ End list.");
    });
}

function deleteChannel(chatChannelName) {
    logger("Function: deleteChannel()");
    if (thisChatClient === "") {
        addChatMessage("First, create a Chat Client.");
        logger("Required: Chat Client.");
        return;
    }
    if (chatChannelName === "") {
        addChatMessage("Enter a Channel name.");
        logger("Required: Channel name.");
        return;
    }
    thisChatClient.getChannelByUniqueName(chatChannelName)
            .then(function (channel) {
                thisChannel = channel;
                logger("Channel exists: " + chatChannelName + " : " + thisChannel);
                thisChannel.delete().then(function (channel) {
                    addChatMessage('+ Deleted channel: ' + chatChannelName);
                }).catch(function (err) {
                    if (thisChannel.createdBy !== clientId) {
                        addChatMessage("- Can only be deleted by the creator: " + thisChannel.createdBy);
                    } else {
                        logger("- Delete failed: " + thisChannel.uniqueName + ', ' + err);
                        addChatMessage("- Delete failed: " + err);
                    }
                });
            }).catch(function () {
        logger("Channel doesn't exist.");
        addChatMessage("- Channel doesn't exist, cannot delete it: " + chatChannelName);
    });
}

// -----------------------------------------------------------------------------
function listMembers() {
    // logger("+ Called: listMembers().");
    var members = thisChannel.getMembers();
    addChatMessage("+ -----------------------");
    addChatMessage("+ Members of this channel: " + thisChannel.uniqueName);
    members.then(function (currentMembers) {
        currentMembers.forEach(function (member) {
            if (member.lastConsumedMessageIndex !== null) {
                addChatMessage("++ " + member.identity + ", Last Consumed Message Index = " + member.lastConsumedMessageIndex);
            } else {
                addChatMessage("++ " + member.identity);
            }
        });
    });
    // Not working: addChatMessage("++ getUnconsumedMessagesCount = " + thisChannel.getUnconsumedMessagesCount);
}

// -----------------------------------------------------------------------------
function incCount() {
    totalMessages++;
    logger('+ Increment Total Messages:' + totalMessages);
    thisChannel.getMessages().then(function (messages) {
        thisChannel.updateLastConsumedMessageIndex(totalMessages);
    });
}

// -----------------------------------------------------------------------------
function addChatMessage(message) {
    console.log("+ " + message);
}
function logger(message) {
    console.log("++ " + message);
}
function setButtons(message) {
    // console.log("++ " + message);
}

// -----------------------------------------------------------------------------

createChatClient();
// console.log("Enter > ");
var standard_input = process.stdin;
standard_input.setEncoding('utf-8');
standard_input.on('data', function (data) {
    theCommand = data.substring(0, data.length - 1);
    if (theCommand.startsWith('send')) {
        commandLength = 'send'.length + 1;
        if (theCommand.length > commandLength) {
            thisChannel.sendMessage(theCommand.substring(commandLength));
        }
    } else if (theCommand === 'list') {
        listChannels();
    } else if (theCommand === 'members') {
        listMembers();
    } else if (theCommand.startsWith('join')) {
        commandLength = 'join'.length + 1;
        if (theCommand.length > commandLength) {
            joinChatChannel(theCommand.substring(commandLength));
        }
    } else if (theCommand.startsWith('delete')) {
        commandLength = 'delete'.length + 1;
        if (theCommand.length > commandLength) {
            deleteChannel(theCommand.substring(commandLength));
        }
    } else if (theCommand === 'help') {
        console.log("Commands: ");
        console.log("+ list");
        console.log("+ join <channel>");
        console.log("+ members");
        console.log("+ send <message>");
        console.log("+ delete <channel>");
        console.log("+ exit");
        console.log("+ help");
    } else if (theCommand === 'exit') {
        console.log("+++ Exit.");
        process.exit();
    } else {
        if (theCommand !== "") {
            console.log('- Invaid command: ' + theCommand);
        }
    }
    console.log("Enter > ");
});

// -----------------------------------------------------------------------------
// eof