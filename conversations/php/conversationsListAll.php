<?php
require __DIR__ . '/../../../twilio-php-main/src/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
print('++ List conversations.\xA');
$conversations = $twilio->conversations->v1->conversations->read(20);

foreach ($conversations as $conversation) {
    print('++ Conversation SID: ' . $conversation->sid
            . ' uniqueName:' . $conversation->uniqueName
            . ' friendlyName:' . $conversation->friendlyName
            . ":\xA");
}

?>
