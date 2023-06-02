<?php

require __DIR__ . '/../../twilio-php-main/srcV7/Twilio/autoload.php';

use Twilio\Rest\Client;

$client = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));
$result = $client->messages->read([
    "dateSentAfter" => date('2023-06-02 03:00:00'),
    "dateSentBefore" => date('2023-06-02 23:59:59')
        ]);
echo "++ List sent messages." . "\xA";
echo "++ dateCreated      sid                                status    body";
foreach ($result as $message) {
    echo "\xA" . $message->dateSent->format("Y-m-d h:i:s") . " " . $message->sid . " " . $message->status . " " . $message->body;
}
echo "\xA+ End of List.";
?>
