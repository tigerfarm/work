// -----------------------------------------------------------------------------
console.log("+++ Chat interactive commandline.");

var thisChatClient;
var clientId = "chatbot1";
var chatChannelName = "";
var chatChannelDescription = "";
let thisChannel;
let totalMessages = 0;  // This count of read channel messages. Needs work to initialize and maintain the count.

// $ npm install twilio
const Twilio = new require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
// $ npm install --save twilio-chat
const Chat = require('twilio-chat');

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
    generateToken(clientId);
    token = generateToken(clientId);
    logger("Token refreshed: " + token);
// -------------------------------
    Chat.Client.create(token).then(chatClient => {
        thisChatClient = chatClient;
        logger("Chat client created: thisChatClient: " + thisChatClient);
        addChatMessage("+ Chat client created for the user: " + clientId);
        thisChatClient.getSubscribedChannels();
    });
}
// -----------------------------------------------------------------------------
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

function joinChatChannel( chatChannelName ) {
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
    addChatMessage("> " + message.sid + " : "+ message.author + " : "+ message.friendlyName
            + " : " + message.channel.uniqueName + " : " + message.body);
    incCount();
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

// -----------------------------------------------------------------------------
createChatClient();

var standard_input = process.stdin;
standard_input.setEncoding('utf-8');

console.log("Enter> ");
standard_input.on('data', function (data) {
    if (data === 'exit\n') {
        console.log("User input complete, program exit.");
        process.exit();
    } else if (data === 'list\n') {
        listChannels();
    } else if (data === 'join\n') {
        joinChatChannel( "abc" );
    } else if (data === 'send\n') {
        thisChannel.sendMessage("send test message.");
    } else {
        console.log('Echo: ' + data);
        console.log("Enter> ");
    }
});

// -----------------------------------------------------------------------------
// eof