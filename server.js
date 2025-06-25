const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;

let todos = [
    { id: 1, task: 'Learn Node.js', completed: false },
    { id: 2, task: 'Build an API', completed: false },
    { id: 3, task: 'Build an updated  API', completed: false }

];


// get all todos

app.get('/todos',(req,res)=> {
    res.json(todos);
});

// get single todo by ID 

app.get('/todos/:id', (req,res)=> {
    const todo = todos.find(pizza => pizza.id === parseInt(req.params.id));

    if (!todo) return res.status(404).send('Todo not found');

    res.json(todo);
});


// this is the start server

app.listen(PORT,()=> {
    console.log(`server is running on http://localhost:${PORT}`);

});