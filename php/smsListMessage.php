<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;

$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
try {
    $message = $client->messages("MMdb6a8e05fcac48dc823874b6db03445a")->fetch();
    echo "+ Sent, SID:" . $message->sid . " To:" . $message->to . " Status:" . $message->status
    . " MediaUrl0: " . $message->numMedia
    . "\xA";

    $media = $client->messages("MMdb6a8e05fcac48dc823874b6db03445a")->media->read([], 20);
    foreach ($media as $record) {
        print("+ Media id: " . $record->sid . "\xA");
    }
    
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}
?>
