const express = require('express');
const app = express();

app.use(express.json());

let todos = [];
let nextId = 1;

// GET /todos - Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// GET /todos/:id - Get single todo
app.get('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    res.json(todo);
});

// POST /todos - Create todo
app.post('/todos', (req, res) => {
    const { title } = req.body;
    if (!title) return res.status(400).json({ error: 'Title is required' });
    
    const newTodo = { id: nextId++, title, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
});

// PUT /todos/:id - Update todo
app.put('/todos/:id', (req, res) => {
    const todo = todos.find(t => t.id === parseInt(req.params.id));
    if (!todo) return res.status(404).json({ error: 'Todo not found' });
    
    const { title, completed } = req.body;
    if (title !== undefined) todo.title = title;
    if (completed !== undefined) todo.completed = completed;
    
    res.json(todo);
});

// DELETE /todos/:id - Delete todo
app.delete('/todos/:id', (req, res) => {
    const index = todos.findIndex(t => t.id === parseInt(req.params.id));
    if (index === -1) return res.status(404).json({ error: 'Todo not found' });
    
    const deletedTodo = todos.splice(index, 1)[0];
    res.json(deletedTodo);
});

const PORT = 3001;
app.listen(PORT, () => console.log(`✅ Exercise 1 (Todo API) Server running on http://localhost:${PORT}`));
