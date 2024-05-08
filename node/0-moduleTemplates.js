// Module to be loaded into a node program.

// Customer JSON data.
const customerJson = require('./0-moduleCustomers.js');
const customers = customerJson.customers;

// -----------------------------------------------------------------------------
// Message templates
//
const OPENER_NEXT_STEPS = 'Hello {{Name}} we have now processed your documents and would like to move you on to the next step. Drop me a message. {{Author}}.';
const OPENER_NEW_PRODUCT = 'Hello {{Name}} we have a new product out which may be of interest to your business. Drop me a message. {{Author}}.';
const OPENER_ON_MY_WAY = 'Just to confirm I am on my way to your office. {{Name}}.';

const REPLY_SENT = 'This has now been sent from: {{Author}}.';
const REPLY_RATES = 'Our rates for any loan are 20% or 30% over $30,000. You can read more at https://example.com. {{Author}}.';
const REPLY_OMW = 'Just to confirm I am on my way to your office. {{Author}}.';
const REPLY_OPTIONS = 'Would you like me to go over some options with you {{Name}}? {{Author}}.';
const REPLY_ASK_DOCUMENTS = 'We have a secure drop box for documents. Can you attach and upload them here: https://example.com. {{Author}}';

const CLOSING_ASK_REVIEW = 'Happy to help, {{Name}}. If you have a moment could you leave a review about our interaction at this link: https://example.com. {{Author}}.';

// -----------------------------------
// Twilio WhatsApp Sandbox templates
//
const SANDBOX_TEMPLATE_1 = 'Your {{CompanyName}} code is {{Code}}.';
//          Example: Your Twilio code is 1238432
//      Your appointment is coming up on {{1}} at {{2}}
//          Example: Your appointment is coming up on July 21 at 3PM
//      Your {{1}} order of {{2}} has shipped and should be delivered on {{3}}. Details: {{4}}
//          Example: Your Yummy Cupcakes Company order of 1 dozen frosted cupcakes has shipped and should be delivered on July 10, 2019. Details: http://cupcakes.example.com/
// -----------------------------------
// WhatsApp templates.
//
//  Note, customer JSON data is used to merge into the templates.
//      const customers = [
//      {
//              customer_id: 1,
//              display_name: 'Coleridge',
//              channels: [
//                  {type: 'sms', value: '+16505551111'}
//              ],
//              worker: 'lordbyron@example.com',
//              avatar: 'https://abouttime-2357.twil.io/Coleridge.jpg'
//          },
//
// -----------------------------------------------------------------------------
// Add parameters into message templates.
//
const compileTemplate = (template, customer) => {
    let compiledTemplate = template;
    //
    compiledTemplate = compiledTemplate.replace(/{{Name}}/, customer.display_name);
    compiledTemplate = compiledTemplate.replace(/{{Author}}/, customer.worker);
    //
    // Added for Sandbox templates:
    compiledTemplate = compiledTemplate.replace(/{{CompanyName}}/, customer.company_name);
    compiledTemplate = compiledTemplate.replace(/{{Code}}/, getRndInteger(100000, 999999)); // 6 digit random number.
    //
    return compiledTemplate;
};

function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

// -----------------------------------------------------------------------------
exports.templates = function (theCustomerId) {
    // console.log("+ Get templates for Customer Id = " + theCustomerId);
    var customerDetails = customers.find(customer => String(customer.customer_id) === String(theCustomerId));
    if (!customerDetails) {
        console.log("404 " + "-- Error, customer id not found: " + theCustomerId);
        exit(); // return();
    }
    // -------------------------------------------------------------------------
// Prepare templates categories
// Pre-approved templates for out of session messages: ", whatsAppApproved: true"
    const openersCategory = {
        display_name: 'Openers', // Category name
        templates: [
            {content: compileTemplate(OPENER_NEXT_STEPS, customerDetails)},
            {content: compileTemplate(OPENER_NEW_PRODUCT, customerDetails)},
            {content: compileTemplate(OPENER_ON_MY_WAY, customerDetails), whatsAppApproved: true}, // Pre-approved WhatsApp template
            {content: compileTemplate(SANDBOX_TEMPLATE_1, customerDetails), whatsAppApproved: true}
        ]
    };
    const repliesCategory = {
        display_name: 'Replies',
        templates: [
            {content: compileTemplate(REPLY_SENT, customerDetails)},
            {content: compileTemplate(REPLY_RATES, customerDetails)},
            {content: compileTemplate(REPLY_OMW, customerDetails)},
            {content: compileTemplate(REPLY_OPTIONS, customerDetails)},
            {content: compileTemplate(REPLY_ASK_DOCUMENTS, customerDetails)}
        ]
    };
    const closingCategory = {
        display_name: 'Closing',
        templates: [
            {content: compileTemplate(CLOSING_ASK_REVIEW, customerDetails)}
        ]
    };
    // Respond with a list of compiled templates
    // console.log("+ openersCategory = " + JSON.stringify(openersCategory.templates[0].content));
    // "Hello John Keats we have now processed your.
    theList = [openersCategory, repliesCategory, closingCategory];
    // console.log("++ Success, theList = " + theList);
    return theList;
};

// eof