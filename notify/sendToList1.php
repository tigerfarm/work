<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$notifySid = getenv('MASTER_NOTIFY_SERVICE_SID');
$toPhonenumber = getenv('MY_PHONE_NUMBER');
echo "+ Send a Notify message, notification SID: " . $notifySid
        . " To: " . $toPhonenumber
        . "\xA";
$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$notification = $twilio->notify->v1->services($notifySid)
        ->notifications
        ->create( array(
            "body" => "hello 2.4",
            "toBinding" => array(
                "{\"binding_type\":\"sms\", \"address\":\"" . getenv('MY_PHONE_NUMBER') . "\"}"
            )
            // I couldn't get DeliveryCallbackUrl to work in this PHP program.
            // , "delivery_callbackurl" => "https://tfpecho.herokuapp.com/deliveryCallbackUrl"
        )
);
echo "+ Notification SID: " . $notification->sid . "\xA";
?>
