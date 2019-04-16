const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// ---middleware --- //
router.use(express.urlencoded({extended: true}));

// --- custom modules --- //
const recepieModule = require('../scripts/recepieModule.js');

// --- router --- //
//   rezepte/food
router.get('/', (req, res) => res.send('Alle "food" Rezepte'));

//   rezepte/food/rezept/:id
router.get('/rezept/:id', async function(req, res) {
    await recepieModule.getRecepiebyID(req.params.id)
    let result = recepieModule.result
    console.log(result);
    res.send(req.params.id);
});

//   rezepte/food/new
router.get('/new', (req, res) => res.render('newRecepie_food', {title: 'Neues Rezept'}));

//   rezepte/food/submit-form
router.post('/submit-form', (req, res) => {
    a = req.body.name;
    b = req.body.tags;
    c = req.body.body;
    recepieModule.createFoodRecepie(a, b, c);

    res.redirect('/rezepte/food');
});

// export
module.exports = router;