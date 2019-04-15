const mongoose = require('mongoose');

// --- FOOD --- //

//create the mongoose schema
const foodSchema = new mongoose.Schema({
    name: String,
    tags: [ String ],
    date: { type: Date, default: Date.now },
    body: String
});

// mongoose model = class
const Food_recepie = mongoose.model('Food_recepie', foodSchema);

// create food_recepie, which is an object (= instance) of class Food_recepie
async function createFood_recepie() {
    const food_recepie = new Food_recepie({
        name: 'Spaghetti Bolognese',
        tags: [ 'Nudeln' ],
        body: 'body goes here'
    })

    // save food_recepie to DB
    const result = await food_recepie.save();
    console.log(`Recepie with name "${food_recepie.name}" has been saved to DB.`);
}