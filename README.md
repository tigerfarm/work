# Working with GitHub, Heroku, and the npm utility

These are my sample programs in progress.

--------------------------------------------------------------------------------
## Create a GitHub Repository that will be deployed to Heroku

Create a local project repository directory on your computer.
````
$ mkdir myapp
$ cd myapp
````
Add files that are required to deploy to Heroku.

Required for Heroku, the app information.

#### Heroku repository information file.
````
{
  "name": "My Application",
  "description": "This application is my application.",
  "repository": "https://github.com/tigerfarm/myapp",
  "logo": "http://example.com/images/logo.jpg",
  "keywords": ["php", "Twilio", "Client", "Voice"]
}
````
#### PHP Build file.
````
$ cat composer.json
{
  "require-dev": {
    "heroku/heroku-buildpack-php": "*"
  }
}
````
#### Node.js uses a package file. Following is a sample I use for Twilio Chat application.
````
$ cat package.json 
{
  "name": "nodeexpress",
  "version": "0.1.0",
  "description": "Sample Node.js Express web server",
  "engines": {
    "node": "10.x"
  },
  "main": "index.js",
  "scripts": {
    "start": "node index.js"
  },
  "dependencies": {
    "express": "^4.15.2",
    "twilio": "^3.31.0",
    "twilio-chat": "^3.2.3"
  },
  "repository": {
    "type": "git",
    "url": "https://github.com/heroku/tigne"
  },
  "keywords": [
    "node",
    "twilio",
    "heroku",
    "express"
  ],
  "license": "MIT"
}
````
Ignoring files by adding the file name into: ".gitignore".
If the file has already been uploaded, use the following to remove it from the repository. Once removed, it will no longer upload.
````
$ git rm --cached FILENAME
````

#### Create a new GitHub repository.

On your GitHub repository home page, add a new repository by clicking the "+" icon (top right), and clicking New repository.

Initialize the GitHub repository.
````
$ git init
$ git remote add origin https://github.com/tigerfarm/myapp.git
$ git add .
$ git commit -am "init new"
$ git push -u origin master
...
````

--------------------------------------------------------------------------------
## Deploy to Heroku

If not logged into your Heroku account, do so.
````
$ heroku login -i
heroku: Enter your login credentials
Email: abc@example.com
Password: ********
Logged in as abc@example.com
````
Create a new Heroku app. Set the name of the Heroku app's repository. Deploy from GitHub to Heroku.
````
$ heroku create myapp
$ heroku git:remote -a myapp
$ git push heroku master
...
````
Set and view the environment variables.
````
$ heroku config:set ACCOUNT_SID=ACxxx...xxx
$ heroku config:set AUTH_TOKEN=xxx...xxx
$ heroku config:set TOKEN_HOST=about-time-2357.twil.io
$ heroku config
````

Set terminal widow to view console log messages:
````
$ heroku logs --tail
````

Test with the browser.
https://myapp.herokuapp.com/

Steps to update the GitHub repository and deployment, after initialization:
````
$ git add .
$ git commit -am "update"
$ git push -u origin master
$ git push heroku master
````

Note, this will override any new updates with the current directory updates.
````
$ git push -u --force origin master
````

--------------------------------------------------------------------------------
## Working the npm utility

````
$ npm adduser
Username: mynpmuser
Password: 
Email: (this IS public) mynpmuser@gmail.com
Logged in as mynpmuser on https://registry.npmjs.org/.
...
$

$ npm login
...
$ npm whoami
mynpmuser
````

To update npm version:
````
$ npm install -g npm
...

$ npm version
{ npm: '6.9.0',
  ares: '1.14.0',
  cldr: '33.1',
  http_parser: '2.8.0',
  icu: '62.1',
  modules: '64',
  napi: '3',
  nghttp2: '1.33.0',
  node: '10.10.0',
  openssl: '1.1.0i',
  tz: '2018e',
  unicode: '11.0',
  uv: '1.23.0',
  v8: '6.8.275.30-node.24',
  zlib: '1.2.11' }
````
$ npm show twilio-chat
twilio-chat@3.2.3 | MIT | deps: 11 | versions: 268
Twilio Chat service client library
...

$ npm view twilio

twilio@3.31.0 | MIT | deps: 10 | versions: 154
...

#### Create a module

How to video:
https://www.youtube.com/watch?v=rTsz09zRuTU

Creating Node.js modules
https://docs.npmjs.com/creating-node-js-modules

Creating a package.json file
https://docs.npmjs.com/creating-a-package-json-file

In the root directory of your Node.js module

Create a README.md test file.

Run to create a package.json file: 
https://www.youtube.com/watch?v=3I78ELjTzlQ&feature=youtu.be
````
$ npm init
name: The name of your module.
version: 1.0.0.
main: The default name is index.js.
````

````
$ cat package.json
...

$ npm version 1.0.0

$ npm publish
+ <package name>
````


Check if there's a new version: `npm outdated -g twilio-cli`
Update the CLI globally: `npm update -g twilio-cli`

--------------------------------------------------------------------------------

Cheers...
