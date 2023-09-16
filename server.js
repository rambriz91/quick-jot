const express = require('express');
const path = require('path');
const fs = require('fs');
const uuid = require('./public/assets/js/uuid');

let jsonData = JSON.parse(fs.readFileSync('db/db.json', 'utf8'));

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
    res.json(jsonData);
});

app.post('/api/notes', (req, res) =>{
    const {title, text} = req.body;

    console.log('req.body:', req.body)

    if(title && text) {
        const postNote = {
            title,
            text,
            id: uuid(),
        };

        console.log('postNote:', postNote)

        const response = {
            status: 'Success!',
            body: postNote,
        };

        console.log('response', response);
        jsonData.push(postNote);

        fs.writeFileSync('db/db.json', JSON.stringify(jsonData), (err) => {
            if (err) throw err;
            console.log(response);
            res.status(201).json(response);
        })
        .then((res) => {
            return res.body;
        });
    } else {
        res.status(500).json('Note failed to post')
    }
});

app.delete("/api/notes/:id", function (req, res) {
    
    jsonData = jsonData.filter(({ id }) => id !== req.params.id);
    
    fs.writeFileSync(
        './db/db.json',
        JSON.stringify(postData),
        (err) => {
            if (err) throw err;
            console.info('Successfully deleted notes!')
        })
        .then((res) => {
            return res.body;
        }
        )
});

app.listen(PORT, () =>
console.log(`Quick Jot listening at http://localhost:${PORT}`)
);