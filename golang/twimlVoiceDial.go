package main
// https://www.twilio.com/docs/voice/quickstart/go
import (
    "fmt"
    "github.com/twilio/twilio-go/twiml"
)
func main() {
    fmt.Println("+++ Go Twiml.")
    var response = &twiml.VoiceDial{}
    // response.Number = ""
    // response.Number = "415-123-4567"
    response.Number = "sip:jack@example.com?x-mycustomheader=foo&x-myotherheader=bar"
    // Generate TwiML response
    twiml, _ := twiml.Voice([]twiml.Element{response})
    fmt.Println(twiml)
    fmt.Println("+++ Exit.")
}