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
    "url": "https://github.com/heroku/myapp"
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

In your repository directory, initialize the GitHub repository.
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

Run the following from your repository directory.
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

Incase of an application crash, restart it.
````
$ heroku restart
````
How to remove a remote setting
````
$ git remote remove origin
````
View a remote setting.
````
$ git remote -v
heroku	https://git.heroku.com/tigtaskrouterworker.git (fetch)
heroku	https://git.heroku.com/tigtaskrouterworker.git (push)
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
-----------------------------
+++ Custom Domains

https://devcenter.heroku.com/articles/custom-domains

+ Set custom domain DNS record.
https://panel.dreamhost.com

Record 	Name 	Target
CNAME 	www 	whispering-willow-5678.herokudns.com.

+ Set.
$ heroku domains:add www.example.com

+ Confirm.
$ host www.example.com
www.example.com is an alias for whispering-willow-5678.herokudns.com.
...

-----------------------------
+++ Dyno Types and billing

https://devcenter.heroku.com/articles/dyno-types
Dyno Type  Memory (RAM)  CPU Share  Compute  Dedicated  Sleeps
free       512 MB        1x         1x-4x    no         yes
hobby      512 MB        1x         1x-4x    no         no

+ Costs:
https://devcenter.heroku.com/articles/usage-and-billing
Dyno Type  Price per dyno/month
free       $0
hobby      $7
...

+ Change Dyno type in the dashboard.
https://dashboard.heroku.com/apps/tigsync/resources

+ Set type from command line.
heroku ps:type hobby

+ Heroku ticket:
https://help.heroku.com/tickets/746659
https://help.heroku.com/sharing/68c39de7-1da3-4ee9-a962-e6484cd6b2ee
++ If I upgrade 3 of my Heroku apps from free to hobby, will the cost be $7/month, or $21/month?

https://www.heroku.com/pricing

--------------------------------------------------------------------------------
## Working the npm utility

View your version.
````
$ npm -v 
6.9.0
````

Add yourself as a user.
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
... }
````

View node.js module information.
````
$ npm show twilio-chat
twilio-chat@3.2.3 | MIT | deps: 11 | versions: 268
Twilio Chat service client library
...

$ npm view twilio

twilio@3.31.0 | MIT | deps: 10 | versions: 154
...
````

#### Create a module (I haven't tried this)

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
+++ Trying to upgrade my Mac PHP version.

$ brew info php71
...
$ /usr/local/opt/php\@7.1/bin/php -version
PHP 7.1.30 (cli) (built: Jun 17 2019 19:42:18) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.1.0, Copyright (c) 1998-2018 Zend Technologies
    with Zend OPcache v7.1.30, Copyright (c) 1999-2018, by Zend Technologies

$ export PATH="/usr/local/opt/php\@7.1/bin/:$PATH"


--------------------------------------------------------------------------------

$ heroku buildpacks:clear

+ Create the Heroku app with the require buildpacks.
++ Have the main one that is to run the webserver, the last buildpack. In my case, Node.
heroku apps:create tighttp
heroku buildpacks:add --index 1 heroku/php
heroku buildpacks:add --index 2 heroku/nodejs
heroku buildpacks

---------------------
+ GitHub repository requires the following in the top directory:

$ cat composer.json
{}

$ cat Procfile
web: node webserver.js

$ cat app.json
{
    "name": "Sample Node Web Server Application",
    "description": "This application is a sample application.",
    "repository": "https://github.com/tigerfarm/tighttp",
    "logo": "http://tigerfarmpress.com/images/topImgLeft.jpg",
    "keywords": ["node", "express", "heroku"]
}

$ cat package.json
{
  "name": "nodewebserver",
...
}

---------------------
+ Deploy the repository to Heroku.
git push heroku master

+ Test.
++ My Node program: webserver.js, is running and PHP is available.

+ Log into the Heroku app and list the buildpacks.
$ heroku run /bin/bash
Running /bin/bash on : tighttp... up, run.3791 (Free)
$ ls -l .heroku/
total 12
drwx------  2 u48201 dyno 4096 Apr 30 20:45 heroku-nodejs-plugin
drwx------  6 u48201 dyno 4096 Jul 25 23:23 node
drwx------ 14 u48201 dyno 4096 Jul 25 23:23 php
$

+ If changes are made, do the following:
git add .
git commit -am "updates"
git push -u origin master
git push heroku master

--------------------------------------------------------------------------------
Cheers...
