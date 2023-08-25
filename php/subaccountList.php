<?php
error_reporting( E_ALL ^ ( E_NOTICE | E_WARNING | E_DEPRECATED ) );
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));
// $accounts = $twilio->api->v2010->accounts->read();
// echo "+ List all subaccounts for: ", getenv('ACCOUNT_SID'), "\xA";
// foreach ($accounts as $record) {
//     echo "++ account SID: ", $record->sid, " ", $record->friendlyName, "\xA";
// }
$accounts = $twilio->api->v2010->accounts->read(array("Status" => "active"));
echo "+ List all active subaccounts for: ", getenv('ACCOUNT_SID'), "\xA";
foreach ($accounts as $record) {
    echo "++ account SID: ", $record->sid, " ", $record->authToken, " ", $record->friendlyName, "\xA";
}
echo "+ End of list.\xA";
?>
