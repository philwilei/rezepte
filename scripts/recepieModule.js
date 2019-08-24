const shortid = require('shortid');
const mongoose = require('mongoose');

//create the food schema
const foodSchema = new mongoose.Schema({
    _id:  { type: String, default: shortid.generate},
    type: String,
    name: String,
    tags: String,
    date: { type: Date, default: Date.now },
    body: String
});

// mongoose model =  JS class
const FoodClass = mongoose.model('FoodClass', foodSchema);

async function createFoodRecepie(name, type, tag, body) {
    // create food_recepie, which is an object of class Food_recepie
    const foodRecepie = new FoodClass({
        name: name,
        type: type,
        tags: tag,
        body: body
    });

    // save food_recepie to DB
    const result = await foodRecepie.save();
    console.log(`Recepie with name "${foodRecepie.name}" has been saved to DB.`);
}

async function getFoodRecepies() {
    const allFoodRecepies = await FoodClass.find();
    if (allFoodRecepies) return allFoodRecepies;
    else console.log('No recepies found.');
}

async function updateFoodRecepie(id, name, type, tags, body) {
    const recepie = await FoodClass.findById(id);
    if (!recepie) return;
    recepie.set({
        name: name,
        type: type,
        tags: tags,
        body: body,
        date: Date.now()
    });
    const result = await recepie.save();
    return result;
}

async function getRecepieById(id) {
    result = await FoodClass.findById(id);
    if (result) return result;
    return result = null;
}

async function deleteRecepieById(id) {
    result = await FoodClass.findByIdAndDelete(id);
    if (result) return result;
    return result = null;
}

async function searchRecepie(term) {
    const regex = new RegExp(term , "gi")
    result = await FoodClass.find({name: regex});
    if (result) return result;
    return result = null;
}

module.exports.createFoodRecepie = createFoodRecepie;
module.exports.updateFoodRecepie = updateFoodRecepie;
module.exports.getFoodRecepies = getFoodRecepies;
module.exports.getRecepieById = getRecepieById;
module.exports.deleteRecepieById = deleteRecepieById;
module.exports.searchRecepie = searchRecepie;