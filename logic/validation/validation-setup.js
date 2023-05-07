function applyCallbackIfTrue(validationResults, callback) {
    if(!validationResults.some(result => result === false)) {
        callback();
    }
}


function removeDataError(inputList) {
    inputList.forEach(input => {
        input.parentElement.removeAttribute('data-error');
    })
}

function checkInputValidity(input, errorMessage) {
    if(!input.checkValidity()) {
        input.parentElement.setAttribute('data-error', errorMessage)
        console.log("false");
        return false;
    } else return true;
}
