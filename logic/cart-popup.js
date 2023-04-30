let $cartPopup = $('.cart_popup');

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
            const cartItems = cart.items;
            console.log(cartItems);
            let $cartItemsBlock = $('.cart_items');
            $cartItemsBlock.empty();
            $.each(cartItems, (index, cartItem) => {
                $cartItemsBlock.append(createCartItemTemplate(cartItem));
            })
            addEventListeners($cartItemsBlock)
        }
    })
})

let $closeCartButton = $('.close_cart_button');
$closeCartButton.on('click', () => {
    $cartPopup.css('display', 'none');
})

function addEventListeners($cartItemsBlock) {
    let deleteButtons = document.querySelectorAll(".current_order_item_close");
    console.log(deleteButtons);
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            deleteItemFromCart(button.parentNode);
        });
    })
    const cartTotalPrice = document.getElementById('cart_total_price');
    console.log(cartTotalPrice)
    const cartItemsBlock = $cartItemsBlock.get(0);
    cartItemsBlock.querySelectorAll('.cart_item').forEach(cartItem => {
        const decreaseBtn = cartItem.querySelector('.cart_remove_sign');
        const increaseBtn = cartItem.querySelector('.cart_add_sign');
        const itemCount = cartItem.querySelector('.item_count');
        const itemPrice = cartItem.querySelector('.order_price');
        decreaseBtn.addEventListener('click', () => {
            if(itemCount.textContent === '1') {
                deleteItemFromCart(cartItem);
            } else {
                $.ajax({
                    url: "http://localhost:8080/api/cartItem/update",
                    type: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify({
                        token: localStorage.getItem('token'),
                        itemId: cartItem.querySelector('.invisible').textContent,
                        quantity: (Number(itemCount.textContent) - 1)
                    }),
                    success: () => {
                        itemCount.textContent = (Number(itemCount.textContent) - 1)
                        console.log(getItemPrice(itemPrice))
                        cartTotalPrice.textContent = (Number(cartTotalPrice.textContent - getItemPrice(itemPrice))
                            .toFixed(2));
                    }
                })
            }
        })
        increaseBtn.addEventListener('click', () => {
            if(itemCount.textContent !== '10') {
                $.ajax({
                    url: "http://localhost:8080/api/cartItem/update",
                    type: "PUT",
                    contentType: "application/json",
                    data: JSON.stringify({
                        token: localStorage.getItem('token'),
                        itemId: cartItem.querySelector('.invisible').textContent,
                        quantity: (Number(itemCount.textContent) + 1)
                    }),
                    success: () => {
                        itemCount.textContent = (Number(itemCount.textContent) + 1);
                        console.log(getItemPrice(itemPrice))
                        cartTotalPrice.textContent = (Number(cartTotalPrice.textContent) + getItemPrice(itemPrice))
                            .toFixed(2);
                    }
                })
            }
        })
    })
}

function deleteItemFromCart(cartItem) {
    console.log("parentDiv", cartItem);
    $.ajax({
        url: "http://localhost:8080/api/cart/" + cartItem.querySelector('.invisible').textContent,
        type: "DELETE",
        headers: {
            "ContentType": "application/json",
            "Authorization": localStorage.getItem('token')
        },
        success: () => {
            cartItem.parentNode.removeChild(cartItem);
        }
    })
}