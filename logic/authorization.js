let submitBtn = document.querySelector('.submit_btn');
submitBtn.addEventListener('click', () => {
    event.preventDefault();
    const user = {
        username: document.getElementById("email").value,
        password: document.getElementById("password").value,
    }
    console.log(user);
    $.ajax({
        url: "http://localhost:8080/api/user/login",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(user),
        success: data => {
            console.log(data.token)
            localStorage.setItem("token", data.token);
            let authButton = document.querySelector(".authorization_button");
            authButton.innerHTML = "авторизован"
            authButton.classList.remove('authorization_button');
            authButton.classList.add('personal_account_button');
            document.querySelector('.personal_account_button').addEventListener('click', () => {
                window.location.href = '../views/personal-account.html';
            })
            authButton.removeEventListener('click', handleAuthButtonClick)
            closePopup();
        },
        error: (err) => {
            alert(err.data)
            closePopup();
        }
    })

})

