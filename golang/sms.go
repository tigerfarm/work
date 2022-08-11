package main

import twilio "github.com/twilio/twilio-go"
import openapi "github.com/twilio/twilio-go/rest/api/v2010"
import "os"
import "fmt"

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
    client.ApiV2010.CreateMessage(params)
    // _, err := client.ApiV2010.CreateMessage(params)
    // if err != nil {
    //     fmt.Println(err.Error())
    // } else {
    //     fmt.Println("++ SMS sent.")
    // }
}