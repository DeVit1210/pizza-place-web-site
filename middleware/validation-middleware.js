const User = require('../models/User');
function checkUsername(req, res, next) {
    const username = req.body.username
    User.findOne({username: username})
        .then((user) => {
            req.isUsernameExists = !!user;
        })
        .catch(() => req.isUsernameExists = false)
    next();
}

const checkPassword = (req, res, next) => {
    const password = req.body.password
    User.findOne({password: password})
        .then(() => req.isPasswordExists = true)
        .catch(() => req.isPasswordExists = false)
    next();
}

module.exports = {
    checkPassword, checkUsername
}