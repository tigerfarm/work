<?php

error_reporting(E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ));
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
//
echo "\xA---------------------------------\xA";
echo "\xA+ Start.\xA";
$credential = $twilio->notify->v1->credentials
        ->create(
    "fcm",[
    "friendlyName" => "fcmcr2",
    "secret" => "AA...Tx",
        ]);
print("+ FCM credential SID: " . $credential->sid);
echo "\xA+ Exit.\xA";

// eof
