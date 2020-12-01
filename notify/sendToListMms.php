<?php
// NodeJS it looks like this: sms: { "media_urls": ['imageaddress.com/image.png'] }
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$notification = $twilio->notify->v1->services(getenv('MASTER_NOTIFY_SERVICE_SID'))
        ->notifications
        ->create( array(
            "body" => "hello 2.1",
            "sms" => ["media_urls" => ["https://www.tigerfarmpress.com/StacyDavid/netscape-fountain2a.jpg"]],
            "toBinding" => array(
                "{\"binding_type\":\"sms\", \"address\":\"" . getenv('MY_PHONE_NUMBER') . "\"}"
            )
        )
);
echo "+ Notification SID: " . $notification->sid . "\xA";
?>
