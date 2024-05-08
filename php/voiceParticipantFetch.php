<?php

echo "+++ List Conference participants.\xA";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$conferenceSid = "CF10e175b862cfd07b950b0810ab7098fa";
$participantSid = "CAd685c1d47829d42fd8fe73d5f2940416";
$testTrue = true;
$testFalse = false;
$participant = $twilio->conferences($conferenceSid)
        ->participants($participantSid)
        ->fetch();
$participantOnHold = "Not";
if ($participant->hold) {
    $participantOnHold = "On hold";
}
$participantMuted = "Not";
if ($participant->hold) {
    $participantMuted = "Muted";
}
print('+ Participant SID: ' . $participant->callSid
        . " hold:" . $participantOnHold . " muted:" . $participantMuted
        . " testTrue:"  . $testTrue
        . " testFalse:"  . $testFalse
        ."\xA");

echo "+++ Exit.\xA";
?>
