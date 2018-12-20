<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$notification = $twilio->notify->v1->services("IS3a46cc3e6ca7a1b8bd7aea51c875d33a")
        ->notifications
        ->create(array(
            "body" => "hello 3",
            "toBinding" => "{\"binding_type\":\"sms\", \"address\":\"+16508668232\"}"
        )
);
echo "+ Notification SID: " . $notification->sid . "\xA";
?>
