$currentOrderContainer = $('.current_order_container');

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
        $('.order_total_cost').text("Итого: ", cart.items.reduce((accumulator, item) => {
            return accumulator + (item.quantity * item.totalPrice);
        }, 0).toFixed(2), " руб.")
        addEventListeners($currentOrderContainer, "current_order_item", "order_total_cost");
    }
})


const $submitBtn = $('.submit_btn');
$submitBtn.on('click', () => {
    $.ajax({
        url: "http://localhost:8080/api/order/create",
        type: "POST",
        headers: {
            "ContentType": "application/json",
            "Authorization": localStorage.getItem('token')
        },
        success: () => {
            window.location.href = '../views/index.html';
        },
        error: (data) => {
            console.log(data.message);
        }
    })
})

