<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(twilio_account_sid, twilio_account_auth_token);
// $accounts = $twilio->api->v2010->accounts->read();
// echo "+ List all subaccounts for: ", getenv('ACCOUNT_SID'), "\xA";
// foreach ($accounts as $record) {
//     echo "++ account SID: ", $record->sid, " ", $record->friendlyName, "\xA";
// }
$accounts = $twilio->api->v2010->accounts->read(array("Status" => "active"));
echo "+ List all active subaccounts for: ", getenv('ACCOUNT_SID'), "\xA";
foreach ($accounts as $record) {
    echo "++ account SID: ", $record->sid, " ", $record->friendlyName, "\xA";
}
echo "+ End of list.\xA";
?>
