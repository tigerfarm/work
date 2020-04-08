<?php

// From: https://stackoverflow.com/questions/33547233/how-to-convert-emoji-from-unicode-in-php
function codeToSymbol($em) {
    if($em > 0x10000) {
        $first = (($em - 0x10000) >> 10) + 0xD800;
        $second = (($em - 0x10000) % 0x400) + 0xDC00;
        return json_decode('"' . sprintf("\\u%X\\u%X", $first, $second) . '"');
    } else {
        return json_decode('"' . sprintf("\\u%X", $em) . '"');
    }
}

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$fromPhoneNumber = getenv('MASTER_PHONE_NUMBER_2');
$toPhoneNumber = getenv('MASTER_PHONE_NUMBER_1');
// 
// $theMessageEmoji = "Emoji: " . "🌼" . ".";
// $theMessageEmoji = "Emoji: " . chr(97) . "."; // chr(97) = "a";
// $theMessageEmoji = "Emoji: " . codeToSymbol(0x1F63C) . ".";
// cat face: decimal 63036 = hex 0x1F63C
$theMessageEmoji = "Emoji: " . codeToSymbol('0x1'.dechex(63036)) . ".";
$theMessage = $theMessageEmoji;
//
echo '++ Send SMS message, From: ' . $fromPhoneNumber . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";
$sms = $client->account->messages->create(
    $toPhoneNumber,
        array(
        'from' => $fromPhoneNumber,
        'body' => $theMessage
    )
);
echo "+ Sent, SID: " . $sms->sid . "\xA";
?>
