package main

import (
	"encoding/json"
	"encoding/xml"
	"fmt"
	"io/ioutil"
	"log"
	"net/http"
	"net/url"
	"os"
	"time"

	twilioclient "github.com/twilio/twilio-go/client"
)

func signature_validation(passed_Auth_Token string, full_url_path string, params url.Values, received_signature string) bool {
	formvals := make(map[string]string)

	for k, v := range params {
		formvals[k] = v[0]
	}
	validator := twilioclient.NewRequestValidator(passed_Auth_Token)
	return validator.Validate(full_url_path, formvals, received_signature)
}

type icanhazresponse struct {
	ID     string `json:"id"`
	Joke   string `json:"joke"`
	Status int    `json:"status"`
}

func getDadJoke(w http.ResponseWriter, r *http.Request) {
	fmt.Println(r.Header.Get("x-twilio-signature"))
	baseurl := "https://icanhazdadjoke.com/"

	client := &http.Client{
		Timeout: time.Second * 10,
	}
	req, err := http.NewRequest("GET", baseurl, nil)
	req.Header.Set("Accept", "Application/JSON")
	res, err := client.Do(req)

	if err != nil {
		log.Fatal(err)
	}

	defer res.Body.Close()

	body, err := ioutil.ReadAll(res.Body)

	var responseData icanhazresponse

	json.Unmarshal(body, &responseData)
	fmt.Println(responseData.Status)

	if r.Header.Get("x-twilio-signature") != "" {
		err := r.ParseForm()
		if err != nil {
			log.Fatal(err)
		}
		AuthToken := os.Getenv("TWILIO_AUTH_TOKEN")

		requestedURL := "https://example.com/jokes"

		isValidated := signature_validation(AuthToken, requestedURL, r.Form, r.Header.Get("x-twilio-signature"))
		fmt.Println(isValidated)

		w.Header().Set("Content-Type", "application/xml")
		twiML_res := &twiML_Message{}
		twiML_res.Message = responseData.Joke
		out, _ := xml.MarshalIndent(twiML_res, " ", "  ")
		fmt.Fprint(w, xml.Header+string(out))
	} else {
		fmt.Fprint(w, "<html><head><title>"+responseData.ID+"</title><style>body {background-color: #A9A9A9;}	.main {margin: auto;color: #454545;font-size: 4vw;} .parent {position: relative;top: 5%;width: 98%;text-align:center;}</style></head><body><div class='parent'><p>"+responseData.Joke+"</p></div></body></html>")
	}
}