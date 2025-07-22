const express = require('express');
const app = express();
app.use(express.json());

const PORT = 3000;
let todos = [
    { id: 1, task: 'Learn Node.js', completed: false },
    { id: 2, task: 'Build an API', completed: false }
];

// Middleware to log requests
app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

// Middleware to validate todo data
const validateTodo = (req, res, next) => {
    if (!req.body.task) {
    return res.status(400).json({ error: 'Task is required' });
    }
    next();
};

// GET all todos with filtering
app.get('/todos', (req, res) => {
    let result = [...todos];
    
  // Filter by completion status if query parameter exists
    if (req.query.completed) {
    const isCompleted = req.query.completed === 'true';
    result = result.filter(todo => todo.completed === isCompleted);
    }
    
    res.json(result);
});

// POST with validation middleware
app.post('/todos', validateTodo, (req, res) => {
    const newTodo = {
    id: todos.length > 0 ? Math.max(...todos.map(t => t.id)) + 1 : 1,
    task: req.body.task,
    completed: req.body.completed || false
    };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Endpoint not found' });
});

app.listen(PORT, () => {
    console.log(`Enhanced Todo API running on http://localhost:${PORT}`);
});