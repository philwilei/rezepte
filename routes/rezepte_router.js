const express = require('express');
const router = express.Router();

// nested routers
router.use('/food', require('../routes/food_router.js'));
router.use('/drink', require('../routes/drink_router.js'));

// --- own routes --- //

//   /rezepte
router.get('/', (req, res) => res.send('Alle Rezepte'));

// export
module.exports = router;