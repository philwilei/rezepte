const express = require('express');
const router = express.Router();

// ---middleware --- //
router.use(express.urlencoded({extended: true}));

// --- custom modules --- //
const recepieModule = require('../scripts/recepieModule.js');

// --- router --- //
//   rezepte/drink
router.get('/', (req, res) => res.send('Alle "drinks" Rezepte'));

//   rezepte/drink/rezept/:id
router.get('/rezept/:id', (req, res) => {
    
    res.send(req.params.id)});

//   rezepte/drink/new
router.get('/new', (req, res) => res.render('newRecepie_drink', {title: 'Neues Rezept'}));

//   rezepte/drink/submit-form
router.post('/submit-form', (req, res) => {
    a = req.body.name;
    b = req.body.tags;
    c = req.body.body;
    recepieModule.createDrinkRecepie(a, b, c);

    res.redirect('/rezepte/drink');
});

// export
module.exports = router;