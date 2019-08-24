const express = require('express');
const router = express.Router();

// custom modules
const recepieModule = require('../scripts/recepieModule');

// nested routers
router.use('/food', require('../routes/food_router.js'));

// --- own routes --- //

//  /rezepte
router.get('/', (req, res) => res.send('Alle Rezepte'));

//  /rezepte/search-form
router.post('/search-form', (req, res) => res.redirect('/rezepte/search?q=' + req.body.term));

//  /rezepte/search
router.get('/search', async function(req, res) {
    //res.send('query: ' + req.query.q);
    const result = await recepieModule.searchRecepie(req.query.q);
    res.render('searchResults', {list: result, query: req.query.q, title: 'Suche: '});
});

// export
module.exports = router;