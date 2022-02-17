# Security Notes

--------------------------------------------------------------------------------
### Install and Manage the Squid Proxy Server

Squid proxy server home website [link](http://www.squid-cache.org/).

After installed using SquidMan(see below), I found the following to install and run Squid.
````
$ brew install squid
$ brew services start squid
````
Squid config file is stored at /usr/local/etc/squid.conf.

I downloaded SquidMan which includes the Squid proxy server and GUI management interface.
+ Website link to [download](https://squidman.net/squidman/).
+ I put the DMG downloaded file in my Application directory.
+ When I click on SquidMan.dmg I get a popup. I click Squid, and Squid starts and the GUI starts.

To view the SquidMan install configuration file location.
````
$ cat /Users/dave/Library/Preferences/squid.conf
````
The GUI manages the configurations, and starting and stopping the server.

Can run Squid in the background without using the GUI.
````
/usr/local/squid/sbin/squid -f /Users/dave/Library/Preferences/squid.conf
````
I found the command by running the following when the GUI was on screen:
````
$ ps -ef | grep squid
  501 45845     1   0  9:47AM ??         0:00.48 /opt/homebrew/opt/squid/sbin/squid -N -d 1
  501 47967     1   0 11:15AM ??         0:00.00 /usr/local/squid/sbin/squid -f /Users/dave/Library/Preferences/squid.conf
  501 47969 47967   0 11:15AM ??         0:00.04 (squid-1) --kid squid-1 -f /Users/dave/Library/Preferences/squid.conf
````

I used the default settings.

<img src="squid01.jpg" width="400"/>

To use the proxy from your laptop, get the laptop's local IP address for use in Squid.
````
$ ifconfig -X en0
en0: flags=8863<UP,BROADCAST,SMART,RUNNING,SIMPLEX,MULTICAST> mtu 1500
... 
inet 192.168.1.76 netmask 0xffffff00 broadcast 192.168.1.255
... 
````
<img src="squid02.jpg" width="400"/>

After the configuration change, restart. Squid menu: Control/Restart Squid.

#### Test using cURL

Sample genaric curl commands.
````
curl --proxy "http://user:pwd@127.0.0.1:1234" "http://httpbin.org/ip"
curl --proxy "user:pwd@127.0.0.1:1234" "http://httpbin.org/ip"
curl --proxy "127.0.0.1:8080" "http://httpbin.org/ip"
curl -x "127.0.0.1:8080" "http://httpbin.org/ip"
curl -x "127.0.0.1:8080" "https://httpbin.org/ip"
````

Sample curl commands that I used for testing.

Following are test URL without the the proxy server.
Note, replaced my actual IP address with a fake address: "303.10.1.6"
````
$ curl "http://httpbin.org/ip"
{
  "origin": "303.10.1.6"
}
````

With the proxy server:
````
$ curl --proxy "192.168.1.76:8080" "http://httpbin.org/ip"
{
  "origin": "192.168.1.76, 303.10.1.6"
}
$ curl --proxy "192.168.1.76:8080" "https://httpbin.org/ip"
{
  "origin": "303.10.1.6"
}
$ curl -x "192.168.1.76:8080" "https://httpbin.org/ip"
{
  "origin": "303.10.1.6"
}

$ curl "https://api.twilio.com:8443/"
<?xml version='1.0' encoding='UTF-8'?>
<TwilioResponse>
<Versions><Versions><Version>
<Name>2010-04-01</Name>
<Uri>/2010-04-01</Uri>
<SubresourceUris><Accounts>/2010-04-01/Accounts</Accounts></SubresourceUris>
</Version></Versions></Versions>
</TwilioResponse>

$ curl --proxy "192.168.1.76:8080" "https://api.twilio.com:8443/"
$ curl --proxy "https://192.168.1.76:8080" "https://api.twilio.com:8443/"

$ curl --proxy-insecure "https://192.168.1.76:8080" "https://api.twilio.com:8443/"
curl: (35) error:1400410B:SSL routines:CONNECT_CR_SRVR_HELLO:wrong version number
<?xml version='1.0' encoding='UTF-8'?>
<TwilioResponse>
<Versions><Versions><Version>
<Name>2010-04-01</Name>
<Uri>/2010-04-01</Uri>
<SubresourceUris><Accounts>/2010-04-01/Accounts</Accounts></SubresourceUris>
</Version></Versions></Versions>
</TwilioResponse>
````

Note, "curl: (35) error..." is that HTTP is tried first, causing the error message.
Then HTTPS used successfully.

Sample commands using curl with the proxy server,
[link](https://oxylabs.io/blog/curl-with-proxy).

Set up a squid Proxy with basic username and password authentication,
[link](https://stackoverflow.com/questions/3297196/how-to-set-up-a-squid-proxy-with-basic-username-and-password-authentication).

--------------------------------------------------------------------------------
### Using a Twilio HTTP Custom Client Through the Proxy Server

To use customer client: twilioRestClient, add into the function call:
````
  .read(twilioRestClient);
  .create(twilioRestClient);
````
Sample [main program](https://github.com/tigerfarm/JavaTwSamples/blob/master/proxypkcv/ProxiedNoPkcv.java)
sending an SMS using the custom client.

Sample [class](https://github.com/tigerfarm/JavaTwSamples/blob/master/proxypkcv/ProxiedNoPkcv.java)
to create the Twilio custom client object.

Sample [program](https://github.com/tigerfarm/JavaTwSamples/blob/master/messaging/send_sms.java)
sending an SMS without custom client.

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
