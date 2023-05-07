const form = document.getElementById('coupon_add_form');
document.getElementById('coupon_add_form').addEventListener('submit', (event) => {
    $.ajax({
        url: 'http://localhost:8080/api/coupon/add',
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            name: form.querySelector('#coupon_name').value,
            description: form.querySelector('#coupon_description').value,
            code: generateRandomString(6),
            message: combineMessage(form),
            minOrdersQuantity: form.querySelector('#min_orders_quantity').value,
            minMoneySpent: form.querySelector('#min_money_spent').value
        }),
        success: () => {
            alert("Купон успешно добавлен!")
        }
    })
})