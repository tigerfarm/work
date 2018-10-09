<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$fromPhoneNumber = getenv('PHONE_NUMBER_4');
$toPhoneNumber = getenv('PHONE_NUMBER_3');
// $theMessage = "Twilio support test message #3";
$theMessage = "okay 2";
echo '++ Send SMS message, From: ' . $fromPhoneNumber . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
// $echoUrl = "https://" . getenv('TOKEN_HOST') . "/echojson";
$echoUrl = "https://tigerfarmpress.com/cgi/echo.php";
echo '++ Echo URL: ', $echoUrl, "\xA";
$sms = $client->account->messages->create(
        $toPhoneNumber, array(
        'from' => $fromPhoneNumber,
        // "messagingServiceSid" => 'MG725e63c260d682775183d21b21523935',
    'body' => $theMessage,
    'statusCallback' => $echoUrl
        )
);
echo "+ Sent, SID: " . $sms->sid . "\xA";
?>
