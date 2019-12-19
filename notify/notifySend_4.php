<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$serviceSid = getenv('NOTIFY_SERVICE_SID');
echo "+ NOTIFY_SERVICE_SID: " . $serviceSid . "\xA";
echo "+ Notification to phone number: " . getenv('PHONE_NUMBER2') . ", " . getenv('PHONE_NUMBER3') . "\xA";
$notification = $twilio->notify->services($serviceSid)
    ->notifications->create([
        "toBinding" => [
            '{"binding_type":"sms", "address":"' . getenv('PHONE_NUMBER2') . '"}',
            '{"binding_type":"sms", "address":"' . getenv('PHONE_NUMBER3') . '"}'
        ],
        "body" => "Hello Bob"
    ]);

echo "+ Notification SID: " . $notification->sid . "\xA";
?>
