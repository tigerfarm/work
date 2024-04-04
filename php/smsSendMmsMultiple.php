<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$fromPhoneNumber = getenv('PHONE_NUMBER4');
$toPhoneNumber = getenv('PHONE_NUMBER3');
$theMessage = "Twilio support test message #3, multiple media images.";
echo '++ Send SMS message, From: ' . $fromPhoneNumber . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
$sms = $client->account->messages->create(
    $toPhoneNumber,
        array(
        'from' => $fromPhoneNumber,
        'body' => $theMessage,
        "mediaUrl" => array(
            "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg"
            ,"https://www.twilio.com/marketing/bundles/company-brand/img/logos/red/twilio-logo-red.png"
            )
    )
);
echo "+ Sent, SID: " . $sms->sid . "\xA";
?>
