<?php
// Docs: https://www.twilio.com/docs/phone-numbers/api/available-phone-numbers
require __DIR__ . '/../../twilio-php-main/srcV6/Twilio/autoload.php';
use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;

$client = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));

// -----------------------------------------------------------------------------
$thePhoneNumberSid= "PN4fd260f72cde1f16ed96a9580373b171";
echo "\xA+ Fetch data for phone number SID: " . $thePhoneNumberSid . "\xA";
try {
$thePhoneNumber = $client->incomingPhoneNumbers($thePhoneNumberSid)
        ->fetch();
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
    exit;
}
echo "++ Phone number SID: " . $thePhoneNumber->sid . "\xA"
 . "++ Phone number: " . $thePhoneNumber->phoneNumber . "\xA"
 . "++ friendlyName: "   . $thePhoneNumber->friendlyName . "\xA"
 . "\xA";

// -----------------------------------------------------------------------------
$theNumber = getenv('MAIN_PN_9665');
echo "+ List data for the phone number: " . $theNumber . "\xA";
try {
$thePhoneNumber = $client->incomingPhoneNumbers
        ->read(["phoneNumber" => $theNumber], 20);
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
    exit;
}
echo "++ Phone number SID: " . $thePhoneNumber[0]->sid . "\xA"
 . "++ Phone number: " . $thePhoneNumber[0]->phoneNumber . "\xA"
 . "++ friendlyName: "   . $thePhoneNumber[0]->friendlyName . "\xA"
 . "\xA";

?>
