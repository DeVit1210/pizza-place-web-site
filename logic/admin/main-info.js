$.ajax({
    url: 'http://localhost:8080/api/order/findToday',
    type: "GET",
    success: (orders) => {
        console.log(orders)
        console.log(orders.length);
        $('#current_day_orders_quantity').text(orders.length);
        $('#total_current_day_income').text(getTotalIncome(orders))
        $.ajax({
            url: 'http://localhost:8080/api/pizza/' + getTheMostPopularPizzaID(orders),
            type: "GET",
            success: (pizza) => {
                console.log(pizza.name)
                $('#current_day_popular_pizza').text(pizza.name)
            }
        })
    }
})

$('#admin_logout').on('click', () => {
    window.location.href = 'http://localhost:63342/course-project/views/index.html';
})
function getTotalIncome(orders) {
    return orders.reduce((accumulator, currentOrder) => {
        return accumulator + currentOrder.totalCost
    }, 0).toFixed(2) + " руб."
}

function getTheMostPopularPizzaID(orders) {
    const itemIds = [];
    orders.forEach(order => {
        order.items.forEach(item => itemIds.push(item.pizza._id))
    })
    console.log(itemIds);
    const uniqueArray = [...new Set(itemIds)];
    console.log(uniqueArray);
    const countMap = {};
    for (const value of uniqueArray) {
        let count = 0;
        for (const element of itemIds) {
            if (element === value) {
                count++;
            }
        }
        countMap[value] = count;
    }
    console.log(countMap);
    let maxKey = null;
    let maxValue = 0;
    for (const [key, value] of Object.entries(countMap)) {
        if (value > maxValue) {
            maxKey = key;
            maxValue = value;
        }
    }
    console.log(maxKey);
    return maxKey;
}