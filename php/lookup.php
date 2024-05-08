<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
// $phoneNumber = getenv('PHONE_NUMBER_4');
$phoneNumber = '+16505552222';
echo '++ Lookup phone number: ' . $phoneNumber . ":\xA";
$carriers = $twilio->lookups->v1->phoneNumbers(
        $phoneNumber)->fetch(
                array("type" => "carrier")
                );
print("+ Carrier: " . $carriers->carrier . "\xA");
var_dump($carriers->carrier);
//
$carrierName = $twilio->lookups->v1->phoneNumbers(
        $phoneNumber)->fetch(
                array("type" => "caller-name")
                );
print("+ callerName: " . $carrierName->callerName . "\xA");
var_dump($carrierName->callerName);
?>
