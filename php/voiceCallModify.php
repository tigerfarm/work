<?php
// Docs: https://www.twilio.com/docs/voice/api/call
//
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$callSid = "CA7c8c8c0f593027b7faec3adeaacd5108";
echo "+++ Modify the call using the call SID: " . $parentCallSid . "\xA";
$call = $twilio->calls($callSid)
               ->update(array(
                            "method" => "POST",
                            // "url" => "http://demo.twilio.com/docs/voice.xml"
                            "url" => "https://handler.twilio.com/twiml/EH178a08996de934d625b6e493e2e4a19f"
                        )
               );
echo "+ Call to: " . $call->to . "\xA";
echo "+++ Exit.\xA";
?>

