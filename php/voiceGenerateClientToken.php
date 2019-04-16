<?php
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\VoiceGrant;

echo "+++ Start.\xA";
// Required for all Twilio access tokens
$twilioAccountSid = getenv('ACCOUNT_SID');
$twilioApiKey = getenv('CHAT_API_KEY');
$twilioApiSecret = getenv('CHAT_API_KEY_SECRET');
$outgoingApplicationSid = 'AP7bcb6d12228748038b9baa65566a615a';
$identity = "david";
// Create access token, which we will serialize and send to the client
$token = new AccessToken(
    $twilioAccountSid,
    $twilioApiKey,
    $twilioApiSecret,
    3600,
    $identity
);
$voiceGrant = new VoiceGrant();
$voiceGrant->setOutgoingApplicationSid($outgoingApplicationSid);
$voiceGrant->setIncomingAllow(true);
$token->addGrant($voiceGrant);
echo $token->toJWT();
echo "+++ Exit.\xA";
