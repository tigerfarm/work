// After creating a SendGrid account, and create an API Key from the menu item under Settings/API Keys.
// 
// Add the following Dependencies:
// @sendgrid/mail                  6.4.0
// 
// Add the following Environment Variables, using your values.
// SENDGRID_API_KEY                SG.V...h-J...s
// SENDGRID_EMAIL_FROM             me@example.com
// SENDGRID_EMAIL_TO               you@example.com
//
exports.handler = function(context, event, callback) {
    // If you are forwarding an SMS message, use "event.Body".
    theMsg = event.Body || "Hello Twilio Functions and SendGrid.";
    // If you are forwarding an SMS message, include the from phone number.
    theMsgFrom = event.From || "Unknown";
    theMsg = "From: " + theMsgFrom + "\n" + theMsg;
    //
    sendto = event.sendto || context.SENDGRID_EMAIL_TO;
    sendfrom = event.sendfrom || context.SENDGRID_EMAIL_FROM;
    sendInfo = "from: " + sendfrom
        + ", to: " + sendto
        + ", MSG: " + theMsg;
    console.log("+ Send, " + sendInfo);
    const sgMail = require("@sendgrid/mail");
    // Note, create a new SENDGRID_API_KEY from the SendGrid dashboard.
    sgMail.setApiKey(context.SENDGRID_API_KEY);
    const msg = {
        from: sendfrom,
        to:   sendto,
        subject: "From a Twilio Function",
        text: theMsg
    };
    // In Twilio Functions Configure, add Dependencies/Import NPM "@sendgrid/mail". I'm using version, "6.4.0".
    sgMail.send(msg).then((sent) => {
        console.log("+ Sent, SendGrid statusCode: " + sent[0].statusCode);
        callback(null, "+ SendGrid statusCode: " + sent[0].statusCode + ", Sent, " + sendInfo);
    });
};