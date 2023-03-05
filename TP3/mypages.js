exports.pessoasPage = function(lista) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="w3.css">
            <meta charset="utf-8">
            <title>Lista de Pessoas</title>
        </head>
        <body>
            <header class="w3-container w3-teal">
            <div class="w3-left-align">
                <a href="http://localhost:7777" class="w3-button w3-border w3-teal">Página Inicial</a>
            </div>
            <div class="w3-center w3-teal">
                <h1>Lista de Pessoas</h1>
            </div>
            
            </header>
            <table class="w3-table-all">
                <tr>
                    <th>id</th><th>Nome</th><th>Idade</th><th>Sexo</th><th>Cidade</th>
                </tr>
            `;
            for (var i = 0; i < lista.length; i++) {
                try {
                    //All row clicks will redirect to the person's page
                    pagHTML += `<tr class="w3-hover-teal" onclick="window.location.href='/${lista[i].id}'">
                                    <td>${lista[i].id}</td>
                                    <td>${lista[i].nome}</td>
                                    <td>${lista[i].idade}</td>
                                    <td>${lista[i].sexo}</td>
                                    <td>${lista[i].morada.cidade}</td>
                                    </tr>`;
                } catch (error) {
                    console.log(error);
                    console.log(lista[i])
                }
            }
            pagHTML += `
            </table>
            </div>
            <div class="w3-card-4">
            <footer class="w3-container w3-teal">
                <h5>Generated in RPCW 2023</h5>
            </footer>
        </body>
    </html>
    `;
    return pagHTML;
}

exports.pessoaPage = function(pessoa) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
        <link rel="stylesheet" href="w3.css">
            <meta charset="utf-8">
            <title>${pessoa.nome}</title>
        </head>
        <body>
            <div class="w3-card-4">
                <header class="w3-container w3-teal">
                    <div class="w3-left-align">
                        <a href="http://localhost:7777" class="w3-button w3-border w3-teal">Página Inicial</a>
                    </div>
                    <div class="w3-center w3-teal"><h1>${pessoa.nome}</h1></div>
                </header>
        
                <div class="w3-container">
                `;

        var gostos = "<b>Gosta de: </b> ";
        var nao_gostos = "<b>Não gosta de: </b> ";
        if (pessoa.atributos.gosta_cinema) {gostos += "Cinema, ";}
        else {nao_gostos += "Cinema, ";}

        if (pessoa.atributos.gosta_viajar) {gostos += "Viajar, ";}
        else {nao_gostos += "Viajar, ";}


        if (pessoa.atributos.acorda_cedo) {gostos += "Acordar cedo, ";}
        else {nao_gostos += "Acordar cedo, ";}
        if (pessoa.atributos.gosta_ler) {gostos += "Ler, ";}
        else {nao_gostos += "Ler, "}
        if (pessoa.atributos.gosta_musica) {gostos += "Música, ";}
        else {nao_gostos += "Música, ";}
        if (pessoa.atributos.gosta_comer) {gostos += "Comer, ";}
        else {nao_gostos += "Comer, ";}
        if (pessoa.atributos.gosta_animais_estimacao) {gostos += "Animais de estimação, ";}
        else {nao_gostos += "Animais de estimação, ";}
        if (pessoa.atributos.gosta_dancar) {gostos += "Dançar, ";}
        else {nao_gostos += "Dançar, ";}
        if (gostos.length > 0) {
            gostos = gostos.substring(0, gostos.length - 2);
        }
        if (nao_gostos.length > 0) {
            nao_gostos = nao_gostos.substring(0, nao_gostos.length - 2);
        }

        var desportos = "";

        if (pessoa.desportos.length > 0) {
            desportos = "<b>Desportos favoritos:</b> ";
            for (var i = 0; i < pessoa.desportos.length; i++) {
                desportos += pessoa.desportos[i] + ", ";
            }
            desportos = desportos.substring(0, desportos.length - 2);
        }
        else {
            desportos = "<b>Não tem um desporto favorito</b>";
        }

        var fuma = pessoa.atributos.fumador ? "fuma" : "não fuma";

        var figura_publica = "";
        if (pessoa.figura_publica_pt.length > 0) {
            figura_publica = "<b>Figuras públicas favoritas:</b> ";
            for (var i = 0; i < pessoa.figura_publica_pt.length; i++) {
                figura_publica += pessoa.figura_publica_pt[i] + ", ";
            }
            figura_publica = figura_publica.substring(0, figura_publica.length - 2);
        }
        else {
            figura_publica = "<b>Não tem uma figura pública favorita</b>";
        }

        var destinos_favoritos = "";
        if (pessoa.destinos_favoritos.length > 0) {
            destinos_favoritos = "<b>Destinos favoritos:</b> ";
            for (var i = 0; i < pessoa.destinos_favoritos.length; i++) {
                destinos_favoritos += pessoa.destinos_favoritos[i] + ", ";
            }
            destinos_favoritos = destinos_favoritos.substring(0, destinos_favoritos.length - 2);
        }
        else {
            destinos_favoritos = "<b>Não tem um destino favorito</b>";
        }

        var cc = pessoa.hasOwnProperty("CC") ? "<b>CC:</b> " + pessoa.CC : "<b>BI:</b> " + pessoa.BI;

        var animais = "";
        if (pessoa.animais.length > 0) {
            animais = "<b>Animais:</b> ";
            for (var i = 0; i < pessoa.animais.length; i++) {
                animais += pessoa.animais[i] + ", ";
            }
            animais = animais.substring(0, animais.length - 2);
        }
        else {
            animais = "<b>Não tem animais</b>";
        }
        
        var descrição = pessoa.hasOwnProperty("descrição") ? pessoa.descrição : "";

        pagHTML+=`            
                    <p>${pessoa.sexo.charAt(0).toUpperCase() + pessoa.sexo.slice(1)}, tem ${pessoa.idade} anos e mora em ${pessoa.morada.cidade}, ${pessoa.morada.distrito}.</p>
                    <p>É ${pessoa.profissao}, o seu partido é ${pessoa.partido_politico.party_abbr} (${pessoa.partido_politico.party_name}) e a sua religião é ${pessoa.religiao}.
                        Conduz um ${pessoa.marca_carro}, a sua comida favorita é ${pessoa.atributos.comida_favorita} e ${fuma}.</p>
                    <p>${cc}</p>
                    <p>${animais}</p>
                    <p>${desportos}</p>
                    <p>${figura_publica}</p>
                    <p>${destinos_favoritos}</p>
                    <p>${gostos}</p>
                    <p>${nao_gostos}</p>
                </div>
            </div>
        <div class="w3-card-4">
            <footer class="w3-container w3-teal">
                <h5>${descrição}</h5>
            </footer>
        </body>
    </html>
    `;
    return pagHTML;
}


exports.indexPage = function() {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="w3.css">
            <meta charset="utf-8">
            <title>Index</title>
        </head>
        <body>
            <header class="w3-container w3-teal">
            <div class="w3-center w3-teal"><h1>Index</h1></div>
            </header>
            <table class="w3-table-all">
                <tr class="w3-hover-teal"><th><a href="/pessoas">Lista de Pessoas</th></tr>
                <tr class="w3-hover-teal"><th><a href="/_sort=desporto">Distribuição por Desporto</th></tr>
                <tr class="w3-hover-teal"><th><a href="/_sort=sexo">Distribuição por Sexo</th></tr>
                <tr class="w3-hover-teal"><th><a href="/top10">Top 10 Profissões</th></tr>
            </table>
        </body>
        <div class="w3-card-4">
            <footer class="w3-container w3-teal">
                <h5>Generated in RPCW 2023</h5>
            </footer>
        </body>
    </html>
            `;
    return pagHTML;
}


exports.sortSEXPage = function(pessoas) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="w3.css">
            <meta charset="utf-8">
            <title>Lista de Pessoas por Sexo</title>
        </head>
        <body>
            <header class="w3-container w3-teal">
                <div class="w3-left-align">
                    <a href="http://localhost:7777" class="w3-button w3-border w3-teal">Página Inicial</a>
                </div>
                <div class="w3-center w3-teal"><h1>Lista de Pessoas por Sexo</h1></div>
            </header>
            <table class="w3-table-all">
                <tr>
                    <th>Tipo</th><th>Número</th>
                </tr>
            `;
    const myMap = new Map();
    for (var i = 0; i < pessoas.length; i++) {
        if (myMap.has(pessoas[i].sexo)) {
            myMap.set(pessoas[i].sexo, myMap.get(pessoas[i].sexo) + 1);
        }
        else {
            myMap.set(pessoas[i].sexo, 1);
        }
    }

    myMap.forEach((value, key) => {
        pagHTML += `<tr class="w3-hover-teal" onclick="window.location.href='/_sexo=${key}'"><td>${key}</td><td>${value}</td></tr>`;
    });

    pagHTML += `
            </table>
            <div class="w3-card-4">
            <footer class="w3-container w3-teal">
                <h5>Generated in RPCW 2023</h5>
            </footer>
        </body>
    </html>
        `;
    return pagHTML;
}

exports.sortDESPORTOPage = function(pessoas) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="w3.css">
            <meta charset="utf-8">
            <title>Lista de Pessoas por Desporto</title>
        </head>
        <body>
            <header class="w3-container w3-teal">
                <div class="w3-left-align">
                    <a href="http://localhost:7777" class="w3-button w3-border w3-teal">Página Inicial</a>
                </div>
                <div class="w3-center w3-teal"><h1>Lista de Pessoas por Desporto</h1></div>
            </header>
            <table class="w3-table-all">
                <tr>
                    <th>Tipo</th><th>Número</th>
                </tr>
            `;
    const myMap = new Map();
    for (var i = 0; i < pessoas.length; i++) {
        for (var j = 0; j < pessoas[i].desportos.length; j++){
            if (myMap.has(pessoas[i].desportos[j])) {
                myMap.set(pessoas[i].desportos[j], myMap.get(pessoas[i].desportos[j]) + 1);
            }
            else {
                myMap.set(pessoas[i].desportos[j], 1);
            }
        }
    }

    const newMap = new Map([...myMap.entries()].sort((a, b) => b[1] - a[1]));

    newMap.forEach((value, key) => {
        pagHTML += `<tr class="w3-hover-teal" onclick="window.location.href='/_desporto=${key}'"><td>${key}</td><td>${value}</td></tr>`;
    });

    pagHTML += `
            </table>
            <div class="w3-card-4">
            <footer class="w3-container w3-teal">
                <h5>Generated in RPCW 2023</h5>
            </footer>
        </body>
    </html>
        `;
    return pagHTML;

}


exports.top10Page = function(pessoas) {
    var pagHTML = `
    <!DOCTYPE html>
    <html>
        <head>
            <link rel="stylesheet" href="w3.css">
            <meta charset="utf-8">
            <title>Top 10 Profissões</title>
        </head>
        <body>
            <header class="w3-container w3-teal">
                <div class="w3-left-align">
                    <a href="http://localhost:7777" class="w3-button w3-border w3-teal">Página Inicial</a>
                </div>
                <div class="w3-center w3-teal"><h1>Top 10 Profissões</h1></div>
            </header>
            <table class="w3-table-all">
                <tr>
                    <th>Tipo</th><th>Número</th>
                </tr>
            `;
    const myMap = new Map();
    for (var i = 0; i < pessoas.length; i++) {
        if (myMap.has(pessoas[i].profissao)) {
            myMap.set(pessoas[i].profissao, myMap.get(pessoas[i].profissao) + 1);
        }
        else {
            myMap.set(pessoas[i].profissao, 1);
        }
    }

    const newMap = new Map([...myMap.entries()].sort((a, b) => b[1] - a[1]));

    newMap.forEach((value, key) => {
        pagHTML += `<tr class="w3-hover-teal" onclick="window.location.href='/_profissao=${key}'"><td>${key}</td><td>${value}</td></tr>`;
    }, 0, 10);

    pagHTML += `
            </table>
            <div class="w3-card-4">
            <footer class="w3-container w3-teal">
                <h5>Generated in RPCW 2023</h5>
            </footer>
        </body>
    </html>
        `;
    return pagHTML;
}