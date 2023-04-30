const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const configurationSchema = require('./PizzaConfiguration').pizzaConfigurationSchema;

const pizzaSchema = new Schema({
    name: String,
    ingredients: String,
    itemType: String,
    picture: String,
    configuration: configurationSchema
});

const Pizza = mongoose.model('Pizza', pizzaSchema);
module.exports = Pizza;