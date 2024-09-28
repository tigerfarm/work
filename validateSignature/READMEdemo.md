# Signature Validation Demo

I ran tests which went as expected. Below, I included a summary and details. Let me know if you question or comments.
 
### Summary
 
I did a test where:
+ I made an request to send an SMS. The request had parameters so that it would fail. 
+ I captured the Twilio HTTP POST status callback request content: headers and name-value parameters. 
+ I entered the content and Twilio signature into my sample program. Note, the data would be entered differently if I was receiving an HTTP GET request from Twilio.
+ I ran the program to validate the content. The signature validation was true, valid.
+ I reorder the content and ran the program. The signature validation was true, valid.
 
+ I change to program Map, from the following which matches the documentation:
````
Map<String, String> params = new HashMap<>();
````
to:
````
TreeMap params = new TreeMap<>();
````
+ I ran the program to validate the content. The signature validation was true, valid.
+ I made changes to the content and ran the program. The signature validation was false, invalid.
 
The above sequence confirms:
+ My content for testing is valid when unchanged.
+ Parameter sort order is not important.
+ "TreeMap" works fine.
+ If the content is changed, the validation fails.
 
### Details
 
My testing steps:
+ Setup a Twilio Function to capture the HTTP request contents.

Twilio Function to capture the HTTP request contents:
````
exports.handler = function(context, event, callback) {
    let theRequest = event;
    // console.log("+ JSON: " + JSON.stringify(theRequest));
    console.log('----------------------------------------------------------------');
    console.log('+ List headers:');
    for (const x in theRequest.request.headers) {
        console.log('++ ' + x + ': ' + JSON.stringify(theRequest.request.headers[x]));
    }
    console.log('------------------');
    console.log('+ List cookies:');
    for (const x in theRequest.request.cookies) {
        console.log('++ ' + x + ': ' + JSON.stringify(theRequest.request.cookies[x]));
    }
    console.log('------------------');
    console.log('+ List parameters:');
    for (const x in theRequest) {
        if (x !== "request") {
            console.log('++ ' + x + ': ' + JSON.stringify(theRequest[x]));
        }
    }
    console.log("}");
    //
    callback(null, "<Response/>");
};
````

+ I made an SMS request that would fail because the Twilio phone number is not registered to send SMS.
````
$ node smsSend.js
++ Send SMS message.
+ SID: ACa...a3, from: +16505551111, to: +16505552222, MSG: Hello from Dave 5, StatusCallback: https://statuscallback-2357.twil.io/echoRequestTest
+ Message sent, SID: SMa6b28c6d6a5d1a66c865af6487221a71
````
+ Received the callback status request content:
````
+ List headers:
...
+ x-twilio-signature: "x9c+VTg...BSo="
...
+ List parameters:
++ ApiVersion: "2010-04-01"
++ MessageStatus: "undelivered"
++ SmsSid: "SMf0bc7a034bb25ff30b6ccd43f48ff9ee"
++ SmsStatus: "undelivered"
++ ErrorCode: "30034"
++ To: "+16505552222"
++ From: "+16505551111"
++ MessageSid: "SMf0bc7a034bb25ff30b6ccd43f48ff9ee"
++ AccountSid: "ACae...a3"
````
 
+ I entered the above values into my sample program.
````
import com.twilio.security.RequestValidator;
import java.util.HashMap;
import java.util.Map;
public class jSignatureValidationPostList {
    public static void main(String[] args) {
        // Initialize the validator
        System.out.println("+++ Start validator.");
        //
        String AUTH_TOKEN = System.getenv("MAIN_AUTH_TOKEN");
        // System.out.println("+ MAIN_AUTH_TOKEN: " + AUTH_TOKEN);
        RequestValidator validator = new RequestValidator(AUTH_TOKEN);
        //
        // The Twilio request URL of my Twilio Function:
        String url = "https://status-2357.twil.io/echoRequest";
        //
        // The post variables in Twilio's request
        Map<String, String> params = new HashMap<>();
        params.put("ApiVersion", "2010-04-01");
        params.put("MessageStatus", "undelivered");
        params.put("SmsSid", "SMf0bc7a034bb25ff30b6ccd43f48ff9ee");
        params.put("SmsStatus", "undelivered");
        params.put("ErrorCode", "30034");
        params.put("To", "+16505552222");
        params.put("From", "+16505551111");
        params.put("MessageSid", "SMf0bc7a034bb25ff30b6ccd43f48ff9ee");
        params.put("AccountSid", "ACae...4a3");
        System.out.println("+ params: " + params);
        //
        String twilioSignature = "x9c+VT...BSo=";
        //
        System.out.println("+ Signature validation is: " + validator.validate(url, params, twilioSignature));
    }
}
````
 
+ I complied the program and then ran the program.
 
````
$ javac -cp twilio-8.18.0-jar-with-dependencies.jar jSignatureValidationPostList.java
$ java -cp .:twilio-8.18.0-jar-with-dependencies.jar jSignatureValidationPostList
+++ Start validator.
+ params: {ApiVersion=2010-04-01, MessageStatus=undelivered, SmsSid=SMf0bc7a034bb25ff30b6ccd43f48ff9ee, SmsStatus=undelivered, ErrorCode=30034, To=+16505552222, From=+16505551111, MessageSid=SMf0bc7a034bb25ff30b6ccd43f48ff9ee, AccountSid=ACae...a3}
+ Signature validation is: true
````
 
+ I ran other tests. See above in the summary for testing details.
 
--------------------------------------------------------------------------------
Cheers