var express = require('express');
const fs = require('fs');
const Axios = require('axios')
const Handlebars = require("handlebars");
const puppeteer = require('puppeteer');

var app = express();

app.use(express.json());

app.post('/', function(request, response){
  console.log(request.body.data.name);      // your JSON
  // echo the result back
  let name_file = request.body.data.name;
  let url = request.body.template
  let source
  Axios({
    method: "get",
    url: url,
    responseType: "stream"
  }).then(function (response_axios) {
    response_axios.data.pipe(fs.createWriteStream(`${__dirname}/uploads/${name_file}.html`));
  });


  //console.log(source);
  (async () => {
    // launch a new chrome instance
    const browser = await puppeteer.launch({
      headless: true
    })

    // create a new page
    const page = await browser.newPage()

    source = fs.readFileSync(`${__dirname}/uploads/${name_file}.html`, 'utf8')

    const template = Handlebars.compile(source);

    const data = { "name": request.body.data.name, "template":request.body.template};
    const result = template(data);

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
      path: `${__dirname}/uploads/${name_file}.pdf`
    })

    // close the browser
    await browser.close()
    response.download(`${__dirname}/uploads/${name_file}.pdf`)

  })()

});

app.listen(5000);