<?php
error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$fromPhoneNumber = getenv('MASTER_PHONE_NUMBER_2');
// $toPhoneNumber = getenv('MASTER_PHONE_NUMBER_1');
// $toPhoneNumber = getenv('MY_PHONE_NUMBER');
$toPhoneNumber = '+16503790077';

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
            "https://www.tigerfarmpress.com/StacyDavid/Java7certCard2c.jpg"
            // "https://www.tigerfarmpress.com/StacyDavid/netscape-fountain2a.jpg"
            // "https://about-time-2357.twil.io/assets/sampleMmsImag2e.png"
            // "https://rocket.eth0.com.br/file-upload/J4KorbiEkFYgKwaHc/Audio%20record.mp3?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTMxOTkzNDYsIm5iZiI6MTU5MzE5OTM0NiwiZXhwIjoxNTkzMjAyOTQ2LCJhdWQiOiJSb2NrZXRDaGF0IiwiY29udGV4dCI6eyJyaWQiOiI5ZzdORDdZWG1kalA2dk1LZiIsInVzZXJJZCI6IkNtR3R1V3BKaWlLQjlUUUh1IiwiZmlsZUlkIjoiSjRLb3JiaUVrRllnS3dhSGMifX0.rxIEe5mxC_bhoj4LPH6P7eGiS-TgdFaQS_hinrvNxoA"
            // "https://about-time-2357.twil.io/assets/Cfile.mp3"
            // "https://about-time-2357.twil.io/assets/Time01.mp3"
            /// Success: "https://www.tigerfarmpress.com/StacyDavid/netscape-fountain2a.jpg"
            /// Fails: "https://tigerfarmpress.com/StacyDavid/netscape-fountain2a.jpg"
            // "https://www.twilio.com/docs/static/dist/img/4ec1e79f.svg"
            // "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg"
            )
            // , 'statusCallback' => $echoUrl
    )
);
echo "+ Sent, SID: " . $sms->sid . "\xA";
?>
