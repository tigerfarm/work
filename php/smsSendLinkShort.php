<?php

echo "++ Send SMS message using a Messaging Service.\xA";
require __DIR__ . '/../../twilio-php-main/srcV6/Twilio/autoload.php';

use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;

$client = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));
$theFromMsgService = "MG634319110a48b2e82f1a08247cd8f0ba";
$fromMs = 'MG634319110a48b2e82f1a08247cd8f0ba';
$toPhoneNumber = getenv('MY_PHONE_NUMBER');
// $toPhoneNumber = getenv('PHONE_NUMBER3');
$theMessage = "Twilio support test message #1";
echo '++ Send SMS message, Messaging Service SID: ' . $fromMs . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
try {
    $sms = $client->messaging->v1->linkshorteningMessagingService(
                    "DNac01d2597153be7120d9e4f4368f8314",
                    $theFromMsgService
            )
            ->create();
    echo "+ Sent, SID: " . $sms->sid . "\xA";
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}
