package notify;

import com.twilio.Twilio;
import com.twilio.rest.notify.v1.service.Notification;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class create_notification_number_mms {

    private static final String ACCOUNT_SID = System.getenv("ACCOUNT_SID");
    private static final String AUTH_TOKEN = System.getenv("AUTH_TOKEN");

    public static void main(String[] args) {

        Twilio.init(ACCOUNT_SID, AUTH_TOKEN);

        List<String> listSendTo = new ArrayList<>();
        listSendTo.add("{\"binding_type\":\"sms\", \"address\":\"" + System.getenv("MY_PHONE_NUMBER") + "\"}");
        
        // I don't know the correct syntax for the media URL.
        // Sample using Map: https://www.twilio.com/docs/sync/api/map-item-resource
        // Sending an MMS: .setMediaUrl(Arrays.asList(URI.create("https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg")))
        // NodeJS:    sms: { 'media_urls':['https://www.tigerfarmpress.com/StacyDavid/netscape-fountain2a.jpg']},
        Map<String, Object> sms = new HashMap<>();
        sms.put("1","sms:{'media_urls':['https://www.tigerfarmpress.com/StacyDavid/netscape-fountain2a.jpg']}");
        
        Notification notification
                = Notification
                        .creator(System.getenv("NOTIFY_SERVICE_SID"))
                        .setBody("Notify message 1.2")
                        .setSms(sms)
                        .setToBinding( listSendTo ).create();
        System.out.print("+ Notification SID: " + notification.getSid());
        System.out.print(", Text: " + notification.getBody());
        System.out.print(", Date: " + notification.getDateCreated());
        System.out.println("");
    }
}
