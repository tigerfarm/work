<?php
require __DIR__ . '/../../twilio-php-main/srcV6/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));
$fromPhoneNumber = getenv('MAIN_PN_8003');
$toPhoneNumber = getenv('MY_PHONE_NUMBER');
$theMessage = "Twilio support test message #3, multiple media images.";
echo '++ Send SMS message, From: ' . $fromPhoneNumber . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
$sms = $client->account->messages->create(
    $toPhoneNumber,
        array(
        'from' => $fromPhoneNumber,
        'body' => $theMessage,
        "mediaUrl" => array(
            "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg"
            ,"https://tfpbooks.herokuapp.com/images/topImgLeft.jpg"
            )
    )
);
echo "+ Sent, SID: " . $sms->sid . "\xA";
?>
