<?php
// https://www.twilio.com/docs/voice/api/conference-participant
if ($argc > 1) {
    $conferenceSid = $argv[1];
} else {
    $conferenceSid = $_REQUEST['conferenceSid'];
}
if ($conferenceSid === null) {
    echo "0";
    return;
}
echo "+++ List Conference participants on conference SID: " . $conferenceSid . "\xA";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
if (strncmp($conferenceSid, "CF", 2) !== 0) {
    // Given the Conference name, get the conference id.
    $conferences = $twilio->conferences->read(
        array(
            "Status" => "in-progress",
            "FriendlyName" => $FriendlyName
        ));
    print("+ Name: " . $conferences[0]->friendlyName . " Call SID: " . $conferences[0]->sid . "\n");
    $conferenceSid = $conferences[0]->sid;
}
$participants = $twilio->conferences($conferenceSid)->participants->read();
foreach ($participants as $record) {
    $participant = $twilio->conferences($conferenceSid)
            ->participants($record->callSid)
            ->fetch();
    $participantOnHold = "Not";
    if ($participant->hold) {
        $participantOnHold = "OnHold";
    }
    $participantMuted = "Not";
    if ($participant->muted) {
        $participantMuted = "Muted";
    }
    print('+ Participant SID: ' . $record->callSid . " hold:" . $participantOnHold . " muted:" . $participantMuted . "\xA");
}
echo "+++ Exit.\xA";
?>
