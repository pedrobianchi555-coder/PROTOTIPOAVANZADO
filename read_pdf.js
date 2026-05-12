const fs = require('fs');
const pdf = require('pdf-parse');
let dataBuffer = fs.readFileSync('c:/Users/Sistemas/Downloads/pruebaantigravity/READMECLE.pdf');
pdf(dataBuffer).then(function (data) {
    fs.writeFileSync('c:/Users/Sistemas/Downloads/pruebaantigravity/pdf_text.txt', data.text, 'utf8');
}).catch(function (err) {
    fs.writeFileSync('c:/Users/Sistemas/Downloads/pruebaantigravity/pdf_err.txt', err.toString(), 'utf8');
});
