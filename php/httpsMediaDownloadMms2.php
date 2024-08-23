<?php
// Program to download an MMS media file.
// Given an MMS SID and the ME media file id, download the media file.
// Note each ME media file id has a 4 hour expiration window.

class HTTPRequester {

    // From: https://stackoverflow.com/questions/66771025/save-a-copy-of-any-attachments-included-with-an-incoming-sms-via-twilio
    public function getMediaContent($url,$sid,$token) {
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        // Option to follow the redirects, otherwise it will return an XML
        curl_setopt($ch, CURLOPT_FOLLOWLOCATION, true);
        curl_setopt($ch, CURLOPT_USERPWD, "$sid:$token");
        $media = curl_exec($ch);
        curl_close($ch);
        return $media;
    }

}

echo "+++ Start.\xA";

// Use a Twilio MMS media file URL, to download the media file to a local disk file.
// ---
// Use the following to send an MMS:
// $ php smsSendMmsSingle.php
// ++ Send SMS message, From: +16505551111 to +16505552222 :Forwarded MMS...:
// + Sent, SID: MM469decf8f1650d0df3960608cfcdb7ac
// ---
// Get the Media ME id from the Twilio Console SMS log: https://www.twilio.com/console/sms/logs
// Or
// $ php smsListMessageMms.php 
// + Sent, SID: MM469decf8f1650d0df3960608cfcdb7ac To:+16505552222 Status:delivered
// ++ MediaUrl0: 1
// + Media id:  ME82ea1e92bc6282c80476531b8090cc26
// Or from a webhook: {...,"SmsMessageSid":"MM469decf8f1650d0df3960608cfcdb7ac","MediaContentType0":"image/jpeg","MediaUrl0":"https://api.twilio.com/2010-04-01/Accounts/ACa...3/Messages/MM469decf8f1650d0df3960608cfcdb7ac/Media/ME82ea1e92bc6282c80476531b8090cc26",...} 
// 
$theMmsMmSid = "MM469decf8f1650d0df3960608cfcdb7ac"; // MM469decf8f1650d0df3960608cfcdb7ac
$theMmsMeSid = "ME82ea1e92bc6282c80476531b8090cc26"; // ME82ea1e92bc6282c80476531b8090cc26
//
// The following does not have account SID and auth token for access.
// $theUri = 'https://api.twilio.com/2010-04-01/Accounts/';
// The following does have account SID and auth token for access.
// $theUri = 'https://' . getenv('MAIN_ACCOUNT_SID') . ':' . getenv('MAIN_AUTH_TOKEN') . '@api.twilio.com/2010-04-01/Accounts/';
$theUri = 'https://api.twilio.com/2010-04-01/Accounts/';
$theSID = getenv('MAIN_ACCOUNT_SID');
$theAuth = getenv('MAIN_AUTH_TOKEN');
//
// echo "+ $theUri \xA";
$mmsMedia = $theUri . getenv('MAIN_ACCOUNT_SID') . '/Messages/' . $theMmsMmSid . '/Media/' . $theMmsMeSid;
//
echo "+ $mmsMedia \xA";
//
$http = new HTTPRequester();
$mmsFileContent = $http->getMediaContent($mmsMedia, $theSID, $theAuth);
$mmsMediaFilenameWrite = "httpsMmsMediaUrl.jpg";
$mmsFileWrite = fopen($mmsMediaFilenameWrite, 'w');
fwrite($mmsFileWrite, $mmsFileContent);

echo "+++ Exit.\xA";
