const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartItemSchema = new Schema({
    pizza: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Pizza'
    },
    dough: String,
    size: String,
    quantity: Number,
    weight: Number,
    totalPrice: Number
}, {collection: 'cart-items'})

const cartItem = mongoose.model('CartItem', cartItemSchema);

module.exports = cartItem;