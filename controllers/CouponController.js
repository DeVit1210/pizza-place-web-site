const Coupon = require('../models/Coupon');

const add = (req, res) => {
    const couponData = {
        name: req.body.name,
        date: Date.now() + 7,
        description: req.body.description,
        code: req.body.code
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

const destroy = (req, res) => {

}

module.exports = {
    add, findAll, find
}