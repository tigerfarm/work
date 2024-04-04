package main
// https://www.twilio.com/docs/voice/quickstart/go
import (
    "fmt"
    "github.com/twilio/twilio-go/twiml"
)
func main() {
    fmt.Println("+++ Generate Twiml.")
    dial := &twiml.VoiceDial{}
    dial.Number = "+123456789"


    twimlResult, err := twiml.Voice([]twiml.Element{dial})
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(twimlResult)
    fmt.Println("+++ Exit.")
}

// +++ Generate Twiml.
// <?xml version="1.0" encoding="UTF-8"?><Response><Dial>+123456789</Dial></Response>
// +++ Exit.
