<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$toPhoneNumber = getenv('PHONE_NUMBER_5');
$theMessage = "hello 2";
echo "++ Use Notify to send an SMS messsage to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
$echoUrl = "https://" . getenv('TOKEN_HOST') . "/echojson";
echo '++ Echo URL: ', $echoUrl, "\xA";
//
$notification = $twilio->notify->v1->services(getenv('NOTIFY_SERVICE_SID'))
        ->notifications
        ->create(array(
            "body" => $theMessage,
            "toBinding" => '{"binding_type": "sms", "address": $toPhoneNumber}',
            'sms' => ['status_callback' => 'http://tigerfarmpress.com/cgi/echo.php']
        )
);
//            "toBinding" => '{"binding_type": "sms", "address": "+16508661199"}'

echo "+ Notification SID: " . $notification->sid . "\xA";
?>
