<?php
error_reporting(E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ));
// Docs: https://www.twilio.com/docs/phone-numbers/api/available-phone-numbers
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv("ACCOUNT_SID"), getenv('AUTH_TOKEN'));
$thePhoneNumberSid= "PN7c8303f00fcd899a739883bbf779ef94";
$thePhoneNumber = $twilio->incomingPhoneNumbers($thePhoneNumberSid)
        ->fetch();
echo "\xA+ Data for phone number SID: " . $thePhoneNumberSid . "\xA";
echo "++ Phone number: " . $thePhoneNumber->phoneNumber . "\xA"
 . "++ friendlyName: "   . $thePhoneNumber->friendlyName . "\xA"
 . "\xA";

$theNumber = getenv('MASTER_PHONE_NUMBER_1');
echo "\xA+ Data for the phone number: " . $theNumber . "\xA";
$thePhoneNumber = $twilio->incomingPhoneNumbers
        ->read(["phoneNumber" => $theNumber], 20);
echo "++ Phone number: " . $thePhoneNumber[0]->phoneNumber . "\xA"
 . "++ friendlyName: "   . $thePhoneNumber[0]->friendlyName . "\xA"
 . "\xA";

?>
