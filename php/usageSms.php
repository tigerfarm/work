<?php
//  https://www.twilio.com/docs/usage/api/usage-record?code-sample=code-daily-usage-for-inbound-calls-over-a-one-month-period&code-language=PHP&code-sdk-version=5.x
require __DIR__ . '/../../twilio-php-main/src/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$records = $client->usage->records
        ->daily         // Daily Monthly Yearly Today Yesterday ThisMonth LastMonth AllTime
        ->read(
        array(
            "category" => "sms",
            "startDate" => "2021-08-01",
            "endDate" => "2021-08-11"
        )
);
foreach ($records as $record) {
    echo "+ Category: " . $record->category 
            . ", endDate: " . $record->endDate->format('Y-m-d') 
            . ", count: " . $record->count . "\xA";
}

// eof