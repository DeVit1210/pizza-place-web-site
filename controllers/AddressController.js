const Address = require('../models/Address')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../controllers/UserController').JWT_SECRET;

const add = (req, res) => {
    console.log(req.body)
    const token = req.headers.authorization;
    if(token) {
        try {
            const user = jwt.verify(token, JWT_SECRET);
            Address.create({
                userId: user.id,
                street: req.body.street,
                house: req.body.house,
                flat: req.body.flat,
                entrance: req.body.entrance,
                doorCode: req.body.doorCode
            })
                .then(address => {
                    console.log(address);
                    User.findByIdAndUpdate(user.id, {
                        $set: {address: address}
                    }).then(response => res.json(response))
                        .catch(err => res.status(400).send(err.message))
                })
        } catch (err) {
            res.status(400).send(err.message);
        }

    } else res.status(400).send("Invalid access attempt!")
}


const update = (req, res) => {
    const token = req.headers.authorization;
    if(token) {
        try {
            const user = jwt.verify(token, JWT_SECRET);
            Address.updateOne({userId: user.id}, {
                $set: req.body
            }).then(address => res.json("address successfully updated!"))
                .catch(err => res.status(400).send(err.message))
        } catch (err) {
            res.status(400).send(err.message);
        }

    } else res.status(400).send("Invalid access attempt!")
}

module.exports = {
    add, update
}