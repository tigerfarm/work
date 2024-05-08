<?php
error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
// Docs: https://www.twilio.com/docs/phone-numbers/api/available-phone-numbers
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv("ACCOUNT_SID"), getenv('AUTH_TOKEN'));
//
$theCountry = "US";
//
$theAreaCode = "650";
// $numbers = $client->availablePhoneNumbers($theCountry)->local->read(array('areaCode' => $theAreaCode));
//
$theNumbers = "850533****";
$numbers = $client->availablePhoneNumbers($theCountry)->local->read(array("contains" => $theNumbers));
//
// Optionally, list the numbers available:
// foreach ( $numbers as $number) {
//      echo "\xA++ " . $number->phoneNumber;
// }
// echo "\xA+ End of list.";
//
echo "\xA+ Data for " . $theCountry . " phone number: " . $thePhoneNumber . " ";
echo "\xA++ " . $numbers[0]->phoneNumber
        . " locality: "   . $numbers[0]->locality
        . " region: "     . $numbers[0]->region
        . " postalCode: " . $numbers[0]->postalCode
        . "\xA";
?>
