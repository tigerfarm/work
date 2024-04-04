// twilio api:core:messages:fetch --sid SM2feb3243087344fcae1652e603fa5462

console.log("++ Fetch SMS message log information.");
var client = require('twilio')(process.env.ACCOUNT_SID, process.env.AUTH_TOKEN);
// let theMessageSid = 'SM2feb3243087344fcae1652e603fa5462';
let theMessageSid = 'MMf13067e3d08ac5aa1122b8892700cfbe';       // MMS
console.log("+ Account SID: " + process.env.ACCOUNT_SID + " Message SID: " + theMessageSid);
client.messages(theMessageSid)
        .fetch()
        .then(message => console.log(
                    '++ Status: ' + message.status + ', ' + message.from + ' To: ' + message.to + ' Text: ' + message.body
                    + '\n' + JSON.stringify(message)
                    + '\nMedia SID: ' + JSON.stringify(message.sid)
                    + '\nMedia: ' + JSON.stringify(message.subresourceUris.media)
                    ));
// Media:
// "subresourceUris":{"media":"/2010-04-01/Accounts/ACae...3/Messages/MMd753ed3ae111831409ec681b2cca1c6c.json/Media.json", ...
//  Gives the URL, to get the media URLs:
// https://api.twilio.com/2010-04-01/Accounts/ACae...3/Messages/MMd753ed3ae111831409ec681b2cca1c6c.json/Media.json
//  The media JSON data include the URI and media type:
// "content_type": "image/jpeg"
// "uri": "/2010-04-01/Accounts/ACae...3/Messages/MMe7c45666f50a64abd40654868e77234f/Media/ME4ebd9fadb218a48933aecc229a9cc49b.json"}
//  Use the "MM"-"ME" media URL to get the actual media file. Use the "MM"-"ME" media URI without the ".json":
// https://api.twilio.com/2010-04-01/Accounts/ACae...3/Messages/MMd753ed3ae111831409ec681b2cca1c6c.json/Media/ME4ebd9fadb218a48933aecc229a9cc49b
//  Note, it will do a redirect to the actual media file:
// https://s3-external-1.amazonaws.com/media.twiliocdn.com/ACae...3/59133755636eb90ebeb171b3f16c03a4
// 
// eof