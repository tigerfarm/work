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
var theService string = "chat"
var theRoom string = "myroom"
var theIdentity string = "dave"
var expireTime int = 10
var expireTimeSeconds int = 3720

func main() {
    log.Println("+++ Generate a Twilio Conversations token.")
    log.Println("+ Time now: " + time.Now().String() )

	// Query Params:
	//	//	identity
	//	//	service
	//	//	room
	log.Println("+ theService:  " + theService)
	log.Println("+ serviceSid:  " + serviceSid)
	log.Println("+ theRoom:     " + theRoom)
	log.Println("+ theIdentity: " + theIdentity)
        // Source code: https://github.com/twilio/twilio-go/blob/main/client/jwt/access_token.go#L55
	params := jwt.AccessTokenParams{
		AccountSid:     accountSid,
		SigningKeySid:  apiKey,
		Secret:         apiSecret,
		Identity:       theIdentity,
		Ttl:            float64(expireTimeSeconds),  
//		ValidUntil:    float64(time.Now().Add(time.Duration(expireTime) * time.Minute).Unix()),
                // No ttl, no ValidUntil = default 1 hour expire time.
                // ValidUntil = sets the expire time where expireTime is the number of minutes.
	}
	jwtToken := jwt.CreateAccessToken(params)
	chatGrant := &jwt.ChatGrant{
		ServiceSid: serviceSid,
	}
	videoGrant := &jwt.VideoGrant{
		Room: theRoom,
	}
	jwtToken.AddGrant(chatGrant)
	jwtToken.AddGrant(videoGrant)
	token, err := jwtToken.ToJwt()
	if err != nil {
		log.Fatal(err)
	}
	log.Println(`{"token":"` + token + `"}`)

    log.Println("+++ Exit.")
}
