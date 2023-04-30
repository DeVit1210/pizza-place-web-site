const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
    name: String,
    expiresAt: Date,
    description: String,
    code: String
}, {collection: 'coupons'})

const Coupon = mongoose.model('Coupon', CouponSchema);

module.exports = Coupon;

