<?php

if ($argc > 1) {
    $FriendlyName = $argv[1];
} else {
    $FriendlyName = $_REQUEST['FriendlyName'];
}
if ($FriendlyName === null) {
    echo "0";
    return;
}
if ($argc > 2) {
    $CallSid = $argv[2];
} else {
    $CallSid = $_REQUEST['CallSid'];
}
if ($CallSid === null) {
    echo "0";
    return;
}
echo "+++ Get the participant SID using the conference name: " . $FriendlyName . ", and CallSid: " . $CallSid . "\xA";

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));

// Given the Conference name, get the conference id.
$conferences = $twilio->conferences->read(
        array(
            "Status" => "in-progress",
            "FriendlyName" => $FriendlyName
        ));
print("Call SID: " . $conferences[0]->sid . " Name: " . $conferences[0]->friendlyName . "\n");
$conferenceSid = $conferences[0]->sid;

$testTrue = true;
$testFalse = false;
$participant = $twilio->conferences($conferenceSid)
        ->participants($CallSid)
        ->fetch();
$participantOnHold = "Not";
if ($participant->hold) {
    $participantOnHold = "On hold";
}
$participantMuted = "Not";
if ($participant->muted) {
    $participantMuted = "Muted";
}
print('+ Participant SID: ' . $participant->callSid
        . " hold:" . $participantOnHold . " muted:" . $participantMuted
        . " testTrue:"  . $testTrue
        . " testFalse:"  . $testFalse
        ."\xA");

echo "+++ Exit.\xA";
?>
