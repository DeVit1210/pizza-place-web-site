document.querySelector('#delete_coupon_form .admin_button').addEventListener('click', () => {
    const couponToDeleteID = document.getElementById('name').value
    alert(couponToDeleteID)
    $.ajax({
        url: "http://localhost:8080/api/coupon/" + couponToDeleteID,
        type: "DELETE",
        success: () => {
            alert("Купон успешно удален!")
        },
        error: () => {
            alert("Купона с таким id не существует!")
        }
    })
})