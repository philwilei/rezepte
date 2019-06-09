const shortid = require('shortid');
const mongoose = require('mongoose');


// --- FOOD --- //

//create the food schema
const foodSchema = new mongoose.Schema({
    _id:  { type: String, default: shortid.generate},
    type: { type: String , default: 'food'},
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
    const allFoodRecepies = await FoodClass.find();
    if (allFoodRecepies) return allFoodRecepies;
    else console.log('No recepies found.');
}

async function updateFoodRecepie(id, name, tags, body) {
    const recepie = await FoodClass.findById(id);
    if (!recepie) return;
    recepie.set({
        name: name,
        tags: tags,
        body: body,
        date: Date.now()
    });
    const result = await recepie.save();
    return result;
}



// --- DRINK --- //

const drinkSchema = new mongoose.Schema({
    _id: { type: String, default: shortid.generate},
    type: { type: String, default: 'drink'},
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

async function getRecepieById(id) {
    result = await FoodClass.findById(id);
    if (result) return result;
    result = await DrinkClass.findById(id);
    if (result) return result;
    // ... add all schemas here!
    return result = null;
}

async function deleteRecepieById(id) {
    result = await FoodClass.findByIdAndDelete(id);
    if (result) return result;
    result = await DrinkClass.findByIdAndDelete(id);
    if (result) return result;
    return result = null;
}

module.exports.createFoodRecepie = createFoodRecepie;
module.exports.updateFoodRecepie = updateFoodRecepie;
module.exports.getFoodRecepies = getFoodRecepies;

module.exports.createDrinkRecepie = createDrinkRecepie;
module.exports.getDrinkRecepies = getDrinkRecepies;

module.exports.getAllRecepies = getAllRecepies;
module.exports.getRecepieById = getRecepieById;
module.exports.deleteRecepieById = deleteRecepieById;