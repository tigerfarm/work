<?php
class HTTPRequester {
    public static function HTTPGet($url) {
        $ch = curl_init($url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_HEADER, 1);
        curl_setopt($ch, CURLOPT_URL, $url);
        $response = curl_exec($ch);
        curl_close($ch);
        return $response;
    }
}
echo "+++ Start.\xA";
$url = "https://api.twilio.com/2010-04-01/Accounts/AC1b32414e8ab41e56e6393bcbba7d5a9d/Messages/MM35905fe18db00043de3517f4ae48f10e/Media/ME0a97356469463a167db17fbea7750463";
// $url = "https://media.twiliocdn.com/AC1b32414e8ab41e56e6393bcbba7d5a9d/def1069d2a15ce1f3ac9d59f0bea3c31?x-amz-security-token=AgoJb3JpZ2luX2VjEBkaCXVzLWVhc3QtMSJIMEYCIQDHE6E5FADujlAornvld%2B4TnfyMFXjAKqK%2BbOar3t%2FiBgIhAKGWd5NfVtNOfSnc733acIjIXc8LTg1YiD8PF6zXuCNUKtoDCCIQABoMMjAxMTY0OTIxNDA4Igzn%2Fs6gsGx%2Bo1ioK0QqtwPWFD4lH177jCvRA%2FfsbLc1PtpFadvf02AHYWtFMbJ8Bqa3N2fIg5tgRu4zQ8c2W%2FsbWTim55XsKOubbVcCtChXJQ1974Dd3pI7jE5Mdy1Q1ndOQ1oS3Lmq2HOL0BFKt0w2CjmkR1FIFtoiCq8i%2BizE1E974lpqjmIFehIAJnYi8NmmQQz%2BaxiZcgIBIV3KF%2B7V68LL6%2F18fv3xhRb1lmFsoaqz3coLWL8fKVMQzFWbxa1OKzkPOs2LfAVhOCS2GTYnruxba8n3iyjlSZ%2BRB8P2n7Rk5V1GS7D5PuSaUpKMtew1ZOyk3D4n3AWqh8TrMKbLIZtf%2BGpOTd6gRnU7LNp84JH9OTP%2BLL9t5a0FhKHTr2kCWHLES2HxICpfrLg0cjEgvuawMAGzDEzWXlEvKx%2BbojlwlO5UvJF%2F0R9wyCLvXfC3NCi8eOPazjqgbWs8vZWEmJzZB1ZR1Kmxs8GuHYXi3emSSY9Yhiw%2FDRLIOxzVMEOTivi2fMBr0fULhK1Au1UR%2Bvu591AJK7UP9w21%2FCqzYuYr2LsM35%2Be58iDYlbE9%2BkbAgBzw35KVGOsDRrC1JDvN%2FBB9cPmMKr99%2BYFOrMBrCaaI%2Bo%2FY9fi2dWHBu1XKFXHNKhaJuOAqMP3O3uMIETtrNCANR2gFsn17T5wlBYpk3MZtkpyeSyqAUZFTeGbI%2BlIi2pCtdXTlGBtn4QeufsbmNZo%2FNTzttlDLqzcX61jcf7KDwgSp1oXtpJzq7UmNidaOUyoGePhjqQ4R2NAbPOPjNw32AGkkVZh4RVk9y%2BEq3Jqr9YqPl%2FkLvSn3saGzXE0uBXQ3NTZFdnPEqjYzHS7TJ8%3D&AWSAccessKeyId=ASIAS5VS5DJAJ3GMNL5H&Expires=1558057854&Signature=LJAVzjh8rCT31MnPQzvNIzww4a4%3D";
echo "+ Request URL: " . $url . "\xA";
$http = new HTTPRequester();
$response = $http->HTTPGet($url);
echo "+ Response: {$response}";
echo "+++ Exit.\xA";
