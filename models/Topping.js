const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ToppingSchema = new Schema({
    image: String,
    name: String,
    price: Number
})

const model = mongoose.model('Topping', ToppingSchema)

module.exports = model;