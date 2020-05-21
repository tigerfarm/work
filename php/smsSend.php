<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

// $client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
// $client = new Client(getenv('LABS_ACCOUNT_SID'), getenv('LABS_AUTH_TOKEN'));
//
// $fromPhoneNumber = "david";
// $toPhoneNumber = getenv('MASTER_UK');
//
// $fromPhoneNumber = getenv('PHONE_NUMBER4');
$fromPhoneNumber = getenv('MASTER_PHONE_NUMBER_1');
// $toPhoneNumber = getenv('PHONE_NUMBER3');
$toPhoneNumber = getenv('MY_PHONE_NUMBER');
// $toPhoneNumber = getenv('MASTER_PHONE_NUMBER_1');
// $fromPhoneNumber = 'whatsapp:+14155551111';
// $toPhoneNumber = 'whatsapp:+1605552222';
// $toPhoneNumber = '+12098319168'; // : landline phone number';
//
// $theMessageSupport = "Twilio support test \nmessage #3, \n newline.";
$theMessageSupport = "Twilio support test #4";
$theMessageChinese = "你好";
$theMessageOkay = "J'aime l'été... éÉÑñ";
$theWhatsAppTemplate = "Your Twilio code is 1234566";
$theMessage = $theMessageOkay;
//
echo '++ Send SMS message, From: ' . $fromPhoneNumber . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
// $echoUrl = "https://tigerfarmpress.com/cgi/echo.php";
echo '++ Echo URL: ', $echoUrl, "\xA";
$sms = $client->account->messages->create(
        $toPhoneNumber,
        array(
            'from' => $fromPhoneNumber,
            'body' => $theMessage,
            'smartEncoded' => false
            // "messagingServiceSid" => 'MG725e63c260d682775183d21b21523935',
            // "mediaUrl" => array("https://unnatural-seat-1873.twil.io/assets/MI01.mp3"),
            // Other media files I can send:
            // MP3: https://unnatural-seat-1873.twil.io/assets/MI01.mp3
            // JPG: https://unnatural-seat-1873.twil.io/assets/netscapeIcons.jpg
        //, 'statusCallback' => $echoUrl
        )
);
echo "+ Sent, SID: " . $sms->sid . "\xA";
?>
