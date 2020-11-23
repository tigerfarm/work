<?php

// Docs: https://www.twilio.com/docs/iam/api/subaccounts?code-sample=code-transfer-phone-numbers-from-primary-account-to-subaccount&code-language=PHP&code-sdk-version=5.x
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;
// $twilio = new Client(getenv("ACCOUNT_SID"), getenv('AUTH_TOKEN'));
$twilio = new Client("ACf...d", "c...0");

$incoming_phone_number = $twilio->incomingPhoneNumbers("PN7e...e")
        ->update(array(
    "accountSid" => "ACa...3"
        )
);
echo "\xA++ Moved\xA";
?>
