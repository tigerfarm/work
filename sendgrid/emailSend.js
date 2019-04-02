// Create a SendGrid account, and create an API Key from the menu item under Settings/API Keys.
// Create a SendGrid work directory, and change into the directory.
// $ npm init --yes
// $ npm install @sendgrid/mail

console.log("++ Send email message.");
theMsg = "Hello from SendGrid 1";
console.log("+ SENDGRID_API_KEY: " + process.env.SENDGRID_API_KEY
        + ", from: " + process.env.EMAIL_TF
        + ", to: " + process.env.EMAIL_DT
        + ", MSG: " + theMsg);
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    from: process.env.EMAIL_TF,
    to:   process.env.EMAIL_DT,
    subject: "Using SendGrid",
    text: theMsg
    };
sgMail.send(msg);
console.log("+ Sent.");
