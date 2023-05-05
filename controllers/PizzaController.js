const Pizza = require('../models/Pizza')
const PizzaConfig = require('../models/PizzaConfiguration').pizzaConfig
const {response} = require("express");
function generateRandomString() {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

// show the list of pizzas
const findAll = (req, res, next) => {
    Pizza.find().select("-__v -configuration.__v -configuration._id")
        .then(response => {
            res.json(response);
        })
        .catch(err => {
            console.log(err);
        })
}

// add pizza
const add = (req, res) => {
    console.log(req.body);
    const configurationData = {
        large: {
            diameter: 35,
            weight: req.body.big_weight,
            price: req.body.big_price
        },
        medium: {
            diameter: 35,
            weight: req.body.medium_weight,
            price: req.body.medium_price
        },
        small: {
            diameter: 35,
            weight: req.body.small_weight,
            price: req.body.small_price
        }
    }
    const pizzaConfiguration = new PizzaConfig(configurationData);
    pizzaConfiguration.save()
        .then((config) => {
            const pizza ={
                name: req.body.name,
                ingredients: req.body.ingredients,
                itemType: req.body.type.toLowerCase(),
                configuration: config
            }
            if(req.files) {
                pizza.picture = "../" + req.files[0].path;
            }
            Pizza.create(pizza)
                .then(response => res.json({message: "pizza added successfully"}))
                .catch(err => res.json(err));
        })
        .catch(err => res.json(err))
}

// update the pizza
const update = (req, res, next) => {
    let pizzaID = req.params.id;
    Pizza.findByIdAndUpdate(pizzaID, req.body)
        .then(() => {
            res.json({message: "pizza info updated successfully"})
        })
        .catch((err) => {
            console.log(err)
        });
}

// delete the pizza
const del = (req, res, next) => {
    let pizzaID = req.params.id;
    Pizza.findByIdAndRemove(pizzaID)
        .then(() => {
            res.json({message: "pizza has been removed successfully"})
        })
        .catch((err) => {
            console.log(err)
        });
}

// find pizza by id
const find = (req, res, next) => {
    let pizzaID = req.params.id;
    Pizza.findById(pizzaID)
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
        })
}

const findBy = (req, res, next) => {
    let type = req.body.itemType;
    Pizza.find({"itemType": type})
        .then((response) => {
            res.json(response);
        })
        .catch((err) => {
            console.log(err);
        })
}

module.exports = {
    findAll, add, update, del, find, findBy
}