const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartItemSchema = require('../models/CartItem')

const OrderSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    date: Date,
    items : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CartItem'
    }]
}, {collection : "orders"})

const Order = mongoose.model('Order', OrderSchema);

module.exports = Order;