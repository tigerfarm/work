exports.handler = function(context, event, callback) {
    // Documentation: https://www.twilio.com/docs/api/rest/access-tokens
    //
    let AccessToken = Twilio.jwt.AccessToken;
    //
    // The Client using tokens from this Function, receive calls made to this client ID.
    let clientid = event.identity || null;
    if (clientid === null) {
        clientid = context.CLIENT_ID || null;
        if (clientid === null) {
            console.log("-- In Functions Configure, add: CLIENT_ID.");
            return;
        }
    }
    // Client ID must be handled in the related Twilio Function that starts the session.
    console.log("+ Client ID: " + clientid);
    //
    // Create an API key and secret string: https://www.twilio.com/console/chat/runtime/api-keys
    const token = new AccessToken(
        context.ACCOUNT_SID,
        context.CHAT_API_KEY,
        context.CHAT_API_KEY_SECRET
    );
    // Create a Chat service: https://www.twilio.com/console/chat/services
    const chatGrant = new AccessToken.ChatGrant({
        serviceSid: context.CHAT_SERVICE_SID        // Begins with 'IS'
    });
    token.addGrant(chatGrant);
    token.identity = clientid;
    //
    // Output the token.
    console.log(token.toJwt());
    let response = token.toJwt();
    callback(null, {token: response});
};