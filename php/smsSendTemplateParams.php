<?php

echo "++ Send SMS message using a Messaging Service.\xA";

// Note: need to user V7. V6 does not have "ContentSid".
require __DIR__ . '/../../twilio-php-main/srcV7/Twilio/autoload.php';

//
use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;

$client = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));
$fromMs = 'MGf0df9883c5d0720e89ad6c14e2a76f9f';   // Has my Twilio WhatsApp sender id
$fromPhoneNumber = "whatsapp:" . getenv('MAIN_PN_7002');
$HxTemplate = "HX99981e0f87403230df0c461e892f4257";
$toPhoneNumber = "whatsapp:" . getenv('MY_PHONE_NUMBER');
$theMessage = "Twilio support test message #1";
$contentVariables = $contentVariables = [
    '1' => "Dave"
];
echo '++ Send SMS message, Messaging Service SID: ' . $fromMs . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
echo '++ $HxTemplate: ' . $HxTemplate . ":\xA";
try {
    $sms = $client->account->messages->create(
    $toPhoneNumber,
    [
    'from' => $fromPhoneNumber,
    "messagingServiceSid" => $fromMs,
    "ContentSid" => $HxTemplate,
    'contentVariables' => json_encode($contentVariables)
    ]
    );
    echo "+ Sent, SID: " . $sms->sid . "\xA";
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}