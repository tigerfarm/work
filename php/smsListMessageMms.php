<?php
error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;

$client = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));
$theSid = "MM840711a306a13165e8e832426e8f718a";
try {
    $message = $client->messages($theSid)->fetch();
    echo "+ Sent, SID:" . $message->sid . " To:" . $message->to . " Status:" . $message->status
    . " MediaUrl0: " . $message->numMedia
    . "\xA";

    $media = $client->messages($theSid)->media->read([], 20);
    foreach ($media as $record) {
        print("+ Media id: " . $record->sid . "\xA");
    }
    
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}
?>
