# Working Ruby and the Twilio Ruby library

Ruby Twilio helper library recent release,
GitHub repository:
https://github.com/twilio/twilio-ruby

--------------------------------------------------------------------------------
## Ruby gem management

````
$ gem list | grep twilio
twilio-ruby (5.58.2)

$ ruby apiKeyCreate.rb 
+ Create API key for account: ACae...a3
SK56...22

$ sudo gem install twilio-ruby -v 6.3.0
Password: ...
...
Successfully installed twilio-ruby-6.3.0
...

$ gem list | grep twilio
twilio-ruby (6.3.0, 5.58.2)

$ sudo gem uninstall twilio-ruby -v 5.58.2
Successfully uninstalled twilio-ruby-5.58.2
$ gem list | grep twilio
twilio-ruby (6.3.0)
````

--------------------------------------------------------------------------------
Cheers...
