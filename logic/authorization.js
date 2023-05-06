let submitBtn = document.querySelector('.submit_btn');
console.log(submitBtn);
submitBtn.addEventListener('click', () => {
    event.preventDefault();
    document.querySelectorAll('.input_field').forEach(inputField => {
        inputField.removeAttribute('data-error');
    })
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
            if(data.token === 'admin') {
                window.location.href = '../views/admin-dashboard.html'
            } else {
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
            }
        },
        error: (xhr, err) => {
            console.log(xhr.responseText);
            if(xhr.responseText === "wrong password") {
                document.getElementById('password').parentElement.setAttribute("data-error", "Неверный пароль!")
            } else {
                document.getElementById('email').parentElement.setAttribute("data-error", "Такой email не существует!")
            }
        }
    })

})

$('#register').click(() => {
    let $authBlock = $('.popup_authorization')
    $authBlock.innerHTML = '';
    $authBlock.load('../views/registration.html');
})


let closeButton = document.querySelector('.close_block');
closeButton.addEventListener("click", () => {
    closePopup()
})
