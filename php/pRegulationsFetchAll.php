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
    echo "++ ";
    $counter = $counter + 1;
    if ($counter < 10) {
        echo "   ";     // "---1"
    } else if ($counter < 100) {
        echo "  ";      // "--12"
    } else if ($counter < 1000) {
        echo " ";       // "-123"
    }
    echo $counter
    . ": SID: " . $regulation->sid
    . " isoCountry: " . $regulation->isoCountry
    . " numberType: " . $regulation->numberType
    . " friendlyName: " . $regulation->friendlyName
    . "\xA";
}
?>
