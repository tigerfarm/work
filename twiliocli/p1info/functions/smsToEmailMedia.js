// Base on the blog:
//  https://support.twilio.com/hc/en-us/articles/10499908492571-Using-Functions-to-Forward-MMS-media-with-Email-using-Sendgrid
// Modified to have authentication to access the media file (headers: Authorization, for basic authentication).

const got = require('got');

exports.handler = function (context, event, callback) {
    console.log("+++ Start.");

    // event.MediaUrl0 no longer works because it requires Twilio account SID and auth token for authentication.
    imagePath = event.MediaUrl0;
    // Hard code for testing.
    // imagePath = "https://example.com/tigsms/custom/companyLogo.jpg";
    console.log("+ imagePath: " + imagePath);

    //read in the image here:
    const request = require('request-promise-native');
    var basicAuth = "Basic " + Buffer.from(context.ACCOUNT_SID + ":" + context.AUTH_TOKEN).toString("base64");
    request({
        headers: {
            "Authorization": basicAuth
        },
        url: imagePath,
        method: 'GET',
        encoding: null
    }).then(result => {

        console.log("+ Message text: " + event.Body);
        
        let imageBuffer = Buffer.from(result);
        let imageBase64 = imageBuffer.toString('base64');

        //now create the email message
        const msg = {
            personalizations: [{to: [{email: context.TO_EMAIL_ADDRESS}]}],
            from: {email: context.FROM_EMAIL_ADDRESS},
            subject: `New SMS message from: ${event.From}`,
            content: [
                {
                    type: 'text/plain',
                    value: event.Body
                }
            ],
            attachments: [
                {
                    content: imageBase64,
                    filename: "tfp.jpg",
                    type: "image/jpeg",
                    disposition: "attachment",
                    content_id: "my_image"
                }
            ]
        };

        // Same whether include media or not.
        console.log("+ Send email.");
        got
                .post('https://api.sendgrid.com/v3/mail/send', {
                    headers: {
                        Authorization: `Bearer ${context.SENDGRID_API_KEY}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(msg)
                })
                .then((_response) => {
                    const twiml = new Twilio.twiml.MessagingResponse();
                    callback(null, twiml);
                })
                .catch((err) => {
                    callback(err);
                });
    });
};
