<?php
$conferenceSid = "CF10e175b862cfd07b950b0810ab7098fa";
echo "+++ List Conference participants on conference: " . $conferenceSid . "\xA";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
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
    if ($participant->hold) {
        $participantMuted = "Muted";
    }
    print('+ Participant SID: ' . $record->callSid . " hold:" . $participantOnHold . " muted:" . $participantMuted . "\xA");
}
echo "+++ Exit.\xA";
?>
