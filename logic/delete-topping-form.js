document.querySelector('#delete_topping_form .admin_button').addEventListener('click', () => {
    const toppingToDeleteId = document.getElementById('name').value
    $.ajax({
        url: "http://localhost:8080/api/toppings/" + toppingToDeleteId,
        type: "DELETE",
        success: () => {
            alert("Топпинг успешно удален!")
        },
        error: () => {
            alert("Топпинга с таким id не существует!")
        }
    })
})