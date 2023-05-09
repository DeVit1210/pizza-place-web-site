const registrationBtn = document.querySelector('.submit_btn');
registrationBtn.addEventListener("click", (event) => {
    event.preventDefault();
    const user = {
        username: document.getElementById("reg_email").value,
        password: document.getElementById("reg_password").value,
        phoneNumber: document.getElementById("reg_phone_number").value
    }
    registrationFormValidation(() => {
        console.log(user);
        $.ajax({
            url: "http://localhost:8080/api/user/register",
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(user),
            success: data =>  {
                closePopup()
            },
            error: (err) => {
                console.log(err)
            }
        })
    })
})

let closeBtn = document.querySelector('.close_block');
closeBtn.addEventListener("click", () => {
    closePopup()
})
