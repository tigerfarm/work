<?php

require __DIR__ . '/../../twilio-php-main/src/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$rn = "RN581d4e917a8612eb36f0af24ecc6b592";
echo '++ RN: ', $rn, "\xA";
$regulation = $twilio->numbers->v2->regulatoryCompliance
        ->regulations($rn)
        ->fetch();
echo "+ SID: " . $regulation->sid
 . " isoCountry: " . $regulation->isoCountry
 . " requirements: " . $regulation->requirements
 . "\xA";
foreach ($regulation->requirements as $item) {
    echo "+ Name: " . $item . "\xA";
    foreach ($item as $item1) {
        echo "+ Name: " . var_dump($item1) . "\xA";
    }
}
?>
