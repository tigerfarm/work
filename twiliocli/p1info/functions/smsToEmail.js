const got = require('got');

exports.handler = function (context, event, callback) {
  console.log("+++ Start.");
  console.log("+ Message text: " + event.Body);
  const requestBody = {
    personalizations: [{ to: [{ email: context.TO_EMAIL_ADDRESS }] }],
    from: { email: context.FROM_EMAIL_ADDRESS },
    subject: `New SMS message from: ${event.From}`,
    content: [
      {
        type: 'text/plain',
        value: event.Body
      }
    ]
  };
  console.log("+ Send email.");
  got
    .post('https://api.sendgrid.com/v3/mail/send', {
      headers: {
        Authorization: `Bearer ${context.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(requestBody)
    })
    .then((_response) => {
      const twiml = new Twilio.twiml.MessagingResponse();
      callback(null, twiml);
    })
    .catch((err) => {
      callback(err);
    });
};
