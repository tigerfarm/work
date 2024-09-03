<?php
// Docs: https://www.twilio.com/docs/phone-numbers/api/availablephonenumber-tollfree-resource

require __DIR__ . '/../../twilio-php-main/srcV8/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv("ACCOUNT_SID"), getenv('AUTH_TOKEN'));
$theCountry = "CA"; // US GB. CA returns numbers with isoCountry = US.
// Number to return is required.
$numbers = $client->availablePhoneNumbers($theCountry)->tollFree->read(
        [
            // "SmsEnabled" => true
            ], 6
        );
foreach ( $numbers as $number) {
     echo "\xA++ " . $number->phoneNumber . " " . $number->isoCountry . " " . $number->postalCode;
}
echo "\xA+ End of list.";

echo "\xA+ number 1: " . $numbers[0]->phoneNumber . " isoCountry: " . $numbers[0]->isoCountry;

echo "\xA+ End of lists.\xA";
?>
