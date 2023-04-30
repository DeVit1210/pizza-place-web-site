let registrationBtn = document.querySelector('.submit_btn');
registrationBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const user = {
        username: document.getElementById("reg_email").value,
        password: document.getElementById("reg_password").value,
        phoneNumber: document.getElementById("reg_phone_number").value
    }
    console.log(user);
    $.ajax({
        url: "http://localhost:8080/api/user/register",
        method: "POST",
        contentType: "application/json",
        data: JSON.stringify(user),
        error: (err) => {
            alert(err)
        }
    })
    popupContainer.classList.remove('active_popup');
    authorizationPopup.classList.remove('active_popup')
    document.body.classList.remove("scroll_lock")
    header.style.height = '120px';
    header.style.transition = 'height 1s ease';

})