$currentOrderContainer = $('.current_order_container');
$orderTotalCost = $('#total_cost')

$.ajax({
    url: "http://localhost:8080/api/cart/find",
    type: "GET",
    headers: {
        "Content-Type": "application/json",
        "Authorization": localStorage.getItem('token')
    },
    success: (cart) => {
        $currentOrderContainer.empty();
        $.each(cart.items, (index, item) => {
            $currentOrderContainer.append(createOrderMakingCartItemTemplate(item))
        });
        applyCouponListener(cart.items);
        addEventListeners($currentOrderContainer, "current_order_item", "total_cost");
    }
})

$.ajax({
    url: 'http://localhost:8080/api/user/find',
    type: "GET",
    headers: {
        "Authorization": localStorage.getItem('token')
    },
    success: (data) => {
        const user = data.user;
        console.log(user);
        $("#identity_data_form #email").val(user.username);
        $("#identity_data_form #phone_number").val(user.phoneNumber);
        if(user.address) {
            const address = user.address;
            $("#address_form #house").val(address.house);
            $("#address_form #flat").val(address.flat);
            $("#address_form #street").val(address.street);
            $("#address_form #entrance").val(address.entrance);
            $("#address_form #doorCode").val(address.doorCode);
        }
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
                const previousTotalCost = Number($orderTotalCost);
                $orderTotalCost.text((previousTotalCost - discount).toFixed(2));
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
            totalCost: $orderTotalCost.textContent
        }),
        success: () => {
            window.location.href = '../views/index.html';
        },
        error: (data) => {
            console.log(data.message);
        }
    })
})

