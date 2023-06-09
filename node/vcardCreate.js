// Create contact card and save to a *.vcf file
//
// This code is based on code and setup from:
//      https://www.twilio.com/blog/send-vcard-twilio-sms-node-js
// Install package:
//      npm install vcards-js
//      
const vcardsJs = require('vcards-js');
const vCard = vcardsJs();
// List of properties: https://www.npmjs.com/package/vcards-js#complete-example
vCard.organization = 'Tiger Farm Press';
vCard.firstName = 'Dave';
vCard.lastName = 'Here';
vCard.title = 'Writer';
vCard.workPhone = process.env.MAIN_PHONE_NUMBER_1;     // Twilio phone number
vCard.photo.embedFromFile(`./vcardCardLogo.jpg`);
vCard.url = 'https://www.twilio.com/blog/send-vcard-twilio-sms-node-js';
vCard.saveToFile('./vcardSample.vcf');

// eof