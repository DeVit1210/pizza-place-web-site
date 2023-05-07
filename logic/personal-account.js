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
    url: "http://localhost:8080/api/user/find",
    type: "GET",
    headers: {
        "Authorization": localStorage.getItem('token')
    },
    success: (data) => {
        console.log(data.user);
        const user = data.user;
        $(".identity_data_form #email").val(user.username);
        $(".identity_data_form #phone_number").val(user.phoneNumber);
        $(".identity_data_form #name").val(user.nickname);
        if(user.address) {
            const address = user.address;
            console.log(address);
            $("#address_form #street").val(address.street);
            $("#address_form #house").val(address.house);
            $("#address_form #flat").val(address.flat);
            $("#address_form #entrance").val(address.entrance);
            $("#address_form #doorCode").val(address.doorCode);
        }
    }
})

const $logoutButton = $('.logout_button');
$logoutButton.on('click', () => {
    localStorage.removeItem('token');
    window.location.href = '../views/index.html';
})

const $identityDataButton = $('.identity_data_btn');
$identityDataButton.on('click', (event) => {
    event.preventDefault();
    identityDataFormValidation(() => {
        $.ajax({
            url: "http://localhost:8080/api/user/update",
            type: "POST",
            contentType: "application/json",
            headers: {
                "Authorization": localStorage.getItem("token")
            },
            data: JSON.stringify({
                nickname: $(".identity_data_form #name").val(),
                phoneNumber: $(".identity_data_form #phone_number").val()
            }),
            success: () => {
                alert("Личные данные успешно обновлены!");
            }
        })
    });
})

const $addressSubmitBtn = $('.address_submit_btn');
$addressSubmitBtn.on('click', () => {
    $.ajax({
        url: "http://localhost:8080/api/address/add",
        type: "POST",
        contentType: "application/json",
        headers: {
            "Authorization": localStorage.getItem('token')
        },
        data: JSON.stringify({
            street: $('#address_form #street').val(),
            house: $('#address_form #house').val(),
            flat: $('#address_form #flat').val(),
            entrance: $('#address_form #entrance').val(),
            doorCode: $('#address_form #doorCode').val(),
        }),
        success: () => {
            alert("Адрес успешно обновлен!");
        }
    })
})

$('.card_submit_btn').on('click', (event) => {
    event.preventDefault();
    cardFormValidation(() => {
        $.ajax({
            url: "http://localhost:8080/api/user/update",
            type: "POST",
            contentType: "application/json",
            headers: {
                "Authorization": localStorage.getItem('token')
            },
            data: JSON.stringify({
                card: $cardNumberInput.val() + " " + $validityInput.val()
            }),
            success: () => {
                alert("Данные о карте успешно обновлены!");
            }
        })
    })
})

