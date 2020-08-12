const express = require('express');
const app = express();

// Routes
const UserRouter = require('./Router/user.router');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', UserRouter);

app.get('/api/test', (req, res) => {
    res.json({message: 'hello world'});
});

module.exports = app;
