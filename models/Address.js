const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AddressSchema = new Schema({
    street: { type: String, required: true},
    house: {type: Number, required: true},
    flat: Number,
    entrance: Number,
    doorCode: Number,
})

const model = mongoose.model("Address", AddressSchema);

module.exports = model;