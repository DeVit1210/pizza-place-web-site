let authorizationButton = document.querySelector('.authorization_button');
let popupContainer = document.querySelector('.popup_container');
let authorizationPopup = document.querySelector('.popup_block');
let header = document.querySelector('.header_wrapper');

function openPopup() {
    popupContainer.classList.add('active_popup');
    authorizationPopup.classList.add('active_popup');
    header.style.height = '60px';
    header.style.transition = 'height 1s ease';
    document.body.classList.add("scroll_lock")
}

function handleAuthButtonClick() {
    openPopup();
}

function closePopup() {
    popupContainer.classList.remove('active_popup');
    authorizationPopup.classList.remove('active_popup')
    document.body.classList.remove("scroll_lock")
    header.style.height = '120px';
    header.style.transition = 'height 1s ease';
}
authorizationButton.addEventListener("click", handleAuthButtonClick);

