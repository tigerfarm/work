package main
// https://www.twilio.com/docs/voice/quickstart/go
import (
    "fmt"
    "github.com/twilio/twilio-go/twiml"
)
func main() {
    fmt.Println("+++ Go Twiml.")
    var response = &twiml.VoiceSay{}
    response.Message = "Welcome to the machine."
    twiml, _ := twiml.Voice([]twiml.Element{response})
    fmt.Println(twiml)
    fmt.Println("+++ Exit.")
}