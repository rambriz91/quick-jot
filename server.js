const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');

const app = express();
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'));
});

app.get('/api/notes', (req, res) => {
    res.json(noteData);
});

app.listen(PORT, () =>
console.log(`Quick Jot listening at http://localhost:${PORT}`)
);