package javatwsamples;
/*
    https://www.twilio.com/docs/usage/security
    javac -cp twilio-8.18.0-jar-with-dependencies.jar jSignatureValidationPost.java
    java -cp .:twilio-8.18.0-jar-with-dependencies.jar jSignatureValidationPost
 */
import com.twilio.security.RequestValidator;
import java.net.URLDecoder;
import java.util.HashMap;
import java.util.Map;

public class jSignatureValidationPost {

    public static void main(String[] args) {
        // Initialize the validator
        String AUTH_TOKEN = System.getenv("MASTER_AUTH_TOKEN");
        RequestValidator validator = new RequestValidator(AUTH_TOKEN);
        //
        // The POST body in the Twilio request.
        // The requestString is the Twilio POST body RAW data string.
        String requestString = "ToCountry=US&ToState=CA&SmsMessageSid=SM60566ee207e123ee2765abcc55c9b9c9&NumMedia=0&ToCity=SAN+BRUNO&FromZip=94030&SmsSid=SM60566ee207e123ee2765abcc55c9b9c9&FromState=CA&SmsStatus=received&FromCity=SAN+BRUNO&Body=hi+there%2C+2%2B3%3D4&FromCountry=US&To=%2B16505551366&ToZip=94030&NumSegments=1&ReferralNumMedia=0&MessageSid=SM60566ee207e123ee2765abcc55c9b9c9&AccountSid=ACae0e356ccba96d16d8d4f6f9518684a3&From=%2B16505558893&ApiVersion=2010-04-01";
        // Haved the name value pairs loaded into Map and the value URL decoded.
        Map<String, String> params = new HashMap<String, String>();
        String[] parts = requestString.split("&");
        for (String part : parts) {
            String[] keyVal = part.split("="); // The equal separates attribute names and values.
            if (keyVal.length > 1) {
                params.put(keyVal[0], URLDecoder.decode(keyVal[1]));
            }
        }
        // The actual Twilio request URL
        String url = "https://example.com/myapp";
        // Signature value from the Twilio HTTP request header.
        // "x-twilio-signature":"0aKCTR6DLpKmkAf8muaAqo1nDgQ="
        String twilioSignature = "0aKCTR6DLpKmkAf8muaAqo1nDgQ=";
        System.out.println("+ url :       " + url);
        System.out.println("+ signature : " + twilioSignature);
        System.out.println("+ params:     " + params);
        //
        System.out.println("+ Signature validation is: " + validator.validate(url, params, twilioSignature));
    }

}
