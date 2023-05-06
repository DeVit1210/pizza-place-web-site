function addEventListeners($cartItemsBlock, itemBlockName, totalPriceBlockName) {
    let deleteButtons = document.querySelectorAll(".current_order_item_close");
    console.log(deleteButtons);
    deleteButtons.forEach((button) => {
        button.addEventListener("click", () => {
            deleteItemFromCart(button.parentNode);
        });
    })
    console.log(totalPriceBlockName);
    console.log(document);
    const cartTotalPrice = document.querySelector("#" + totalPriceBlockName);
    console.log(cartTotalPrice)
    const cartItemsBlock = $cartItemsBlock.get(0);
    console.log(cartItemsBlock);
    cartItemsBlock.querySelectorAll("." + itemBlockName).forEach(cartItem => {
        const decreaseBtn = cartItem.querySelector('.cart_remove_sign');
        console.log(decreaseBtn);
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