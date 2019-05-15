<?php
echo "+++ Start.\xA";

// MMS request:
// +++ Echo HTTP request data.
// + URL: POST /cgi/echo.php 
// ++ MediaContentType0 => image/jpeg
// ++ MessageSid => MM07bf9ce26173e745c73420be98250fc5
// ++ NumMedia => 1
// ++ Body => Cat
// ++ MediaUrl0 => https://api.twilio.com/2010-04-01/Accounts/AC1b32414e8ab41e56e6393bcbba7d5a9d/Messages/MM07bf9ce26173e745c73420be98250fc5/Media/ME2704ed5998f7941b1cef38097e33131c
// ...
// + End of list.
//
// The MediaUrl0 value, forwards to the following:
$theUrl = "https://s3-external-1.amazonaws.com/media.twiliocdn.com/AC1b32414e8ab41e56e6393bcbba7d5a9d/def1069d2a15ce1f3ac9d59f0bea3c31";
$outFilename = "downloadFile.jpg";
$ch = curl_init($theUrl);
$fp = fopen($outFilename, 'wb');
curl_setopt($ch, CURLOPT_FILE, $fp);
curl_setopt($ch, CURLOPT_HEADER, 0);
curl_exec($ch);
curl_close($ch);
fclose($fp);
echo "+ File created: " . $outFilename . "\xA";
 
echo "+++ Completed.\xA";

