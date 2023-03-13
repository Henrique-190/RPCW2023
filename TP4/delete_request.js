const axios = require('axios')

function deleteTask(todo){
    axios.delete('http://localhost:3000/todo/'+todo.id)
    .then(function (response) {
        console.log(response.data);
    })
    .catch(function (error) {
        console.log(error);
    })
}

exports.deleteTask = deleteTask