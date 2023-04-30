const User = require('../models/User');
const bcrypt = require('bcryptjs')
const {response} = require("express");
const jwt = require('jsonwebtoken')
const Cart = require('../models/Cart')
const CartItem = require("../models/CartItem");
const {Types} = require("mongoose");
const JWT_SECRET = "my-jwt-secret-HSDirksjeLd"

function validateRequestBody(body, callback) {
    if(!body.username || typeof body.username !== 'string') {
        callback("invalid username");
    }
    if(!body.password || typeof body.password !== 'string') {
        callback("invalid password")
    }
}
const register = async (req, res, next) => {
    const {username, password, phoneNumber} = req.body;
    validateRequestBody(req.body, (message) => {
        res.status(400).json({message: message})
    })
    const hashedPassword = await bcrypt.hash(password, 10);
    User.create({
        username: username,
        password: hashedPassword,
        phoneNumber: phoneNumber
    }).then(async response => {
        const cart = new Cart({
            userId: response._id
        })
        await cart.save();
        res.redirect("http://localhost:63343/course-project/views/index.html");
    }).catch(err => {
        if(err.code === 11000) {
            res.status(400).json({message: "email is already in use"});
        }
        console.log(err);
    })
}

const login = async (req, res, next) => {
    const {username, password} = req.body;
    if (!username || typeof username !== 'string') {
        return res.status(400).json({message: "invalid username"})
    }
    if (!password || typeof password !== 'string') {
        return res.status(400).json({message: "invalid password"})
    }
    const user = await User.findOne({username: username}).lean();
    if(!user) {
        return res.status(400).json({message: "user not found"})
    }
    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if(isPasswordCorrect) {
        const token = jwt.sign({
            id: user._id,
            username: user.username,
        }, JWT_SECRET)
        res.json({token: token});
    } else {
        res.json({message: "invalid access attempt!"})
    }
}

const changePassword = async (req, res, next) => {
    const {newPassword, token} = req.body;
    try {
        const user = jwt.verify(token, JWT_SECRET)
        console.log("JWT decoded: ", user)
        const _id = user.id
        const hashedNewPassword = await bcrypt.hash(newPassword, 10)
        await User.findByIdAndUpdate(_id, {
            $set: { password: hashedNewPassword }
        })
        res.json({message: "password updated successfully!"})
    } catch (err) {
        res.json({message: "invalid access attempt!"})
    }
}

const findAll = (req, res, next) => {
    User.find()
        .then(response => {
            res.json(response)
        })
        .catch(err => {
            console.log(err);
        })
}

const findByUsername = (req, res, next) => {
    const token = req.body.token;
    try {
        const user = jwt.verify(token, JWT_SECRET);
        console.log("JWT decoded: ", user);
        const username = user.username;
        User.findOne({username: username})
            .then(response => {
                res.json({status: "ok", user: response});
            })
            .catch(err => {
                res.json({status: "error", message: "not found"})
            })
    } catch (err) {
        res.json({message: "invalid access attempt!"})
    }
}

module.exports = {
    register, login, changePassword, findAll, findByUsername, JWT_SECRET
}
