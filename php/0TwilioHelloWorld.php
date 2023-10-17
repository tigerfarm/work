<?php
require __DIR__ . '/../../twilio-php-main/srcV6/Twilio/autoload.php';
use Twilio\TwiML\VoiceResponse;
echo "+ Twilio Hello World.\xA";
$response = new VoiceResponse();
$response->say(
    "Using the Twilio PHP library to generate TwiML XML."
);
echo $response;

