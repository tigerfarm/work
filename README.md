# Working with GitHub, Heroku, and the npm utility

In this repository are my sample programs which are works in progress.

Following are steps I use to work with GitHub and Heroku to create applications,
and create my personal website [https://tigerfarmpress.com](https://tigerfarmpress.com).

QR code generator
https://www.qr-code-generator.com/
Can generate a QR code that has a text message
or a forwarding link.

--------------------------------------------------------------------------------
### UNIX Commands

Count files in a directory.
````
$ ls -l *.js | wc -l
````

--------------------------------------------------------------------------------
## Create a GitHub Repository that will be deployed to Heroku

#### Create a new GitHub repository.

On your GitHub repository home page, add a new repository by 
clicking the "+" icon (top right), 
and clicking New repository.

To make it private, go to Settings/General/Danger Zone/Change repository visibility, click Change visibility. Select Make private.

Create a local project repository directory on your computer.
````
cd /Users/user/Projects/
$ mkdir myapp
$ cd myapp
````

In your repository directory, initialize the GitHub repository.
````
git init
git add .
git commit -am "first commit"
git branch -M main
git remote add origin https://github.com/tigerfarm/tfpfilesOther.git
git remote set-url origin https://g...hU@github.com/tigerfarm/tfpfilesOther.git (see Account.txt sample)
git push -u origin main
````

#### Use an Existing GitHub repository.

If the repository exists on GitHub, can clone the repository using command line.
For example,
````
cd /Users/user/Projects/
$ mkdir notify
$ cd notify/

$ git clone https://github.com/YOUR-USERNAME/YOUR-REPOSITORY
--- example ---
$ git clone https://github.com/TwilioDevEd/notifications-quickstart-android
...
$ ls -l
notifications-quickstart-android
````

Add files that are required to deploy to Heroku.

Required for Heroku, the app information.

##### Update remote URL for GitHub command line access Authentication:
````
git remote set-url origin https://<token>@github.com/<account>/<repository>.git
git remote set-url origin https://gh...hU@github.com/tigerfarm/work.git     (see doc: 00-Acc.txt)
````
Generating a token:
https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token

Daily use authentication.
````
$ heroku login
heroku: Press any key to open up the browser to login or q to exit: 
Opening browser to https://cli-auth.heroku.com/auth/cli/browser/cd...i0
Logging in... done
Logged in as t...@gmail.com
$ git push heroku master
````

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
Ignoring files or directories by adding the file name into: ".gitignore".
If the file or directory has already been uploaded, use the following to remove it from the repository.
Once removed, it will no longer upload.

Example remove all VB EXE files.
Add into: ".gitignore"
````
...
/vb/*.exe
...
````
Remove from GitHub:
````
$ cd /.../Projects/work
$ git rm --cached ./vb/*.exe
rm 'vb/hello.exe'
...
$ git commit -am "update"
[main 4397163] update
 8 files changed, 1 insertion(+), 1 deletion(-)
 delete mode 100644 vb/hello.exe
...
````

Example remove a single file:
````
$ git rm --cached fcmNewJSON.md
rm 'fcmNewJSON.md'
git add .
$ git commit -am "update"
...
 delete mode 100644 fcmNewJSON.md
$ git push -u origin main
````

Other examples remove commands:
````
$ git rm --cached FILENAME
$ git rm --cached derby.log

$ git rm -r DIRECTORY-NAME
$ git rm -r dist
Example:
$ git rm -r golang/vendor
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
$ heroku create tfpapp
Creating ⬢ tfpapp... done
https://tfpconversations.herokuapp.com/ | https://git.heroku.com/tfpapp.git
````

Configure GitHub repository to Heroku app.
````
$ heroku git:remote -a tfpapp
set git remote heroku to https://git.heroku.com/tfpapp.git
````

Push the GitHub repository to Heroku.
````
$ git push heroku master
... Installs the GitHub repository, myapp.git, to Heroku
$ 
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
--- or ---
$ heroku logs --tail -a tfpapp
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

I had the following issue.
Ran the "config" command to use 150 MiB, and now the push works.
````
$ git push -u origin master
...
Compressing objects: 100% (32/32), done.
error: RPC failed; HTTP 500 curl 22 The requested URL returned error: 500
send-pack: unexpected disconnect while reading sideband packet
Writing objects: 100% (32/32), 49.46 MiB | 2.90 MiB/s, done.
Total 32 (delta 6), reused 2 (delta 0), pack-reused 0
fatal: the remote end hung up unexpectedly
Everything up-to-date

$ git config --global http.postBuffer 157286400
$ git push -u origin master
... ran fine.
````

Note, this will override any new updates with the current directory updates.
````
$ git push -u --force origin master
````

Check build packs. Set a build pack.
````
$ heroku buildpacks 
$ heroku buildpacks:set heroku/nodejs
````

Get account information,
````
$ heroku ps 
Free dyno hours quota remaining this month: 734h 46m (73%)
Free dyno usage for this app: 8h 53m (0%)
For more information on dyno sleeping and how to upgrade, see:
https://devcenter.heroku.com/articles/dyno-sleeping
````

#### Other Heroku commands

````
$ heroku help
CLI to interact with Heroku
VERSION
  heroku/7.56.1 darwin-x64 node-v12.21.0
USAGE
  $ heroku [COMMAND]
COMMANDS
  access          manage user access to apps
...
````
Restart a dyno.
````
$ heroku restart 
Restarting dynos on * tfpecho... done
/Users/dave/tfpecho
$
````

--------------------------------------------------------------------------------
### Using Custom Domains with Heroku

I want to point www.tigerfarmpress.com and tigerfarmpress.com to my website provider, Heroku.
I have my new website up and running on the site.
Heroku instructions say to add a CNAME DNS record to point www.tigerfarmpress.com to the corresponding Heroku DNS value.

Here is their data instruction:
````
Subdomain: www.tigerfarmpress.com 
Record type: CNAME
Value: gl...bf.herokudns.com
````
From the [Dreamhost panel](https://panel.dreamhost.com/index.cgi)  add DNS records.
````
 	A 	34.200.203.60 	
  	TXT 	dr...6l.herokudns.com 	
www  	CNAME 	gl...bf.herokudns.com
````

https://devcenter.heroku.com/articles/custom-domains
````
$ heroku domains:add www.tigerfarmpress.com
Adding www.tigerfarmpress.com to : tfpdocroot... done
 ▸    Configure your app's DNS provider to point to the DNS Target globular-cranberry-tg035sigwv24v0lxpttgxxbf.herokudns.com.
 ▸    For help, see https://devcenter.heroku.com/articles/custom-domains

The domain www.tigerfarmpress.com has been enqueued for addition
 ▸    Run heroku domains:wait 'www.tigerfarmpress.com' to wait for completion

$ heroku domains
=== tfpdocroot Heroku Domain
tfpdocroot.herokuapp.com

=== tfpdocroot Custom Domains
Domain Name             DNS Record Type  DNS Target
──────────────────────  ───────────────  ─────────────────────────────────────────────────────────
tigerfarmpress.com      ALIAS or ANAME   dr...6l.herokudns.com
www.tigerfarmpress.com  CNAME            gl...bf.herokudns.com
````

-----------------------------
#### Set custom domain DNS records

https://panel.dreamhost.com

A record for ".tigerfarmpress.com".
````
Record 	Name 	Target
CNAME 	www 	gl...bf.herokudns.com.
````
+ Set.
````
$ heroku domains:add www.example.com
````
+ Confirm.
````
$ host www.example.com
www.example.com is an alias for gl...bf.herokudns.com.
...
````

--------------------------------------------------------------------------------
### Heroku Dyno Types and billing

````
https://devcenter.heroku.com/articles/dyno-types
Dyno Type  Memory (RAM)  CPU Share  Compute  Dedicated  Sleeps
free       512 MB        1x         1x-4x    no         yes
hobby      512 MB        1x         1x-4x    no         no
````

+ Costs: click [here](https://devcenter.heroku.com/articles/usage-and-billing) for dashboard link.
[Pricing details](https://www.heroku.com/pricing).
````
Dyno Type  Price per dyno/month
free       $0
hobby      $7
...
````

+ Change Dyno type in the dashboard or from command line. I upgraded to Hobby version.
https://dashboard.heroku.com/apps/tfpdocroot/resources
+ Set type from command line.
````
heroku ps:type hobby
````

--------------------------------------------------------------------------------
### In Heroku, Set Up Certificate (HTTPS) for Domain Name

A Heroku Free dyno version, no SSL certificate will not work with my domain name.
However, the deployment does have HTTPS for the deployment Heroku subdomain name (*.herokuapp.com).
````
$ heroku certs -a tfpdocroot
* tfpdocroot has no SSL certificates.
Use heroku certs:add CRT KEY to add one.
````

Following are the steps to enable HTTPS for my domain name using Heroku Automatic Certificate Management (ACM).
Click [here](https://devcenter.heroku.com/articles/automated-certificate-management) for Heroku document reference.

+ Open an Heroku account.
+ Deploy GitHub repository to Heroku.
+ Log into the [Heroku dashboard](https://dashboard.heroku.com).
+ Add a credit card into Heroku [Manage Account/Billing](https://dashboard.heroku.com/account/billing).
+ Go to your deployment's resources: https://dashboard.heroku.com/apps/tfpdocroot/resources
+ Configure your dyno to be a paid version. I use Hobby, the first step up from Free.
+ Point your DNS entries to your Heroku deployment (see above).
+ Run the following commands

````
$ heroku certs:auto:enable
Enabling Automatic Certificate Management... starting. See status with heroku certs:auto or wait until active with heroku certs:auto:wait
=== Your certificate will now be managed by Heroku.  Check the status by running heroku certs:auto.

$ heroku certs:auto
=== Automatic Certificate Management is enabled on tfpdocroot

Certificate details:
Common Name(s): www.tigerfarmpress.com
                tigerfarmpress.com
Expires At:     2019-11-13 15:10 UTC
Issuer:         /C=US/O=Let's Encrypt/CN=Let's Encrypt Authority X3
Starts At:      2019-08-15 15:10 UTC
Subject:        /CN=www.tigerfarmpress.com
SSL certificate is verified by a root authority.

Domain                  Status       Last Updated
──────────────────────  ───────────  ────────────
tigerfarmpress.com      Cert issued  1 minute
www.tigerfarmpress.com  Cert issued  1 minute

$ heroku certs -a tfpdocroot
Name               Common Name(s)                              Expires               Trusted  Type
─────────────────  ──────────────────────────────────────────  ────────────────────  ───────  ────
stegosaurus-95825  www.tigerfarmpress.com, tigerfarmpress.com  2019-11-13 15:10 UTC  True     ACM
````

--------------------------------------------------------------------------------
## Working the npm utility

Run the following when npm is not found.
````
$ brew reinstall node
...
$ ls /opt/homebrew/bin/npm
/opt/homebrew/bin/npm
$ echo PATH
/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/usr/local/share/dotnet:~/.dotnet/tools:/Library/Apple/usr/bin:/Library/Frameworks/Mono.framework/Versions/Current/Commands
````

View your version.
````
$ npm -v 
7.18.1
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

Twilio package commands.
````
+ Show: latest version of module that is available.
$ npm view twilio version
5.0.4

+ Show: installed module version.
$ npm view twilio
twilio@5.0.4 | MIT | deps: 7 | versions: 293
A Twilio helper library
https://github.com/twilio/twilio-node#readme

+ Install a specific version and confirm the version.
$ npm install twilio@5.0.4
...
$ npm list twilio
Projects@ /Users/dave/Projects
└── twilio@5.0.4
...
$ npm view twilio

````

View node.js module information.
````
$ npm show express
express@4.17.1 | MIT | deps: 30 | versions: 264
...

$ npm update -g twilio-cli

$ npm -v twilio
7.24.0
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
## Trying to upgrade my Mac PHP version.
````
$ brew info php71
...
$ /usr/local/opt/php\@7.1/bin/php -version
PHP 7.1.30 (cli) (built: Jun 17 2019 19:42:18) ( NTS )
Copyright (c) 1997-2018 The PHP Group
Zend Engine v3.1.0, Copyright (c) 1998-2018 Zend Technologies
    with Zend OPcache v7.1.30, Copyright (c) 1999-2018, by Zend Technologies

$ export PATH="/usr/local/opt/php\@7.1/bin/:$PATH"
````

--------------------------------------------------------------------------------
````
$ heroku buildpacks:clear

+ Create the Heroku app with the require buildpacks.
++ Have the main one that is to run the webserver, the last buildpack. In my case, Node.
heroku apps:create tighttp
heroku buildpacks:add --index 1 heroku/php
heroku buildpacks:add --index 2 heroku/nodejs
heroku buildpacks
````
---------------------
+ GitHub repository requires the following in the top directory:
````
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
````
---------------------
+ Deploy the repository to Heroku.
````
git push heroku master
````
+ Test.
++ My Node program: webserver.js, is running and PHP is available.

+ Log into the Heroku app and list the buildpacks.
````
$ heroku run /bin/bash
Running /bin/bash on : tighttp... up, run.3791 (Free)
$ ls -l .heroku/
total 12
drwx------  2 u48201 dyno 4096 Apr 30 20:45 heroku-nodejs-plugin
drwx------  6 u48201 dyno 4096 Jul 25 23:23 node
drwx------ 14 u48201 dyno 4096 Jul 25 23:23 php
$
````
+ If changes are made, do the following:
````
git add .
git commit -am "updates"
git push -u origin master
git push heroku master
````
--------------------------------------------------------------------------------
## Tomcat

Download into a work directory, for example:
````
/Users/.../Applications
````

Unzip and simplify the name.
````
$ unzip apache-tomcat-8.5.43.zip 
...
$ mv apache-tomcat-8.5.43 tomcat
/tomcat
````

Startup.
````
$ cd /Users/.../Applications/tomcat/bin
$ chmod u+x startup.sh
$ chmod u+x catalina.sh 
$ ./startup.sh
Using CATALINA_BASE:   /Users/.../Applications/tomcat
Using CATALINA_HOME:   /Users/.../Applications/tomcat
Using CATALINA_TMPDIR: /Users/.../Applications/tomcat/temp
Using JRE_HOME:        /Library/Java/JavaVirtualMachines/jdk1.8.0_131.jdk/Contents/Home
Using CLASSPATH:       /Users/.../Applications/tomcat/bin/bootstrap.jar:/Users/.../Applications/tomcat/bin/tomcat-juli.jar
Tomcat started
$
````

View the process.
````
$ ps -ef | grep tomcat
````
View the default home page in the browser:
http://localhost:8080/
or
http://localhost:8080/index.jsp

Actual page is:
/Users/.../Applications/tomcat/webapps/ROOT/index.jsp
````
+ Shutdown.
$ cd /Users/.../Applications/tomcat/bin
$ chmod u+x shutdown.sh
$ ./shutdown.sh
...
$
````
I upgraded my IDE for Java EE, and linked in Tomcat.
+ When linking in Tomcat, I was asked for a Catalina userid/password. I used: tomcat/password.
I'm using Apache NetBeans 11.1. I wrote a send SMS servlet.
+ When I called the servlet, an SMS message was sent successfully.

--------------------------------------------------------------------------------
### Apache NetBeans

Install location:
````
ls "/Applications/NetBeans/Apache NetBeans 12.4.app/Contents/Resources/NetBeans/netbeans/"
...
$ cat "/Applications/NetBeans/Apache NetBeans 12.4.app/Contents/Resources/NetBeans/netbeans/etc/netbeans.conf"
````
Starting NetBeans with a memory usage size override.
This helped the running 
````
/Applications/NetBeans/Apache\ NetBeans\ 12.4.app/Contents/Resources/NetBeans/netbeans/bin/netbeans -J-XX:MaxPermSize=1024m &
````
--------------------------------------------------------------------------------
### Testing

How to reduce the time to deploy to Heroku from GitHub?

Since Heroku deploy is bundle, each deploy much re-bundle all files into what is called a slug.
Therefore, cannot replace a single deployed file, can only re-deploy all files.

https://devcenter.heroku.com/articles/slug-compiler

If you've already committed files, after adding the filename to the gitignore,
You need to also remove them from being tracked (git rm --cached) and commit that removal.

Using AWS S3

https://aws.amazon.com/s3/pricing/

Pay only for what you use. There is no minimum fee.

https://devcenter.heroku.com/articles/using-amazon-s3-for-file-uploads-with-java-and-play-2

https://devcenter.heroku.com/articles/s3-upload-php

----------------------------------------------------------------------------------
### How to run Ngrok

+ Download Ngrok zip file and unzip it.
+ Move the unzip file to a location of choosing. Or move to a directory in your PATH environment variable.
````
$ sudo mv ngrok /usr/local/bin
````
Run it. 
````
$ ngrok http 3000
...
Forwarding                    http://360b5f748544.ngrok.io -> http://localhost:3000                                                                                                                                                                    
Forwarding                    https://360b5f748544.ngrok.io -> http://localhost:3000
...
````
The above indicates that HTTP reqeusts to
````
https://360b5f748544.ngrok.io
````
Will be forward to:
````
http://localhost:3000
````
Effectively making the internal URL http://localhost:3000, available on the internet.

--------------------------------------------------------------------------------
+++ How to Remove All History for a GitHub Repository

Tested where the main branch was "main".
````
$ git checkout --orphan latest_branch
Switched to a new branch 'latest_branch'
$ git add -A
$ git commit -am "commit message"
[latest_branch (root-commit) 0f2ac40] commit message
 51 files changed, 3134 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
...
$ git branch -D main
Deleted branch main (was f21a7b2).
$ git branch -m main
$ git push -f origin main
Enumerating objects: 60, done.
...
... main -> main (forced update)
$
````

Tested where the main branch was "master" which is changed to be "main".
````
$ git checkout --orphan latest_branch
Switched to a new branch 'latest_branch'
$ git add -A
$ git commit -am "commit message"
[latest_branch (root-commit) 0f2ac40] commit message
 51 files changed, 3134 insertions(+)
 create mode 100644 .gitignore
 create mode 100644 README.md
...
$ git branch -D master
Deleted branch main (was f21a7b2).
$ git branch -m main
$ git push -f origin main
Enumerating objects: 60, done.
...
... main -> main (forced update)
$
````

--------------------------------------------------------------------------------
Cheers...
