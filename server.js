const express = require('express');
const path = require('path');
const noteData = require('./db/db.json');
const fs = require('fs');
const { stringify } = require('querystring');

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

app.post('/api/notes', (req, res) =>{
    const {title, text} = req.body;

    if(title && text) {
        const newNote = {
            title,
            text
        };

        const response = {
            status: 'Success!',
            body: newNote,
        };

        fs.appendFileSync('db/db.json', JSON.stringify(newNote), (err) => {
            if (err) throw err;
            console.log(response);
            res.status(201).json(response);
        })
    } else {
        res.status(500).json('Note failed to post')
    }
});

app.listen(PORT, () =>
console.log(`Quick Jot listening at http://localhost:${PORT}`)
);