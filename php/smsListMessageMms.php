<?php
// Program to an MMS's ME media file ids.
// Given an MMS SID, retrieve the ME media file ids.

error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;

$client = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));
// MMS SID:
$theSid = "MMf28ecbfbfd8c8964f89ae523e6f83d65"; // MMf28ecbfbfd8c8964f89ae523e6f83d65 MM840711a306a13165e8e832426e8f718a
// Get ME media ids.
try {
    $message = $client->messages($theSid)->fetch();
    echo "+ Sent, SID:" . $message->sid . " To:" . $message->to . " Status:" . $message->status
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
