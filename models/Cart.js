const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cartItemSchema = require('../models/CartItem')

const cartSchema = new Schema({
    userId: {
        type: String,
        required: true
    },
    items: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'CartItem'
        }
    ]
}, {collection : 'carts'})

const cart = mongoose.model('Cart', cartSchema);

module.exports = cart;