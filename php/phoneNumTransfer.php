<?php

// Docs: https://www.twilio.com/docs/iam/api/subaccounts?code-sample=code-transfer-phone-numbers-from-primary-account-to-subaccount&code-language=PHP&code-sdk-version=5.x
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;
// $twilio = new Client(getenv("ACCOUNT_SID"), getenv('AUTH_TOKEN'));
$twilio = new Client("ACff2d41e2d2d41acaa626167b8e63bfcd", "c948de3e0d4f7d2f86a68ae7acbd7120");

$incoming_phone_number = $twilio->incomingPhoneNumbers("PN7e0ed6147a88788e989377b7043f5a9e")
        ->update(array(
    "accountSid" => "ACae0e356ccba96d16d8d4f6f9518684a3"
        )
);
echo "\xA++ Moved\xA";
?>
