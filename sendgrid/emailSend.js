// Create a SendGrid account, and create an API Key from the menu item under Settings/API Keys.
// Create a SendGrid work directory, and change into the directory.
// $ npm init --yes
// $ npm install @sendgrid/mail
// I'm using version: 6.4.0
// Set environment variables and run this program.

console.log("++ Send email message.");
theMsg = "Hello from SendGrid 6";
console.log("+ SENDGRID_API_KEY: " + process.env.SENDGRID_API_KEY
        + ", from: " + process.env.EMAIL_TF
        + ", to: " + process.env.EMAIL_DT
        + ", MSG: " + theMsg);
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);
const msg = {
    from: process.env.EMAIL_TF,
    to: process.env.EMAIL_DT,
    subject: "Using SendGrid",
    text: theMsg
};
// sgMail.send(msg);
sgMail.send(msg).then((sent) => {
    console.log("+ Sent, statusCode: " + sent[0].statusCode);
    // console.log("+ Sent: " + JSON.stringify(sent));
});

// + Sent: [{
// "statusCode":202,
// "headers":{"server":"nginx","date":"Thu, 25 Jul 2019 20:24:19 GMT","content-length":"0","connection":"close","x-message-id":"V-dJe6MrQ6ieESJGg6r22A","access-control-allow-origin":"https://sendgrid.api-docs.io","access-control-allow-methods":"POST","access-control-allow-headers":"Authorization, Content-Type, On-behalf-of, x-sg-elas-acl","access-control-max-age":"600","x-no-cors-reason":"https://sendgrid.com/docs/Classroom/Basics/API/cors.html"},
// "request":{"uri":{"protocol":"https:","slashes":true,"auth":null,"host":"api.sendgrid.com","port":443,"hostname":"api.sendgrid.com","hash":null,"search":null,"query":null,"pathname":"/v3/mail/send","path":"/v3/mail/send","href":"https://api.sendgrid.com/v3/mail/send"},
// "method":"POST",
// "headers":{"Accept":"application/json","User-agent":"sendgrid/6.3.0;nodejs","Authorization":"Bearer S...c","content-type":"application/json","content-length":196}
// }},null]


