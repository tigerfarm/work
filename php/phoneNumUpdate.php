<?php
error_reporting(E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ));
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$pnSid = "PN915869791137c6f05b12f4eb2e23a704";
print("\xA+ Print Phone numbers information: " . $pnSid . "\xA");

// $pnupdate = $twilio->incomingPhoneNumbers($pnSid)->update(["statusCallback" => "https://example.com/wh"]);
$pnupdate = $twilio->incomingPhoneNumbers($pnSid)->update(["statusCallback" => null]);
    
// Properties: https://www.twilio.com/docs/phone-numbers/api/incomingphonenumber-resource#incomingphonenumber-properties
$pnfetch = $twilio->incomingPhoneNumbers($pnSid)
        ->fetch();
    echo $pnfetch->dateCreated->format('Y-m-d')
    . ", " . $pnfetch->sid
    . ", " . $pnfetch->phoneNumber
    . ", " . $pnfetch->friendlyName
    . ", " . $pnfetch->statusCallback
    . "\xA";

echo "\xA+ End of lists.\xA";
?>
