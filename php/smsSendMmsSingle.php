<?php
error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));
$fromPhoneNumber = getenv('MAIN_PHONE_NUMBER_2');
// $toPhoneNumber = getenv('MAIN_PHONE_NUMBER_1');
$toPhoneNumber = getenv('MY_PHONE_NUMBER');
// $toPhoneNumber = '+16503790077';

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
            // "https://tfpbooks.herokuapp.com/images/topImgLeft.jpg"
            "https://whatsapp-sophia.s3.sa-east-1.amazonaws.com/ME69eab2fcf2d10e477d9c86049fc633d1.pdf?X-Amz-Algorithm=AWS4-HMAC-SHA256&X-Amz-Content-Sha256=UNSIGNED-PAYLOAD&X-Amz-Credential=AKIA6DP7T2AYJVCO7TSM%2F20230223%2Fsa-east-1%2Fs3%2Faws4_request&X-Amz-Date=20230223T142444Z&X-Amz-Expires=604800&X-Amz-Signature=793c239dce87846cb27eff754a1175dc7423080eafe386bbe987068b368e308b&X-Amz-SignedHeaders=host&x-id=GetObject"
            // "https://about-time-2357.twil.io/assets/sampleMmsImag2e.png"
            // "https://rocket.eth0.com.br/file-upload/J4KorbiEkFYgKwaHc/Audio%20record.mp3?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE1OTMxOTkzNDYsIm5iZiI6MTU5MzE5OTM0NiwiZXhwIjoxNTkzMjAyOTQ2LCJhdWQiOiJSb2NrZXRDaGF0IiwiY29udGV4dCI6eyJyaWQiOiI5ZzdORDdZWG1kalA2dk1LZiIsInVzZXJJZCI6IkNtR3R1V3BKaWlLQjlUUUh1IiwiZmlsZUlkIjoiSjRLb3JiaUVrRllnS3dhSGMifX0.rxIEe5mxC_bhoj4LPH6P7eGiS-TgdFaQS_hinrvNxoA"
            // "https://about-time-2357.twil.io/assets/Cfile.mp3"
            // "https://about-time-2357.twil.io/assets/Time01.mp3"
            // "https://www.twilio.com/docs/static/dist/img/4ec1e79f.svg"
            // "https://c1.staticflickr.com/3/2899/14341091933_1e92e62d12_b.jpg"
            )
            // , 'statusCallback' => $echoUrl
    )
);
echo "+ Sent, SID: " . $sms->sid . "\xA";
?>
