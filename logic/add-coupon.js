const form = document.getElementById('coupon_add_form');

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
        msg += secondParam.value;
    }
    return msg;
}
form.addEventListener('submit', (event) => {
    event.preventDefault();
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
            document.body.scrollTop = 0;
        }
    })
})