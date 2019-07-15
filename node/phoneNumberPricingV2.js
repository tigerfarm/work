console.log("++ Start.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN).pricing;





client.phoneNumbers.countries('US').fetch()
        .then(country => {
            country.phoneNumberPrices.forEach(price => {
                console.log(`${price.number_type} ${price.current_price}`);
            });
        })
        .catch(error => {
            console.log(error);
            throw error;
        });

// eof