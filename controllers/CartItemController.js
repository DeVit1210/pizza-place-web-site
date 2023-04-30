const CartItem = require('../models/CartItem')
const jwt = require('jsonwebtoken');
const Cart = require("../models/Cart");
const JWT_SECRET = require('../controllers/UserController').JWT_SECRET;

const updateQuantity = (req, res, next) => {
    const { token, itemId, quantity } = req.body;
    if(token) {
        try {
            const user = jwt.verify(token, JWT_SECRET);
            CartItem.findByIdAndUpdate(itemId,
                {$set: {quantity: quantity}},
                {new: true}
            ).then(updatedCart => {
                console.log(updatedCart)
                res.json({message: "cart item updated successfully!"})
            })
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    } else {
        res.status(400).json({message: "invalid access attempt!"})
    }
}

const find = (req, res, next) => {
    const id = req.params.id;
    CartItem.findById(id).populate({
        path: "pizza",
        select: "name ingredients"
    }).then(response => {
        console.log(response);
        res.json(response);
    })
}



module.exports = {
    updateQuantity, find
}