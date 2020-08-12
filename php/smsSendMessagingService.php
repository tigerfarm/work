<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;
// $client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$fromMs = 'MG44e9e310ae478d5635bc11685758da4a';
$toPhoneNumber = getenv('MY_PHONE_NUMBER');
// $toPhoneNumber = getenv('PHONE_NUMBER3');
$theMessage = "Twilio support test message #2";
echo '++ Send SMS message, Messaging Service SID: ' . $fromMs . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
try {
    $sms = $client->account->messages->create(
            $toPhoneNumber,
            array(
                // 'from' => $fromPhoneNumber,
                "messagingServiceSid" => $fromMs,
                'body' => $theMessage
            )
    );
    echo "+ Sent, SID: " . $sms->sid . "\xA";
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}