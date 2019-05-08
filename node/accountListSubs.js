console.log("+++ Start.");
// Documentation:
// https://www.twilio.com/docs/iam/api/subaccounts?code-sample=code-return-a-subaccount-resource-by-its-account-sid-8

var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);

client.api.accounts.list({status: "active"}).then(accounts =>
    accounts.forEach(
            account => console.log(
                        account.sid,
                        account.status,
                        account.friendlyName
                        )
    ));

// Fetch a single account:
// client.api.accounts(process.env.ACCOUNT_SID).fetch().then(
//                account => console.log(account.friendlyName));
