const express = require('express');
const app = express();

app.get('/api/test', (req, res) => {
    res.json({message: 'hello world'});
});

module.exports = app;
