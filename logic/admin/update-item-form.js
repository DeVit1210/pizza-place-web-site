const pizzaToUpdateInput = document.getElementById('name');
pizzaToUpdateInput.addEventListener('change', () => {
    const name = pizzaToUpdateInput.value;
    $.ajax({
        url: "http://localhost:8080/api/pizza/find/" + name,
        type: "GET",
        success: (pizza) => {
            console.log(pizza);
            document.getElementById('ingredients').value = pizza.ingredients;
            document.getElementById('type').value = pizza.itemType;
            document.getElementById('small_price').value = pizza.configuration.small.price;
            document.getElementById('small_weight').value = pizza.configuration.small.weight;
            document.getElementById('medium_price').value = pizza.configuration.medium.price;
            document.getElementById('medium_weight').value = pizza.configuration.medium.weight;
            document.getElementById('big_price').value = pizza.configuration.large.price;
            document.getElementById('big_weight').value = pizza.configuration.large.weight;
        }
    })
})


document.querySelector('#update_items_form .admin_button').addEventListener('click', (event) => {
    event.preventDefault();
    $.ajax({
        url: "http://localhost:8080/api/pizza/update",
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify({
            name: pizzaToUpdateInput.value,
            ingredients: document.querySelector('#update_items_form #ingredients').value,
            itemType: document.querySelector('#update_items_form #type').value.toLowerCase(),
            configuration: {
                small: {
                    diameter: 25,
                    price: document.querySelector('#update_items_form #small_price').value,
                    weight: document.querySelector('#update_items_form #small_weight').value
                },
                medium: {
                    diameter: 30,
                    price: document.querySelector('#update_items_form #medium_price').value,
                    weight: document.querySelector('#update_items_form #medium_weight').value
                },
                large: {
                    diameter: 35,
                    price: document.querySelector('#update_items_form #big_price').value,
                    weight: document.querySelector('#update_items_form #big_weight').value
                }
            }
        }),
        success: () => {
            alert("Данные о пицце \'" + pizzaToUpdateInput.value + "\' успешно обновлены!")
        }
    })
})