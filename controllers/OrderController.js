const Order = require('../models/Order');
const Cart = require('../models/Cart')
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../controllers/UserController').JWT_SECRET;
const {Types} = require("mongoose");

const create = async (req, res) => {
    const token = req.headers.authorization;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const id = user.id;
        const currentCart = await Cart.findOne({userId: id}).populate("items");
        const order = new Order({
            userId: id,
            date: Date.now(),
            items: currentCart.items,
            delivery: req.body.delivery,
            totalCost: currentCart.items.reduce((accumulator, item) => {
                return accumulator + (item.quantity * item.totalPrice);
            }, 0)
        })
        console.log(order);
        await order.save();
        Cart.updateOne({_id: currentCart._id}, {
            $set: { items: [] }
        }).then(() => {
            res.json({message: "order created successfully!"})
        }).catch(err => {
            console.log(err.message);
            res.status(400).json({message: err.message})
        })
    } catch (err) {
        console.log(err.message);
        res.status(400).json({message: err.message})
    }
}

const findByUserId = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        try {
            const user = jwt.verify(token, JWT_SECRET);
            const userId = user.id;
            Order.find({userId: userId}).populate({
                path: "items",
                populate: {
                    path: "pizza",
                    select: "name"
                }
            })
                .then(orders => res.json(orders))
                .catch(err => res.status(400).json({message: err.message}))
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    } else res.status(400).json('invalid access attempt!');
}

module.exports = {
    create, findByUserId
}