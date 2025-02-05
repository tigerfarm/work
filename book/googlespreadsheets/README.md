# Using Google Apps Script receive, process, and respond to HTTP requests

Manage [projects](https://script.google.com/home)

[Web Apps](https://developers.google.com/apps-script/guides/web)

--------------------------------------------------------------------------------
## Editor

Use the Apps Script Editor to edit server side programs.

Basic sample of receiving GET parameters, processing the parameters, and responding to the HTTP GET request.
````
function doGet(e) {
  Logger.log( "+ HTTP GET Parameters:");
  Logger.log( "++ To: " + e.parameter.To);
  Logger.log( "++ From: " + e.parameter.From);
  Logger.log( "++ Body: " + e.parameter.Body);
  return ContentService.createTextOutput("<Response/>").setMimeType(ContentService.MimeType.TEXT);
}
````

Basic sample of receiving POST parameters, processing the parameters, and responding to the HTTP POST request.
````
function doPost(e) {
  Logger.log( "+ HTTP POST Parameters:");
  Logger.log( "++ To: " + e.parameter.To);
  Logger.log( "++ From: " + e.parameter.From);
  Logger.log( "++ Body: " + e.parameter.Body);
  return ContentService.createTextOutput("<Response/>").setMimeType(ContentService.MimeType.TEXT);
}
````

Other Samples
````
function doGet(e) {

  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // Respond with TEXT.
  // var theFrom = e.parameter.From;
  // Logger.log( "+ From: " + theFrom);
  // return ContentService.createTextOutput(theFrom).setMimeType(ContentService.MimeType.TEXT);

  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // Respond with JSON.
  // Tested, works:
  // var params = JSON.stringify(e);
  // return ContentService.createTextOutput(params).setMimeType(ContentService.MimeType.JSON);

  // -----------------------------------------------------------------------
  // -----------------------------------------------------------------------
  // Reference: https://gist.github.com/nikmartin/239b58140366642233ef
  // Create XML response:
  //
  // -----------------------------------------------------------------------
  // 1. Simple sample:
  // <?xml version="1.0" encoding="UTF-8"?></Response>
  var Response = XmlService.createElement('Response');
  //
  // 2. Reply TwiML sample:
  // <?xml version="1.0" encoding="UTF-8"?>
  // <Response><Message><Body>Hello World!</Body></Message></Response>
  // var Response = XmlService.createElement('Response');
  // var Message = XmlService.createElement('Message');
  // var Body = XmlService.createElement('Body').setText('Hello there 3');
  // Message.addContent(Body);
  // Response.addContent(Message);
  //
  // -----------------------------------------------------------------------
  var theXML = XmlService.createDocument(Response);
  var responseXML = XmlService.getPrettyFormat().format(theXML);
  Logger.log("+ theXML: " + responseXML);
  // Response:
  var output = ContentService.createTextOutput();
  output.setContent(responseXML);
  output.setMimeType(ContentService.MimeType.XML);
  return output;
}
````

--------------------------------------------------------------------------------

Cheers...
