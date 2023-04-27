package main

// Run​
//  go run access_token.go
// Else,
//  go mod tidy
//  go mod vendor

import (
	"log"
	"net/http"
	"os"
	"strconv"
	"time"
	"github.com/gin-gonic/gin"
	"github.com/twilio/twilio-go/client/jwt"
)
​
var serverPort = ":" + strconv.Itoa(8080)
var accountSid string = os.Getenv("TWILIO_ACCOUNT_SID")
var apiKey string = os.Getenv("TWILIO_API_KEY")
var apiSecret string = os.Getenv("TWILIO_API_SECRET")
​
func GenerateAccessToken(c *gin.Context) {
	// Query Params:
	//	//	identity
	//	//	service
	//	//	room
	params := jwt.AccessTokenParams{
		AccountSid:    accountSid,
		SigningKeySid: apiKey,
		Secret:        apiSecret,
		Identity:      c.Query("identity"),
		ValidUntil:    float64(time.Now().Add(time.Duration(30) * time.Minute).Unix()),
	}
​	log.Println(c.Query("service"))
	log.Println(c.Query("identity"))
​	jwtToken := jwt.CreateAccessToken(params)
	chatGrant := &jwt.ChatGrant{
		ServiceSid: c.Query("service"),
	}
​	videoGrant := &jwt.VideoGrant{
		Room: c.Query("room"),
	}
	jwtToken.AddGrant(chatGrant)
	jwtToken.AddGrant(videoGrant)
	token, err := jwtToken.ToJwt()
	if err != nil {
		log.Fatal(err)
	}
	c.Header("Access-Control-Allow-Origin", "*")
	log.Println(`{"token":"` + token + `"}`)
	c.JSON(http.StatusOK, gin.H{
		"token": token,
	})
}

func GenerateAccessToken(c *gin.Context) {
    log.Println(`Hello there"}`)
}
​
func main() {
	gin.SetMode(gin.ReleaseMode)
	r := gin.Default()
​
	r.GET("/token", GenerateAccessToken)
	r.GET("/hello", sayHello)
​
	r.NoRoute(func(c *gin.Context) {
		c.String(http.StatusNotFound, "404 not found.")
	})
​
	r.NoMethod(func(c *gin.Context) {
		c.String(http.StatusMethodNotAllowed, "405 method not allowed")
	})
​
	log.Printf("Starting server on port %s\n", serverPort[1:])
	r.Run(serverPort) // listen and serve on 0.0.0.0:8080 (for windows "localhost:8080")
}