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
        if(user.card) {
            $('#card_form #number').val(user.card.substring(0, 19))
            $('#card_form #validity').val(user.card.split(' ')[4]);
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
                const previousTotalCost = Number($orderTotalCost.text());
                $orderTotalCost.text((previousTotalCost - discount).toFixed(2));
            }
        })
    })}


const $submitBtn = $('.submit_btn');
$submitBtn.on('click', () => {
    const obj = {
        totalCost: $orderTotalCost.text(),
        address: {
            street: $("#address_form #street").val(),
            house: $("#address_form #house").val(),
            flat: $("#address_form #flat").val(),
            entrance: $("#address_form #entrance").val(),
            doorCode: $("#address_form #doorCode").val()
        }
    }
    orderValidation(() => {
        $.ajax({
            url: "http://localhost:8080/api/order/create",
            type: "POST",
            contentType: "application/json",
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            data: JSON.stringify(obj),
            success: () => {
                window.location.href = "http://localhost:63342/course-project/views/menu.html"
            },
            error: (data) => {
                console.log(data.message);
            }
        })
    })
})

