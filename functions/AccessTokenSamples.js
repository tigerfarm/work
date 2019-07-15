// Client token generation - using ClientCapability (/tokenchat)
exports.handler = function(context, event, callback) {
    let tokenPassword = event.tokenPassword || null;
    let contextTokenPassword = context.TOKEN_PASSWORD || null;
    if (tokenPassword === null) {
           console.log("-- Required parameter: tokenPassword.");
           callback(null, "-- Required parameter: tokenPassword.");
           return;
    }
    if (contextTokenPassword === null) {
           console.log("-- In Functions Configure, add: TOKEN_PASSWORD.");
           callback(null, "-- In Functions Configure, add: TOKEN_PASSWORD.");
           return;
    }
    if (tokenPassword !== contextTokenPassword) {
           console.log("-- tokenPassword not valid.");
           callback(null, "-- tokenPassword not valid.");
           return;
    }
    console.log("+ Token password is valid.");
    //
    let clientid = event.clientid || null;
    if (clientid === null) {
           console.log("-- Required parameter: clientid.");
           callback(null, "-- Required parameter: clientid.");
           return;
    }
    console.log("+ Client ID: " + clientid);
    //
    const ClientCapability = require('twilio').jwt.ClientCapability;
    const VoiceResponse = require('twilio').twiml.VoiceResponse;
    const capability = new ClientCapability({
        accountSid: context.ACCOUNT_SID,
        authToken: context.AUTH_TOKEN
    });
    capability.addScope(new ClientCapability.IncomingClientScope(clientid));
    capability.addScope(new ClientCapability.OutgoingClientScope({
        applicationSid: context.VOICE_TWIML_APP_SID_CALL_CLIENT,
        clientName: clientid
    }));
    console.log("capability:" + capability + ":");
    let token = capability.toJwt();
    console.log("token:" + token + ":");
    callback(null, token);
};

// Generate access token - Chat extra
exports.handler = function (context, event, callback) {
    // Documentation: https://www.twilio.com/docs/api/rest/access-tokens
    //
    let AccessToken = Twilio.jwt.AccessToken;
    let IpMessagingGrant = AccessToken.IpMessagingGrant;
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
    let appName = context.CHAT_APP_NAME;
    let identity = event.clientid;
    let deviceId = "abc"; // event.device;
    let endpointId = `${appName}:${identity}:${deviceId}`;
    //
    // Create an API key and secret string: https://www.twilio.com/console/chat/runtime/api-keys
    const token = new AccessToken(
            context.ACCOUNT_SID,
            context.CHAT_API_KEY,
            context.CHAT_API_KEY_SECRET
            );
    // Create a Chat service: https://www.twilio.com/console/chat/services
    const chatGrant = new AccessToken.ChatGrant({
        serviceSid: context.CHAT_SERVICE_SID, // Begins with 'IS'
        endpointId: endpointId,
        pushCredentialSid: context.CHAT_PUSH_CREDENTIAL_SID
    });
    token.addGrant(chatGrant);
    token.identity = clientid;
    //
    // Output the token.
    console.log(token.toJwt());
    let response = token.toJwt();
    callback(null, response);
};

// Chat Access Token with Credentials
/**
 *  Twilio Programmable Chat Token Template
 * 
 *  This Template shows you how to mint Access Tokens for Twilio Programmable Chat. Please note, this is for prototyping purposes
 *  only. You will want to validate the identity of clients requesting Access Token in most production applications and set
 *  the identity when minting the Token.
 * 
 *  Pre-requisites
 *  - Create a Chat Service (https://www.twilio.com/docs/api/chat/rest/services)
 *  - Create an API Key (https://www.twilio.com/console/runtime/api-keys)
 */

exports.handler = function(context, event, callback) {

  let appName = context.CHAT_APP_NAME;
  let identity = event.identity;
  let deviceId = event.device;

  let endpointId = `${appName}:${identity}:${deviceId}`;

  //pre-built in libraries to create a MessagingGrant
  let AccessToken = Twilio.jwt.AccessToken;
  let IpMessagingGrant = AccessToken.IpMessagingGrant;

  let ipmGrant = new IpMessagingGrant({
    serviceSid: context.CHAT_SERVICE_SID,
    endpointId: endpointId,
    pushCredentialSid: context.CHAT_PUSH_CREDENTIAL_SID
  });

  const accessToken = new AccessToken(
     context.ACCOUNT_SID,
     context.CHAT_TWILIO_API_KEY,
     context.CHAT_TWILIO_API_SECRET
  );

  accessToken.addGrant(ipmGrant);
  accessToken.identity = identity;

  callback(null, {token: accessToken.toJwt()});
};

