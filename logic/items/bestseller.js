let bestsellerOrderWindow = document.querySelector('.bestseller_order_window');

$.ajax({
    url: "http://localhost:8080/api/pizza/bestseller/find",
    type: "GET",
    success: (item) => {
        $('#bestseller_name').text(item.name);
        $('#bestseller_price').text(item.configuration.medium.price);
        $('.invisible').text(item._id);
        bestsellerOrderWindow.querySelectorAll('.bestseller_sign').forEach(sign => {
            sign.addEventListener('click', (event) => {
                console.log(sign);
                event.stopPropagation();
                changeItemCount(bestsellerOrderWindow, sign)
            })
        })
        bestsellerOrderWindow.querySelector('#add_bestseller').addEventListener('click', (event) => {
            event.stopPropagation();
            const cartItemData = {
                pizza: bestsellerOrderWindow.querySelector('.invisible').textContent,
                dough: 'традиционное',
                diameter: '30',
                quantity: bestsellerOrderWindow.querySelector('.item_count').textContent,
                weight: item.configuration.medium.weight,
                totalPrice: item.configuration.medium.price
            }
            addItemToCart(cartItemData);
            bestsellerOrderWindow.querySelector('.item_count').textContent = '1';
        })
    }
})
