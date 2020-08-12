<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
// $client = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
// $fromPhoneNumber = getenv('PHONE_NUMBER4');
// $toPhoneNumber = getenv('MY_PHONE_NUMBER');   // MY_PHONE_NUMBER PHONE_NUMBER3
$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$fromPhoneNumber = getenv('MASTER_PHONE_NUMBER_2');
// $toPhoneNumber = getenv('MASTER_PHONE_NUMBER_1');
$toPhoneNumber = getenv('MY_PHONE_NUMBER');
// $theMessage = "Twilio support test message #1, single media image.";
//             1234567890123456789012345678901234567890123456789012345678901234567890123456789012345678901234567890
//                                                                                                              100                                                                                                 200                                                                                                 300                                                                                                 400                                                                                                 500                                                                                                 600                                                                                                 700                                                                                                 800                                                                                                 900                                                                                                1000                                                                                                1100                                                                                                1200                                                                                                1300                                                                                                1400                                                                                                1500                                                                                                1600
// $theMessage = "A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message.A very long message. 123 Character 1599.";
$theMessage = "";
echo '++ Send SMS message, From: ' . $fromPhoneNumber . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
$sms = $client->account->messages->create(
    $toPhoneNumber,
        array(
        'from' => $fromPhoneNumber,
        'body' => $theMessage,
        "mediaUrl" => array(
            "https://unnatural-seat-1873.twil.io/assets/sampleMmsImag2e.png"
            // "https://rocket.eth0.com.br/file-upload/J4KorbiEkFYgKwaHc/Audio%20record.mp3?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTMxOTkzNDYsIm5iZiI6MTU5MzE5OTM0NiwiZXhwIjoxNTkzMjAyOTQ2LCJhdWQiOiJSb2NrZXRDaGF0IiwiY29udGV4dCI6eyJyaWQiOiI5ZzdORDdZWG1kalA2dk1LZiIsInVzZXJJZCI6IkNtR3R1V3BKaWlLQjlUUUh1IiwiZmlsZUlkIjoiSjRLb3JiaUVrRllnS3dhSGMifX0.rxIEe5mxC_bhoj4LPH6P7eGiS-TgdFaQS_hinrvNxoA"
            // "https://unnatural-seat-1873.twil.io/assets/Cfile.mp3"
            // "https://unnatural-seat-1873.twil.io/assets/Time01.mp3"
            /// Success: "https://www.tigerfarmpress.com/StacyDavid/netscape-fountain2a.jpg"
            /// Fails: "https://tigerfarmpress.com/StacyDavid/netscape-fountain2a.jpg"
            // "https://www.twilio.com/docs/static/dist/img/4ec1e79f.svg"
            // "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg"
            )
    )
);
echo "+ Sent, SID: " . $sms->sid . "\xA";
?>
