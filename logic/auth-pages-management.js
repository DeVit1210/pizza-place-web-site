$(document).ready(() => {
    let $authBlock = $('.popup_authorization')
    $('#register').click(() => {
        $authBlock.innerHTML = '';
        $authBlock.load('../views/registration.html');
    })
    $('#logIn').click(() => {
        $authBlock.innerHTML = '';
        $authBlock.load('../views/login.html')
    })
})

