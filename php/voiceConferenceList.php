<?php

echo "+++ Start: Get conference SID from a friendly name.\n";

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$conferences = $twilio->conferences->read(
        array(
            "Status" => "in-progress",
            "FriendlyName" => "support"
        ));
foreach ($conferences as $record) {
    print("Call SID: " . $record->sid . " Name: " . $record->friendlyName . "\n");
}
print("Call SID: " . $conferences[0]->sid . " Name: " . $conferences[0]->friendlyName . "\n");

echo "+++ Exit.\n";
?>
