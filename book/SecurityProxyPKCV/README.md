# Security Notes

--------------------------------------------------------------------------------
### Proxy Server

Squid proxy server, [download](https://squidman.net/squidman/).

<img src="squid01.jpg"/>

Get IP address for use in Squid.
````
$ ifconfig -X en0
en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
... 
inet 192.168.1.76 netmask 0xffffff00 broadcast 192.168.1.255
... 
````

<img src="squid02.jpg"/>

After changes to SquidMan configuration, restart, Menu: Control/Restart Squid.

````
Using curl with the proxy server,
https://oxylabs.io/blog/curl-with-proxy

curl --proxy "http://user:pwd@127.0.0.1:1234" "http://httpbin.org/ip"
curl --proxy "user:pwd@127.0.0.1:1234" "http://httpbin.org/ip"

curl --proxy "127.0.0.1:8080" "http://httpbin.org/ip"

curl --proxy "127.0.0.1:8080" "http://httpbin.org/ip"

Without the proxy server:
$ curl "http://httpbin.org/ip"
{
  "origin": "107.210.221.195"
}

With proxy server:
$ curl --proxy "192.168.1.76:8080" "http://httpbin.org/ip"
{
  "origin": "192.168.1.76, 107.210.221.195"
}
$ curl --proxy "192.168.1.76:8080" "https://httpbin.org/ip"
{
  "origin": "107.210.221.195"
}
$ curl -x "192.168.1.76:8080" "https://httpbin.org/ip"
{
  "origin": "107.210.221.195"
}

$ curl "https://api.twilio.com:8443/"
<?xml version='1.0' encoding='UTF-8'?>
<TwilioResponse><Versions><Versions><Version><Name>2010-04-01</Name><Uri>/2010-04-01</Uri><SubresourceUris><Accounts>/2010-04-01/Accounts</Accounts></SubresourceUris></Version></Versions></Versions></TwilioResponse>

$ curl --proxy "192.168.1.76:8080" "https://api.twilio.com:8443/"
$ curl --proxy "https://192.168.1.76:8080" "https://api.twilio.com:8443/"

$ curl --proxy-insecure "https://192.168.1.76:8080" "https://api.twilio.com:8443/"
curl: (35) error:1400410B:SSL routines:CONNECT_CR_SRVR_HELLO:wrong version number
<?xml version='1.0' encoding='UTF-8'?>
<TwilioResponse><Versions><Versions><Version><Name>2010-04-01</Name><Uri>/2010-04-01</Uri><SubresourceUris><Accounts>/2010-04-01/Accounts</Accounts></SubresourceUris></Version></Versions></Versions></TwilioResponse>
````

Note, "curl: (35) error..." is that HTTP is tried first, causing the error message.
Then HTTPS used successfully.

--------------------------------------------------------------------------------
### PKCV

Tool to generate a SHA256 hash:
https://emn178.github.io/online-tools/sha256.html


Proxy server in a docker system:
https://github.com/qdm12/gluetun

To test with a browser:
https://www.youtube.com/watch?v=dMLK0cx7V_Y

--------------------------------------------------------------------------------

Cheers...
