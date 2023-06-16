package main
import (
    "fmt"
    "github.com/twilio/twilio-go/twiml"
)
func main() {
    fmt.Println("+++ Go Twiml.")
    var msg = &twiml.MessagingMessage{}
    msg.Body = "Hello there"
    // Generate TwiML response
    twiml, _ := twiml.Messages([]twiml.Element{msg})
    fmt.Println(twiml)
    fmt.Println("+++ Exit.")
}