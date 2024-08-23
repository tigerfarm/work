<?php
// Program to an MMS's ME media file ids.
// Given an MMS SID, retrieve the ME media file ids.

error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
require __DIR__ . '/../../twilio-php-main/srcV6/Twilio/autoload.php';

use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;

$client = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));
// MMS SID:
$theSid = "MM469decf8f1650d0df3960608cfcdb7ac";
// Get ME media ids.
try {
    $message = $client->messages($theSid)->fetch();
    echo "+ Sent, SID: " . $message->sid . " To:" . $message->to . " Status:" . $message->status
    . "\xA++". " MediaUrl0: " . $message->numMedia
    . "\xA";

    $media = $client->messages($theSid)->media->read([], 20);
    foreach ($media as $record) {
        print("+++ Media id: " . $record->sid . "\xA");
    }
    
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}
?>
