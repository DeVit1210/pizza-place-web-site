function createOrderMakingCartItemTemplate(cartItem) {
    const $currentOrderItem = createElement('div', 'current_order_item');
    $currentOrderItem.append(createElement('div', 'current_order_item_close'))
    const $imageWrapper = createElement('div', 'current_order_img');
    let $image = $('<img>');
    $image.attr("src", cartItem.pizza.picture);
    $image.attr("alt", "order_item_picture");
    $imageWrapper.append($image);
    $currentOrderItem.append($imageWrapper);
    const $currentOrderInfo = createElement('div', 'current_order_info');
    cartItemInfoTemplate(cartItem, $currentOrderInfo);
    $currentOrderItem.append($currentOrderInfo);
    console.log($currentOrderItem.get(0));
    return $currentOrderItem;
}