<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\TwiML\VoiceResponse;

// Carriage return is: "\r" 
// in Windows: \r\n
$response = new VoiceResponse();
$response->say("Welcome to the machine.");
$response->say("Hello all!\xD\xA\xD\xABy now most ... \xD\xA\xD\xAThank you");
echo $response;

