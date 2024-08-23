<?php
error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));
$fromPhoneNumber = getenv('MAIN_PN_7002');
$toPhoneNumber = getenv('MY_PHONE_NUMBER');

// $theMessage = "Twilio support test message #1, single media image.";
//             1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
//                                                                                                              100                                                                                                 200                                                                                                 300                                                                                                 400                                                                                                 500                                                                                                 600                                                                                                 700                                                                                                 800                                                                                                 900                                                                                                1000                                                                                                1100                                                                                                1200                                                                                                1300                                                                                                1400                                                                                                1500                                                                                                1600
// $theMessage = "A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message. 123 Character 1599.";
$theMessage = "Forwarded MMS...";
echo '++ Send SMS message, From: ' . $fromPhoneNumber . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
$echoUrl = "http://www.tigerfarmpress.com/echo";
$sms = $client->account->messages->create(
        $toPhoneNumber,
        array(
        'from' => $fromPhoneNumber,
        'body' => $theMessage,
        "mediaUrl" => array(
            // "https://someassets-1403.twil.io/apdf.pdf"
            "https://tfpbooks.herokuapp.com/pages/images/NetscapeBrowserIcons.jpg"
            // "https://about-time-2357.twil.io/assets/sampleMmsImag2e.png"
            // "https://about-time-2357.twil.io/assets/Cfile.mp3"
            // "https://about-time-2357.twil.io/assets/Time01.mp3"
            )
            // , 'statusCallback' => $echoUrl
    )
);
echo "+ Sent, SID: " . $sms->sid . "\xA";
?>
