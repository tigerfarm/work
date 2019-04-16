<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$notification = $twilio->notify->v1->services(getenv('NOTIFY_SERVICE_SID'))
        ->notifications
        ->create(array(
            "body" => "hello 2.2",
            "toBinding" => array(
                "{\"binding_type\":\"sms\", \"address\":\"" . getenv('PHONE_NUMBER1') . "\"}",
                "{\"binding_type\":\"sms\", \"address\":\"" . getenv('PHONE_NUMBER4') . "\"}"
                )
        )
);
echo "+ Notification SID: " . $notification->sid . "\xA";
?>
