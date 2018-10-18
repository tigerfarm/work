<?php
if ($argc === 1 ) {
    echo "0";
    return;
}
$theConferenceSid = $argv[1];

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv("ACCOUNT_SID"), getenv('AUTH_TOKEN'));
echo "++ End Conference SID: " . $theConferenceSid . "\xA";
$conference = $twilio->conferences($theConferenceSid)
                     ->update(array("status" => "completed"));
echo "++ Ended.\xA";
?>
