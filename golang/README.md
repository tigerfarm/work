# Geting Started with Golang

The [Go programming language](https://en.wikipedia.org/wiki/Go_(programming_language)),
often referred to as Golang, is a compiled programming language. 
Go was designed at Google in 2007, first public release 2009, version 1.0.
It's widely used in production at Google.
It's syntactically similar to C, but with memory safety, garbage collection, structural typing

Characteristics from other languages:
+ Static typing and run-time efficiency (like C)
+ Readability and usability (like Python or JavaScript)
+ High-performance networking and multiprocessing

Characteristics:
+ Fast compilation
+ Remote package management (go get)
+ A desire to keep the language specification simple enough to hold in a programmer's head
+ Less complex than C++, with the goal to run as fast.

Syntax:
+ Variable declaration uses type inference such as i := 3 or s := "Hello, world!"
+ Semicolons still terminate statements; but are implicit when the end of a line occurs.
+ Methods may return multiple values, and returning a "result, err" pair(see SMS sample below)
is the conventional way a method indicates an error to its caller.
+ Uses nil instead of null.

#### Links

[Golang website](https://go.dev)

[Getting started](https://go.dev/learn/) with a download link.

[Install guide](https://go.dev/doc/install) with how to run Go.

[Run sample programs online](https://go.dev/tour/welcome/1).

[Twilio Golang](https://github.com/twilio/twilio-go) GitHub repository has sample programs.

[Blog, How to Send an SMS with Golang](https://www.twilio.com/blog/send-sms-30-seconds-golang).
Note, has outdated syntax. Use the above sample programs.

## Install and Test Golang Command line

Install,
+ [Getting started](https://go.dev/learn/) with a download link.
+ I downloaded: https://go.dev/dl/go1.19.darwin-amd64.pkg
+ I ran the package installer. It pause for a while, then completed.

Post install, run the following to test Go commandline.
````
$ ls /usr/local/go
...
$ PATH=$PATH:/usr/local/go/bin
$ go version
go version go1.19 darwin/amd64
$
````

## Run Hello World Golang Program

Reference: [Tutorial: Get started with Go](https://go.dev/doc/tutorial/getting-started).

In a working directory, create a Hello World program.
````
package main
import "fmt"
func main() {
    fmt.Println("Hello 世界")
}
````

Sample run:
````
$ go mod init hello
go: creating new go.mod: module hello
go: to add module requirements and sums:
	go mod tidy
$ ls -l
-rw-r--r--  1 dave  staff   22 Aug 11 09:51 go.mod
-rw-r--r--  1 dave  staff   74 Aug 11 09:43 hello.go
$ go run hello.go
Hello 世界
````
Make a change to hello.go.
````
    fmt.Println("Hello 世界, 早上")
````
Re-run.
````
$ go run hello.go
Hello 世界, 早上
````

Optional running method: 
````
Make a change to hello.go.
Update the run time file.
Re-run.

$ go mod tidy
$ go run .
Hello 世界, 早上 2
````

--------------------------------------------------------------------------------
### Twilio Golang Sample Program to Send an SMS


In your working directory, create sms.go based on the 
[Twilio Golang samples](https://github.com/twilio/twilio-go).
This sample uses similar program statements to other language samples.
````
package main

import twilio "github.com/twilio/twilio-go"
import openapi "github.com/twilio/twilio-go/rest/api/v2010"
import "os"
import "fmt"
import "encoding/json"

func main() {
    fmt.Println("+++ Send an SMS.")
    accountSid := os.Getenv("MASTER_ACCOUNT_SID")
    authToken := os.Getenv("MASTER_AUTH_TOKEN")
    fmt.Println("+ accountSid = " + accountSid)
    fmt.Println("+ authToken = " + authToken)
    client := twilio.NewRestClientWithParams(twilio.ClientParams{
         Username: accountSid,
         Password: authToken,
    })
    params := &openapi.CreateMessageParams{}
    params.SetFrom(os.Getenv("MASTER_PHONE_NUMBER_1"))
    params.SetTo(os.Getenv("MY_PHONE_NUMBER"))
    params.SetBody("Hello from Golang 1")
    fmt.Println("+ Send the SMS.")
    resp, err := client.Api.CreateMessage(params)
    if err != nil {
        fmt.Println(err.Error())
    } else {
        response, _ := json.Marshal(*resp)
        fmt.Println("++ SMS sent, response: " + string(response))
    }
}
````
Set environment variables that are used in the above program.
````
$ MASTER_ACCOUNT_SID=ACa...3
$ MASTER_AUTH_TOKEN=8...3
$ MASTER_PHONE_NUMBER_1=+16505551111
$ MY_PHONE_NUMBER=+16505552222
````
Run sms.go.

Remove the Hello World go.mod.
````
$ rm go.mod
````
Init go.mod: create the sms go.mod.
Get the Twilio module.
Run sms.go.
````
$ go mod init sms
$ go get github.com/twilio/twilio-go
go: added ...
...
go: added github.com/twilio/twilio-go v0.26.0
$ go run sms.go
+++ Send an SMS.
+ accountSid = ACa...3
+ authToken = 8...3
+ Send the SMS.
++ SMS sent, response: {"account_sid":"ACa...3" ... }
````
Note, like a scripting language, you can make changes to sms.go program and rerun immediately.
````
$ go run sms.go
...
````

--------------------------------------------------------------------------------
Cheers...