<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$fromPhoneNumber = getenv('PHONE_NUMBER_2');
$toPhoneNumber = getenv('PHONE_NUMBER_4');
// $theMessage = "Twilio support test message";
$theMessage = "okay";
echo '++ Send SMS messsage, From: ' . $fromPhoneNumber . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
$echoUrl = "https://" . getenv('TOKEN_HOST') . "/echojson";
echo '++ Echo URL: ', $echoUrl, "\xA";
$sms = $client->account->messages->create(
        $toPhoneNumber, array(
    'from' => $fromPhoneNumber,
    'body' => $theMessage,
    'statusCallback' => $echoUrl
        )
);
echo "+ Sent.\xA";
?>
