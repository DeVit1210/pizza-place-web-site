function identityDataFormValidation(callback) {
    removeDataError(document.querySelectorAll('.identity_data_form .input'))
    let validationResults = [];
    const phoneNumberField = document.querySelector('.identity_data_form #phone_number');
    validationResults.push(checkInputValidity(phoneNumberField, "Укажите номер в формате +XXX (XX) XXX-XX-XX"))
    const emailField = document.querySelector('.identity_data_form #email');
    validationResults.push(checkInputValidity(emailField, "Email введен в некорректном формате!"));
    applyCallbackIfTrue(validationResults, callback);
}

function cardFormValidation(callback) {
    removeDataError(document.querySelectorAll('#card_form .input'));
    let validationResults = [];
    const validityField = document.querySelector('.valid_thru_input .input');
    validationResults.push(checkInputValidity(validityField, "Срок действия карты указан неверно!"));
    const cardNumberField = document.querySelector('.card_number_input .input');
    validationResults.push(checkInputValidity(cardNumberField, "Заполните это поле!"))
    applyCallbackIfTrue(validationResults, callback);
}

function orderValidation(callback) {
    removeDataError(document.querySelectorAll('.input'));
    let validationResults = [];
    const validityField = document.querySelector('.valid_thru_input .input');
    validationResults.push(checkInputValidity(validityField, "Срок действия карты указан неверно!"));
    const cardNumberField = document.querySelector('.card_number_input .input');
    validationResults.push(checkInputValidity(cardNumberField, "Заполните это поле!"))
    const phoneNumberField = document.querySelector('#identity_data_form #phone_number');
    validationResults.push(checkInputValidity(phoneNumberField, "Укажите номер в формате +XXX (XX) XXX-XX-XX"))
    const emailField = document.querySelector('#identity_data_form #email');
    validationResults.push(checkInputValidity(emailField, "Email введен в некорректном формате!"));
    applyCallbackIfTrue(validationResults, callback);
}

const $cardNumberInput = $('.card_number_input .input');
$cardNumberInput.on('input', e => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    const spacedValue = sanitizedValue.replace(/(.{4})/g, '$1 ');
    e.target.value = spacedValue.trim().slice(0,19);
});

const $validityInput = $(".valid_thru_input .input")
$validityInput.on('input', e => {
    const value = e.target.value;
    const sanitizedValue = value.replace(/[^0-9]/g, '');
    const formattedValue = sanitizedValue.replace(/(\d{2})(\d{0,2})/, '$1/$2');
    e.target.value = formattedValue.trim().slice(0, 5);
});

$('.digit_input').on('keypress', (event) => {
    const charCode = event.which ? event.which : event.keyCode;
    const charTyped = String.fromCharCode(charCode);
    if (!/^\d+$/.test(charTyped)) {
        event.preventDefault();
    }
})

