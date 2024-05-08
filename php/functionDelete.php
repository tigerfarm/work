<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
echo "++ Fetch Function. \xA";
$function = $twilio->serverless->v1->services("ZSb2201277346da03f6ca1ea804ce3aaba")
                                   ->functions("ZH0f96421dc89f12b9768e696f6f16753b")
                                   ->fetch();
echo "+ Function, SID: " . $function->sid
        . " Status: " . $function->friendlyName
        . " URL: " . $function->url
        . "\xA";
$function = $twilio->serverless->v1->services("ZSb2201277346da03f6ca1ea804ce3aaba")
                                   ->functions("ZH0f96421dc89f12b9768e696f6f16753b")
                                   ->delete();
echo "++ Deleted Function. \xA";
?>
