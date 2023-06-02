<?php
// Schedule a Message resource,
//  https://www.twilio.com/docs/sms/api/message-resource#schedule-a-message-resource
// Blog, Send Scheduled SMS with PHP and Twilio Programmable Messaging:
//  https://www.twilio.com/blog/send-scheduled-sms-php-twilio-programmable-messaging

require __DIR__ . '/../../twilio-php-main/srcV7/Twilio/autoload.php';

use Twilio\Rest\Client;

$client = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));

// Must be from a messaging service when scheduling a message.
$fromMs = 'MGc93ff841e7fa36237a3e5d252e1b77d7';
$toPhoneNumber = getenv('MY_PHONE_NUMBER');
$theMessage = "Twilio support test message #4";
echo '++ Send SMS, message service: ' . $fromMs . " to " . $toPhoneNumber . " :" . $theMessage . ":\xA";

$sendAt = (new DateTime('2023-06-02T19:00:00Z'));
echo "+ Scheduled: " . $sendAt->format("Y.m.d H:i:s") . "\xA";

$sms = $client->account->messages->create(
        $toPhoneNumber,
        [
            // "sendAt" => $sendAt->format('c'),
            "sendAt" => new DateTime('2023-06-02T19:00:00Z'),
            "scheduleType" => "fixed",
            "messagingServiceSid" => $fromMs,
            'body' => $theMessage
        ]
);
echo "+ Sent, SID: " . $sms->sid . " Status: " . $sms->status . "\xA";

