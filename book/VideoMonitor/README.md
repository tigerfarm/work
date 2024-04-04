# My Twilio Video Room Monitor Implementation Steps

Following, are the steps I used to implement and test Frontline.

Links:
+ [GitHub repository](https://github.com/twilio/twilio-video-room-monitor.js)

Steps I'm going through.
````
I created a working directory.
Downloaded the respository zip file into the directory.
I ran:
$ npm install @twilio/video-room-monitor --save
...
$ npm start
[9:55:26 AM] Starting compilation in watch mode...
[9:55:29 AM] Found 0 errors. Watching for file changes.

I stopped it. Ran the other commands they had listed:
$ npm run build
...

$ npm run ts
...

$ npm test
...
Test Suites: 34 passed, 34 total
Tests:       187 passed, 187 total
Snapshots:   26 passed, 26 total
Time:        11.356 s
Ran all test suites.

$ npm run lint
...
````

The following runs a web server, to serve the JS program file.
````
$ npm run parcel:watch

> @twilio/video-room-monitor@1.0.0-dev parcel:watch
> cross-env PARCEL_TARGET=browser parcel src/index.tsx --no-hmr --out-dir dist/browser --out-file twilio-video-room-monitor.js

Server running at http://localhost:1234 
✨  Built in 5.96s.
````

### Getting Started


--------------------------------------------------------------------------------

Cheers...
