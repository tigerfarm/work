# Using Google Spreadsheet for Twilio SMS

--------------------------------------------------------------------------------
## Receive

Article, How to View Twilio SMS Received Messages in a Google Spreadsheet:
https://www.twilio.com/blog/2018/05/receive-sms-messages-google-sheets-apps-script.html

Requirements:
+ Create a Twilio account: https://twilio.com/console.
+ View your Twilio ACCOUNT SID and AUTH TOKEN (click view): https://twilio.com/console.
+ Buy a phone number. Here is the Twilio Console link to buy one:
https://www.twilio.com/console/phone-numbers/search

--------------------------------------------------------------------------------
## Steps to send SMS from a Google Spreadsheet

Setup Steps:
+ Create a Google spreadsheet. This requires you have a Google account. If you have a Gmail account, then you have a Google account.
+ In the spreadsheet, enter titles: Column A, "Phone numbers", column B, "Message body", column C, "Status".
+ For the phone numbers, set data type to text string. Click column A. Click the menu item and select: Format/Number/Plain text.
+ Load your phones number into the spreadsheet's Column A, starting in row 2.
+ In the column next to the phone numbers, enter the message you wish to send.
+ From the spreadsheet menu, select Tools/Script Editor.
+ Copy and paste the script into the Google spreadsheet's Script Editor (replacing whatever is there by default):
````
function sendSms(to, body) {
   var ACCOUNT_SID = "your_account_SID";
   var ACCOUNT_TOKEN = "your_account_auth_token";
   var ACCOUNT_PHONE_NUMBER = "your_Twilio_phone_number"; // Sender-id
   //
   var messages_url = "https://api.twilio.com/2010-04-01/Accounts/" + ACCOUNT_SID + "/Messages.json";
   var payload = {
      "To": to,
      "Body" : body,
      "From" : ACCOUNT_PHONE_NUMBER
   };
   var options = {
      "method" : "post",
      "payload" : payload
   };
   options.headers = {
      "Authorization" : "Basic " + Utilities.base64Encode(ACCOUNT_SID + ":" + ACCOUNT_TOKEN)
   };
   UrlFetchApp.fetch(messages_url, options);
}
function sendAll() {
   var sheet = SpreadsheetApp.getActiveSheet();
   var startRow = 2;
   var numRows = sheet.getLastRow() - 1;
   var dataRange = sheet.getRange(startRow, 1, numRows, 2)
   var data = dataRange.getValues();
   for (i in data) {
      var row = data[i];
      try {
         response_data = sendSms(row[0], row[1]);
         status = "sent";
      } catch(err) {
        Logger.log(err);
      status = "error";
      }
      sheet.getRange(startRow + Number(i), 3).setValue(status);
   }
}
````
+ In the script, enter your account SID (by replacing "your_account_SID") and auth token (by replacing "your_account_auth_token") into the script. You get these values from the first screen, when you log into the Twilio Console (http://twilio.com/console).Enter your Twilio phone number (by replacing "your_Twilio_phone_number") into the script, example: "+12223331234".
+ In the Google Spreadsheet Script Editor, click Select function and select sendAll.
+ Save the updates.
+ Run the script. Your messages will be sent.


Reference article, How to Send SMS from a Google Spreadsheet:
https://www.twilio.com/blog/2016/02/send-sms-from-a-google-spreadsheet.html


--------------------------------------------------------------------------------

Cheers...
