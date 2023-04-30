let $cartPopup = $('.cart_popup');
let $cartItemsBlock = $('.cart_items');

let $cartButton = $('.cart_button')
$cartButton.on('click', (event) => {
    $cartPopup.css('display', 'flex');
    $.ajax({
        url: "http://localhost:8080/api/cart/find",
        type: 'GET',
        headers: {
            "ContentType": 'application/json',
            "Authorization": localStorage.getItem("token")
        },
        success: (cart) => {
            $cartItemsBlock.empty();
            $.each(cart.items, (index, cartItem) => {
                $cartItemsBlock.append(createCartItemTemplate(cartItem));
            })
            addEventListeners($cartItemsBlock, 'cart_item', 'cart_total_price')
        }
    })
})

let $closeCartButton = $('.close_cart_button');
$closeCartButton.on('click', () => {
    $cartPopup.css('display', 'none');
})

$cartOrderButton = $('.cart_order_btn');
$cartOrderButton.on('click', () => {
    window.location.href = '../views/order-making.html';
})