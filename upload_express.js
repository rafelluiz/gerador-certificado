var express = require('express');
const http = require('http'); // or 'https' for https:// URLs
const fs = require('fs');
const Axios = require('axios')
const Handlebars = require("handlebars");
const puppeteer = require('puppeteer');

var app = express();

app.use(express.json());

app.post('/', function(request, response){
  console.log(request.body.data.name);      // your JSON
   // echo the result back
  Axios({
    method: "get",
    url: request.body.file,
    responseType: "stream"
  }).then(function (response) {
    response.data.pipe(fs.createWriteStream(`${__dirname}/uploads/cert.html`));
  });
  const source = fs.readFileSync(`${__dirname}/uploads/cert.html`, 'utf8')
  var template = Handlebars.compile(source);

  var data = { "name": request.body.data.name};
  var result = template(data);

  //fs.writeFile('cert_t.html','oi')

  (async () => {
    // launch a new chrome instance
    const browser = await puppeteer.launch({
      headless: true
    })

    // create a new page
    const page = await browser.newPage()

    // set your html as the pages content
    ///const html = fs.readFileSync(`${__dirname}/template.html`, 'utf8')
    await page.setContent(result, {
      waitUntil: 'domcontentloaded'
    })

    // create a pdf buffer
    const pdfBuffer = await page.pdf({
      format: 'A4'
    })

    // or a .pdf file
    await page.pdf({
      format: 'A4',
      path: `${__dirname}/my-fance-invoice.pdf`
    })

    // close the browser
    await browser.close()
  })()


  //response.send(result);
  response.download(`${__dirname}/my-fance-invoice.pdf`)
});


app.listen(3000);