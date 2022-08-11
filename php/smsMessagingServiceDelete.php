<?php
error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));

$theSid = "MG44e9e310ae478d5635bc11685758da4a";
print("+ Delete Messaging Service SID: " . $theSid . "\xA");
try {
    $twilio->messaging->v1->services($theSid)->delete();
    print("+ Deleted Messaging Service SID: " . $theSid . "\xA");
} catch (exception $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}

