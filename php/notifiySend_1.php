<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$toPhoneNumber = getenv('PHONE_NUMBER_4');
//
$notification = $twilio->notify->v1->services("IS3a46cc3e6ca7a1b8bd7aea51c875d33a")
        ->notifications
        ->create(array(
            "body" => "Knok-Knok! This is your first Notify SMS",
            "toBinding" => '{"binding_type": "sms", "address": "$toPhoneNumber}"'
        )
);

echo "+ Notification SID: " . $notification->sid . "\xA";
?>
