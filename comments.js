// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// In-memory storage for comments
let comments = [];

// Route to get all comments
app.get('/comments', (req, res) => {
    res.json(comments);
});

// Route to add a new comment
app.post('/comments', (req, res) => {
    const comment = req.body;
    comments.push(comment);
    res.status(201).json(comment);
});

// Route to get a comment by ID
app.get('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const comment = comments.find(c => c.id === id);
    if (comment) {
        res.json(comment);
    } else {
        res.status(404).send('Comment not found');
    }
});

// Route to delete a comment by ID
app.delete('/comments/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = comments.findIndex(c => c.id === id);
    if (index !== -1) {
        comments.splice(index, 1);
        res.status(204).send();
    } else {
        res.status(404).send('Comment not found');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
