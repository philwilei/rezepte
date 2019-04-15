const mongoose = require('mongoose');
const express = require('express');
const app = express()
const port = process.env.PORT || 5000;

app.use(express.static('views'));
//app.use('/scripts/', express.static(__dirname + '/scripts/'));

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', (req, res, next) => res.render('index', {title: 'ExpressJS App', text:'Main Page'}));
app.get('/rezepte', (req, res) => res.send('Alle Rezepte'));
app.get('/rezepte/:id', (req, res) => res.send(req.params));


mongoose.connect('mongodb://localhost/recepies', { useNewUrlParser: true })
    .then(() => console.log('Successfully connected to MongoDB!'))
    .catch(err => console.error("Couldn't connect to MongoDB.", err))


app.listen(port);
