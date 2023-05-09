$.ajax({
    url: 'http://localhost:8080/api/user/check',
    type: "GET",
    headers: {
        "Authorization": localStorage.getItem('token')
    },
    success: (user) => {
        let authButton = document.querySelector(".authorization_button");
        console.log(user);
        authButton.innerHTML = user.nickname ? user.nickname : "авторизован"
        authButton.classList.remove('authorization_button');
        authButton.classList.add('personal_account_button');
        document.querySelector('.personal_account_button').addEventListener('click', () => {
            window.location.href = 'http://localhost:63342/course-project/views/personal-account.html';
        })
    }
})