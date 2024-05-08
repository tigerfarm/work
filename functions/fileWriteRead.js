--------------------------------------------------------------------------------
The write sample is from: https://www.twilio.com/blog/temporary-storage-twilio-functions

--------------------------------------------------------------------------------
// Write content to a file in the tmp directory.
var fs = require('fs');
var path = require('path');
var tmp_dir = require('os').tmpdir();

exports.handler = function(context, event, callback) {
   let theContent = event.content || null;
   if (theContent === null) {
      theContent = 'default content';
   }
   // Create a text file and put data in it
   fs.writeFile(
      path.join(tmp_dir, 'test_file.txt'), 
      theContent, 
      function(err) {
        if (err) callback(err);
       /* We read the contents of the temporary directory to check that the file was created.
          For multiple files you can create a loop
       */
       fs.readdir(tmp_dir, function(err, files) {
           if (err) callback(err);
           callback(null, "File created in temporary directory: " + files.join(", "));
       });
   });
};

--------------------------------------------------------------------------------
// Read write a file in the tmp directory.
var fs = require('fs');
var path = require('path');
var tmp_dir = require('os').tmpdir();

exports.handler = function(context, event, callback) {
   fs.readFile(
      path.join(tmp_dir, 'test_file.txt'),
      function (err, data) {
         if (err) {
            console.log("- Error: Not Found.");
            callback(err);
         } else {
            console.log(data.toString());
            callback(null, "File content: " + data.toString());
         }
   });
};
