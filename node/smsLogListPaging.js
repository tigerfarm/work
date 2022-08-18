console.log("++ List SMS logs.");
var client = require('twilio')(process.env.MASTER_ACCOUNT_SID, process.env.MASTER_AUTH_TOKEN);
console.log("+ Account SID: " + process.env.MASTER_ACCOUNT_SID);
client.messages.list({
    dateSentBefore: new Date(Date.UTC(2019, 2, 1, 0, 0, 0)),
    dateSentAfter: new Date(Date.UTC(2019, 0, 1, 0, 0, 0)),
    status: "received",
    limit: 20
}).then(messages =>
    messages.forEach(
            m => console.log(m.sid, m.direction, m.status, m.to)
    ));

// Paging sample, untested.

client.messages.page({dateSentAfter: dateSentAfter, dateSentBefore: dateSentBefore}).then(page => {
    // first page
    for (var i in page.instances) {
        console.log(page.instances[i].sid);
    }
    var nextPageUri = page.getNextPageUrl();
    console.log(nextPageUri);
    if (nextPageUri) {
        var pageToken = null;
        var pageNumber = null;
        var parameters = nextPageUri.split("?")[1].split("&");
        for (var i in parameters) {
            if (parameters[i].startsWith("PageToken=")) {
                pageToken = parameters[i].substring("PageToken=".length);
                console.log(pageToken);
            } else if (parameters[i].startsWith("Page=")) {
                pageNumber = parseInt(parameters[i].substring("Page=".length));
                console.log(pageNumber);
            }
        }
        return client.messages.page({dateSentAfter: dateSentAfter, dateSentBefore: dateSentBefore, pageToken: pageToken, pageNumber: pageNumber});

    }
    return Promise.resolve(null);
})
.then(page => {
    // second page
    if (page) {
        for (var i in page.instances) {
            console.log(page.instances[i].sid);
        }
    }
})
.catch((error) => console.log(error));