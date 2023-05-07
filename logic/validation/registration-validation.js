function registrationFormValidation(callback) {
    removeDataError(document.querySelectorAll('.registration_form .input'));
    let validationResults = [];
    const phoneNumberField = document.querySelector('#reg_phone_number');
    validationResults.push(checkInputValidity(phoneNumberField, "Укажите номер в формате +XXX (XX) XXX-XX-XX"))
    const emailField = document.querySelector('#reg_email');
    validationResults.push(checkInputValidity(emailField, "Email введен в некорректном формате!"));
    const passwordField = document.querySelector('#reg_password');
    validationResults.push(checkInputValidity(passwordField, "Пароль должен содержать как минимум 8 символов и 1 цифру"))
    applyCallbackIfTrue(validationResults, callback);
}