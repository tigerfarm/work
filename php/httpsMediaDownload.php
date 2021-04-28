<?php
class HTTPRequester {

    // From: https://stackoverflow.com/questions/66771025/save-a-copy-of-any-attachments-included-with-an-incoming-sms-via-twilio
    public function getMediaContent($url) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        // Option to follow the redirects, otherwise it will return an XML
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        $media = curl_exec($ch);
        curl_close($ch);
        return $media;
    }

}

echo "+++ Start.\xA";

// Copy a file to test read and write.
$mediaFilenameRead = "httpsMediaSample.jpg";
$mediaFilenameWrite = "httpsMediaSample2.jpg";
$fileRead = fopen($mediaFilenameRead, 'r');
$fileWrite = fopen($mediaFilenameWrite, 'w');
$fileSize =  filesize($mediaFilenameRead);
$theFileContent=fread($fileRead, $fileSize);
fwrite($fileWrite, $theFileContent);

// Get a media file from a URL and write to file.
$urlMedia = 'https://raw.githubusercontent.com/tigerfarm/arduino/master/Altair101/AltairDesktop01a.jpg';
$urlFileContent = $http->getMediaContent($urlMedia);
$urlMediaFilenameWrite = "httpsMediaUrl.jpg";
$urlFileWrite = fopen($urlMediaFilenameWrite, 'w');
fwrite($urlFileWrite, $urlFileContent);

// Use an MMS media file URL, to get the content and write it to a file.
// Use the following to send an MMS:
// $ php mmsSend.php 
// ++ Send MMS message, From: +16505551111 to +16505552222 :Twilio support MMS test.:
// ++ Media URL: https://raw.githubusercontent.com/tigerfarm/arduino/master/Altair101/AltairDesktop01a.jpg
// + Sent, SID: MM537ab3ba8dd149bfa9af998867d61f64 Status: queued
// Get the Media URL from the Twilio Console SMS logs report: https://www.twilio.com/console/sms/logs
// 
$mmsMedia = 'https://media.twiliocdn.com/ACa...3/60ab91a9734616b539e86e67f2eebec5?x-amz-security-token=IQoJb3JpZ2luX2VjEOn%2F%2F%2F%2F%2F%2F%2F%2F%2F%2FwEaCXVzLWVhc3QtMSJHMEUCIDT764Q1SOlnPX9aU75eNUQSA3KB1WBrxBSBnKeZdWiPAiEAmltOMl%2BBCARok1TwQV0g0%2Bknm%2F6y%2FZwGTrZV4ZHvWGkqtAMIYRAAGgwyMDExNjQ5MjE0MDgiDLGaQSyFbUKPRAQYaSqRAzFY3q3Qr6ZUGpiRCayeuz%2BCfSKD3kpCNcwyzHQiVyLH3uRIk9l8hIxcfxtISWsta%2Be6707Jg6Pph0dr%2B0rQvVfNO6pW6Mdi%2FYHbMgXSfL8saaOenKXW4qu%2B2URxTOheWOoCCS3SKEIjHotws%2FXGfj9%2B7fGCCnIQvFbLlq5H4UURUO5tWNmlllxR2DVHwVQ2M9uiC%2BLHVNvOOD%2B800R8%2Bpu3QljGEiY2txTPjfH3YZrn6dJfPY1xq7yweiRwWzTpnSfAQmEX9JlNArxR8%2FI76iFBdnd7QNNuEZevTUoyksL%2FspmRSzxU0dfy8Dn1XEu596Fr7G71Ycw9465dCxdW%2B3KgBlLtdF%2BMNoGw6bPEAPa5mWWb80FNu8QH%2FuTfJUOeFXA4MAQUdGfkUo2PPwe93bTjCjNCHfpKb2np90DA5ACDcW0RTcEV7WWgecYDvU9bn5w%2FLrCBz8xPFhpzOKeQs%2F5Cp14DVotmnmDAjFb9WvRnu1A1zfjKcuEHQuuJvyHSW3p5tCFtR%2F4R9UeJfDDt9HxFMKeYpoQGOusBCwWyLe0tnkTGEcSOe%2Bw%2BsNkjSnJ2fzLBbLXiMUlyuwHX1AqKmisZw%2BdqnhpeRVYueYiieRPj30hAySOC3pOa6gPryWQWsta7KfNobTPawykDu2XkLwO9pFT8W2ozmZpLpc%2FVXzANr9RelnjzH2vsOMbL2N8Q5580AiSEyQM5GTVBZETidWNWZHUf%2FJ8tWAQnxQMKt5soi3XaCtDYIvMl7x%2BT9cr7GDpJlASQs2HubFMs%2BEPDAYkSS%2BlJndYP6REzXxC1QwlmrA2HUP8g1e%2BVho2%2B4baMdw%2Fg%2BlfNrP9glDdaYCrp7ZKFZdRUEA%3D%3D&AWSAccessKeyId=ASIAS5VS5DJAMFFLSQ2N&Expires=1619633379&Signature=5m%2FTxeZc2Be5UNiNvcdxkmHDsCg%3D';
$mmsFileContent = $http->getMediaContent($mmsMedia);
$mmsMediaFilenameWrite = "httpsMmsMediaUrl.jpg";
$mmsFileWrite = fopen($mmsMediaFilenameWrite, 'w');
fwrite($mmsFileWrite, $mmsFileContent);

echo "+++ Exit.\xA";
