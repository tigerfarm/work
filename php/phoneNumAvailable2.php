<?php
error_reporting(E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ));
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv("ACCOUNT_SID"), getenv('AUTH_TOKEN'));

// From documentation:
// https://www.twilio.com/docs/phone-numbers/api/availablephonenumberlocal-resource?code-sample=code-find-regional-phone-numbers-by-feature&code-language=PHP&code-sdk-version=7.x
// With error checking added.
echo "+++ Get availablePhoneNumbers(...)";
try {
    $numbers = $twilio->availablePhoneNumbers("US") // GB US
            ->local
            ->read(["smsEnabled" => false, "voiceEnabled" => false], 20, 20);
} catch (exception $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
    exit;
}
$theCount = count($numbers);
echo "\xA+ Array count = " . $theCount;
if ($theCount == 0) {
    echo "\xA++ No availablePhoneNumbers for the qualifications.\xA";
    exit;
}
foreach ($numbers as $number) {
    echo "\xA++ " . $number->phoneNumber;
}
echo "\xA+ End of list.";
echo "\xA+ number 1: " . $numbers[0]->phoneNumber
 . " isoCountry: " . $numbers[0]->region
 . " region: " . $numbers[0]->region
 . " postalCode: " . $numbers[0]->postalCode
 . " locality: " . $numbers[0]->locality;

echo "\xA+ End of lists.\xA";
?>
