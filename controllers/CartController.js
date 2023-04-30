const Cart = require('../models/Cart');
const CartItem = require('../models/CartItem')
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../controllers/UserController').JWT_SECRET;
const {Types} = require("mongoose");

const addItem = async (req, res, next) => {
    const { token, item } = req.body;
    console.log(item);
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const cartItem= {
            pizza: new Types.ObjectId(item.pizza),
            dough: item.dough.split(' ')[0],
            size: item.diameter === 35 ? "большая" : (item.diameter === 30 ? "средняя" : "маленькая"),
            weight: item.weight,
            quantity: item.quantity,
            totalPrice: item.totalPrice
        };
        CartItem.create(cartItem)
            .then(item => {
                Cart.findOneAndUpdate({userId: user.id},
                    {$push: { items: item._id}}
                ).then(response => {
                    res.json(item._id);
                })
            })
    } catch (err) {
        res.status(400).json({message: "cart item hasn't been added!"});
    }
}

const removeItem = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        try {
            const user = jwt.verify(token, JWT_SECRET);
            const userId = user.id;
            const cartItemId = req.params.itemId;
            Cart.findOneAndUpdate(
                {userId: userId},
                {$pull: {items: cartItemId}},
                {new: true}
            ).then(response => {
                console.log(response)
                CartItem.findByIdAndRemove(cartItemId);
                res.json({message: "cart item deleted successfully!"})
            }).catch(err => {
                res.status(400).json({message: err.message})
            })
        } catch(err) {
            res.status(400).json({message: err.message})
        }
    } else {
        res.status(400).json({message: "invalid access attempt!"})
    }
}

const findCart = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        try {
            const user = jwt.verify(token, JWT_SECRET);
            Cart.findOne({userId: user.id}).populate({
                path: 'items',
                populate: {
                    path: 'pizza',
                    select: 'name ingredients picture -_id'
                }
            })
                .then((cart) => {
                    res.json(cart);
                })
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    } else {
        res.status(400).json({message: "invalid access attempt!"})
    }
}

module.exports = {
    addItem, findCart, removeItem
}