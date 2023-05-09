function changePassword(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    $.ajax({
        url: "http://localhost:8080/api/user/change-password",
        type: "POST",
        contentType: "application/json",
        body: JSON.stringify({
            newPassword: password,
            token: localStorage.getItem('token')
        }),
        success: (data) => {

        }
    })
}