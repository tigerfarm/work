console.log("++ List SMS logs.");
var client = require('twilio')(process.env.MAIN_ACCOUNT_SID, process.env.MAIN_AUTH_TOKEN);
console.log("+ Account SID: " + process.env.MAIN_ACCOUNT_SID);
dateSentBefore = new Date(Date.UTC(2023, 10, 5, 0, 0, 0));
dateSentAfter = new Date(Date.UTC(2023, 7, 1, 0, 0, 0));
theCounter = 1;

const runProcess = async () => {
    try {
        const pageSize = 50;
        let page = await client.messages.page({
            pageSize: pageSize,
            dateSentAfter: dateSentAfter,
            dateSentBefore: dateSentBefore
        });
        while (page && page.instances.length > 0) {
            page.instances.forEach(m => {
                console.log(theCounter++, m.sid, m.direction, m.status, m.to)
            });
            page = await page.nextPage();
        }

    } catch (e) {
        return e;
    }
};

runProcess();