const mongoose = require('mongoose');
const express = require('express');
const socket = require('socket.io');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5000;
const server = app.listen(port);

// routers
app.get('/', (req, res) => res.render('page_main'));

const rezepte_router = require('./routes/rezepte_router.js');
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use('/rezepte', rezepte_router);

// custom modules
const recepieModule = require('./scripts/recepieModule.js');

// middleware
app.use(express.urlencoded({extended: true}));

// statics
app.use(express.static('views'));
app.use(express.static('public'));

// settings, db
app.set('view engine', 'pug');
app.set('views', './views');

mongoose.connect('mongodb://localhost/recepies', { useNewUrlParser: true })
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch(err => console.error("Couldn't connect to MongoDB.", err));

// socket.io
const io = socket(server);
/*
io.on('connection', (socket) => {
    console.log('socket connection established');
});
*/
io.on('connection', (socket) => {
    //console.log('a user connected');
    socket.on('test', (data) => console.log(data));
    socket.on('search', (data) => console.log(data));
    //socket.on('disconnect', () => console.log('user disconnected'));
});