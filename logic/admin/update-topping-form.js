const toppingToUpdateInput = document.getElementById('id');
toppingToUpdateInput.addEventListener('change', () => {
    $.ajax({
        url: "http://localhost:8080/api/toppings/" + toppingToUpdateInput.value,
        type: "GET",
        success: (topping) => {
            document.getElementById('name').value = topping.name;
            document.getElementById('image').value = topping.image;
            document.getElementById('price').value = topping.price;
        },
        error: () => {
            alert("id указан неверно!");
        }
    })
})

document.querySelector('#update_toppings_form .admin_button').addEventListener('click', (event) => {
    event.preventDefault();
    $.ajax({
        url: "http://localhost:8080/api/toppings/" + toppingToUpdateInput.value,
        type: "PUT",
        contentType: "application/json",
        data: JSON.stringify({
            name: document.getElementById('name').value,
            image: document.getElementById('image').value,
            price: document.getElementById('price').value
        }),
        success: () => {
            alert("Данные о топпинге успешно обновлены!")
        }
    })
})