<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
error_reporting(E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ));

use Twilio\Rest\Client;

$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
//
$CHAT_SERVICE_SID = 'IS4ebcc2d46cda47958628e59af9e53e55';
$chatChannel = "CHc97669141a784c92a74c296c84850d25";
echo '+ CHAT_SERVICE_SID: ' . $CHAT_SERVICE_SID . ":\xA"
 . "+ Chat channel: " . $chatChannel . ":\xA";
//
$messages = $twilio->chat->v2->services($CHAT_SERVICE_SID)
        ->channels($chatChannel)
        ->messages
        ->read(["order" => "desc"], 20);
//
echo "+ Channel messages:\xA";
foreach ($messages as $record) {
    echo "++ SID: " . $record->sid
    . " " . $record->dateCreated->format('Y-m-d H:i:s')
    . " " . $record->from
    . " " . $record->body
    . "\xA";

    // print($record->sid);
}
echo "+ End of list.\xA";
