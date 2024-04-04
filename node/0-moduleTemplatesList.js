console.log( '+++ Get templates.');

var theTemplates = require('./0-moduleTemplates.js');
theCustomerId = 3;
console.log('+ GetTemplates for Customer Id: ' + theCustomerId);
console.log( '++ Worker Templates: ' + JSON.stringify(theTemplates.templates(theCustomerId)));
// {"display_name":"Openers","templates":[{"content":"Hello John Keats we have now processed your documents and would like to move you on to the next step. Drop me a message. dave@example.com."},{"content":"Hello John Keats we have a new product out which may be of interest to your business. Drop me a message. dave@example.com."},{"content":"Just to confirm I am on my way to your office. John Keats.","whatsAppApproved":true},{"content":"Your Poets Inc. code is 332953.","whatsAppApproved":true}]}
console.log( '++ First Template result: ' + JSON.stringify(theTemplates.templates(theCustomerId)[1].templates[0].content));
