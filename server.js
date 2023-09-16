const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3001;

//Middleware
app.use(express.static('public'));
app.use(express.json());

app.listen(PORT, () =>
console.log(`Quick Jot listening at http://localhost:${PORT}`)
);