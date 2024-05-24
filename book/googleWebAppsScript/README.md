# Using Google Apps Script receive, process, and respond to HTTP requests

Manage [projects](https://script.google.com/home)

--------------------------------------------------------------------------------
## Editor

Use the Apps Script Editor to edit server side programs.

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
