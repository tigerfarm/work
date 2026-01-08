--------------------------------------------------------------------------------
+++ My TOTP notes

Documentation quickstart:
https://www.twilio.com/docs/verify/quickstarts/totp

------------
Steps:

Step: Create a new TOTP factor
https://www.twilio.com/docs/verify/quickstarts/totp#create-a-new-totp-factor
+ Created and ran the program: verifyTOTPcreate.js
Sample:
++ newFactor JSON: {
"factorType":"totp",
"sid":"YF0266bd3b0da405139cded5ad732c7229",
"accountSid":"AC......a3",
"serviceSid":"VA112d25d22d3305f3eae4d3b9e2f2a8d5",
"entitySid":"YE36234f9350a4bee61d06d57adf9b96c1",
"identity":"ffiddv1a",
"friendlyName":"Dave account 1a",
"binding":{
"secret":"VLFCG5VTXHIGB5YZ5QXPNSRHWBWGDGEB",
"uri":"otpauth://totp/Starlight%20Press:Dave%20account%201a?secret=VLFCG5VTXHIGB5YZ5QXPNSRHWBWGDGEB&issuer=Starlight%20Press&algorithm=SHA1&digits=6&period=30"
},
"status":"unverified",
"dateCreated":"2024-08-14T23:17:33.000Z",
"dateUpdated":"2024-08-14T23:17:33.000Z",
"config":{"alg":"sha1","skew":1,"code_length":6,"time_step":30},
"metadata":null,
"url":"https://verify.twilio.com/v2/Services/VA112d25d22d3305f3eae4d3b9e2f2a8d5/Entities/ffiddv1a/Factors/YF0266bd3b0da405139cded5ad732c7229"
}

Step: List factor created above. Note, the factor status is "unverified". This is updated below.
https://www.twilio.com/docs/verify/quickstarts/totp#list-factors
+ program: verifyTOTPlistFactor.js
The above is listed.
$ node verifyTOTPlistFactors.js
+++ TOTP: list factors for an ID.
+ Twilio account SID: AC......a3
+ verifyServiceSID: VA112d25d22d3305f3eae4d3b9e2f2a8d5
+ theIdentitySID: ffiddv1a
++ factor.status:       unverified
++ factor.friendlyName: Dave account 1a
++ factor.sid:          YF0266bd3b0da405139cded5ad732c7229

Step: Create a QR code
https://www.twilio.com/docs/verify/quickstarts/totp#create-a-qr-code
+ Create QR code using:
The "uri" from above:
otpauth://totp/Starlight%20Press:Dave%20account%201a?secret=VLFCG5VTXHIGB5YZ5QXPNSRHWBWGDGEB&issuer=Starlight%20Press&algorithm=SHA1&digits=6&period=30
Pasted into the following URL, using the URL option:
https://www.qr-code-generator.com/
+ I used Google Authenticator to add (+) a new authentication item.
When I use the Google Authenticator "Scan a QR code" option
to scan the above generated QR code,
An item is added into Google Authenticator:
Starlight Press: Dave account 1a

Step: Verify that the user has successfully registered
+ Program: verifyTOTPupdate.js
Use the above:
IdentitySID = "ffiddv1a"
factorSID = "YF0266bd3b0da405139cded5ad732c7229"
Also use a Google Authenticator code for: "Starlight Press: Dave account 1a"
This verifies that Twilio Verify can match with Google Authenticator to valid an authentication code.
$ node verifyTOTPupdate.js
+++ TOTP: verify an new factor using update factor with an authentication code.
+ Twilio account SID:    AC......a3
+ verifyServiceSID:      VA112d25d22d3305f3eae4d3b9e2f2a8d5
+ theIdentitySID:        ffiddv1a
+ factorSID:             YF0266bd3b0da405139cded5ad732c7229
+ authenticationCode:    014920
++ factor.status: verified
++ factor JSON: {"sid":"YF026...,"serviceSid":"VA112d...",...,"identity":"ffiddv1a",...,
"factorType":"totp","status":"verified",...}

Step: List factor created above. Note, the factor status is now, "verified", and ready to use.
https://www.twilio.com/docs/verify/quickstarts/totp#list-factors
$ node verifyTOTPverify.js
+++ TOTP: list factors for an ID.
+ Twilio account SID:    AC......a3
+ verifyServiceSID:      VA112d25d22d3305f3eae4d3b9e2f2a8d5
+ theIdentitySID:        ffiddv1a
++ factor.status:       verified
++ factor.friendlyName: Dave account 1a
++ factor.sid:    YF0266bd3b0da405139cded5ad732c7229
+++ Normal exit.

Step: Validate a token.
https://www.twilio.com/docs/verify/quickstarts/totp#validate-a-token
I use Google Authenticator: Starlight Press: Dave Account 1a.
$ node verifyTOTPcheck.js
+++ TOTP: Validate a factor token (authentication code).
+ Twilio account SID:    AC......a3
+ verifyServiceSID:      VA112d25d22d3305f3eae4d3b9e2f2a8d5
+ theIdentitySID:        ffiddv1a
+ factorSID:             YF0266bd3b0da405139cded5ad732c7229
+ authenticationCode:    249578
++ challenge.status: approved
++ newFactor JSON: { ... }

--------------------------------------------------------------------------------
eof