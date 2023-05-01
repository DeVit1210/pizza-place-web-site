const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CouponSchema = new Schema({
    name: String,
    expiresAt: Date,
    description: String,
    code: String,
    message: String
}, {collection: 'coupons'})

CouponSchema.methods.eachNPizzaIsFreeHandler = (items, N) => {
    const filteredItems = items.filter(item => item.size === 'средняя' || item.size === 'большая');
    const quantity = filteredItems.reduce((accumulator, currentItem) => accumulator + currentItem.quantity, 0);
    console.log(quantity)
    if(quantity < N) {
        return 0;
    }
    const itemsToDropCostQuantity = quantity / N;
    let prices = [];
    filteredItems.forEach(filteredItem => {
        for(let i = 0; i<filteredItem.quantity; i++) {
            prices.push(filteredItem.totalPrice);
        }
    })
    prices.sort((a,b) => a - b);
    return prices.slice(0, itemsToDropCostQuantity).reduce((accumulator, currentItem) => {
        return accumulator + currentItem;
    }, 0);
}

CouponSchema.methods.firstOrderNPercentDiscountHandler = (items, N) => {
    const totalPrice = items.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.quantity * currentItem.totalPrice);
    }, 0);
    return (totalPrice * N /100).toFixed(2);
}

CouponSchema.methods.oneFreeIfAtLeastNOrderedHandler = (items, N) => {
    const quantity = items.reduce((accumulator, currentItem) => accumulator + currentItem.quantity, 0);
    if(quantity < N) return 0;
    const prices = [];
    items.forEach(item => {
        for(let i = 0; i<item.quantity; i++) {
            prices.push(item.totalPrice);
        }
    })
    prices.sort((a,b) => a - b);
    return prices[0];
}

CouponSchema.methods.NDiscountWhenTimeIsBetweenHandler = (items, N, hoursFrom, hoursTo) => {
    const totalPrice = items.reduce((accumulator, currentItem) => {
        return accumulator + (currentItem.quantity * currentItem.totalPrice)
    }, 0);
    const now = new Date();
    if(now.getHours() > Number(hoursFrom) && now.getHours() < Number(hoursTo)) {
        return (totalPrice * Number(N) / 100).toFixed(2);
    } else return 0;
}

CouponSchema.methods.allParticularSizeWithNewPrice = (items, size, newPrice) => {
    let filteredItems = items.filter(item => item.size === size);
    let prices = [];
    filteredItems.forEach(filteredItem => {
        for(let i = 0; i<filteredItem.quantity; i++) {
            prices.push(filteredItem.totalPrice);
        }
    })
    return prices.reduce((accumulator, currentValue) => accumulator + currentValue - newPrice, 0);
}

const Coupon = mongoose.model('Coupon', CouponSchema);

module.exports = Coupon

