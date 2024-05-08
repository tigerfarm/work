
exports.handler = function(context, event, callback) {
    // https://about-time-2357.twil.io/cliff-send-mail?phone_numbers=+16505552222&email=dthurston@example.com&email_subject=theSubject
  console.log(event);
  var htmlContent = "";
  const SENDGRID_API_KEY = context.CLIFF_SEND_GRID_API_KEY;
  const sgMail = require("@sendgrid/mail");
  sgMail.setApiKey(SENDGRID_API_KEY);
  const client = context.getTwilioClient();
  var numbersList = event.phone_numbers.split(":");
  var emailList = event.email.split(":");
  var twilioNumber = event.Called;
  var smsBody =event.sms_body+"  " + event.RecordingUrl;
  var fs = require("fs");
  const htmlFilePath = Runtime.getAssets()["sample_html.txt"].path;
  fs.readFile(htmlFilePath, (err, data) => {
    if (err) {
      console.log(err);
      htmlContent =
        '<!DOCTYPE html><html lang="en"><body><h1>You Have received new Voice mail</h1><a href="RecordingUrl">Please Click here to view the voicemail</a></body></html>';
      htmlContent = htmlContent.replace("RecordingUrl", event.RecordingUrl);
      sendMessage();
    } else {
      htmlContent = data.toString();
      htmlContent = htmlContent.replace("RecordingUrl", event.RecordingUrl);
      htmlContent = htmlContent.replace("transcriptionText",event.TranscriptionText);
      console.log("Html content", htmlContent);
      sendMessage();
    }
  });
  function sendMessage() {
    console.log("numbersList", numbersList);
    let len = numbersList.length;
    for (let index = 0; index < len; index++) {
      client.messages.create({ from: twilioNumber, body: smsBody, to: numbersList[index] })
        .then(message => {
          console.log(message.sid);
          if (index === len - 1) {
            sendMail();
          }
        })
        .catch(error => {
          console.log("sms error", error);
          if (index === len - 1) {
            sendMail();
          }
        });
    }
  }
  function sendMail() {
    console.log("emailList", emailList);
    sgMail.sendMultiple({
        from: "alert@example.com",
        to: emailList,
        subject: event.email_subject,
        text: "test",
        html: htmlContent
      })
      .then(
        result => {
          console.log("Sent email");
          callback();
        },
        err => {
          console.error(err);
          callback();
        }
      );
  }
};
