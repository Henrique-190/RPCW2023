var http = require('http')
var axios = require('axios')
var get = require('./get_request')
var static = require('./static.js')
const { parse } = require('querystring');
var post = require('./post_request.js')

function getPage(res, d, script){
    axios.get("http://localhost:3000/todo?_sort=done&_order=asc")
        .then(response => {
            var tasks = response.data
            res.writeHead(302, {'Content-Type': 'text/html;charset=utf-8'})
            res.write(get.todoMainPage(tasks, d, script))
            res.end()
        })
        .catch(function(erro){
            res.writeHead(302, {'Content-Type': 'text/html;charset=utf-8'})
            res.write("<p>Não foi possível obter a lista de tarefas... Erro: " + erro)
            res.end()
        })
    }

function collectRequestBodyData(request, callback) {
    if(request.headers['content-type'] === 'application/x-www-form-urlencoded') {
        let body = '';
        request.on('data', chunk => {
            body += chunk.toString();
        });
        request.on('end', () => {
            callback(parse(body));
        });
    }
    else {
        callback(null);
    }
}

String.prototype.hashCode = function() {
    var hash = 0, i, chr, len;
    if (this.length === 0) return hash;
    for (i = 0, len = this.length; i < len; i++) {
      chr   = this.charCodeAt(i);
      hash  = ((hash << 5) - hash) + chr;
      hash |= 0; // Convert to 32bit integer
    }
    return hash;
};


var alunosServer = http.createServer(function (req, res) {
    var d = new Date().toISOString().substring(0, 16)
    console.log(req.method + " " + req.url + " " + d)

    if(static.staticResource(req))
        static.serveStaticResource(req, res)
    else{
        switch(req.method){
            case "GET": 
                if(req.url == "/"){
                    getPage(res, d, "")
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write("<p>" + req.method + " " + req.url + " unsupported on this server.</p>")
                    res.end()
                }
                break
            case "POST":
                if(req.url == '/'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.post('http://localhost:3000/todo', {
                                id: (result.name + result.type + result.what + result.who + result.until + result.description).hashCode(),
                                name: result.name,
                                what: result.what,
                                done: false,
                                type: result.type,
                                who: result.who,
                                description: result.description,
                                until: result.until
                            })
                            .then(function (response) {
                                getPage(res, d, "Tarefa adicionada com sucesso!")
                            }
                            )
                            .catch(function (error) {
                                getPage(res, d, "Erro ao adicionar tarefa!")
                            })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else if (req.url == '/delete'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.delete('http://localhost:3000/todo/' + result.id)
                            .then(function (response) {
                                getPage(res, d, "Tarefa eliminada com sucesso!")
                            }
                            )
                            .catch(function (error) {
                                getPage(res, d, "Erro ao eliminar tarefa!")
                            })
                        }
                        else{
                            res.writeHead(201, {'Content-Type': 'text/html;charset=utf-8'})
                            res.write("<p>Unable to collect data from body...</p>")
                            res.end()
                        }
                    });
                }
                else if (req.url == '/done' || req.url == '/undone'){
                    collectRequestBodyData(req, result => {
                        if(result){
                            axios.patch('http://localhost:3000/todo/' + result.id, {
                                done: req.url == '/done'
                            })
                            .then(function (response) {
                                var script = req.url == '/done' ? "Tarefa concluída com sucesso!" : "Tarefa reaberta com sucesso!"
                                getPage(res, d, script)
                            })
                            .catch(function (error) {
                                getPage(res, d, "Erro ao concluir tarefa!")
                            })
                        }
                    });
                }
                else{
                    res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                    res.write('<p>Unsupported POST request: ' + req.url + '</p>')
                    res.write('<p><a href="/">Return</a></p>')
                    res.end()
                }
                break
            default: 
                res.writeHead(200, {'Content-Type': 'text/html;charset=utf-8'})
                res.write("<p>" + req.method + " unsupported in this server.</p>")
                res.end()
        }
    }
    
})

alunosServer.listen(7777, ()=>{
    console.log("Servidor à escuta na porta 7777...")
})



