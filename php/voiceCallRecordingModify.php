<?php

// Docs:
//  https://www.twilio.com/docs/voice/api/recording?code-sample=code-resume-a-call-recording-13&code-language=PHP&code-sdk-version=5.x
//
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
//
$callSid = "CA78a32a1cb6b1d2ce83ec581610a0aeaf ";
$recordingSid = "RE21c5145b2bcda49a93550e63be7fe6d3";
echo "+ Modify the call recording, call SID: " . $callSid . ", recording SID: " . $recordingSid . "\xA";
$call = $twilio->calls($callSid)
        ->recordings($recordingSid)
        ->update("paused");         // paused | in-progress | stopped

echo "+ Call to: " . $call->status . "\xA";
echo "+++ Exit.\xA";
?>

