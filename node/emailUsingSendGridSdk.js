console.log("++ Send SendGrid email message.");
// 
// Sending Email with Attachments using SendGrid and Node.js
// https://www.twilio.com/en-us/blog/sending-email-attachments-with-sendgrid
// 
// Add the following Dependencies:
// $ npm install @sendgrid/mail
// 
// Add the following Environment Variables, using your values.
// SENDGRID_API_KEY                SG.V...h-J...s
// SENDGRID_EMAIL_FROM             me@example.com
// SENDGRID_EMAIL_TO               you@example.com
//
SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
theFrom = process.env.EMAIL_TF;
// theTo = process.env.EMAIL_DT;
theTo = "jgonzalez@twilio.com";
console.log("+ SENDGRID_API_KEY: " + SENDGRID_API_KEY
        + "\n+ theFrom: " + theFrom
        + "\n+ to: " + theTo
        );
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    from: theFrom,
    to: theTo,
    subject: 'Sent with SendGrid 1b',
    text: 'Sent using Node.js',
};
sgMail.send(msg).then((sent) => {
    console.log("+ Sent, SendGrid statusCode: " + sent[0].statusCode);
    // console.log("+ Sent, SendGrid statusCode: " + sent[0].statusCode + " x-message-id:" + sent[0].headers.x-message-id);
    console.log("+ SendGrid sent info: " + JSON.stringify(sent[0]));
}).catch(err => {
    console.log("-- Error: " + err);
});
