package main

import (
    "log"
    "os"
    "time"
    "github.com/twilio/twilio-go/client/jwt"
)

var accountSid string = os.Getenv("CONVERSATIONS_ACCOUNT_SID")
var apiKey string = os.Getenv("CONVERSATIONS_API_KEY")
var apiSecret string = os.Getenv("CONVERSATIONS_API_KEY_SECRET")
var serviceSid string = os.Getenv("CONVERSATIONS_SERVICE_SID")

var theVideoRoom string = "myroom"  // Optional, if creating a video token
var theIdentity string = "dave"
var expireTimeMinutes int = 10      // 10 minutes
var expireTimeSeconds int = 7200    // 7200 seconds = 2 hours

func main() {
    log.Println("+++ Generate a Twilio Conversations token.")
    log.Println("+ Time now: " + time.Now().String() )

	log.Println("+ theIdentity:  " + theIdentity)

        // Twilio SDK source code: https://github.com/twilio/twilio-go/blob/main/client/jwt/access_token.go#L55
	params := jwt.AccessTokenParams{
		AccountSid:     accountSid,
		SigningKeySid:  apiKey,
		Secret:         apiSecret,
		Identity:       theIdentity,
                //
		ValidUntil:     float64(time.Now().Add(time.Duration(expireTimeMinutes) * time.Minute).Unix()),
		// Ttl:            float64(expireTimeSeconds),  
                // No Ttl and no ValidUntil = Sets to default 1 hour expire time.
                // If Ttl is less than 3600 (one hour) and no ValidUntil = Sets to 1 hour expire time.
                // If Ttl is greater than 3600 (one hour)and no ValidUntil = Sets to the expire time based on expireTimeSeconds.
                // No Ttl and ValidUntil = Sets the expire time where expireTimeMinutes.
                //  ValidUntil can be used to set less than one hour expire time.
	}
	jwtToken := jwt.CreateAccessToken(params)
        //
        // If creating a Conversations access token.
	log.Println("+ serviceSid:   " + serviceSid)
	chatGrant := &jwt.ChatGrant{ ServiceSid: serviceSid }
	jwtToken.AddGrant(chatGrant)
        // If creating a Video access token.
	// log.Println("+ theVideoRoom: " + theVideoRoom)
	// videoGrant := &jwt.VideoGrant{ Room: theVideoRoom }
	// jwtToken.AddGrant(videoGrant)
        //
	token, err := jwtToken.ToJwt()
	if err != nil {
		log.Fatal(err)
	}
	log.Println(`{"token":"` + token + `"}`)

    log.Println("+++ Exit.")
}