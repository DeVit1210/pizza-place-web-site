const Order = require('../models/Order');
const Cart = require('../models/Cart')
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../controllers/UserController').JWT_SECRET;
const {Types} = require("mongoose");


const create = async (req, res, next) => {
    const token = req.body.token;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        const id = user.id;
        const currentCart = await Cart.findOne({userId: id});
        const order = new Order({
            userId: id,
            date: Date.now(),
            items: currentCart.items
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

module.exports = {
    create
}