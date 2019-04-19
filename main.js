const shortid = require('shortid');
const mongoose = require('mongoose');
const express = require('express');
const app = express()
const port = process.env.PORT || 5000;

// routers
app.get('/', (req, res) => res.send('Main Page'));

const rezepte_router = require('./routes/rezepte_router.js');
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

app.listen(port);