# Manage Google Contacts

[A getting started blog](https://www.nylas.com/blog/google-people-api-vs-contacts-api-migration)

Getting started using the Google People API.
https://developers.google.com/people/v1/getting-started

Step 3. Set up your app,
+ [Authorization](https://developers.google.com/people/v1/how-tos/authorizing): Before making an API request, set up authorization.
+ [Client libraries](https://developers.google.com/people/v1/libraries) such as Java or PHP.
+ [Quick start sample code](https://developers.google.com/people/quickstart/js) which shows how to fetch a list of contacts.

--------------------------------------------------------------------------------
## Authorization

Authorization credentials for a desktop application. 
To learn how to create credentials for a desktop application, refer to 
[Create credentials](https://developers.google.com/workspace/guides/create-credentials).
[OAuth client ID credentials](https://developers.google.com/workspace/guides/create-credentials#oauth-client-id)

[API Key](https://developers.google.com/people/v1/how-tos/authorizing#APIKey): Acquiring and using an API key.
[Credentials page](https://console.developers.google.com/apis/credentials), open in the API Console.

API keys: The key identifies your project.
It provides API access, quota, and reports.
The API supports several types of restrictions on API keys. 
Create an API key in the Console by clicking Create credentials > API key.

This key is unrestricted. To prevent unauthorized use, we recommend restricting where and for which APIs it can be used. 
Edit API key to add restrictions. Learn more 

You can restrict the key before using it in production by clicking Restrict key and selecting one of the Restrictions

After you have an API key, your application can append the query parameter key=yourAPIKey to all request URLs.

--------------------------------------------------------------------------------
## Coding

Get a library. I'm using [Java](https://developers.google.com/people/v1/libraries#java)
[Download](https://search.maven.org/search?q=g:com.google.apis%20AND%20a:google-api-services-people) the Java library.
I downloaded: google-api-services-people-v1-rev20220301-1.32.1.jar

[Java quickstart](https://developers.google.com/people/quickstart/java):
create a simple Java command-line application that makes requests to the People API.

[Method: people.connections.list](https://developers.google.com/people/api/rest/v1/people.connections/list)

[Node.JS](https://developers.google.com/people/quickstart/nodejs)

[Create a project](https://developers.google.com/workspace/guides/create-project) and enable the People API.
A Google Cloud Platform project with the API enabled.
````
Service name: people.googleapis.com 
````

sample command-line application to makes People API requests.
````
$ npm install googleapis@39 --save
...
$ npm audit fix --force
...
````

--------------------------------------------------------------------------------
Cheers...
