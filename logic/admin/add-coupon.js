const $couponsContainer = $('.coupon_content_container');
const $addCouponButton = $('#add_coupons');
const $showCouponButton = $('#show_coupons')
const $deleteCouponButton = $('#delete_coupons')
$addCouponButton.on('click', () => {
    $couponsContainer.empty();
    $couponsContainer.load('../../views/admin-templates/add-coupon-form.html')
})

$deleteCouponButton.on('click', () => {
    $couponsContainer.empty();
    $couponsContainer.load('../../views/admin-templates/delete-coupon-form.html')
})

$showCouponButton.on('click', () => {
    $couponsContainer.empty();
    const table = $('<table>')
    const thead = $('<thead>')
    const headers = ['Id', 'Название', 'Описание', 'Вид купона', 'Кол-во заказов', 'Потрачено'];
    headers.forEach(header => {
        thead.append($('<th>').text(header))
    })
    table.append(thead);
    const tbody = $('<tbody>');
    table.append(tbody);
    $couponsContainer.append(table);
    $.ajax({
        url: "http://localhost:8080/api/coupon/find/all",
        type: "GET",
        success: coupons => {
            console.log(coupons)
            coupons.forEach(coupon => {
                const tr = $('<tr>');
                tr.append($('<td>')).text(coupon._id)
                tr.append($('<td>').text(coupon.name))
                tr.append($('<td>').text(coupon.description))
                tr.append($('<td>').text(coupon.message));
                tr.append($('<td>').text(coupon.minOrdersQuantity));
                tr.append($('<td>').text(coupon.minMoneySpent));
                tbody.append(tr);
            })
        }
    })
})


function generateRandomString(size) {
    let result = '';
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < size; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

function combineMessage(form) {
    let msg = form.querySelector('#coupon_type').value + ":" + form.querySelector('#first_param').value;
    const secondParam = form.querySelector('#second_param');
    if(secondParam.value !== '') {
        msg += ":" + secondParam.value;
    }
    return msg;
}

