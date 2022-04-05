<?php
echo "---------------------------------------";
echo "\xA+++ Echo environment variables.";
//
$accountSid = getenv("ACCOUNT_SID");
$authToken = getenv('AUTH_TOKEN');
$syncServieSid = getenv('SYNC_SERVICE_SID');
$syncMapName = getenv('SYNC_MAP_NAME');
echo "\xA", "+ ACCOUNT_SID      : ", $accountSid;
echo "\xA", "+ AUTH_TOKEN       : ", $authToken;
echo "\xA", "+ SYNC_SERVICE_SID : ", $syncServieSid;
echo "\xA", "+ SYNC_MAP_NAME    : ", $syncMapName;
//
echo "\xA--------------------------------------- \xA";
?>
