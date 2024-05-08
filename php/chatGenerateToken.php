<?php
// Documentation: https://www.twilio.com/docs/iam/access-tokens?code-sample=code-creating-an-access-token-chat-2&code-language=PHP&code-sdk-version=5.x

if (isset($argc)) {
    if ($argc > 1) {
        $tokenIdentity = $argv[1];
    }
} else {
    $tokenIdentity = htmlspecialchars($_REQUEST["identity"]);
}
if ($tokenIdentity == "") {
    echo "0 -- identity must be an environment variable or GET parameter.";
    return;
}
// echo "+ tokenIdentity: " . $tokenIdentity . "\n";
require __DIR__ . '/../../twilio-php-master/Twilio/autoload.php';
use Twilio\Jwt\AccessToken;
use Twilio\Jwt\Grants\ChatGrant;

// Required for all Twilio access tokens
$twilioAccountSid = getenv('ACCOUNT_SID');
$twilioApiKey = getenv('API_KEY');
$twilioApiSecret = getenv('API_KEY_SECRET');
$serviceSid = getenv('CHAT_SERVICE_SID');

// Create access token, which we will serialize and sent to the client
// Token time to live (ttl):
//      360 seconds = 6 minutes (for testing)
//      3600 seconds = 60 minutes (1 hour)
//      36000 seconds = 600 hours
$token = new AccessToken(
    $twilioAccountSid,
    $twilioApiKey,
    $twilioApiSecret,
    3600,
    $tokenIdentity
);

// Create Chat grant and add it to the token.
$chatGrant = new ChatGrant();
$chatGrant->setServiceSid($serviceSid);
$token->addGrant($chatGrant);

// render token to string
echo $token->toJWT();

// echo "\n+ Token :" . $token->toJWT() . ":\n"
?>


