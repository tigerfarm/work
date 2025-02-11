# Using Google Spreadsheet for Twilio SMS

--------------------------------------------------------------------------------
## Steps to send SMS from a Google Spreadsheet

Screen print of a spreadsheet after sending messages:

<img width="300px"  src="SendSms.jpg"/>

Setup Steps:
+ This requires you have a Google account and [Twilio account](https://www.twilio.com).
+ Create a Google spreadsheet.
+ In the spreadsheet, enter titles: Column A, "Phone numbers", column B, "Message body", column C, "Status".
+ For the phone numbers column, set data type to text string. Click column A. Click the menu item and select: Format/Number/Plain text.
+ Load your phones number into the spreadsheet's Column A, starting in row 2.
+ In the column next to the phone numbers, enter the message you wish to send.
+ From the spreadsheet menu, select Extensions/App Script.
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
+ In the script, enter your Twilio account SID (by replacing "your_account_SID") and auth token (by replacing "your_account_auth_token") into the script. You get these values from the first screen, when you log into the Twilio Console (http://twilio.com/console). Enter your Twilio phone number (by replacing "your_Twilio_phone_number") into the script, example: "+12223331234".
+ In the Google Spreadsheet Script Editor, click Select function and select: sendAll.
+ Click the Save icon. Note, if the Save icon is not enabled, type something into the line 5 comment.
That will enable the Save icon for clicking.
+ Run the script. Your messages will be sent.

Reference article, How to Send SMS from a Google Spreadsheet:
https://www.twilio.com/blog/2016/02/send-sms-from-a-google-spreadsheet.html


--------------------------------------------------------------------------------
## Lookup Phone Number from a Google Spreadsheet

Sample output
````
Lookup        Phone number   Type        Carrier	
16505551111   +16505551111   voip        Twilio US1 - Level3 - SMS-Sybase365/MMS-SVR	
16505552222   +16505552222   mobile      Rogers Communications Canada Inc.	
16505553333   +16505553333   landline    AT&T - PSTN	
````
Script:
````
function lookupFunction(thePhoneNumber) {
  // ---------------------------------------------
  // Get the JSON data.
  var ACCOUNT_SID = "your_account_SID";
  var ACCOUNT_TOKEN = "your_account_auth_token";
  var options = {
    "method" : "get"
  };
  options.headers = { 
    "Authorization" : "Basic " + Utilities.base64Encode(ACCOUNT_SID + ":" + ACCOUNT_TOKEN)
  };
  var url="https://lookups.twilio.com/v1/PhoneNumbers/" + thePhoneNumber + "?Type=carrier";
  var response = UrlFetchApp.fetch(url,options);
  var dataAll = JSON.parse(response.getContentText());
  thePhoneNumberFormatted = dataAll.phone_number;
  theCarrier = dataAll.carrier.name;
  theType = dataAll.carrier.type;
}

function myFunction() {
  // ---------------------------------------------
  // Parse the JSON data and put it into the spreadsheet's active page.
  var theSheet = SpreadsheetApp.getActiveSheet();
  var startRow = 2;
  var theColumn = 2;
  //
  var numRows = theSheet.getLastRow() - 1;
  var dataRange = theSheet.getRange(startRow, 1, numRows, 1)
  var data = dataRange.getValues();
  for (i in data) {
    try {
      lookupFunction( data[i] );
      theSheet.getRange(startRow + Number(i), theColumn).setValue(thePhoneNumberFormatted);
      theSheet.getRange(startRow + Number(i), theColumn+1).setValue(theType);
      theSheet.getRange(startRow + Number(i), theColumn+2).setValue(theCarrier);
    } catch(err) {
      Logger.log(err);
      status = "error";
      theSheet.getRange(startRow + Number(i), 2).setValue("- Error running Lookup.");
    }
  }
}
````

--------------------------------------------------------------------------------

Cheers...
