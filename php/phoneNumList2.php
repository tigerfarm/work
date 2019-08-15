<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));

foreach ($twilio->incomingPhoneNumbers->read() as $number) {
    echo "++ ", $number->phoneNumber . " : " . $number->dateCreated->format('Y-m-d H:i') . " : https://www.twilio.com/console/phone-numbers/" . $number->sid . "\xA";
}

echo "+ End of list.\xA";
?>
