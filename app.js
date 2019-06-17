//exporting required modules
const express = require('express');
const app = express();

const hbs = require('hbs');
const body_parser = require('body-parser');
const session = require('express-session');
const validator = require('express-validator');
var engines = require('consolidate');
const path = require('path');


var login = require('./routes/login');
var registration = require('./routes/registration');
var search = require('./routes/search');
var chat = require('./routes/chat');
var index = require('./routes/index');
var logout = require('./routes/logout');
var user = require('./routes/user');


//setting
app.set('views', path.join(__dirname, 'views'));
hbs.registerPartials(__dirname + '/views/partials');
app.engine('html', engines.swig);
app.set('view engine', 'html');



// middlewares
app.use((req, res, next) => {
    res.set('Cache-Control', 'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0');
    next();
});
app.use(body_parser.urlencoded({ extended: false }));
app.use(validator());
app.use(session({ secret: 'max', saveUninitialized: false, resave: false }));
app.use(express.static(__dirname + '/public'));
app.use('/login', login);
app.use('/registration', registration);
app.use('/search', search);
app.use('/chat', chat);
app.use('/logout', logout);
app.use('/index', index);
app.use('/user', user);


//port 
//setting the available port if not then set it to 3000
const port = process.env.PORT || 3000

const server = app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
const io = require('socket.io').listen(server);
io.on('connection', (socket) => {
    console.log('a user connected')
    socket.on('chatter', (message) => {
        console.log('chatter : ', message)
        io.emit('chatter', message)
    })
})