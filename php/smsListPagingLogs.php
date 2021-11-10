<?php
// C# paging: https://stackoverflow.com/questions/38086548/twilio-getnextpage-to-page-through-sms-logs
echo "\xA+++ Start paging list program.\xA";

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));

// -----------------------------------------------------------------------------
echo "\xA+ List first 6 logs.\xA";
$messages = $client->messages->read([], 6);
foreach ($messages as $message) {
    echo  "++ " . $message->dateSent->format("Y-m-d h:i:s") . " " . $message->sid . " " . $message->from . " " . $message->to . " " . $message->status . " " . $message->body . "\xA";
}
echo "End of list.\xA";

// -----------------------------------------------------------------------------
echo "\xA+ List first 3 logs.\xA";
$messages = $client->messages->page([], 3, \Twilio\Values::NONE, 0);
foreach ($messages as $message) {
    echo "++ " . $message->dateSent->format("Y-m-d h:i:s") . " " . $message->sid . " " . $message->from . " " . $message->to . " " . $message->status . " " . $message->body . "\xA";
}
echo "+End of list.\xA";

echo "\xA+ Get and list the next page of data, the next 3 logs.";
$nextPageData = $messages->nextPage();
// $previousPageData = $messages->previousPage(); // For reference, previous page of data
if(!$nextPageData->valid()){
    echo "\xA- Invalid page.\xA";
}
foreach ($nextPageData as $message) {
    echo "\xA++ " . $message->dateSent->format("Y-m-d h:i:s") . " " . $message->sid . " " . $message->from . " " . $message->to . " " . $message->status . " " . $message->body;
}
echo "+End of list.\xA";

// -----------------------------------------------------------------------------
echo "\xA+++ Exit list program.\xA";

?>
