const todo_router = require('express').Router(); // returns a router object.
// const { response } = require('express'); // I believe this is unnessisary. 
const fs = require('fs');
const path = require('path');
const uuid = require('uuid').v4; // this is used to generate a random id for the new id entered.
const mysql = require('mysql2');
const { connect } = require('http2');
const db_path = path.join(__dirname, '../db/todos.json');

const connection = mysql.createPool({
    host: 'localhost',
    database: 'class_express',
    user: 'root',
    password: ''
});

connection.query('SELECT * FROM todos', (err, data) => {
    if(err) return console.log(err);

    console.log('data', data);
});

function getToDoData() {
    return fs.promises
        .readFile(db_path, 'utf8')
        .then(data => JSON.parse(data));
};

// Get all Todos 
//localhost:3333/api/todos ---------------------- browser bar is always a get request.
todo_router.get('/todos', (request, response) => {
    getToDoData()
        .then(todo_data => {
            response.json(todo_data);
        })
        .catch(err => console.log(err))
});

// creaet To Do
// post request send browser data to the backend.
todo_router.post('/todos', (request, response) => {
    getToDoData()
        .then(todo_data => {
            const new_todo = request.body;
            new_todo.id = uuid().slice(0, 4); // more efficient way than below.
            // const reference_id = todo_data.length ? [todo_data.length - 1].id : 0;
            // new_todo.id = reference_id + 1; 

            todo_data.push(new_todo);

            fs.promises.writeFile(db_path, JSON.stringify(todo_data, null, 2))
                .then(() => response.json(todo_data))
                .catch(err => console.log(err));
        });
});

// looking for localhost:3333/api/todos with a request of DELETE
todo_router.delete('/todos', (request, response) => {
    getToDoData()
        .then(todos => {
            const id = request.body.id;
            const obj = todos.find(todo => todo.id === id);
            const index = todos.indexOf(obj);

            todos.splice(index, 1);

            
            fs.promises.writeFile(db_path, JSON.stringify(todos, null, 2))
                .then(() => response.json(todos))
                .catch(err => console.log(err));

        });
});

todo_router.get('/todos/:id', (request, response) => {
    console.log(request.params.id); // this will console log anything that you enter at the end of localhost:3333/api/todos/XXXXXXXX
    // console.log(request.params.comment); // this will console log anything that you enter at the end of localhost:3333/api/tpdos/*id*/XXXXXXX
});

module.exports = todo_router;




// note_router.delete('/notes/id', (request, response) => {
//     getNoteData()
//         .then(note_data => {
//                 console.log(note_data)
//         })
// });