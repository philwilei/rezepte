const shortid = require('shortid');
const mongoose = require('mongoose');


// --- FOOD --- //

//create the food schema
const foodSchema = new mongoose.Schema({
    _id:  { type: String, default: shortid.generate},
    type: { type: String , default: 'Food'},
    name: String,
    tags: String,
    date: { type: Date, default: Date.now },
    body: String
});

// mongoose model =  JS class
const FoodClass = mongoose.model('FoodClass', foodSchema);

async function createFoodRecepie(name, tag, body) {
    // create food_recepie, which is an object of class Food_recepie
    const foodRecepie = new FoodClass({
        name: name,
        tags: tag,
        body: body
    });

    // save food_recepie to DB
    const result = await foodRecepie.save();
    console.log(`Food recepie with name "${foodRecepie.name}" has been saved to DB.`);
}

async function getFoodRecepies() {
    const allFoodRecepies  = await FoodClass.find();
    console.log(allFoodRecepies);
    return allFoodRecepies;
}



// --- DRINK --- //

const drinkSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate},
    type: { type: String, default: 'Drink'},
    name: String,
    tags: String,
    date: { type: Date, default: Date.now },
    body: String
});

const DrinkClass = mongoose.model('DrinkClass', drinkSchema);

async function createDrinkRecepie(name, tag, body) {
    const drinkRecepie = new DrinkClass({
        name: name,
        tags: tag,
        body: body
    });

    const result = await drinkRecepie.save();
    console.log(`Drink recepie with name "${drinkRecepie.name}" has been saved to DB.`);
}

async function getDrinkRecepies() {
    const allDrinkRecepies = await DrinkClass.find();
    console.log(allDrinkRecepies);
    return allDrinkRecepies;
}


// --- ALL --- //

async function getAllRecepies() {
    getFoodRecepies();
    getDrinkRecepies();
}

async function getRecepiebyID(id) {
    const result = await FoodClass.findOne({ _id: 'NVFBGR-hp'});
    module.exports.result = result;
}

module.exports.createFoodRecepie = createFoodRecepie;
module.exports.getFoodRecepies = getFoodRecepies;

module.exports.createDrinkRecepie = createDrinkRecepie;
module.exports.getDrinkRecepies = getDrinkRecepies;

module.exports.getAllRecepies = getAllRecepies;
module.exports.getRecepiebyID = getRecepiebyID;