<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;
$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
try {
    $message = $client->messages("SM3570cf47fa1e429c90ef659387ac9c42")->fetch();
    echo "+ Sent, SID: " 
    . $message->sid 
            ." To: " . $message->to 
            . " dateCreated: " . $message->dateCreated->format("Y-m-d h:i:s.U")
            . " dateSent: " . $message->dateSent->format("Y-m-d h:i:s.U")
            . " dateUpdated: " . $message->dateUpdated->format("Y-m-d h:i:s.U")
            . "\xA";
} catch (RestException $e) {
    echo "+ getStatusCode(): " . $e->getStatusCode() . "\xA";
    echo "+ getMessage(): " . $e->getMessage() . "\xA";
}
?>
