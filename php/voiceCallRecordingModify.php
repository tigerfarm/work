<?php

// Docs:
//  https://www.twilio.com/docs/voice/api/recording?code-sample=code-resume-a-call-recording-13&code-language=PHP&code-sdk-version=5.x
//
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$callSid = "CA083d3bd3b83293e3569924d4b0aa107a ";
$recordingSid = "RE1a0d1107f9354826902ddfaa8e9784e7";
echo "+ Modify the call recording, call SID: " . $callSid . ", recording SID: " . $recordingSid . "\xA";
$call = $twilio->calls($callSid)
        ->recordings($recordingSid)
        ->update("paused");         // paused | in-progress | stopped

echo "+ Call to: " . $call->status . "\xA";
echo "+++ Exit.\xA";
?>

