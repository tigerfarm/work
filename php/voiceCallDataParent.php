<?php
// Docs: https://www.twilio.com/docs/voice/api/call
//
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$childCallSid = "CA335425bdc97202472feda9c802c870f3";
echo "+++ Get a parent call data from the child call's SID: " . $childCallSid . "\xA";
$call = $twilio->calls($childCallSid)->fetch();
echo  $call->startTime->format("Y-m-d h:i:s") . " " . $call->sid . " " . $call->status . " " . $call->parentCallSid . "\xA";
echo "+++ Exit.\xA";
?>
