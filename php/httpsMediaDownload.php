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
$http = new HTTPRequester();
$urlMedia = 'https://raw.githubusercontent.com/tigerfarm/arduino/master/Altair101/AltairDesktop01a.jpg';
echo "+ $urlMedia \xA";
$urlFileContent = $http->getMediaContent($urlMedia);
$urlMediaFilenameWrite = "httpsMediaUrl.jpg";
$urlFileWrite = fopen($urlMediaFilenameWrite, 'w');
fwrite($urlFileWrite, $urlFileContent);

// Use a Twilio MMS media file URL, to download the media file to a local disk file.
// ---
// Use the following to send an MMS:
// $ php smsSendMmsSingle.php
// + Sent, SID: MM0888aad8ca4ab5c698a58ecc6e6c96f9
// ---
// Get the Media URL from the Twilio Console SMS log: https://www.twilio.com/console/sms/logs
// Or from a webhook: {...,"SmsMessageSid":"MM0888aad8ca4ab5c698a58ecc6e6c96f9","MediaContentType0":"image/jpeg","MediaUrl0":"https://api.twilio.com/2010-04-01/Accounts/ACa...3/Messages/MM0888aad8ca4ab5c698a58ecc6e6c96f9/Media/ME7d57db8c0196a2f45d3da1d5ad496910",...} 
// 
$mmsMedia = 'https://api.twilio.com/2010-04-01/Accounts/ACa...3/Messages/MM0888aad8ca4ab5c698a58ecc6e6c96f9/Media/ME7d57db8c0196a2f45d3da1d5ad496910';
$mmsFileContent = $http->getMediaContent($mmsMedia);
$mmsMediaFilenameWrite = "httpsMmsMediaUrl.jpg";
$mmsFileWrite = fopen($mmsMediaFilenameWrite, 'w');
fwrite($mmsFileWrite, $mmsFileContent);

echo "+++ Exit.\xA";
