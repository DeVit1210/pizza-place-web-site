const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pizzaConfigurationSchema = new Schema({
    large: {
        price: Number,
        weight: Number,
        diameter: Number
    },
    medium: {
        price: Number,
        weight: Number,
        diameter: Number
    },
    small: {
        price: Number,
        weight: Number,
        diameter: Number
    }
}, { collection : 'pizza-config'});

const pizzaConfig = mongoose.model('pizzaConfiguration', pizzaConfigurationSchema);
module.exports = {
    pizzaConfig, pizzaConfigurationSchema
}