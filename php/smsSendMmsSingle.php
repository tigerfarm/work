<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$fromPhoneNumber = getenv('PHONE_NUMBER4');
$toPhoneNumber = getenv('MY_PHONE_NUMBER');   // MY_PHONE_NUMBER PHONE_NUMBER3
$theMessage = "Twilio support test message #4, single media image.";
echo '++ Send SMS message, From: ' . $fromPhoneNumber . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
$sms = $client->account->messages->create(
    $toPhoneNumber,
        array(
        'from' => $fromPhoneNumber,
        'body' => $theMessage,
        "mediaUrl" => array(
            "https://enverastorage.blob.core.windows.net/digital-assets/EnveraConsulting_300.jpg"
            // "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg"
            )
    )
);
echo "+ Sent, SID: " . $sms->sid . "\xA";
?>
