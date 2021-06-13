const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const port = 3000

// default options
app.use(fileUpload());

app.post('/', function(req, res) {
  let sampleFile;
  let uploadPath;
  console.log(req.body)

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.body;
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  sampleFile = req.files.sampleFile;
  uploadPath = __dirname + '/' + sampleFile.name;

  // Use the mv() method to place the file somewhere on your server
  sampleFile.mv(uploadPath, function(err) {
    if (err)
      return res.body;

    res.send('File uploaded!');
  });
});
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})