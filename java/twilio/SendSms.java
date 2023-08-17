package sendsms;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public class SendSms {

    public static final String ACCOUNT_SID = System.getenv("MAIN_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("MAIN_AUTH_TOKEN");

    public static void main(String[] args) {
        System.out.println("+++ Send message.");
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        String fromPhoneNumber = System.getenv("MAIN_PHONE_NUMBER_1");
        String toPhoneNumber = System.getenv("MY_PHONE_NUMBER");
        String theMsg = "¡Hola Dave!";
        Message message;
        message = Message.creator(
                        new PhoneNumber(toPhoneNumber),
                        new PhoneNumber(fromPhoneNumber),
                        theMsg
                )
                .create();
        // Immediately returned values:
        System.out.println("+ Message SID: " + message.getSid());
        System.out.println("+ Status:      " + message.getStatus());
        System.out.println("+ from:        " + message.getFrom());
        System.out.println("+ to:          " + message.getTo());
        System.out.println("+ Message text: " + message.getBody());
    }
}

