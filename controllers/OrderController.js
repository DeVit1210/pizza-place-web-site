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
            user: id,
            date: Date.now(),
            items: currentCart.items,
            delivery: req.body.delivery,
            totalCost: req.body.totalCost,
            address: req.body.address
        })
        console.log(order);
        await order.save();
        Cart.updateOne({_id: currentCart._id}, {
            $set: { items: [] }
        }).then(() => {
            res.json({message: "order created successfully!"})
        }).catch(err => {
            res.status(400).json({message: err.message})
        })
    } catch (err) {
        res.status(400).json({message: err.message})
    }
}

const findByUserId = (req, res, next) => {
    const token = req.headers.authorization;
    if(token) {
        try {
            const user = jwt.verify(token, JWT_SECRET);
            const userId = user.id;
            Order.find({user: userId}).populate({
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

const findByDate = (req, res) => {
    const today = new Date();
    const startOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const endOfDay = new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1);
    Order.find({
        date: {
            $gte: startOfDay,
            $lt: endOfDay
        }
    }).populate({
        path: "items",
        populate: {
            path: "pizza",
            select: "_id name"
        }

    })
        .then(response => res.json(response))
        .catch(err => res.status(400).json({message: err.message}))
}

const findAll = (req, res) => {
    Order.find().populate({
        path: "user",
        select: "username nickname"
    })
        .then(response => res.json(response))
        .catch(err => res.status(400).json({message: err.message}))
}

module.exports = {
    create, findByUserId, findByDate, findAll
}