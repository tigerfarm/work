console.log("++ Check usage record categories.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
// Documentation: https://www.twilio.com/docs/usage/api/usage-record
// Can run with search (grep)
//      node usageCategories.js | grep phonenumbers
//      node usageCategories.js | grep sms
//
// ".lastMonth" is the previous month's values.
client.usage.records.lastMonth
        .list({
            // category: 'sms-inbound-longcode',     // Note, use without, then add the one to check.
            // limit: 100
        })
        .then(records => records.forEach(
                    r => {
                        if (r.count > 0) {
                            console.log("+ category: " + r.category
                                    + " asOf: " + r.asOf
                                    + " count: " + r.count
                                    + ", price: " + r.price
                                    );
                        }
                    }));
