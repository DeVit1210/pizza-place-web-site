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

const add = (req, res) => {
    const { name, price } = req.body;
    const toppingData = {
        name: name,
        price: price
    }
    if(req.files) {
        toppingData.image = '../' + req.files[0].path
    }
    Topping.create(toppingData)
        .then(response => res.redirect('http://localhost:63342/course-project/views/admin-dashboard.html'))
        .catch(err => res.status(400).json({message: err.message}))
}

const del = (req, res) => {
    Topping.findByIdAndDelete(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.status(400).send(err.message))
}

const findOne = (req, res) => {
    Topping.findById(req.params.id)
        .then(response => res.json(response))
        .catch(err => res.send(err.message))
}

const update = (req, res) => {
    Topping.findByIdAndUpdate(req.params.id, req.body)
        .then(response => res.json(response))
        .catch(err => res.send(err.message))
}

module.exports = {
    findAll, add, del, findOne, update
}