<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
$fromPhoneNumber = getenv('PHONE_NUMBER4');
// $toPhoneNumber = getenv('PHONE_NUMBER3');
// $toPhoneNumber = getenv('MY_PHONE_NUMBER');
$toPhoneNumber = "650-483-7603";
//
$theMessageSupport = "Twilio support test \nmessage #3, \n newline.";
$theMessageChinese = "你好";
$theMessageOkay = "okay 4";
$theMessage = $theMessageSupport;
//
echo '++ Send SMS message, From: ' . $fromPhoneNumber . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
// $echoUrl = "https://" . getenv('TOKEN_HOST') . "/echojson";
$echoUrl = "https://tigerfarmpress.com/cgi/echo.php";
echo '++ Echo URL: ', $echoUrl, "\xA";
$sms = $client->account->messages->create(
    $toPhoneNumber,
        array(
        'from' => $fromPhoneNumber,
        // "messagingServiceSid" => 'MG725e63c260d682775183d21b21523935',
        'body' => $theMessage
        //, 'statusCallback' => $echoUrl
    )
);
echo "+ Sent, SID: " . $sms->sid . "\xA";
?>
