package main
// https://www.twilio.com/blog/introducing-twilio-go-helper-library
import (
    "fmt"
    "github.com/twilio/twilio-go/twiml"
)
func main() {
    fmt.Println("+++ Generate Twiml.")
    msg := &twiml.MessagingMessage{}
    msg.Body = "Hello there"
    twimlResult, err := twiml.Messages([]twiml.Element{msg})
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(twimlResult)
    fmt.Println("+++ Exit.")
}

// +++ Generate Twiml.
// <?xml version="1.0" encoding="UTF-8"?><Response><Message>Hello there</Message></Response>
// +++ Exit.
