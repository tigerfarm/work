<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$model_build = $twilio->autopilot->v1->assistants("UA96376fff94c83ea0349a3f97651f4f77")
                                     ->modelBuilds
                                     ->create();

// print($model_build->sid);
echo "+ model_build SID: " . $model_build->sid . "\xA";
?>
