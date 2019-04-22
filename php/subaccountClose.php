<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$the_close_account_SID = "the_close_account_SID";
$twilio = new Client($the_close_account_SID, 'the_close_account_auth_token');
$account = $twilio->api->v2010->accounts($the_close_account_SID)
                              ->update(array("status" => "closed"));
Echo "+ Closed: " . $account->friendlyName . "\xA";
?>
