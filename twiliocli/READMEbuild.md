# Getting Started with Twilio CLI

Twilio CLI [overview](https://www.twilio.com/cli),
[quickstart](https://www.twilio.com/docs/twilio-cli/quickstart),
[examples](https://www.twilio.com/docs/twilio-cli/examples),
[general-usage](https://www.twilio.com/docs/twilio-cli/general-usage).

Twilio CLI project repository: https://github.com/twilio/twilio-cli.

Twilio CLI project repository issues: https://github.com/twilio/twilio-cli/issues

----------------------------------------------------------------------------------
### Notes

Build issue:
https://github.com/twilio-labs/serverless-toolkit/issues/409

Clone, build, run the Serverless Toolkit.

````
twilio-labs/serverless-toolkit.git
$ git clone https://github.com/twilio-labs/serverless-toolkit
Cloning into 'serverless-toolkit'...
...
$ cd serverless-toolkit/
$ npm install
...
$ npm run bootstrap
...
````

Later, I ran the following and got an error:
````
$ npx lerna run build
lerna notice cli v4.0.0
...
node_modules/@types/prettier/index.d.ts(41,54): error TS2315: Type 'IsTuple' is not generic
...
````
-----------------------------------------
https://lerna.js.org/docs/getting-started
````
$ cd ..
$ mkdir lerna
$ cd lerna/
$ npm i nx --save-dev
...
$ npx lerna init
...
$ npx lerna@latest init
...
$ npx lerna bootstrap
lerna notice cli v5.1.8
lerna info Bootstrapping 0 package
lerna info Symlinking packages and binaries
lerna success Bootstrapped 0 package
````

-----------------------------------------
````
$ cd serverless-toolkit/
$ npm run clean
...
````

----------------------------------------------------------------------------------

Cheers...
