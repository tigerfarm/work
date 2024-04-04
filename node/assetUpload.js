console.log("++ Upload a file to Twilio Assets.");
const fs = require('fs');
// Install: npm install form-data axios
const FormData = require('form-data');
const axios = require('axios');
//
const apiKey = process.env.MAIN_API_KEY;
const apiSecret = process.env.MAIN_API_KEY_SECRET;
const serviceSid = 'ZSXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';
const assetSid = 'ZHXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX';      // Use assetCreate.js, to get an asset SID.
console.log("+ apiKey: " + apiKey
        + ", apiSecret: " + apiSecret
        + ", serviceSid: " + serviceSid
        + ", assetSid: " + assetSid
        );
//
const theFormData = new FormData();
theFormData.append('Path', '/my-asset.png');
theFormData.append('Visibility', 'public');
theFormData.append('Content', fs.createReadStream('tiglogo.jpg'), {
  contentType: 'image/jpg'
});
//
const serviceUrl = `https://serverless-upload.twilio.com/v1/Services/${serviceSid}`;
const uploadUrl = `${serviceUrl}/Assets/${assetSid}/Versions`;
axios
  .post(uploadUrl, theFormData, {
    auth: {
      username: apiKey,
      password: apiSecret,
    },
    headers: theFormData.getHeaders(),
  })
  .then((response) => {
    const newVersionSid = response.data.sid;
    console.log(newVersionSid);
  });
