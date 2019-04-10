<?php
// Docs: https://www.twilio.com/docs/voice/api/call
//
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$phoneNumber = "+16505552222";
echo "+++ Get a call data from the phone number: " . $phoneNumber . "\xA";
$calls = $twilio->calls->read(array(
    "status" => "in-progress",
    "To" => $phoneNumber
));
foreach ($calls as $call) {
    echo  $call->startTime->format("Y-m-d h:i:s") . " " . $call->sid . " " . $call->status . "\xA";
}
echo "+++ Exit.\xA";
?>
