$.ajax({
    url: 'http://localhost:8080/api/user/check',
    type: "GET",
    headers: {
        "Authorization": localStorage.getItem('token')
    },
    success: () => {
        let authButton = document.querySelector(".authorization_button");
        authButton.innerHTML = "авторизован"
        authButton.classList.remove('authorization_button');
        authButton.classList.add('personal_account_button');
        document.querySelector('.personal_account_button').addEventListener('click', () => {
            window.location.href = '../views/personal-account.html';
        })
    }
})