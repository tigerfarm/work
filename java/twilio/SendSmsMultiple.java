package sendsms;

import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;

public class SendSmsMultiple {

    public static final String ACCOUNT_SID = System.getenv("MAIN_ACCOUNT_SID");
    public static final String AUTH_TOKEN = System.getenv("MAIN_AUTH_TOKEN");

    public static void main(String[] args) {
        System.out.println("+++ Send message.");
        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);
        String fromPhoneNumber = System.getenv("MAIN_PHONE_NUMBER_1");
        String toPhoneNumber = System.getenv("MY_PHONE_NUMBER");
        String theMsg = "¡Hola Dave!";
        Message message;

        for (int aCounter = 0; aCounter < 20; aCounter++) {
            message = Message.creator(
                    new PhoneNumber(toPhoneNumber),
                    new PhoneNumber(fromPhoneNumber),
                    theMsg
            ).create();
            System.out.print("+ Message SID: " + message.getSid());
            System.out.println(" Status:      " + message.getStatus());
        }
    }
}
