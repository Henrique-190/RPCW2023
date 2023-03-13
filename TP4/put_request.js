const axios = require('axios')

function put(todo){
    axios.put('http://localhost:3000/todos/'+todo.id, {
        id: todo.id,
        type: task.name,
        what: task.what,
        done: false,
        who: task.who,
        description: task.description,
        until: task.until
    })
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })
}

exports.put = put