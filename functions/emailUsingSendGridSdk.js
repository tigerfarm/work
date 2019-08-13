exports.handler = function(context, event, callback) {
    theMsg = event.msg || "Hello Twilio Functions and SendGrid.";
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