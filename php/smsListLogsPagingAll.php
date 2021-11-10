<?php

// C# paging: https://stackoverflow.com/questions/38086548/twilio-getnextpage-to-page-through-sms-logs
// $previousPageData = $messages->previousPage(); // For reference, previous page of data

echo "\xA+++ Start paging list program.\xA";

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));

// -----------------------------------------------------------------------------
$pageCounter = 0;
$rowCounter = 0;
$numberRowsPerPage = 10;
$nextPageRows = $client->messages->page([], $numberRowsPerPage, \Twilio\Values::NONE, 0);
while ($nextPageRows->valid()) {
    echo "++ $pageCounter ---------------------------------\xA";
    foreach ($nextPageRows as $message) {
        echo "++ ";
        $rowCounter = $rowCounter + 1;
        if ($rowCounter < 10) {
            echo "  ";
        } else if ($rowCounter < 100) {
            echo " ";
        }
        echo $rowCounter . ": ";
        echo $message->dateSent->format("Y-m-d h:i:s") . " " . $message->sid . " " . $message->from . " " . $message->to . " " . $message->status . " " . $message->body . "\xA";
    }
    $pageCounter = $pageCounter + 1;
    $nextPageRows = $nextPageRows->nextPage();
}
echo "End of listing.\xA";

// -----------------------------------------------------------------------------
echo "\xA+++ Exit list program.\xA";
?>
