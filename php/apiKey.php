<?php
// Docs: https://www.twilio.com/docs/iam/keys/api-key-resource
// Note, Resource not accessible with Test Account Credentials.
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));

$new_key = $twilio->newKeys->create(["friendlyName" => "P1"]);

echo "+ New key SID:    " . $new_key->sid . "\xA";
echo "+ New key Secret: " . $new_key->secret . "\xA";
?>
