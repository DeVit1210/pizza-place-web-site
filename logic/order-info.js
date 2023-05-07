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
            const user = order.user;
            const tr = $('<tr>');
            tr.attr('data-id', order._id)
            tr.append($('<td>').text(getDate(order.date)))
            tr.append($('<td>').text(user.nickname ? user.nickname : user.username))
            tr.append($('<td>').text(buildAddress(order.address)))
            tr.append($('<td>').text(order.items.length))
            tr.append($('<td>').text(order.totalCost));
            tbody.append(tr);
        })
    }
})
$('.order_table_container').append(table);

function getDate(dateStringFormat) {
    const date = new Date(Date.parse(dateStringFormat));
    const options = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
    return date.toLocaleDateString('en-US', options)
}

function buildAddress(address) {
    let result = address.street + ", д." + address.house;
    if(address.flat) {
        result += ', кв.' + address.flat;
    }
    if(address.entrance) {
        result += ', подъезд.' + address.entrance;
    }
    return result;
}