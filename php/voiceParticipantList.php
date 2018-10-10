<?php

if ($argc > 1) {
    $FriendlyName = $argv[1];
} else {
    $FriendlyName = $_REQUEST['FriendlyName'];
}
if ($FriendlyName === null) {
    $FriendlyName = "support";
}
echo "+++ List Conference participants on conference: " . $FriendlyName . "\xA";

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
// $conferenceSid = "CF9e19fdcf42812d9fb2772960fc8ecb53";

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
