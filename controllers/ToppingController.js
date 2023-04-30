const Topping = require('../models/Topping')
const {model} = require("mongoose");
const {find} = require("./PizzaController");

const findAll = (req, res, next) => {
    Topping.find()
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            res.status(400).json({message: err.message})
        })
}

const add = (req, res, next) => {
    const { image, name, price } = req.body;
    Topping.create({
        image: image,
        name: name,
        price: price
    }).then(response => {
        res.json({message: "topping successfully added!"})
    }).catch(err => {
        res.status(400).json({message: err.message})
    })
}

module.exports = {
    findAll, add
}