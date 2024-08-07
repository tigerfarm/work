<?php
echo "++ Send SMS message with error checking.\xA";
require __DIR__ . '/../../twilio-php-main/srcV6/Twilio/autoload.php';
use Twilio\Rest\Client;
use Twilio\Exceptions\RestException;
$twilio = new Client(getenv('MAIN_ACCOUNT_SID'), getenv('MAIN_AUTH_TOKEN'));
$rate_limit = $twilio->verify->v2
    ->services("VA706b554a11dca4066e71ed8ce66749cf")
    ->rateLimits->create(
        "end_user_ip_address2", // unique_name
        ["description" => "Limit on end user IP Address c2"]
    );

print $rate_limit->sid;
?>
