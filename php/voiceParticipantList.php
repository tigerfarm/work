<?php
if ($argc > 1) {
    $conferenceSID = $argv[1];
}
if ($conferenceSID === null) {
    echo "- Require conferenceSID.";
    return;
}
echo "+++ conferenceSID: " . $conferenceSID . "\xA";

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));

$participants = $twilio->conferences($conferenceSID)
                       ->participants
                       ->read([], 20);
foreach ($participants as $record) {
    // print($record->callSid);
    print('+ Participant SID: ' . $record->callSid . " hold:" . $participantOnHold . " muted:" . $participantMuted . "\xA");
}

echo "+++ Exit.\xA";
?>
