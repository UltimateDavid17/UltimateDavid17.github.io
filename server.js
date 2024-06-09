const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(bodyParser.json());

const users = {};

app.post('/register', (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password || password.length < 6) {
        return res.json({ success: false, message: 'Invalid input' });
    }

    if (users[username]) {
        return res.json({ success: false, message: 'Username already exists' });
    }

    users[username] = { email, password };

    res.json({ success: true });
});

app.post('/login', (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.json({ success: false, message: 'Invalid input' });
    }

    const user = users[username];

    if (user && user.password === password) {
        res.json({ success: true });
    } else {
        res.json({ success: false, message: 'Invalid credentials' });
    }
});

app.post('/search', (req, res) => {
    const { query } = req.body;
    const result = Object.keys(users).filter(username => username.includes(query));
    res.json({ users: result.map(username => ({ username })) });
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
