<?php
echo "+++ Start.\xA";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
echo "+ phpversion: " . phpversion('twilio');
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\ChatGrant;
// Required for all Twilio access tokens
$twilioAccountSid = getenv('MASTER_ACCOUNT_SID');
$twilioApiKey = getenv('MASTER_API_KEY');
$twilioApiSecret = getenv('MASTER_API_SECRET');
$serviceSid = getenv('CONVERSATIONS_SERVICE_SID');
echo "+ Service SID: " . $serviceSid . "\xA";
$identity = "dave";
// Create access token, which we will serialize and send to the client
$token = new AccessToken(
    $twilioAccountSid,
    $twilioApiKey,
    $twilioApiSecret,
    3600,
    $identity
);
$theGrant = new ChatGrant();
$theGrant->setServiceSid($serviceSid);
$token->addGrant($theGrant);
echo $token->toJWT();
echo "+++ Exit.\xA";
