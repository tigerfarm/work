<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$fromPhoneNumber = getenv('MASTER_PHONE_NUMBER_1');
$toPhoneNumber = getenv('MY_PHONE_NUMBER');
$theMessage = "Twilio support test \nmessage #3, \n newline.";
echo '++ Send SMS message, From: ' . $fromPhoneNumber . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
$sms = $client->account->messages->create(
        $toPhoneNumber,
        array(
            'from' => $fromPhoneNumber,
            'body' => $theMessage
        )
);
echo "+ Sent, SID: " . $sms->sid . " Status: " . $sms->status . "\xA";
?>
