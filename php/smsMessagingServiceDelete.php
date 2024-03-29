<?php
error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));

$theSid = "MGfa8489f7cf30c9f35a75e2cbe42deb1a";
print("+ Delete Messaging Service SID: " . $theSid . "\xA");
try {
    $twilio->messaging->v1->services($theSid)->delete();
    print("+ Deleted Messaging Service SID: " . $theSid . "\xA");
} catch (exception $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}

