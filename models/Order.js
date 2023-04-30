const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartItemSchema = require('../models/CartItem')

const OrderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    date: Date,
    delivery: String,
    items : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
    }],
    totalCost: Number
}, {collection : "orders"})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order