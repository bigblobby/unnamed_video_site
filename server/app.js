const express = require('express');
const app = express();

// Routes
const AuthRouter = require('./Router/auth.router');
const UserRouter = require('./Router/user.router');
const PostRouter = require('./Router/post.router');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/auth', AuthRouter);
app.use('/api/user', UserRouter);
app.use('/api/post', PostRouter);

app.get('/api/test', (req, res) => {
    res.json({message: 'hello world'});
});

module.exports = app;
