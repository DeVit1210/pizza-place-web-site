const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true },
    phoneNumber: {type: String, required: true },
    nickname: String,
    coupons: [
        {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Coupon"
        }
    ]
}, { collection: 'users'})


const model = mongoose.model('User', UserSchema);

module.exports = model;