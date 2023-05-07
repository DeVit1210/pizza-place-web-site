console.log(document.querySelector('#delete_item_form .admin_button'))
document.querySelector('#delete_item_form .admin_button').addEventListener('click', () => {
    const pizzaToDeleteName = document.getElementById('name').value
    alert(pizzaToDeleteName)
    $.ajax({
        url: "http://localhost:8080/api/pizza/" + pizzaToDeleteName,
        type: "DELETE",
        success: () => {
            alert("Пицца \'" + pizzaToDeleteName + "\' успешно удалена!")
        },
        error: () => {
            alert("Пиццы с названием \'" + pizzaToDeleteName + "\' не существует!")
        }
    })
})