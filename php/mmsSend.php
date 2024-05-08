<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

// $client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$fromPhoneNumber = getenv('MASTER_PHONE_NUMBER_1');
$toPhoneNumber = getenv('MASTER_PHONE_NUMBER_2');
$theMessageSupport = "Twilio support MMS test.";
echo '++ Send MMS message, From: ' . $fromPhoneNumber . " to " . $toPhoneNumber . " :" . $theMessageSupport . ":\xA";
$mmsMedia = 'https://raw.githubusercontent.com/tigerfarm/arduino/master/Altair101/AltairDesktop01a.jpg';
echo '++ Media URL: ', $mmsMedia, "\xA";
$sms = $client->account->messages->create(
    $toPhoneNumber,
    [
        "from" => $fromPhoneNumber,
        "body" => $theMessage,
        "mediaUrl" => [$mmsMedia]
    ]
);
echo "+ Sent, SID: " . $sms->sid . " Status: " . $sms->status . "\xA";
?>
