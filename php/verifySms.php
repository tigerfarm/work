<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
// $toPhoneNumber = getenv('MY_PHONE_NUMBER');
$toPhoneNumber = "+16503790077";
echo "++ Send Verify SMS message to " . $toPhoneNumber . ":\xA";

$sms = $twilio->verify->v2->services("VA4a377d845ae06c04f30e998fd7e97c6a")
                                   ->verifications
                                   ->create($toPhoneNumber, "sms");
print($verification->sid);
echo "+ Sent, SID: " . $sms->sid . " Status: " . $sms->status . "\xA";
?>
