<?php
echo "++ Send SMS message using a Messaging Service.\xA";

// Note: need to user V7. V6 does not have "ContentSid".
require __DIR__ . '/../../twilio-php-main/srcV7/Twilio/autoload.php';
//
use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;
$client = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));
$fromMs = 'MGf0df9883c5d0720e89ad6c14e2a76f9f';   // Has my Twilio WhatsApp sender id
$HxTemplate = "HX9eddf30c9a69ac1cbe024155d218b4ff";
$toPhoneNumber = "whatsapp:" . getenv('MY_PHONE_NUMBER');
$theMessage = "Twilio support test message #1";
echo '++ Send SMS message, Messaging Service SID: ' . $fromMs . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
echo '++ $HxTemplate: ' . $HxTemplate . ":\xA";
try {
    $sms = $client->account->messages->create(
            $toPhoneNumber,
            [
                "messagingServiceSid" => $fromMs,
                "ContentSid" => $HxTemplate
                // , 'body' => $theMessage
            ]
    );
    echo "+ Sent, SID: " . $sms->sid . "\xA";
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}