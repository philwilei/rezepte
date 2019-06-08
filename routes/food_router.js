const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// ---middleware --- //
router.use(express.urlencoded({extended: true}));

// --- custom modules --- //
const recepieModule = require('../scripts/recepieModule');
const infoExtractor = require('../scripts/infoExtractor');

// --- router --- //
//   rezepte/food
router.get('/', async function(req, res) {
    const all_recepies = await recepieModule.getFoodRecepies();
    res.render('food_all', {list: all_recepies});
});

//   rezepte/food/rezept/:id
router.get('/rezept/:id', async function(req, res) {
    const id = req.params.id
    const recepie = await recepieModule.getRecepieById(id);
    if (recepie) {
        res.render('show_recepie', {recepie: recepie})
    } else {
        res.statusCode = 404;
    }
})

//   rezepte/food/deleted
router.get('/deleted', (req, res) => res.send('Rezept wurde gelöscht'));

//   rezepte/food/new
router.get('/new', (req, res) => res.render('food_new', {title: 'Neues Rezept'}));

//   rezepte/food/edit/:id
router.get('/edit/:id', async function(req, res) {
    let recepie = await recepieModule.getRecepieById(req.params.id);
    res.render('food_edit', {data: recepie});
})

//   rezepte/food/submit-form
router.post('/submit-form', (req, res) => {
    a = req.body.name;
    b = req.body.tags;
    c = req.body.body;
    recepieModule.createFoodRecepie(a, b, c);

    res.redirect('/rezepte/food');
});

//   rezepte/food/update-form
router.post('/update-form', (req, res) => {
    id = req.body._id;
    name = req.body.name;
    tags = req.body.tags;
    body = req.body.body;
    recepieModule.updateFoodRecepie(id, name, tags, body);
    res.redirect('/rezepte/food');
})

//   rezepte/food/delete-form
router.post('/delete-form', async function(req, res) {
    id = req.body._id;
    console.log(req.body._id);
    const result = await recepieModule.deleteRecepieById(id);
    console.log(result);
    if (result) {
        res.redirect('/rezepte/food');
        return;
    } else {
        res.statusCode = 400;
    }
})

// export
module.exports = router;