const Coupon = require('../models/Coupon')
const User = require('../models/User')
const Order = require('../models/Order')
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
        message: req.body.message,
        minOrdersQuantity: req.body.minOrdersQuantity,
        minMoneySpent: req.body.minMoneySpent
    }
    console.log(couponData);
    Coupon.create(couponData)
        .then(coupon => {
            res.json(coupon)
            User.find()
                .then(async users => {
                    for (const user of users) {
                        const orders = await Order.find({userId: user._id}).lean();
                        const userOrdersQuantity = orders.length;
                        const userMoneySpent = orders.reduce((accumulator, currentOrder) => {
                            return accumulator + currentOrder.totalCost
                        }, 0);
                        if (coupon.minOrdersQuantity <= userOrdersQuantity && coupon.minMoneySpent <= userMoneySpent) {
                            console.log(user._id);
                            User.findByIdAndUpdate(user._id,
                                {$push: {coupons: coupon._id}}
                            )
                        }
                    }
                })
        })
        .catch(err => res.json({message: err.message}))
}

const findAll = (req, res) => {
    const token = req.headers.authorization;
    if(token) {
        try {
            const user = jwt.verify(token, JWT_SECRET);
            const userId = user.id;
            User.findById(userId).populate("coupons")
                .then(response => res.json(response.coupons))
                .catch(err => res.status(400).json({message: err.message}));
        } catch (err) {
            res.status(400).json({message: err.message});
        }
    } else res.status(400).json({message: "invalid access attempt"});
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
            const {couponCode, items} = req.body;
            const coupon = await Coupon.findOne({code: couponCode});
            const currentUser = await User.findById(user.id).populate("coupons");
            const couponPresent = currentUser.coupons.filter(item => item.message === coupon.message).length > 0;
            if(couponPresent) {
                res.json(applyCoupon(coupon, items, coupon.message))
            } else res.json('0');
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