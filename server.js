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
    
    const jsonData = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    res.json(jsonData);
});

app.post('/api/notes', (req, res) =>{
    const jsonData = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));
    console.log('jsonData:', jsonData);
    const {title, text} = req.body;

    console.log('req.body:', req.body)

    if(title && text) {
        const postNote = {
            title,
            text
        };

        console.log('postNote:', postNote)

        const response = {
            status: 'Success!',
            body: postNote,
        };

        console.log('response', response);
        if (jsonData.includes(postNote.title && postNote.text)){
            console.log('Note already exists!');
            return;
        } else {jsonData.push(postNote);}

        fs.writeFileSync('db/db.json', JSON.stringify(jsonData), (err) => {
            if (err) throw err;
            console.log(response);
            res.status(201).json(response);
        })
    } else {
        res.status(500).json('Note failed to post')
    }
    return jsonData;
});

app.listen(PORT, () =>
console.log(`Quick Jot listening at http://localhost:${PORT}`)
);