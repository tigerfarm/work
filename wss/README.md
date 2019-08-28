# Media Stream Tutorial Notes

Consume a real-time Media Stream using WebSockets, Python, and Flask

https://www.twilio.com/docs/voice/tutorials/consume-real-time-media-stream-using-websockets-python-and-flask

--------------------------------------------------------------------------------
## Steps

Set up Python environment
````
mkdir wss
cd wss
pwd
/.../Projects/wss

python3 -m venv venv
source ./venv/bin/activate
pip install flask flask-sockets
````
From the tutorial's GitHub program repository, copy and save app.py:
+ From: https://github.com/TwilioDevEd/mediastreams-consume-websockets-flask
+ To: /Users/dthurston/Projects/wss

Run the websocket server.
````
$ python3 app.py
Server listening on: http://localhost:5000
````
Open the Flask server to the internet, using Ngrok.
````
/.../Applications/ngrok http 5000
ngrok by @inconshreveable                                                                                                                                                                                                         (Ctrl+C to quit)
                                                                                                                                                                                                                                                  
Session Status                online                                                                                                                                                                                                              
Session Expires               7 hours, 59 minutes                                                                                                                                                                                                 
Update                        update available (version 2.3.34, Ctrl-U to update)                                                                                                                                                                 
Version                       2.2.8                                                                                                                                                                                                               
Region                        United States (us)                                                                                                                                                                                                  
Web Interface                 http://127.0.0.1:4040                                                                                                                                                                                               
Forwarding                    http://4806f5c7.ngrok.io -> localhost:5000                                                                                                                                                                          
Forwarding                    https://4806f5c7.ngrok.io -> localhost:5000                                                                                                                                                                         
                                                                                                                                                                                                                                                  
Connections                   ttl     opn     rt1     rt5     p50     p90                                                                                                                                                                         
                              0       0       0.00    0.00    0.00    0.00 
````
Create a TwiML Bin, and use the above Ngrok tunnel.
````
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Stream url="wss://4806f5c7.ngrok.io/media" />
     </Start>
     <Dial>+16505552222</Dial>
</Response>
````
Another sample with a custom parameter, and dialing a Twilio Client.
````
<?xml version="1.0" encoding="UTF-8"?>
<Response>
    <Start>
        <Stream url="wss://a08a3cc9.ngrok.io/media">
            <Parameter name="hello" value = "HelloValue" />
      	</Stream>
    </Start>
    <Dial><Client>david</Client></Dial>
</Response>
````
I set a Twilio phone number to use the above.
I call the above, which should start the stream, and call my other Twilio phone number.

In the websocket server terminal window the stream data was displayed.
````
$ python3 app.py
Server listening on: http://localhost:5000

Connection accepted.
[2019-08-27 17:31:24,183] INFO in app: Connection accepted
[2019-08-27 17:31:24,337] INFO in app: Connected Message received: {"event":"connected","protocol":"Call","version":"0.2.0"}
...


Connection accepted.
[2019-08-28 10:57:30,430] INFO in app: Connection accepted
[2019-08-28 10:57:30,520] INFO in app: Connected Message received: {"event":"connected","protocol":"Call","version":"0.2.0"}
[2019-08-28 10:57:30,521] INFO in app: Start Message received: {"event":"start","sequenceNumber":"1",
"start":{"accountSid":"AC1b32414e8ab41e56e6393bcbba7d5a9d",
"streamSid":"MZc3320b5e6fba10a11d7c96fe1903e3f0",
"callSid":"CA77145f1c2f9166cab03d083d5804d9ae",
"tracks":["inbound"],
"mediaFormat":{"encoding":"audio/x-mulaw","sampleRate":8000,"channels":1},
"customParameters":{"hello":"HelloValue"}
},
"streamSid":"MZc3320b5e6fba10a11d7c96fe1903e3f0"}
[2019-08-28 10:57:30,522] INFO in app: Media message: {
   "event":"media","sequenceNumber":"2",
   "media":{"track":"inbound","chunk":"1","timestamp":"102",
   "payload":"fvz+fXx9fXv//v///P5+/v3+fv/ ... +/fr7/v7+fHt9/g=="},
   "streamSid":"MZc3320b5e6fba10a11d7c96fe1903e3f0"
}
[2019-08-28 10:57:30,522] INFO in app: Payload is: fvz+fXx9fXv//v///P5+/v3+fv/ ... +/fr7/v7+fHt9/g==
[2019-08-28 10:57:30,522] INFO in app: That's 160 bytes
[2019-08-28 10:57:30,523] INFO in app: Additional media messages from WebSocket are being suppressed....
[2019-08-28 10:57:37,480] INFO in app: Stop Message received: {
"event":"stop","sequenceNumber":"352","streamSid":"MZc3320b5e6fba10a11d7c96fe1903e3f0",
"stop":{"accountSid":"AC1b32414e8ab41e56e6393bcbba7d5a9d","callSid":"CA77145f1c2f9166cab03d083d5804d9ae"}
}
[2019-08-28 10:57:37,481] INFO in app: Connection closed. Received a total of 352 messages

````

--------------------------------------------------------------------------------
## Writing a WebSocket server in Java

https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API/Writing_a_WebSocket_server_in_Java

--------------------------------------------------------------------------------
Cheers...
