<?php
// Docs: https://www.twilio.com/docs/phone-numbers/api/available-phone-numbers

// require __DIR__ . '/twilio-php-master/Twilio/autoload.php';
require __DIR__ . '/../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv("ACCOUNT_SID"), getenv('AUTH_TOKEN'));

// echo "\xA+ List of available phone numbers in the US: ";
// foreach ($client->availablePhoneNumbers('US')->local->read() as $number) {
//     echo "\xA++ " . $number->phoneNumber;
// }

// Search for "List Filters" in the doc to see options.
echo "\xA+ List of available phone numbers in the US which are SmsEnabled: ";
foreach ($client->availablePhoneNumbers('US')->local->read(array("SmsEnabled" => "true")) as $number) {
     echo "\xA++ " . $number->phoneNumber;
}

// Dual Functionality (Voice and SMS enabled) Phone Numbers -> us "local" vs. "mobile".
// https://support.twilio.com/hc/en-us/articles/223183068-Twilio-international-phone-number-availability-and-their-capabilities

echo "\xA+ End of lists.\xA";
?>
