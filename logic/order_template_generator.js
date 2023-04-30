// <!--                        <div class="previous_order_summary_wrapper">-->
//     <!--                            <p class="previous_order_summary_text">Итого:</p>-->
//     <!--                            <p class="previous_order_summary_number">104.96р</p>-->
//     <!--                        </div>-->


    function createPreviousOrderItemTemplate(order) {
    console.log(order);
    const previousOrder = createElement('div', 'previous_order_item');
    const dateTimeAndDelivery = createElement('div', 'order_datetime_and_delivery');
    dateTimeAndDelivery.append(createElement('p', 'order_datetime', order.date));
    dateTimeAndDelivery.append(createElement('p', 'order_delivery', order.delivery));
    previousOrder.append(dateTimeAndDelivery);
    const orderItemsContainer = createElement('div', 'order_items_container');
    order.items.forEach(item => {
        const orderItemWrapper = createElement('div', 'order_item_wrapper');
        const orderItemName = createElement('p', "order_item_name");
        orderItemName.append(createElement('span', 'order_item_name', item.pizza.name + ", "))
        orderItemName.append(createElement('span', 'order_item_size', getSizeInCm(item.size) + "cм."))
        orderItemName.append(createElement('span', 'order_item_dough_size', item.dough));
        orderItemWrapper.append(orderItemName);
        orderItemWrapper.append(createElement('p', 'order_item_quantity', item.quantity + "шт."))
        orderItemWrapper.append(createElement('p', 'order_item_cost', item.totalPrice + "руб."))
        orderItemsContainer.append(orderItemWrapper);
    })
    previousOrder.append(orderItemsContainer);
    const previousOrderSummary = createElement('div', 'previous_order_summary_wrapper');
    previousOrderSummary.append(createElement('p', 'previous_order_summary_text', 'Итого:'));
    previousOrderSummary.append(createElement('p', 'previous_order_summary_number', order.totalCost + ' руб.'));
    previousOrder.append(previousOrderSummary);
    console.log(previousOrder.get(0));
    return previousOrder;
}

function createElement(tagName, className, textContent) {
    let $elem = $("<" + tagName + ">");
    if(className !== null) {
        $elem.addClass(className);
    }
    if(textContent !== undefined) {
        $elem.text(textContent)
    }
    return $elem;
}

function getSizeInCm(size) {
    return size === 'маленькая' ? 25 : (size === 'большая' ? 30 : 35);
}
