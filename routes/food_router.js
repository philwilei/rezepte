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
    res.render('food_all', {list: all_recepies, title: 'Alle Rezepte'});
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
    name = req.body.name;
    type = req.body.type;
    tags = req.body.tags;
    body = req.body.body;
    recepieModule.createFoodRecepie(name, type, tags, body);

    res.redirect('/rezepte/food');
});

//   rezepte/food/update-form
router.post('/update-form', async function(req, res) {
    id = req.body._id;
    name = req.body.name;
    type = req.body.type;
    tags = req.body.tags;
    body = req.body.body;
    const result = await recepieModule.updateFoodRecepie(id, name, type, tags, body);
    if (result) {
        res.redirect('/rezepte/food');
    } else {
        res.statusCode = 400;
    }
    
})

//   rezepte/food/delete-form
router.post('/delete-form', async function(req, res) {
    id = req.body._id;
    const result = await recepieModule.deleteRecepieById(id);
    if (result) {
        res.redirect('/rezepte/food');
        return;
    } else {
        res.statusCode = 400;
    }
})

// export
module.exports = router;