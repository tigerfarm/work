<?php
echo "\xA+++ Get hostname IP addresses.\xA";
$aHostname = "api.twilio.com";
$ip = gethostbyname($aHostname);
echo "+ Hostname, " . $aHostname . ": " . $ip . "\xA";
$aHostname = "lookup.twilio.com";
$ip = gethostbyname($aHostname);
echo "+ Hostname, " . $aHostname . ": " . $ip . "\xA";

