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
echo "+++ Put Conference participant on hold using the conference name: " . $FriendlyName . ", and CallSid: " . $CallSid . "\xA";

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));

// Given the Conference name, get the conference id.
$conferences = $twilio->conferences->read(
        array(
            "Status" => "in-progress",
            "FriendlyName" => $FriendlyName
        ));
print("+ Name: " . $FriendlyName . ", Call SID: " . $conferences[0]->sid . "\n");

$participant = $twilio->conferences($conferences[0]->sid)
                      ->participants($CallSid)
                      ->update(array(
                                   "hold" => True
                                   // ,"holdUrl" => "http://www.myapp.com/hold"
                               )
                      );
print('+ Put on hold: Participant SID: ' . $participant->callSid . "\xA");

echo "+++ Exit.\xA";
?>
