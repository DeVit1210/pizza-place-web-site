const Coupon = require('../models/Coupon')
const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../controllers/UserController').JWT_SECRET;



function applyCoupon(coupon, items, couponNameAndValue) {
    const [name, firstValue, secondValue] = couponNameAndValue.split(':');
    switch (name) {
        case "каждая N бесплатно": return coupon.eachNPizzaIsFreeHandler(items, firstValue);
        case "пицца бесплатно": return coupon.oneFreeIfAtLeastNOrderedHandler(items, firstValue);
        case "временной промежуток": {
            return coupon.NDiscountWhenTimeIsBetweenHandler(items, firstValue, secondValue, Number(secondValue) + 3);
        }
        case "первый заказ": return coupon.firstOrderNPercentDiscountHandler(items, firstValue);
        case "цена для одного размера": return coupon.allParticularSizeWithNewPrice(items, firstValue, secondValue);
    }
}

const add = (req, res) => {
    const couponData = {
        name: req.body.name,
        date: Date.now() + 7,
        description: req.body.description,
        code: req.body.code,
        message: req.body.message
    }
    Coupon.create(couponData)
        .then(response => res.json(response))
        .catch(err => res.json({message: err.message}))
}

const findAll = (req, res) => {
    Coupon.find()
        .then(response => res.json(response))
        .catch(err => res.json({message: err.message}))
}

const find = (req, res) => {
    const id = req.params.id;
    Coupon.findById(id)
        .then(response => res.json(response))
        .catch(err => res.json({message: err.message}))
}

const apply = async (req, res) => {
    const token = req.headers.authorization;
    if (token) {
        try {
            const user = jwt.verify(token, JWT_SECRET);
            // TODO: add check whether coupon available for particular user or not
            const {couponCode, items} = req.body;
            const coupon = await Coupon.findOne({code: couponCode});
            console.log(applyCoupon(coupon, items, coupon.message))
            res.json(applyCoupon(coupon, items, coupon.message))
        } catch (err) {
            res.status(400).json({message: err.message})
        }
    } else {
        res.status(400).json({message: "invalid access attempt!"});
    }
}

module.exports = {
    add, findAll, find, apply
}