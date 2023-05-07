const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const AddressSchema = require('../models/Address').schema;


const OrderSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: Date,
    delivery: String,
    items : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
    }],
    address: AddressSchema,
    totalCost: Number
}, {collection : "orders"})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order