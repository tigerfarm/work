<?php

// C# paging: https://stackoverflow.com/questions/38086548/twilio-getnextpage-to-page-through-sms-logs
echo "\xA+++ Start paging list program.\xA";

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));

// -----------------------------------------------------------------------------
echo "\xA+ List first N logs.\xA";
$messages = $client->messages->read([], 200);
$counter = 0;
foreach ($messages as $message) {
    echo "++ ";
    $counter = $counter + 1;
    if ($counter < 10) {
        echo "  ";
    } else if ($counter < 100) {
        echo " ";
    }
    echo $counter . ": ";
    echo $message->dateSent->format("Y-m-d h:i:s") . " " . $message->sid . " " . $message->from . " " . $message->to . " " . $message->status . " " . $message->body . "\xA";
}
echo "End of list.\xA";

// -----------------------------------------------------------------------------
echo "\xA+++ Exit list program.\xA";
?>
