var http = require('http');
var url = require('url');
var axios = require('axios');
var mypages = require('./mypages');
var fs = require('fs');


http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16);
    var dicURL = url.parse(req.url, true);
    console.log(d + " --- " + req.method + " " + req.url);
    console.log(dicURL.pathname);

    if (req.url === "/pessoas") {
        axios.get("http://localhost:3000/pessoas")
        .then( function(resp) {
            var pessoas = resp.data;
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.pessoasPage(pessoas));
        })
        .catch( function(error) {
            console.log(error);
        });
    }
    else if (req.url === "/index" || req.url === "/") {
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.end(mypages.indexPage());
    }
    else if (req.url === "/ordenada") {
        axios.get("http://localhost:3000/pessoas")
        .then( function(resp) {
            var pessoas = resp.data;
            var pessoasOrdenadas = pessoas.sort((p1, p2) => (p1.nome > p2.nome) ? 1 : -1);
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.pessoasPage(pessoasOrdenadas));
        })
        .catch( function(error) {
            console.log(error);
        });
        /*
        axios.get("http://localhost:3000/pessoas?_sort=nome&_order=asc")
        .then( function(resp) {
            var pessoas = resp.data;
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.pessoasPage(pessoas));
        })
        .catch( function(error) {
            console.log(error);
        });
        */
    }
    else if (req.url === "/w3.css") {
        fs.readFile('w3.css', function(err, data) {
            if (err) {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                res.write("Erro 404: Recurso não encontrado");
                res.end();
            }
            else {
                res.writeHead(200, {'Content-Type': 'text/css'});
                res.write(data);
                res.end();
            }
        });
    }

    else if (req.url.startsWith("/p") && req.url.length <= 5) {
        axios.get("http://localhost:3000/pessoas/" + req.url.substring(1))
        .then( function(resp) {
            var pessoa = resp.data;
            if (pessoa == "{}") {
                res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                res.write("Erro 404: Recurso não encontrado");
                res.end();
            }
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.pessoaPage(pessoa));
        })
        .catch( function(error) {
            console.log(error);
        });
    }
    else if (req.url.startsWith("/_sort=")) {
        var sort = req.url.substring(7);    
        axios.get("http://localhost:3000/pessoas?" + req.url + "&_order=asc")
        .then( function(resp) {
            var pessoas = resp.data;
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            if (sort == "sexo")
                res.end(mypages.sortSEXPage(pessoas));
            else if (sort == "desporto")
                res.end(mypages.sortDESPORTOPage(pessoas));
            res.end("");
        })
        .catch( function(error) {
            console.log(error);
        });
    }
    else if (req.url.startsWith("/_sexo=")){
        var sexo = req.url.substring(7);
        axios.get("http://localhost:3000/pessoas?sexo=" + sexo)
        .then( function(resp) {
            var pessoas = resp.data;
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.pessoasPage(pessoas));
        })
        .catch( function(error) {
            console.log(error);
        });
    }
    else if (req.url.startsWith("/_desporto=")){
        //Dúvida de como buscar pessoas que praticam um determinado desporto, além de outros
        var desporto = req.url.substring(11);
        axios.get("http://localhost:3000/pessoas?desporto=" + desporto)
        .then( function(resp) {
            var pessoas = resp.data;
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.pessoasPage(pessoas));
        })
        .catch( function(error) {
            console.log(error);
        });
    }
    else if (req.url.startsWith("/top10")){
        axios.get("http://localhost:3000/pessoas/")
        .then( function(resp) {
            var pessoas = resp.data;
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.top10Page(pessoas));
        })
        .catch( function(error) {
            console.log(error);
        });
    }
    else if (req.url.startsWith("/_profissao=")){
        var profissao = req.url.substring(12);
        axios.get("http://localhost:3000/pessoas?profissao=" + profissao)
        .then( function(resp) {
            var pessoas = resp.data;
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.end(mypages.pessoasPage(pessoas));
        })
        .catch( function(error) {
            console.log(error);
        });
    }
    else{
        res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
        res.write("Erro 404: Recurso não encontrado");
        res.end();
    }
}).listen(7777);

console.log("Servidor à escuta na porta 7777...")