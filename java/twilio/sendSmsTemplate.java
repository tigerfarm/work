/*
    javac -cp twilio-9.13.0-jar-with-dependencies.jar:java-json.jar sendSmsTemplate.java
    java -cp .:twilio-9.13.0-jar-with-dependencies.jar:slf4j-simple-1.7.25.jar:java-json.jar sendSmsTemplate
    Note, JAR: slf4j-simple-1.7.25.jar, is optional. When not included, I get warning messages.
    java -cp .:twilio-9.13.0-jar-with-dependencies.jar:java-json.jar sendSmsTemplate

    javac -cp twilio-11.3.1-jar-with-dependencies.jar:java-json.jar sendSmsTemplate.java
    java -cp .:twilio-11.3.1-jar-with-dependencies.jar:slf4j-simple-1.7.25.jar:java-json.jar sendSmsTemplate
 */
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.json.JSONObject;
import java.util.HashMap;

public class sendSmsTemplate {

    private static final String ACCOUNT_SID = System.getenv("MAIN_ACCOUNT_SID");
    private static final String AUTH_TOKEN = System.getenv("MAIN_AUTH_TOKEN");

    public static void main(String[] args) {
        System.out.println("+++ Send WhatsApp message...");
        String fromPhoneNumber = "whatsapp:" + System.getenv("MAIN_PN_7002");
        String toPhoneNumber = "whatsapp:" + System.getenv("MY_PHONE_NUMBER");
        String theMsg = "Good day.";
        System.out.println("++ From:   " + fromPhoneNumber);
        System.out.println("++ To:     " + toPhoneNumber);
        System.out.println("++ theMsg: " + theMsg);

        String theMsgService = "MG9abb26060f3b4b8ff952eb775544789a";    // optional
        String HxTemplate = "HX30384be33a0f7d439d011a3d953337a9";       // One parameters

        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        Message message
                = Message.creator(
                        new PhoneNumber(toPhoneNumber),
                        new PhoneNumber(fromPhoneNumber),
                        theMsg
                )
                        .setContentSid(HxTemplate)
                        .setContentVariables(new JSONObject(new HashMap<String, Object>() {
                            { put("1", "Dave 2"); }
                        }).toString())
                        .setMessagingServiceSid(theMsgService)  // optional
                        .create();
        
        // Immediately returned values:
        System.out.println("+ Message SID:  " + message.getSid());
        System.out.println("+ Status:       " + message.getStatus());
        System.out.println("+ from:         " + message.getFrom());
        System.out.println("+ to:           " + message.getTo());
        System.out.println("+ Message text: " + message.getBody());
    }
}
