<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$params = array(
    // 'To' => "16508668221"
    'To' => "+16503790077"
);
$result = $client->messages->read($params);
echo '++ List messages.';
foreach ($result as $message) {
    echo "\xA" . $message->dateSent->format("Y-m-d h:i:s") . " " . $message->sid . " " . $message->to . " " . $message->status . " " . $message->body;
    $client->messages($message->sid)->delete();
}
echo "\xA" . "End of list.\xA"
?>
