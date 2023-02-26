var http = require('http');
const fs = require('fs');
var url = require('url');

http.createServer(function(req, res) {
    var numPag = req.url.substring(1);
    var filename = "";

    if (numPag === "") {
        res.writeHead(200, {'Content-Type': 'text/html; charset=iso-8859-1'});
        filename = "dataHTML/index.html"
        var text = fs.readFileSync(filename, 'latin1')
        res.write(text);
    }
    else if (numPag === "favicon.ico") {
        res.end();
    }
    else if (numPag.startsWith("h")) {
        res.writeHead(200, {'Content-Type': 'text/html; charset=iso-8859-1'});

        try{
            filename = "dataHTML/arq" + numPag.charAt(1) + ".html"
            text = fs.readFileSync(filename)
            res.write(text);
        }
        catch(err){
            res.write("FICHEIRO NÃO EXISTENTE");
        }
        res.end();
    }
    else if (numPag.length === 1) {
        res.writeHead(200, {'Content-Type': 'text/plain; charset=iso-8859-1'});

        try{
            filename = "dataXML/arq" + numPag + ".xml"
            text = fs.readFileSync(filename, 'latin1')
            res.write(text);
        }
        catch(err){
            res.write("FICHEIRO NÃO EXISTENTE");
        }
        res.end();
    }
}).listen(7777);

console.log('Servidor a rodar em localhost:7777');
