<?php
print("++ List conversations.\xA");
require __DIR__ . '/../../../twilio-php-main/srcV6/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));
$conversations = $twilio->conversations->v1->conversations->read(20);

foreach ($conversations as $conversation) {
    print('++ Conversation SID: ' . $conversation->sid
            . ' uniqueName:' . $conversation->uniqueName
            . ' friendlyName:' . $conversation->friendlyName
            . ":\xA");
}
