console.log("++ Download a file from a URL.");
const path = require('path');
const fs = require('fs');
const fetch = require('node-fetch');
const PUBLIC_DIR = './';
async function SaveMedia(mediaUrl, filename) {
    const fullPathFilename = path.resolve(`${PUBLIC_DIR}/${filename}`);
    console.log("+ fullPath: " + fullPathFilename);
    if (!fs.existsSync(fullPathFilename)) {
        console.log("+ Dowload and write the file.");
        const response = await fetch(mediaUrl);
        const fileStream = fs.createWriteStream(fullPathFilename);
        response.body.pipe(fileStream);
        fileStream.on("finish", () => {
            fileStream.close();
            console.log("+ Download complete and file written.");
        });
    }
}
console.log("+ before call: SaveMedia(...)");
SaveMedia("https://tfpbooks.herokuapp.com/StacyDavid/JamesGoslingAndI.jpg", "downloadMediaUrl.jpg");
console.log("+ after call: SaveMedia(...)");

// eof
