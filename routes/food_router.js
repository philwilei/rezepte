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
    res.send('Alle "food" Rezepte');

});

//   rezepte/food/rezept/:id
router.get('/rezept/:id', async function(req, res) {
    let recepie = await recepieModule.getRecepieById(req.params.id);
    if (!recepie) {
        //res.send('ERROR 404 - Recepie not found');
        res.statusCode = 404;
        console.log(`error - recepie with id ${req.params.id} not found`);
    }
    else {
        const extractorResult = await infoExtractor.extract(recepie);
        res.render('show_recepie', {
            type: extractorResult[0],
            __id: extractorResult[1],
            name: extractorResult[2],
            tags: extractorResult[3],
            body: extractorResult[4],
            date: extractorResult[5]
        });
    }
});

router.delete('/rezept/:id', async function(req, res) {
    let recepie = await recepieModule.getRecepieById(req.params.id);
    
    if (!recepie) {
        res.statusCode = 404;
        console.log('no recepie returned by getRecepieById function')
    }
    else {
        let success = await recepieModule.deleteRecepieById(req.params.id, recepie.type)
        console.log(success);
        /*
        console.log(success);
        if (success == true) res.redirect('/rezepte/deleted');
        if (success == false) console.log('something went wrong');
        */
    }
});

//   rezepte/food/deleted
router.get('/deleted', (req, res) => res.send('Rezept wurde gelöscht'));

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