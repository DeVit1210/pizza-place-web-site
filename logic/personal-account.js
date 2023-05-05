const $couponContainer = $('.coupon_container');
$.ajax({
    url: 'http://localhost:8080/api/coupon',
    type: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
    },
    success: (coupons) => {
        $couponContainer.empty();
        console.log(coupons);
        $.each(coupons, (index, coupon) => $couponContainer.append(createCouponItemTemplate(coupon)));
    }
})

const $previousOrdersContainer = $('.previous_orders_container');
$.ajax({
    url: 'http://localhost:8080/api/order/find',
    type: "GET",
    headers: {
        "ContentType": "application/json",
        "Authorization": localStorage.getItem('token')
    },
    success: (orders) => {
        $previousOrdersContainer.empty();
        console.log(orders);
        $.each(orders, (index, order) => $previousOrdersContainer.append(createPreviousOrderItemTemplate(order)))
    }
})
$.ajax({
    url: "http://localhost:8080/api/user/find"
})

const $logoutButton = $('.logout_button');
$logoutButton.on('click', () => {
    localStorage.removeItem('token');
    window.location.href = '../views/index.html';
})
