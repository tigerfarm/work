package main
// https://www.twilio.com/docs/voice/quickstart/go
import (
    "fmt"
    "github.com/twilio/twilio-go/twiml"
)
func main() {
    fmt.Println("+++ Generate Twiml.")
    dial := &twiml.VoiceDial{}
    sip := &twiml.VoiceSip{}
    sip.SipUrl = "sip:jack@example.com?x-mycustomheader=foo&x-myotherheader=bar"
    dial.InnerElements = []twiml.Element{sip}   // SIP embedded(InnerElements) with the Dial tags
    twimlResult, err := twiml.Voice([]twiml.Element{dial})
    if err != nil {
        fmt.Println(err)
        return
    }
    fmt.Println(twimlResult)
    fmt.Println("+++ Exit.")
}

// +++ Generate Twiml.
// <?xml version="1.0" encoding="UTF-8"?><Response><Dial><Sip>sip:jack@example.com?x-mycustomheader=foo&amp;x-myotherheader=bar</Sip></Dial></Response>
// +++ Exit.
