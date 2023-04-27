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

func main() {
    log.Println("+++ Generate a Twilio Conversations token.")

	// Query Params:
	//	//	identity
	//	//	service
	//	//	room
	log.Println("+ theService:  " + theService)
	log.Println("+ serviceSid:  " + serviceSid)
	log.Println("+ theRoom:     " + theRoom)
	log.Println("+ theIdentity: " + theIdentity)
	params := jwt.AccessTokenParams{
		AccountSid:    accountSid,
		SigningKeySid: apiKey,
		Secret:        apiSecret,
		Identity:      theIdentity,
		ValidUntil:    float64(time.Now().Add(time.Duration(expireTime) * time.Minute).Unix()),
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
