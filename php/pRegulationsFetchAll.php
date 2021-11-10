<?php

require __DIR__ . '/../../twilio-php-main/src/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
echo "+++ List. \xA";

$regulations = $twilio->numbers->v2->regulatoryCompliance
        ->regulations
        ->read();
$counter = 0;
foreach ($regulations as $regulation) {
    $counter = $counter + 1;
    echo "+ SID: " . $regulation->sid
    . " isoCountry: " . $regulation->isoCountry
    . "  " . $counter
    . "\xA";
}
?>
