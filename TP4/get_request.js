var tipos = ["Escola", "Casa", "Pagamentos", "Rotina"]

exports.todoMainPage = function(todoList, d, script){
    var postOUTPUT = ``
    if(script.startsWith("Erro")){
        postOUTPUT = `
        <div class="w3-container w3-red">
            <p>${script}</p>
        </div> 
    `
    }
    else if(script.startsWith("Tarefa")){
        postOUTPUT = `
        <div class="w3-container w3-green">
            <p>${script}</p>
        </div>
    `
    }

    var pagHTML = `
<!DOCTYPE html>
<html>
    <head>
        <meta charset="UTF-8"/>
        <link rel="icon" href="favicon.png"/>
        <link rel="stylesheet" href="w3.css"/>
        <title>toDo List</title>
    </head>
    
    <body>
        <div class="w3-card-4">
            <header class="w3-container w3-teal">
                <h1>toDo List</h1>
            </header>
            ${postOUTPUT}
            <form class="w3-container" method="POST">
                <fieldset>
                    <legend>Adicionar nova Tarefa</legend>
                    <label>Nome:</label>
                        <input class="w3-input w3-round" type="text" name="name" required>
                    <label>Dirigida a:</label>
                        <input class="w3-input w3-round" type="text" name="who" required>
                    <label>Deadline</label>
                        <input class="w3-input w3-round" type="text" name="until" required>
                    <label>Tipo</label>
                    <select class="w3-select" name="type" required>
                        <option value="" disabled selected>Selecionar</option>
                        <option value="0">Escola</option>
                        <option value="1">Casa</option>
                        <option value="2">Pagamentos</option>
                        <option value="3">Rotina</option>
                    </select>
                    <label>Description</label>
                        <input class="w3-input w3-round" type="text" name="description" required>
                </fieldset>            
                <br/>
                <button class="w3-btn w3-green w3-mb-2" type="submit">Register</button>
            </form>
        </div>`

    pagHTML += `
        <div class="w3-card-4">
            <h2>Lista de Tarefas não feitas</h2>
            <table class="w3-table-all">
                <tr>
                    <th>Tipo</th><th>O quê</th><th>Quem</th><th>Descrição</th><th>Até</th>
                </tr>`

    var i = 0
    for (; i < todoList.length && !todoList[i].done; i++){
        pagHTML += `
                <tr>
                    <td>${tipos[todoList[i].type]}</td>
                    <td>${todoList[i].what}</td>
                    <td>${todoList[i].who}</td>
                    <td>${todoList[i].description}</td>
                    <td>${todoList[i].until}</td>
                    <td>
                            <form action="/edit" method="POST">
                                <input class="w3-hide" type="text" name="id" value="${todoList[i].id}">
                                <button class="w3-btn w3-teal w3-mb-2" type="submit">Editar</button>
                            </form>
                        </td>
                        <td>
                            <form action="/delete" method="POST">
                                <input class="w3-hide" type="text" name="id" value="${todoList[i].id}">
                                <button class="w3-btn w3-red w3-mb-2" type="submit">Apagar</button>
                            </form>
                        </td>
                        <td>
                            <form action="/done" method="POST">
                                <input class="w3-hide" type="text" name="id" value="${todoList[i].id}">
                                <button class="w3-btn w3-green w3-mb-2" type="submit">Feito</button>
                            </form>
                        </td>
                </tr>`
    }

    pagHTML += `
            </table>
        </div>`

    pagHTML += `
        <div class="w3-card-4">
            <h2>Lista de Tarefas feitas</h2>
            <table class="w3-table-all">
                <tr>
                    <th>Tipo</th><th>O quê</th><th>Quem</th><th>Descrição</th><th>Até</th>
                </tr>`

    for (; i < todoList.length; i++){
        pagHTML += `
                    <tr>
                        <td>${tipos[todoList[i].type]}</td>
                        <td>${todoList[i].what}</td>
                        <td>${todoList[i].who}</td>
                        <td>${todoList[i].description}</td>
                        <td>${todoList[i].until}</td>
                        <td>
                            <form action="/edit" method="POST">
                                <input class="w3-hide" type="text" name="id" value="${todoList[i].id}">
                                <button class="w3-btn w3-teal w3-mb-2" type="submit">Editar</button>
                            </form>
                        </td>
                        <td>
                            <form action="/delete" method="POST">
                                <input class="w3-hide" type="text" name="id" value="${todoList[i].id}">
                                <button class="w3-btn w3-green w3-mb-2" type="submit">Apagar</button>
                            </form>
                        </td>
                        <td>
                            <form action="/undone" method="POST">
                                <input class="w3-hide" type="text" name="id" value="${todoList[i].id}">
                                <button class="w3-btn w3-red w3-mb-2" type="submit">Não Feito</button>
                            </form>
                        </td>
                    </tr>`
        //<td><button class="w3-btn w3-purple w3-mb-2" type="submit">Register</button></td>
    }

    pagHTML += `
            </table>
        </div>
        <footer class="w3-container w3-blue">
            <h5>Generated by RPCW2023 in ${d}</h5>
            </footer>
    </body>
</html>`

    return pagHTML
}

exports.todoMainPage = this.todoMainPage