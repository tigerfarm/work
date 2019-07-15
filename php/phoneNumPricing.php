<?php

// Docs: https://www.twilio.com/docs/phone-numbers/api/available-phone-numbers
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;

$client = new Client(getenv("ACCOUNT_SID"), getenv('AUTH_TOKEN'));
//
$number = $client->pricing->v2->voice
        ->numbers("+14322424710")
        ->fetch();
var_dump($number); 
// $num = $number->inboundCallPrice;
//
echo "\xA++ " . "\xA";
?>
