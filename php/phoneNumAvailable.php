<?php
// Docs: https://www.twilio.com/docs/phone-numbers/api/available-phone-numbers

// require __DIR__ . '/twilio-php-master/Twilio/autoload.php';
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv("ACCOUNT_SID"), getenv('AUTH_TOKEN'));

$theCountry = "US";
// echo "\xA+ List of available phone numbers in the country, " . $theCountry .": ";
// foreach ($client->availablePhoneNumbers($theCountry)->local->read() as $number) {
//      echo "\xA++ " . $number->phoneNumber;
// }

$theAreaCode = "650";
echo "\xA+ Available phone numbers in the country, " . $theCountry .", area code, " . $theAreaCode . ": ";
$numbers = $client->availablePhoneNumbers($theCountry)->local->read(array('areaCode' => $theAreaCode, 'SmsEnabled' => TRUE));
foreach ( $numbers as $number) {
     echo "\xA++ " . $number->phoneNumber;
}
echo "\xA+ End of list.";
echo "\xA+ number 1: " . $numbers[0]->phoneNumber;
$theNumber = $client->incomingPhoneNumbers->create(
                array("phoneNumber" => $numbers[0]->phoneNumber)
                );
echo "\xA+ Bought number 1: " . $theNumber->sid;
if (isset($theNumber->sid)) {
    echo " + isset";
}
        
// Search for "List Filters" in the doc to see options.
// echo "\xA+ List of available phone numbers in the US which are SmsEnabled: ";
// foreach ($client->availablePhoneNumbers('US')->local->read(array("SmsEnabled" => "true")) as $number) {
// //      echo "\xA++ " . $number->phoneNumber;
// }

// Dual Functionality (Voice and SMS enabled) Phone Numbers -> us "local" vs. "mobile".
// https://support.twilio.com/hc/en-us/articles/223183068-Twilio-international-phone-number-availability-and-their-capabilities

echo "\xA+ End of lists.\xA";
?>
