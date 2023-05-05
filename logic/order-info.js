const table = $('<table>')
const thead = $('<thead>')
const headers = ['Время', 'Клиент', 'Адрес доставки', 'Кол-во пицц', 'Стоимость заказа'];
headers.forEach(header => {
    thead.append($('<th>').text(header))
})
console.log(thead.get(0));
table.append(thead);
const tbody = $('<tbody>');
table.append(tbody);
$.ajax({
    url: "http://localhost:8080/api/order",
    type: "GET",
    success: (orders) => {
        console.log(orders);
        $.each(orders, (index, order) => {
            const tr = $('<tr>');
            tr.attr('data-id', order._id)

            tr.append($('<td>'))
            tr.append($('<td>'))
            tr.append($('<td>').text(order.items.length))
            tr.append($('<td>').text(order.totalCost));
            tbody.append(tr);
        })
    }
})

$('.order_table_container').append(table);
console.log($('.order_table_container').get(0));