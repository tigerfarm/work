exports.handler = function(context, event, callback) {
    theMsg = event.msg || "Hello there";
    console.log("+ Send"
        + ", from: " + context.SENDGRID_EMAIL_FROM
        + ", to: " + "you@example.com"
        + ", MSG: " + theMsg);
    const sgMail = require("@sendgrid/mail");
    sgMail.setApiKey(context.SENDGRID_API_KEY);
    const msg = {
        from: process.env.EMAIL_TF,
        to:   process.env.EMAIL_DT,
        subject: "Using SendGrid",
        text: theMsg
    };
    sgMail.send(msg);
	callback(null, "+ Sent: " + theMsg);
};