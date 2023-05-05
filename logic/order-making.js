$currentOrderContainer = $('.current_order_container');
$orderTotalCost = $('.order_total_cost')

$.ajax({
    url: "http://localhost:8080/api/cart/find",
    type: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
    },
    success: (cart) => {
        console.log(cart);
        $currentOrderContainer.empty();
        $.each(cart.items, (index, item) => {
            $currentOrderContainer.append(createOrderMakingCartItemTemplate(item))
        });
        console.log($orderTotalCost.get(0));
        $orderTotalCost.text("Итого: " +  cart.items.reduce((accumulator, item) => {
            return accumulator + (item.quantity * item.totalPrice);
        }, 0).toFixed(2) + " руб.")
        applyCouponListener(cart.items);
        addEventListeners($currentOrderContainer, "current_order_item", "order_total_cost");
    }
})

function applyCouponListener(items) {
    const $couponApplyBtn = $('.coupon_apply_btn');
    $couponApplyBtn.on('click', () => {
        $.ajax({
            url: 'http://localhost:8080/api/coupon/apply',
            type: "POST",
            contentType: 'application/json',
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            data: JSON.stringify({
                couponCode: $('#coupon').val(),
                items: items
            }),
            success: (discount) => {
                const previousTotalCost = Number($orderTotalCost.text().split(' ')[1]);
                $orderTotalCost.text("Итого: " +  (previousTotalCost - discount).toFixed(2) + " руб.");
            }
        })
    })}


const $submitBtn = $('.submit_btn');
$submitBtn.on('click', () => {
    $.ajax({
        url: "http://localhost:8080/api/order/create",
        type: "POST",
        contentType: "application/json",
        headers: {
            "Authorization": localStorage.getItem('token')
        },
        data: JSON.stringify({
            totalCost: document.querySelector('.order_total_cost').textContent.split(' ')[1]
        }),
        success: () => {
            window.location.href = '../views/index.html';
        },
        error: (data) => {
            console.log(data.message);
        }
    })
})

