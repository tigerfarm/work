# Working Ruby and the Twilio Ruby library

Ruby Twilio helper library recent release,
GitHub repository:
https://github.com/twilio/twilio-ruby

--------------------------------------------------------------------------------
## Ruby gem library management

````
$ gem list | grep twilio
twilio-ruby (5.58.2)

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
Update to most recent version:
````
$ sudo gem update 'twilio-ruby'
Updating installed gems
Updating twilio-ruby
Fetching twilio-ruby-7.0.2.gem
Successfully installed twilio-ruby-7.0.2
...
Gems updated: twilio-ruby
$ gem list | grep twilio
twilio-ruby (7.0.2, 6.4.0)
$ sudo gem uninstall twilio-ruby -v 6.4.0
Successfully uninstalled twilio-ruby-6.4.0
/Users/dave/ruby $ gem list | grep twilio
twilio-ruby (7.0.2)
````

--------------------------------------------------------------------------------
Ruby code sample into code:

Documentation links:
[API](https://www.twilio.com/docs/iam/keys/api-key) and
[library doc](https://www.twilio.com/docs/libraries/reference/twilio-ruby/5.8.0/Twilio/REST/Client.html#new_keys-instance_method)
````
#new_keys ⇒ Twilio::REST::Api::V2010::AccountContext::NewKeyInstance
Returns: (Twilio::REST::Api::V2010::AccountContext::NewKeyInstance)
The following is under "View source"):
# File 'lib/twilio-ruby/rest/client.rb', line 281
def new_keys
  self.api.v2010.account.new_keys
end

Actual code line:
new_key = @client.api.v2010.account.new_keys.create(friendly_name: 'ruby2')
````
Full program sample, [apiKeyCreate.rb](apiKeyCreate.rb).
Sample run:
````
$ ruby apiKeyCreate.rb 
+ Create API key for account: ACae...a3
SK56...22
````

--------------------------------------------------------------------------------
Cheers...

