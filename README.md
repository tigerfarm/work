# Work Samples

These are my sample programs in progress.

--------------------------------------------------------------------------------
## Create a GitHub Repository and deploy it to Heroku

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
#### PHP Build file.
````
$ cat composer.json 
{
  "require-dev": {
    "heroku/heroku-buildpack-php": "*"
  }
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

#### Deploy to Heroku

Create a new Heroku app. Set the name of the Heroku app's repository. Deploy from GitHub to Heroku.
````
$ heroku create myapp
$ heroku git:remote -a myapp
$ git push heroku master
...
````
Set the environment variables.
````
$ heroku config:set ACCOUNT_SID=ACxxx...xxx
$ heroku config:set AUTH_TOKEN=xxx...xxx
$ heroku config:set TOKEN_HOST=about-time-2357.twil.io
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

Cheers...
