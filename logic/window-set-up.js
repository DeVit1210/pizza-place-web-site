const scrollHeight = document.currentScript.getAttribute('data-scroll');
console.log(scrollHeight);
const headers = document.querySelectorAll('.header_wrapper');
headers.forEach(header => {
    window.addEventListener('load', () => {
        window.scroll({
            top: 0, left: 0, behavior: "smooth"
        })
    })
    window.addEventListener('scroll', () => {
        if(window.scrollY >= scrollHeight) {
            header.style.height = "60px";
            header.style.transition = 'height 1s ease';
        } else {
            header.style.height = "120px";
            header.style.transition = 'height 1s ease';
        }
    })
})
// document.addEventListener('DOMContentLoaded', (event) => {
//     event.preventDefault();
//     $.ajax({
//         url: "http://localhost:8080/api/user/find",
//         type: "GET",
//         contentType: "application/json",
//         data: JSON.stringify({
//             token: localStorage.getItem('token')
//         }),
//         success: (data) => {
//             console.log(data);
//             if(data.status === "ok") {
//                 authorizationButton.textContent = data.user.username;
//             } else {
//                 authorizationButton.textContent='Авторизоваться'
//             }
//         }
//     })
// })