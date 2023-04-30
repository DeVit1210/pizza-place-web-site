const $couponContainer = $('.coupon_container');
$.ajax({
    url: 'http://localhost:8080/api/coupon',
    type: "GET",
    contentType: "application/json",
    success: (coupons) => {
        console.log(coupons);
        coupons.forEach(coupon => {
            $couponContainer.append(createCouponItemTemplate(coupon));
        })
    }
})

const $previousOrdersContainer = $('.previous_orders_container');
$.ajax({
    url: 'http://localhost:8080/api/order/find'
})