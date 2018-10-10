<?php
if ($argc === 1 ) {
    echo "0";
    return;
}
$theConference = $argv[1];

require __DIR__ . '/twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv("ACCOUNT_SID"), getenv('AUTH_TOKEN'));
echo "++ End Conference SID: " . $theConference . "\xA";
$conference = $twilio->conferences($theConference)
                     ->update(array("status" => "completed"));
echo "++ Ended.\xA";
?>
