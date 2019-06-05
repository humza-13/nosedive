const express = require('express');
const hbs = require('hbs');
const body_parser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/nosedive')
    .then(() => console.log('connection to database success!!'))
    .catch(err => console.error('Connection to database cannot be made', err))

var app = express();


hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.get('/login', (req, res) => {
    res.render('login.hbs');
});

app.get('/registration', (req, res) => {
    res.render('registration.hbs');
});


const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});