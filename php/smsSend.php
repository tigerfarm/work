<?php
echo "++ Send SMS message with error checking.\xA";
require __DIR__ . '/../../twilio-php-main/srcV6/Twilio/autoload.php';
use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;
$client = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));
$fromPhoneNumber = getenv('MAIN_PN_8003');
// $toPhoneNumber = '+16515551212';
// $toPhoneNumber = getenv('MY_PHONE_NUMBER');
$toPhoneNumber = '+1 6504837603';
// $toPhoneNumber = getenv('MAIN_PHONE_NUMBER_1');
// $fromPhoneNumber = 'whatsapp:+14155551111';
// $toPhoneNumber = 'whatsapp:+1605552222';
//
$theMessageSupport = "Twilio support test \nmessage #3, \n newline.";
// $theMessageSupport = "Twilio support test #4";
$theMessageChinese = "你好";
$theMessageOkay = "J'aime l'été... éÉÑñ";
$theWhatsAppTemplate = "Your code is 1234567b";
$theMessage = $theWhatsAppTemplate;
//
echo '++ Send SMS message, From: ' . $fromPhoneNumber . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
// $echoUrl = "https://postb.in/1604958023910-9146091821603";
$echoUrl = "https://tfpbooks.herokuapp.com/twilio/smsstatus?con_id=649226a3819e2a601f6661cf&org_id=147&m_id=64b6c296819e2a77f22daaa2";
echo '++ Echo URL: ', $echoUrl, "\xA";
try {
    $sms = $client->account->messages->create(
            $toPhoneNumber,
            // "toPhoneNumber",
            array(
                'from' => $fromPhoneNumber,
                'body' => $theMessage
            // , 'smartEncoded' => false
            // , "messagingServiceSid" => 'MG725e63c260d682775183d21b21523935',
            // , "mediaUrl" => array("https://about-time-2357.twil.io/assets/MI01.mp3"),
            // Other media files I can send:
            // MP3: https://about-time-2357.twil.io/assets/MI01.mp3
            // JPG: https://about-time-2357.twil.io/assets/netscapeIcons.jpg
            // Doesn't work: , 'statusCallbackMethod' => 'GET'
            // , 'statusCallback' => $echoUrl
            )
    );
    echo "+ Sent, SID: " . $sms->sid . " Status: " . $sms->status . "\xA";
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}
?>
