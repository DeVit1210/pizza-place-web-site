function createCartItemTemplate(cartItem) {
    let $cartItem = createElement("div", 'cart_item')
    $cartItem.append(createElement('div', 'current_order_item_close'));
    let $itemHeader = createElement('h3','order_info_header', cartItem.pizza.name)
    $itemHeader.css('margin-top', '6px');
    $cartItem.append($itemHeader);
    let $doughAndSize = createElement('p', 'order_dough_and_size');
    $doughAndSize.append(createElement('span', 'order_dough', cartItem.dough + ", "));
    $doughAndSize.append(createElement('span', 'order_size', cartItem.size));
    $cartItem.append($doughAndSize);
    $cartItem.append(createElement('p', 'order_info_ingredients', cartItem.pizza.ingredients));
    let $regulation = createElement('div', 'order_regulation');
    let $priceAndWeight = createElement('div', 'order_price_and_weight');
    $priceAndWeight.append(createElement('p', 'order_price', cartItem.totalPrice + " руб."));
    $priceAndWeight.append(createElement('p', 'order_weight', cartItem.weight + " г."));
    $regulation.append($priceAndWeight);
    let $cartAddWrapper = createElement('div', 'order_cart_add_wrapper');
    let $cartAdd = createElement('div', 'order_cart_add');
    $cartAdd.append(createElement('button', 'cart_remove_sign', '-'))
    $cartAdd.append(createElement('p', 'item_count', cartItem.quantity));
    $cartAdd.append(createElement('button', 'cart_add_sign', '+'))
    $cartAddWrapper.append($cartAdd);
    $regulation.append($cartAddWrapper);
    $cartItem.append($regulation);
    $cartItem.append(createElement('div', 'invisible', String(cartItem._id)));
    return $cartItem;
}

function createItemCardTemplate(item) {
    let card = createNode("div", "card");
    let cardImageWrapper = createNode("div", "card_img_wrapper");
    let image = createImage(item.picture, "some pizza", "card_img");
    cardImageWrapper.appendChild(image);
    card.appendChild(cardImageWrapper);
    let pizzaName = createNode("p", "pizza_name", item.name);
    card.appendChild(pizzaName);
    let pizzaIngredients = createNode("p", "pizza_components", item.ingredients);
    card.appendChild(pizzaIngredients);
    let pizzaWeightAndDiameter = createNode("div", "pizza_weight_and_diameter");
    let pizzaWeight = createNode("p", 'pizza_weight', item.configuration.medium.weight + " г.")
    let pizzaDiameter = createNode("p", "pizza_diameter", "30 см.")
    pizzaWeightAndDiameter.appendChild(pizzaWeight);
    pizzaWeightAndDiameter.appendChild(pizzaDiameter);
    card.appendChild(pizzaWeightAndDiameter);
    let pizzaPrice = createNode("div", "pizza_price", item.configuration.medium.price + " руб.");
    card.appendChild(pizzaPrice);
    let cartAddingBlock = createNode("div", "cart_add_wrapper");
    let cartAdd = createNode("div", "bestseller_cart_add");
    let decreaseButton = createNode("button", "bestseller_sign", "-");
    let currentQuantity = createNode("p", "item_count", 1);
    let increaseButton = createNode("button", "bestseller_sign", "+");
    cartAdd.appendChild(decreaseButton);
    cartAdd.appendChild(currentQuantity);
    cartAdd.appendChild(increaseButton);
    cartAddingBlock.appendChild(cartAdd);
    let cartImageWrapper = createNode("div", "cart_img");
    cartAddingBlock.appendChild(cartImageWrapper);
    card.appendChild(cartAddingBlock);
    let invisibleIdHolder = createNode("div", "invisible", item._id);
    card.appendChild(invisibleIdHolder);
    return card;
}