# Your custom Twilio Flex Plugin

Twilio Flex Plugins allow you to customize the apperance and behavior of [Twilio Flex](https://www.twilio.com/flex). 
If you want to learn more about the capabilities and how to use the API, check out our [Flex documentation](https://www.twilio.com/docs/flex).

## Deploy

Once you are happy with your plugin, you have to bundle it, in order to deploy it to Twilio Flex.

Run the following command to start the bundling:

```bash
npm run build
```

Afterwards, you'll find in your project a `build/` folder that contains a file with the name of your plugin project.
For example `plugin-example.js`. Take this file and upload it into the Assets part of your Twilio Runtime.

Note: Common packages like `React`, `ReactDOM`, `Redux` and `ReactRedux` are not bundled with the build 
because they are treated as external dependencies so the plugin will depend on Flex which would provide them globally.


--------------------------------------------------------------------------------

+ Twilio Flex Quickstart (Advanced): Getting Started with React Plugin Development:
https://www.twilio.com/docs/flex/quickstart/getting-started-plugin

````
$ npm -v 
6.9.0
$ node -v
v10.10.0

$ npm install -g create-flex-plugin
...
+ create-flex-plugin@2.7.0
added 282 packages from 243 contributors in 10.553s

$ pwd
/.../Projects/work/flex
$ create-flex-plugin plugin-p1
? Twilio Flex Account SID AC...
   │   Your Twilio Flex Plugin project has been successfully created!   │
   │   Setup:                                                           │
   │   $ cd plugin-p1/                                                  │
   │   $ npm install                                                    │
   │   $ npm start                                                      │
   │   $ npm run build                                                  │
   │                                                                    │
   │   For more info check the README.md file or go to:                 │
   │   ➡ https://www.twilio.com/docs/flex     
$ cd plugin-p1
$ npm install
...
$ npm start
...
````
Then access the app from your browser: http://localhost:3000/

Click, Log in with Twilio, to log into the application.

--------------------------------------------------------------------------------
Cheers