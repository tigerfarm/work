<?php
// Docs: https://www.twilio.com/docs/voice/api/call
//
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$parentCallSid = "CA282f69be620ddb837fa66de644f56f88";
echo "+++ Get a child call data from the parent call's SID: " . $parentCallSid . "\xA";
$calls = $twilio->calls->read(array(
    "parentCallSid" => $parentCallSid
));
foreach ($calls as $call) {
    echo  $call->startTime->format("Y-m-d h:i:s") . " " . $call->sid . " " . $call->status . "\xA";
}
$childCallSid = $call->sid;

$call = $twilio->calls($childCallSid)
               ->update(array(
                            "method" => "POST",
                            // "url" => "http://demo.twilio.com/docs/voice.xml"
                            "url" => "https://handler.twilio.com/twiml/EH178a08996de934d625b6e493e2e4a19f"
                        )
               );

echo "+ Call to: " . $call->to . "\xA";

echo "+++ Exit.\xA";
?>