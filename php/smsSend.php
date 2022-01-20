<?php

require __DIR__ . '/../../twilio-php-main/src/Twilio/autoload.php';
// require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

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
// $fromPhoneNumber = 'DAVEnnec';
// $fromPhoneNumber = 'DAVENN';
// $toPhoneNumber = '+16515551212';
// $toPhoneNumber = getenv('PHONE_NUMBER3');
$toPhoneNumber = getenv('MY_PHONE_NUMBER');
// $toPhoneNumber = getenv('MASTER_PHONE_NUMBER_1');
// $fromPhoneNumber = 'whatsapp:+14155551111';
// $toPhoneNumber = 'whatsapp:+1605552222';
//
$theMessageSupport = "Twilio support test \nmessage #3, \n newline.";
// $theMessageSupport = "Twilio support test #4";
$theMessageChinese = "你好";
$theMessageOkay = "J'aime l'été... éÉÑñ";
$theWhatsAppTemplate = "Your code is 1234566";
$theMessage = $theWhatsAppTemplate;
//
echo '++ Send SMS message, From: ' . $fromPhoneNumber . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
// $echoUrl = "https://postb.in/1604958023910-9146091821603";
$echoUrl = "https://tfpecho.herokuapp.com/smssend";
echo '++ Echo URL: ', $echoUrl, "\xA";
$sms = $client->account->messages->create(
        $toPhoneNumber,
        array(
            'from' => $fromPhoneNumber,
            'body' => $theMessage
            // , 'smartEncoded' => false
            // , "messagingServiceSid" => 'MG725e63c260d682775183d21b21523935',
            // , "mediaUrl" => array("https://about-time-2357.twil.io/assets/MI01.mp3"),
            // Other media files I can send:
            // MP3: https://about-time-2357.twil.io/assets/MI01.mp3
            // JPG: https://about-time-2357.twil.io/assets/netscapeIcons.jpg
        , 'statusCallback' => $echoUrl
        )
);
echo "+ Sent, SID: " . $sms->sid . " Status: " . $sms->status . "\xA";
?>
