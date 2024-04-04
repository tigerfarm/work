<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\TwiML;

echo "\xA+ Display TwiML sample.\xA";
$response = new TwiML();
$dial = $response->dial('', ['callerId' => '+15557779999']); 
$dial->number('+15557772222');

echo $response;
echo "\xA+ End display.\xA";
?>
