# Work

These are my sample programs in progress.

---------------------------------------------------------------
## Create and deploy a web application to Heroku

````
$ mkdir tigtaskrouterworker
$ cd tigtaskrouterworker
````
+ Required for Heroku, a build file.
````
$ cat composer.json 
{
  "require-dev": {
    "heroku/heroku-buildpack-php": "*"
  }
}
````
+ Required for Heroku, the app information.
````
{
  "name": "TaskRouter Worker Application",
  "description": "This application is used by TaskRouter Workers to manage their TaskRouter status and accept reservations.",
  "repository": "https://github.com/tigerfarm/tigtaskrouterworker",
  "logo": "http://tigerfarmpress.com/images/topImgLeft.jpg",
  "keywords": ["php", "Twilio", "Client", "Voice"]
}
````

+ Initialize the GitHub repository.
````
$ git init
$ git remote add origin https://github.com/tigerfarm/tigtaskrouterworker.git
$ git add .
$ git commit -am "init new"
$ git push -u origin master
````

+ Create a new Heroku app. Set the name of the Heroku app's repository. Deploy from GitHub to Heroku.
````
$ heroku create tigtr
$ heroku git:remote -a tigtr
$ git push heroku master
...
remote: Verifying deploy... done.
To https://git.heroku.com/tigtaskrouterworker.git
 * [new branch]      master -> master
````

++ Test with the browser.
https://tigtr.herokuapp.com/

+ Step to update, after initialization:
````
$ git add .
$ git commit -am "update"
$ git push -u origin master
$ git push heroku master
````

+ Note, this will override any new updates with the current directory updates.
````
$ git push -u --force origin master
````

---------------------------------------------------------------

Cheers...
