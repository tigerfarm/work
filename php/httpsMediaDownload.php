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

class copyFile {

    public function getMediaContent($url) {
        // Copy a file to test read and write.
        $mediaFilenameRead = "httpsMediaSample.jpg";
        $mediaFilenameWrite = "httpsMediaSample2.jpg";
        $fileRead = fopen($mediaFilenameRead, 'r');
        $fileWrite = fopen($mediaFilenameWrite, 'w');
        $fileSize = filesize($mediaFilenameRead);
        $theFileContent = fread($fileRead, $fileSize);
        fwrite($fileWrite, $theFileContent);
    }

}

echo "+++ Start.\xA";

// Get a media file from a URL and write to file.
//
// $urlMedia = 'https://raw.githubusercontent.com/tigerfarm/arduino/master/Altair101/AltairDesktop01a.jpg';
// $urlMediaFilenameWrite = "httpsMediaUrl.jpg";
$urlMedia = 'https://someassets-1403.twil.io/2001operational.mp3';
$urlMediaFilenameWrite = "httpsMediaUrl.mp3";
//
echo "+ $urlMedia, Download filenamee: $urlMediaFilenameWrite \xA";
$http = new HTTPRequester();
$urlFileContent = $http->getMediaContent($urlMedia);
$urlFileWrite = fopen($urlMediaFilenameWrite, 'w');
fwrite($urlFileWrite, $urlFileContent);

return;

// Use a Twilio MMS media file URL, to download the media file to a local disk file.
// ---
// Use the following to send an MMS:
// $ php smsSendMmsSingle.php
// + Sent, SID: MMdb6a8e05fcac48dc823874b6db03445a
// ---
// Get the Media ME id from the Twilio Console SMS log: https://www.twilio.com/console/sms/logs
// Or
// $ php smsListMessage.php 
// + Sent, SID:MMdb6a8e05fcac48dc823874b6db03445a To:+16505552222 Status:delivered MediaUrl0: 1
// + Media id: ME2458b013013432076b041812bec916dc
// Or from a webhook: {...,"SmsMessageSid":"MM0888aad8ca4ab5c698a58ecc6e6c96f9","MediaContentType0":"image/jpeg","MediaUrl0":"https://api.twilio.com/2010-04-01/Accounts/ACa...3/Messages/MM0888aad8ca4ab5c698a58ecc6e6c96f9/Media/ME7d57db8c0196a2f45d3da1d5ad496910",...} 
// 
$mmsMedia = 'https://api.twilio.com/2010-04-01/Accounts/' . getenv('MASTER_ACCOUNT_SID') . '/Messages/MMdb6a8e05fcac48dc823874b6db03445a/Media/ME2458b013013432076b041812bec916dc';
echo "+ $mmsMedia \xA";
$mmsFileContent = $http->getMediaContent($mmsMedia);
$mmsMediaFilenameWrite = "httpsMmsMediaUrl.jpg";
$mmsFileWrite = fopen($mmsMediaFilenameWrite, 'w');
fwrite($mmsFileWrite, $mmsFileContent);

echo "+++ Exit.\xA";
