<?php

require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';

use Twilio\Rest\Client;

$twilio = new Client(getenv('MASTER_ACCOUNT_SID'), getenv('MASTER_AUTH_TOKEN'));
$model_build = $twilio->autopilot->v1->assistants("UA96376fff94c83ea0349a3f97651f4f77")
                                     ->modelBuilds("UG5db831fb69239d20a45dc0d1f9fa9fb4")
                                     ->fetch();
// print($model_build->sid);
echo "+ model_build uniqueName: " . $model_build->uniqueName . "\xA"
        . "+ status: " . $model_build->status . "\xA"
        . "+ error_code :" . $model_build->errorCode . ":"
        . "\xA";
?>
