<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Rest\Client;
$client = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
// $fromPhoneNumber = getenv('PHONE_NUMBER4');
// $toPhoneNumber = getenv('PHONE_NUMBER3');
$fromPhoneNumber = "whatsapp:+14155551111";
$toPhoneNumber = "whatsapp:+16505552222";
//
echo '++ Loop send SMS message, From: ' . $fromPhoneNumber . " to " . $toPhoneNumber . ":\xA";
echo "+ Start Loop.\xA";
for($i=1; $i<=20; $i++) {
    $theMessage = "Your Loop code is ". $i;
    echo "++ Send: " . $theMessage . " ";
    $sms = $client->account->messages->create(
        $toPhoneNumber,
            array(
            'from' => $fromPhoneNumber,
            'body' => $theMessage
        )
    );
    echo " Sent, SID: " . $sms->sid . "\xA";
    sleep (1);
}

?>
