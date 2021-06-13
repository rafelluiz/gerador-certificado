const fs = require('fs')

const Handlebars = require("handlebars");


const source = fs.readFileSync('https://github.com/rafelluiz/gerador-certificado/blob/main/template%20certificado.html', 'utf8')


var template = Handlebars.compile(source);

var data = { "name": "Alan"};
var result = template(data);
console.log(result)
