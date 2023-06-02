<?php

require __DIR__ . '/../../twilio-php-main/srcV7/Twilio/autoload.php';

use Twilio\Rest\Client;

$client = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));
$result = $client->messages->read([],20);

echo "++ List messages with status = scheduled." . "\xA";
$messages = (new class(new ArrayIterator($result)) extends FilterIterator {
            public function accept(): bool {
                $element = $this->getInnerIterator()->current();
                return $element->status === 'scheduled';
            }
        });
echo "++ dateCreated      sid                                status    body";
foreach ($messages as $message) {
    // echo "\xA" . $message->dateSent->format("Y-m-d h:i:s") . " " . $message->sid . " " . $message->status . " " . $message->body;
    echo "\xA" . $message->dateCreated->format("Y-m-d h:i:s") . " " . $message->sid . " " . $message->status . " " . $message->body;
}
echo "\xA+ End of List.";
?>
