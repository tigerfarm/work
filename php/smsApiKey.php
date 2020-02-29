<?php
// Docs: https://www.twilio.com/docs/iam/keys/api-key-resource
// Note, Resource not accessible with Test Account Credentials.
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('ACCOUNT_SID'), getenv('AUTH_TOKEN'));
// $new_key = $twilio->newKeys->create();
$new_key = $twilio->newKeys->create(array("friendlyName" => "David2"));
echo "+ New key SID:    " . $new_key->sid . "\xA";
echo "+ New key Secret: " . $new_key->secret . "\xA";
?>
