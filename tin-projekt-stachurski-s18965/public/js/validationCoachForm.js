function validateForm() {

    const firstNameInput = document.getElementById('firstName');
    const lastNameInput = document.getElementById('lastName');
    const countryInput = document.getElementById('country');
    const playerInput = document.getElementById('idPlayer');

    const errorFirstName = document.getElementById('errorFirstName');
    const errorLastName = document.getElementById('errorLastName');
    const errorCountry = document.getElementById('errorCountry');
    const errorPlayer = document.getElementById('errorPlayer');
    const errorsSummary = document.getElementById('errorsSummary');

    const reqMessage = document.getElementById('errorMessage-required').innerText;
    const formMessage = document.getElementById('errorMessage-form').innerText;
    const charsMessage = document.getElementById('errorMessage-charsUniversal').innerText;
    const signsMessage = document.getElementById('errorMessage-signs').innerText;
    const numberMessage = document.getElementById('errorMessage-notNumber').innerText;

    resetErrors([firstNameInput, lastNameInput, countryInput,playerInput], [errorFirstName, errorLastName, errorCountry,errorPlayer], errorsSummary);

    let valid = true;
    const min=2;
    const max=60;
    const lengthErrorMessage=charsMessage + min +'-'+max +' '+signsMessage;

    if (!checkRequired(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = reqMessage;
    }else if (!checkTextLengthRange(firstNameInput.value, min, max)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = lengthErrorMessage;
    }else if (hasNumber(firstNameInput.value)) {
        valid = false;
        firstNameInput.classList.add("error-input");
        errorFirstName.innerText = numberMessage;
    }

    if (!checkRequired(lastNameInput.value)) {
        console.log("lol");
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = reqMessage;
    } else if (!checkTextLengthRange(lastNameInput.value, min, max)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = lengthErrorMessage;
    }else if (hasNumber(lastNameInput.value)) {
        valid = false;
        lastNameInput.classList.add("error-input");
        errorLastName.innerText = numberMessage;
    }

    if (hasNumber(countryInput.value)) {
        valid = false;
        countryInput.classList.add("error-input");
        errorCountry.innerText = numberMessage;
    }

    if (!checkRequired(playerInput.value)) {
        valid = false;
        playerInput.classList.add("error-input");
        errorPlayer.innerText = reqMessage;
    }


    if (!valid) {
        errorsSummary.innerText = formMessage;
    }
    return valid;

}

