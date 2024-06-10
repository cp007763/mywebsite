const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, '../public')));

// Route to handle form submissions
app.post('/submit-message', (req, res) => {
    const newMessage = {
        name: req.body.name,
        email: req.body.email,
        message: req.body.message,
    };

    fs.readFile('messages.json', (err, data) => {
        if (err) throw err;
        const messages = JSON.parse(data);
        messages.push(newMessage);

        fs.writeFile('messages.json', JSON.stringify(messages, null, 2), (err) => {
            if (err) throw err;
            res.redirect('/contact.html');
        });
    });
});

// Route to serve messages
app.get('/messages', (req, res) => {
    fs.readFile('messages.json', (err, data) => {
        if (err) throw err;
        const messages = JSON.parse(data);
        res.json(messages);
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
