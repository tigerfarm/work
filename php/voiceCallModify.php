<?php
// Docs: https://www.twilio.com/docs/voice/api/call
//
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$parentCallSid = "CA8a59caa5013466476cf51beec5d9e653";
echo "+++ Get a child call data from the parent call's SID: " . $parentCallSid . "\xA";


$call = $twilio->calls("CA365340d62116262eb4008144cc07ddae")
               ->update(array(
                            "method" => "POST",
                            "url" => "http://demo.twilio.com/docs/voice.xml"
                        )
               );

echo "+ Call to: " . $call->to . "\xA";

echo "+++ Exit.\xA";
?>
