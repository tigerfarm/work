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
    $numbers = $twilio->availablePhoneNumbers("CA") // GB US CA
            ->local
            ->read([], 6);
            // ->read(["smsEnabled" => true, "mmsEnabled" => false, "voiceEnabled" => true], 20, 20);
            // ->read(["smsEnabled" => false, "mmsEnabled" => false, "voiceEnabled" => true, "contains" => "312"], 20, 20);
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
    echo "\xA++ " . $number->phoneNumber . " " . $number->isoCountry;
}
echo "\xA+ End of list.";
echo "\xA+ number[0]:" . $numbers[0]->phoneNumber
 . " isoCountry:" . $numbers[0]->isoCountry
 . " region:" . $numbers[0]->region
 . " postalCode:" . $numbers[0]->postalCode
 . " locality:" . $numbers[0]->locality;

echo "\xA+ End of lists.\xA";
?>
