<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;
$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
try {
    $message = $client->messages("SM2b814b66462d4e1483e76280a9beac4f")->fetch();
    echo "+ Sent, SID:" . $message->sid . " To:" . $message->to . " Status:" . $message->status
            . " errorCode:" . $message->errorCode . " errorMessage:" . $message->errorMessage . "\xA";
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}
?>
